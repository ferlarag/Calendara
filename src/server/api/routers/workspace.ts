import { createTRPCRouter, privateProcedure } from "../trpc";
import { type Workspace } from "@prisma/client";
import { WorkspaceSchema } from "@/types/workspace";

export const workspaceRouter = createTRPCRouter({
  availableBusinesses: privateProcedure.query(async ({ ctx }) => {
    try {
      const { db, userID } = ctx;

      const members = await db.teamMember.findMany({
        where: {
          userID,
        },
        select: {
          workspaceID: true,
          id: true,
        },
      });

      const workspaces: Pick<
        Workspace,
        "id" | "link" | "name" | "workspaceLogoURL"
      >[] = [];

      for (const member of members) {
        const workspace = await db.workspace.findFirst({
          where: {
            id: member.workspaceID,
          },
          select: {
            id: true,
            name: true,
            link: true,
            workspaceLogoURL: true,
          },
        });

        if (!workspace) return;
        workspaces.push(workspace);
      }

      return workspaces;
    } catch (error) {
      console.log(error);
    }
  }),
  creteWorkspace: privateProcedure
    .input(WorkspaceSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const { db, userID } = ctx;
        const { name, link, timeZone } = input;

        const { newTeamMember, newWorkspace } = await db.$transaction(
          async (prisma) => {
            const newWorkspace = await prisma.workspace.create({
              data: {
                name,
                link,
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

        return {
          newWorkspaceID: newWorkspace.id,
          newMemberID: newTeamMember.id,
        };
      } catch (error) {
        console.log(error);
      }
    }),
});
