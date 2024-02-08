import { type EventSchedule } from "@/types/event-schedule";
import { type DateRangeAvailability } from "@prisma/client";

export type EventScheduleAction =
  | { type: "CHANGE_DATE_RANGE"; newRange: DateRangeAvailability }
  | { type: "CHANGE_START_DATE"; newDate: Date };

export default function eventScheduleReducer(
  eventSchedule: EventSchedule,
  action: EventScheduleAction,
): EventSchedule {
  switch (action.type) {
    case "CHANGE_DATE_RANGE":
      return { ...eventSchedule };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}
