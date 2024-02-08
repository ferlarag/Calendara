import { EventBookingOptions } from "@/types/event-booking";

export type EventBookingOptionAction =
  | { type: "SOMETHING" }
  | { type: "OTHER" };

export default function eventBookingReducer(
  eventBooking: EventBookingOptions,
  action: EventBookingOptionAction,
): EventBookingOptions {
  switch (action.type) {
    case "OTHER":
      return { ...eventBooking };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}
