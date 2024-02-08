import { type EventReminders } from "@/types/event-reminders";

export type EventReminderAction = { type: "SOMETHING" } | { type: "OTHER" };

export default function eventRemindersReducer(
  eventReminder: EventReminders,
  action: EventReminderAction,
): EventReminders {
  switch (action.type) {
    case "OTHER":
      return { ...eventReminder };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}
