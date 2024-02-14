import { type EventColors, type Event } from "@prisma/client";

export type EventStoreAction =
  | { type: "LOAD_EVENT_TO_STORE"; newEvent: Event }
  | { type: "CHANGE_COLOR"; newColor: EventColors }
  | { type: "CHANGE_NAME"; newName: string }
  | { type: "CHANGE_URL"; newUrl: string }
  | { type: "CHANGE_DURATION"; newDuration: number }
  | { type: "CHANGE_DESCRIPTION"; newDescription: string };

export default function eventReducer(
  eventData: Event,
  action: EventStoreAction,
): Event {
  switch (action.type) {
    case "LOAD_EVENT_TO_STORE":
      return { ...action.newEvent };
    case "CHANGE_COLOR":
      return { ...eventData, color: action.newColor };
    case "CHANGE_NAME":
      return { ...eventData, name: action.newName };
    case "CHANGE_URL":
      return { ...eventData, link: action.newUrl };
    case "CHANGE_DURATION":
      return { ...eventData, duration: action.newDuration };
    case "CHANGE_DESCRIPTION":
      return { ...eventData, description: action.newDescription };
    default:
      throw new Error(`Unhandled action type:`);
  }
}
