import { createTRPCRouter } from "@/server/api/trpc";
import { eventRouter } from "./routers/event";
import { scheduleRouter } from "./routers/schedule";
import { workspaceRouter } from "./routers/workspace";
import { userRouter } from "./routers/user";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  event: eventRouter,
  schedule: scheduleRouter,
  workspace: workspaceRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
