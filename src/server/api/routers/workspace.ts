import { createTRPCRouter, privateProcedure } from "../trpc";
import { WorkspaceSchema, WorkspaceURLSchema } from "@/types/workspace";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const workspaceRouter = createTRPCRouter({
  getWorkspace: privateProcedure
    .input(z.object({ workspaceID: z.string() }))
    .query(async ({ ctx, input }) => {
      const { db, userID } = ctx;
      const { workspaceID } = input;

      const workspace = await db.workspace.findFirst({
        where: {
          id: workspaceID,
          teamMembers: {
            some: {
              userID,
            },
          },
        },
      });

      if (!workspace) throw new TRPCError({ code: "NOT_FOUND" });

      return workspace;
    }),
  availableWorkspaces: privateProcedure.query(async ({ ctx }) => {
    const { db, userID } = ctx;

    const workspaces = await db.workspace.findMany({
      where: {
        teamMembers: {
          some: {
            userID: userID,
          },
        },
      },
    });

    return workspaces;
  }),
  checkUrlAvailability: privateProcedure
    .input(z.object({ link: WorkspaceURLSchema }))
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx;
      const { link } = input;

      const dbUrl = await db.workspace.findFirst({
        where: {
          link,
        },
      });

      if (!dbUrl) {
        return { isAvailable: true };
      } else {
        return { isAvailable: false };
      }
    }),
  createWorkspace: privateProcedure
    .input(WorkspaceSchema)
    .mutation(async ({ ctx, input }) => {
      const { db, userID } = ctx;
      const { name, link, timeZone } = input;

      // check if the url is available
      const exisitingURL = await db.workspace.findUnique({
        where: {
          link: link.toLowerCase(),
        },
      });

      if (exisitingURL)
        throw new TRPCError({
          code: "CONFLICT",
          message: "Link already in use.",
        });

      const { newTeamMember, newWorkspace } = await db.$transaction(
        async (prisma) => {
          const newWorkspace = await prisma.workspace.create({
            data: {
              name,
              link: link.toLowerCase(),
              timeZone,
              ownerID: userID,
            },
          });

          const newTeamMember = await prisma.teamMember.create({
            data: {
              userID,
              role: "OWNER",
              workspaceID: newWorkspace.id,
            },
          });

          return { newWorkspace, newTeamMember };
        },
      );

      if (!newTeamMember || !newWorkspace)
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      return {
        newWorkspaceID: newWorkspace.id,
        newMemberID: newTeamMember.id,
      };
    }),
});
