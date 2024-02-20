import { EventInformationSchema } from "@/types/event";
import { createTRPCRouter, privateProcedure } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const eventRouter = createTRPCRouter({
  getMostRecentEvents: privateProcedure
    .input(
      z.object({
        workspaceID: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { db, userID } = ctx;
      const { workspaceID } = input;

      // check if the user is part of the workspace

      const teamMember = await db.teamMember.findFirst({
        where: {
          userID,
          workspaceID,
        },
      });

      if (!teamMember) throw new TRPCError({ code: "UNAUTHORIZED" });

      const events = await db.event.findMany({
        where: {
          workspaceID,
        },
        select: {
          id: true,
          name: true,
          color: true,
          locations: true,
          link: true,
          price: true,
          isPayedEvent: true,
          requireOnlinePayment: true,
          state: true,
          visibility: true,
          workspaceID: true,
        },
        skip: 0,
        take: 9,
      });
      return events;
    }),
  getEventData: privateProcedure
    .input(z.object({ eventID: z.string() }))
    .query(async ({ ctx, input }) => {
      const { db, userID } = ctx;
      const { eventID } = input;

      // check if the user can make the request
      const requestedEvent = await db.event.findFirst({
        where: {
          id: eventID,
        },
      });

      if (!requestedEvent) throw new TRPCError({ code: "NOT_FOUND" });

      const dbTeamMember = await db.teamMember.findFirst({
        where: {
          userID,
          workspaceID: requestedEvent.workspaceID,
        },
      });

      if (!dbTeamMember) throw new TRPCError({ code: "UNAUTHORIZED" });

      return requestedEvent;
    }),
  createEvent: privateProcedure
    .input(z.object({ data: EventInformationSchema, workspaceID: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { db, userID } = ctx;
      const { data, workspaceID } = input;
      const {
        color,
        duration,
        link,
        locations,
        name,
        state,
        visibility,
        description,
      } = data;

      // check if the the user can make operations in this board
      const teamMember = await db.teamMember.findFirstOrThrow({
        where: {
          userID,
          workspaceID,
          OR: [{ role: "ADMIN" }, { role: "OWNER" }],
        },
      });

      if (!teamMember) throw new TRPCError({ code: "UNAUTHORIZED" });

      const newEvent = await db.event.create({
        data: {
          name,
          color,
          duration,
          link,
          locations,
          state,
          visibility,
          description,
          workspaceID,
        },
      });

      if (!newEvent) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      return { eventID: newEvent.id, createdBy: teamMember.id };
    }),
  updateEvent: privateProcedure
    .input(z.object({ data: EventInformationSchema, eventID: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { data, eventID } = input;
      const { db, userID } = ctx;

      const { workspaceMember, updatedEvent } = await db.$transaction(
        async (prisma) => {
          const event = await prisma.event.findFirstOrThrow({
            where: {
              id: eventID,
            },
          });

          // check if the user can make changes to this event
          const workspaceMember = await prisma.teamMember.findFirstOrThrow({
            where: {
              userID,
              workspaceID: event.workspaceID,
              OR: [{ role: "ADMIN" }, { role: "OWNER" }],
            },
          });

          // update
          const updatedEvent = await prisma.event.update({
            where: {
              id: eventID,
            },
            data: {
              ...data,
            },
          });
          return { workspaceMember, updatedEvent };
        },
      );

      if (!workspaceMember || !updatedEvent)
        throw new TRPCError({ code: "NOT_FOUND" });

      return {
        eventID,
        updatedEvent,
      };
    }),
});
