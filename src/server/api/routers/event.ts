import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";

export const eventRouter = createTRPCRouter({
  getMostRecentEvents: publicProcedure
    .input(
      z.object({
        skip: z.number().nonnegative(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { db } = ctx;
      const { skip } = input;
      const events = await db.event.findMany({
        where: {
          // TODO - Return only available to the current user
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
  createEvent: publicProcedure.mutation(async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return {
      message: "Created",
    };
  }),
});
