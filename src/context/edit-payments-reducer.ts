import { type EventPayments } from "@/types/event-payments";

export type EventPaymentsAction = { type: "SOMETHING" } | { type: "OTHER" };

export default function eventPaymentsReducer(
  eventPayments: EventPayments,
  action: EventPaymentsAction,
): EventPayments {
  switch (action.type) {
    case "OTHER":
      return { ...eventPayments };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}
