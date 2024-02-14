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
      try {
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
      } catch (error) {
        console.log(error);
      }
    }),
  getEventData: privateProcedure
    .input(z.object({ eventID: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
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
      } catch (error) {
        console.log(error);
      }
    }),
  createEvent: privateProcedure
    .input(z.object({ data: EventInformationSchema, workspaceID: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
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

        return { eventID: newEvent.id, createdBy: teamMember.id };
      } catch (error) {
        console.log(error);
      }
    }),
  updateEvent: privateProcedure
    .input(z.object({ data: EventInformationSchema, eventID: z.string() }))
    .mutation(async ({ input, ctx }) => {
      try {
        const { data, eventID } = input;
        const { db, userID } = ctx;

        const { workspaceMember } = await db.$transaction(async (prisma) => {
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
          await prisma.event.update({
            where: {
              id: eventID,
            },
            data: {
              ...data,
            },
          });
          return { workspaceMember };
        });

        return {
          eventID,
          workspaceID: workspaceMember.workspaceID,
        };
      } catch (error) {
        console.log(error);
      }
    }),
});
