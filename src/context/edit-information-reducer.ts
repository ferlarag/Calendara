import { type EventInformation } from "@/types/event-information";
import { type EventColors } from "@prisma/client";

export type EventInformationAction =
  | { type: "CHANGE_COLOR"; newColor: EventColors }
  | { type: "CHANGE_NAME"; newName: string }
  | { type: "CHANGE_URL"; newUrl: string }
  | { type: "CHANGE_DURATION"; newDuration: string }
  | { type: "ADD_LOCATION" }
  | { type: "UPDATE_LOCATION" }
  | { type: "CHANGE_DESCRIPTION"; newDescription: string };

export default function eventInformationReducer(
  eventData: EventInformation,
  action: EventInformationAction,
): EventInformation {
  switch (action.type) {
    case "CHANGE_NAME":
      return { ...eventData, name: action.newName };
    case "CHANGE_COLOR":
      return { ...eventData, color: action.newColor };
    case "CHANGE_URL":
      return { ...eventData, link: action.newUrl };
    case "CHANGE_DURATION":
      return { ...eventData, duration: action.newDuration };
    case "CHANGE_DESCRIPTION":
      return { ...eventData, description: action.newDescription };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}
