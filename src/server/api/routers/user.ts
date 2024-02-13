import { createTRPCRouter, privateProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  validateUser: privateProcedure.mutation(async ({ ctx }) => {
    const { db, userID, user } = ctx;

    const dbUser = await db.user.findFirst({
      where: {
        id: userID,
      },
    });

    if (!dbUser) {
      await db.user.create({
        data: {
          id: user.id,
          email: user.email!,
          name: user.given_name,
          lastName: user.family_name,
        },
      });

      return {
        success: true,
      };
    }
    return {
      success: true,
    };
  }),
});
