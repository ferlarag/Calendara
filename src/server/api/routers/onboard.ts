import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "../trpc";
import { WorkspaceSchema } from "@/types/workspace";
import { TRPCError } from "@trpc/server";
import { OnboardingStep } from "@prisma/client";

export const onboardRouter = createTRPCRouter({
  getCurrentOnboardingStatus: privateProcedure.query(async ({ ctx }) => {
    const { db, userID } = ctx;
    const dbUser = await db.user.findFirst({
      where: {
        id: userID,
      },
    });

    if (!dbUser) throw new TRPCError({ code: "NOT_FOUND" });

    return dbUser.onboardingStatus;
  }),
  skipOnboardingStep: privateProcedure
    .input(
      z.object({
        step: z.enum([
          "CONNECT_CALENDAR",
          "EDIT_CALENDAR",
          "CREATE_SCHEDULE",
          "FEEDBACK",
        ]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { db, userID } = ctx;
      const { step } = input;
      const getNextStep = () => {
        switch (step) {
          case "CONNECT_CALENDAR":
            return OnboardingStep.CREATE_SCHEDULE;
          case "EDIT_CALENDAR":
            return OnboardingStep.CREATE_SCHEDULE;
          case "CREATE_SCHEDULE":
            return OnboardingStep.FEEDBACK;
          case "FEEDBACK":
            return OnboardingStep.DONE;
        }
      };

      const newUserStatus = await db.user.update({
        where: {
          id: userID,
        },
        data: {
          onboardingStatus: getNextStep(),
        },
      });

      if (!newUserStatus)
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      return { success: true };
    }),
  createWorkspace: privateProcedure
    .input(z.object({ workspaceData: WorkspaceSchema }))
    .mutation(async ({ ctx, input }) => {
      const { db, userID } = ctx;
      const { workspaceData } = input;
      const dbUser = await db.user.findFirst({
        where: {
          id: userID,
        },
      });

      if (!dbUser) throw new TRPCError({ code: "NOT_FOUND" });

      const { newTeamMember, newWorkspace, updatedUser } =
        await db.$transaction(async (prisma) => {
          const newWorkspace = await prisma.workspace.create({
            data: {
              ...workspaceData,
              ownerID: userID,
            },
          });

          const newTeamMember = await prisma.teamMember.create({
            data: {
              role: "ADMIN",
              userID: dbUser.id,
              workspaceID: newWorkspace.id,
            },
          });

          const updatedUser = await prisma.user.update({
            where: {
              id: userID,
            },
            data: {
              onboardingStatus: "CONNECT_CALENDAR",
            },
          });

          return {
            newTeamMember: newTeamMember.id,
            newWorkspace: newWorkspace.id,
            updatedUser: updatedUser.id,
          };
        });

      if (!newTeamMember || !newWorkspace || !updatedUser)
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      return { newTeamMember, newWorkspace, updatedUser };
    }),
  getFeedback: privateProcedure.mutation(async ({ ctx }) => {
    const { db, userID } = ctx;
    // TODO - save the feedback from the user

    // finish the setup
    const updatedUser = await db.user.update({
      where: {
        id: userID,
      },
      data: {
        onboardingStatus: "DONE",
      },
    });

    if (!updatedUser) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

    return { sucess: true };
  }),
});
