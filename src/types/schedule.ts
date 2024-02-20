import { timePickerOptions } from "@/lib/utils";
import { z } from "zod";

const Options = z.enum(timePickerOptions);

export const AvailableHours = z.object({
  opensAt: Options,
  endsAt: Options,
});

export const Day = z
  .object({
    open: z.boolean(),
    availableHours: AvailableHours,
    unavailable: z.array(AvailableHours),
  })
  .refine(({ availableHours }) => {
    const { endsAt, opensAt } = availableHours;
    const start = timePickerOptions.indexOf(opensAt);
    const end = timePickerOptions.indexOf(endsAt);

    return end > start;
  });

export const WeekSchema = z.object({
  monday: Day,
  tuesday: Day,
  wednesday: Day,
  thursday: Day,
  friday: Day,
  saturday: Day,
  sunday: Day,
});

export const SpecialDate = z.object({
  date: z.date(),
  schedule: Day,
});

export const ScheduleSchema = z.object({
  name: z.string().min(5, { message: "Must be at least 5 characters long" }),
  days: WeekSchema,
  timeZone: z.string(),
  specialDates: z.array(SpecialDate),
});

export const defaultState: z.infer<typeof ScheduleSchema> = {
  name: "Available Hours",
  days: {
    monday: {
      open: true,
      availableHours: {
        opensAt: "09:00",
        endsAt: "17:00",
      },
      unavailable: [],
    },
    tuesday: {
      open: true,
      availableHours: {
        opensAt: "09:00",
        endsAt: "17:00",
      },
      unavailable: [],
    },
    wednesday: {
      open: true,
      availableHours: {
        opensAt: "09:00",
        endsAt: "17:00",
      },
      unavailable: [],
    },
    thursday: {
      open: true,
      availableHours: {
        opensAt: "09:00",
        endsAt: "17:00",
      },
      unavailable: [],
    },
    friday: {
      open: true,
      availableHours: {
        opensAt: "09:00",
        endsAt: "17:00",
      },
      unavailable: [],
    },
    saturday: {
      open: true,
      availableHours: {
        opensAt: "09:00",
        endsAt: "12:00",
      },
      unavailable: [],
    },
    sunday: {
      open: false,
      availableHours: {
        opensAt: "09:00",
        endsAt: "12:00",
      },
      unavailable: [],
    },
  },
  timeZone: "timezone",
  specialDates: [],
};
