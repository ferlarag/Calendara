import {
  EventColors,
  EventInformationSchema,
  EventState,
  EventVisibility,
  EventZodSchema,
} from "@/types/event";
import { createTRPCRouter, privateProcedure, publicProcedure } from "../trpc";
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
        },
        skip: 0,
        take: 9,
      });
      return events;
    }),
  createEvent: privateProcedure
    .input(z.object({ data: EventInformationSchema, workspaceID: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { db, userID, user } = ctx;
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
      const isTeamMember = await db.teamMember.findFirst({
        where: {
          userID,
          workspaceID,
          OR: [{ role: "ADMIN" }, { role: "OWNER" }],
        },
      });

      if (!isTeamMember) throw new TRPCError({ code: "UNAUTHORIZED" });

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

      return { newEventID: newEvent.id };
    }),
});
