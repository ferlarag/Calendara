import {
  type WeekSchema,
  type Day,
  type ScheduleSchema,
  type AvailableHours,
} from "@/types/schedule";
import { type z } from "zod";

export type ScheduleAction =
  | { type: "LOAD_SCHEDULE"; schedule: z.infer<typeof ScheduleSchema> }
  | { type: "CHANGE_NAME"; newName: string }
  | {
      type: "TOGGLE_AVAILABILITY";
      day: keyof z.infer<typeof WeekSchema>;
      isOpen: boolean;
    }
  | {
      type: "CHANGE_TIME";
      day: keyof z.infer<typeof WeekSchema>;
      schedule: keyof z.infer<typeof AvailableHours>;
      newValue: string;
    }
  | {
      type: "UPDATE_DAY";
      day: keyof z.infer<typeof WeekSchema>;
      data: z.infer<typeof Day>;
    };

export default function scheduleReducer(
  schedule: z.infer<typeof ScheduleSchema>,
  action: ScheduleAction,
): z.infer<typeof ScheduleSchema> {
  switch (action.type) {
    case "CHANGE_NAME":
      return { ...schedule, name: action.newName };
    case "LOAD_SCHEDULE":
      return { ...action.schedule };
    case "UPDATE_DAY":
      return {
        ...schedule,
        days: {
          ...schedule.days,
          [action.day]: action.data,
        },
      };
    case "TOGGLE_AVAILABILITY":
      return {
        ...schedule,
        days: {
          ...schedule.days,
          [action.day]: {
            ...schedule.days[action.day],
            open: action.isOpen,
          },
        },
      };
    case "CHANGE_TIME":
      return {
        ...schedule,
        days: {
          ...schedule.days,
          [action.day]: {
            ...schedule.days[action.day],
            availableHours: {
              ...schedule.days[action.day].availableHours,
              [action.schedule]: action.newValue,
            },
          },
        },
      };
    default:
      throw new Error(`Unhandled action type:`);
  }
}
