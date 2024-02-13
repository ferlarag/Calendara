import { ScheduleSchema } from "@/types/schedule";
import { createTRPCRouter, privateProcedure } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const scheduleRouter = createTRPCRouter({
  createSchedule: privateProcedure
    .input(
      z.object({
        schedule: ScheduleSchema,
        workspaceID: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { db, headers, user, userID } = ctx;
      const { schedule, workspaceID } = input;
      const { days, name, specialDates, timeZone } = schedule;

      if (!workspaceID)
        throw new TRPCError({
          message: "Can't find a Business ID in the request",
          code: "BAD_REQUEST",
        });

      // check if the user is part of the requested workspace
      const teamMember = await db.teamMember.findFirst({
        where: {
          workspaceID,
          userID,
        },
      });

      if (!teamMember) throw new TRPCError({ code: "UNAUTHORIZED" });

      // create the schedule
      const createdSchedule = await db.schedule.create({
        data: {
          workspaceID,
          days,
          name,
          specialDates,
          timeZone,
        },
      });

      return { newScheduleID: createdSchedule.id };
    }),
});
