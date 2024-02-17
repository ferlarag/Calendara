import { TRPCError } from "@trpc/server";
import { createTRPCRouter, privateProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  validateUser: privateProcedure.mutation(async ({ ctx }) => {
    const { db, userID, user } = ctx;

    const newUser = await db.user.upsert({
      where: {
        id: userID,
      },
      update: {},
      create: {
        id: userID,
        name: user.given_name,
        lastName: user.family_name,
        email: user.email,
      },
    });

    if (!newUser) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

    return { newUserID: newUser.id };
  }),
});
