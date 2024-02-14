import { TRPCError } from "@trpc/server";
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
      const newUser = await db.user.create({
        data: {
          id: user.id,
          email: user.email!,
          name: user.given_name,
          lastName: user.family_name,
        },
      });

      if (!newUser) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      return {
        success: true,
      };
    }

    return {
      success: true,
    };
  }),
});
