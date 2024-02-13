import {
  EventColors,
  EventState,
  EventVisibility,
  EventZodSchema,
} from "@/types/event";
import { createTRPCRouter, privateProcedure, publicProcedure } from "../trpc";
import { z } from "zod";

export const eventRouter = createTRPCRouter({
  getMostRecentEvents: privateProcedure
    .input(
      z.object({
        skip: z.number().nonnegative(),
        workspaceID: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { db, userID } = ctx;
      const { skip, workspaceID } = input;

      const matchingMembers = await db.teamMember.findMany({
        where: {
          userID,
        },
      });

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
        skip,
        take: 9,
      });
      return events;
    }),
  createEvent: privateProcedure
    .input(
      z.object({
        name: z.string(),
        color: EventColors,
        link: z.string(),
        duration: z.number().default(30),
        description: z.string(),
        locations: z.any().optional(), // Json field, adjust as needed
        state: EventState,
        visibility: EventVisibility.default("PUBLIC"),
      }),
    )
    .mutation(async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return {
        eventID: "Created",
      };
    }),
});
