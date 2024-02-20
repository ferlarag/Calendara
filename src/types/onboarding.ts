import { z } from "zod";
import { AvailableHours } from "./schedule";

export const CreateScheduleOnboardingSchema = z.object({
  monday: z.boolean(),
  tuesday: z.boolean(),
  wednesday: z.boolean(),
  thursday: z.boolean(),
  friday: z.boolean(),
  saturday: z.boolean(),
  sunday: z.boolean(),
  availability: AvailableHours,
});
