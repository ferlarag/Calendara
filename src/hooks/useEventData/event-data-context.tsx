"use client";
import { type Event, type EventColors } from "@prisma/client";
import { type ReactNode, createContext, useReducer, useState } from "react";
import eventReducer from "../useEventData/event-reducer";

// ---- INITIAL STATES -----

export const defaultEventState: Event = {
  id: "default_id",
  workspaceID: "default_business_id",
  createdAt: new Date(),
  updatedAt: new Date(),
  name: "My New Event",
  color: "LIGHT_BLUE_SKY",
  link: "my-new-event",
  duration: 30,
  description: "",
  locations: [],
  state: "DRAFT",
  visibility: "PUBLIC",
  pickingRange: "INDEFINETLY_FUTURE",
  availableFrom: null,
  avialableUntil: null,
  dateRangeAvailabilityInTheFuture: "CALENDAR_DAYS",
  availableFor: null,
  scheduleID: "default_schedule_id",
  minutesBeforeNextEvent: 5,
  minutesAfterPreviousEvent: 5,
  maxNumberOfEventsPerDay: null,
  minNoticeHours: 24,
  availabilitySlotsSpacingMinutes: 10,
  includeHolidays: false,
  schedule: {},
  isPayedEvent: false,
  requireOnlinePayment: true,
  showPricing: true,
  price: null,
  paymentOptions: [],
  askForName: true,
  askForLastName: true,
  askForEmail: true,
  askForNumber: true,
  questions: [],
  requestUserForConfirmation: true,
  requestConfirmationHours: 24,
  remindOneDayBefore: true,
  remindTwoDaysBefore: false,
  remindOneWeekBefore: false,
  remindTwoWeekBefore: false,
  remindOneMonthBefore: false,
  attachments: [],
};

// ---- CONTEXT -----

export enum EditEventWindow {
  HOME = "Edit Event",
  EDIT_INFORMATION = "Edit Information",
  SCHEDULE_SETTINGS = "Schedule Settings",
  PAYMENT_OPTIONS = "Payment Options",
  BOOKING_OPTIONS = "Booking Options",
  REMIDNERS = "Reminders",
}

export interface EventDataContextType {
  event: Event;
  hasChanges: boolean;
  toggleHasChanges: () => void;
  currentWindow: EditEventWindow;
  changeWindow: (newWindow: EditEventWindow) => void;
  changeEventColor: (newColor: EventColors) => void;
  changeName: (newName: string) => void;
  changeEventLink: (newUrl: string) => void;
  changeDescription: (newDescription: string) => void;
  changeDuration: (newDuration: number) => void;
}

export const EventDataContext = createContext<EventDataContextType | undefined>(
  undefined,
);

// ---- PROVIDER -----

export const EventDataProvider = ({ children }: { children: ReactNode }) => {
  const [hasChanges, setHasChanges] = useState(false);

  const [currentWindow, setCurrentWindow] = useState<EditEventWindow>(
    EditEventWindow.HOME,
  );

  const changeWindow = (newWidow: EditEventWindow) => {
    setCurrentWindow(newWidow);
  };

  const toggleHasChanges = () => {
    setHasChanges((prev) => (prev ? !prev : true));
  };

  // Event Information

  const [event, dispatchEventAction] = useReducer(
    eventReducer,
    defaultEventState,
  );

  const changeEventColor = (newColor: EventColors) => {
    dispatchEventAction({ type: "CHANGE_COLOR", newColor });
  };

  const changeName = (newName: string) => {
    dispatchEventAction({ type: "CHANGE_NAME", newName });
  };

  const changeEventLink = (newUrl: string) => {
    dispatchEventAction({ type: "CHANGE_URL", newUrl });
  };

  const changeDuration = (newDuration: number) => {
    dispatchEventAction({ type: "CHANGE_DURATION", newDuration });
  };

  const changeDescription = (newDescription: string) => {
    dispatchEventAction({ type: "CHANGE_DESCRIPTION", newDescription });
  };

  return (
    <EventDataContext.Provider
      value={{
        event,
        hasChanges,
        toggleHasChanges,
        currentWindow,
        changeWindow,
        changeEventColor,
        changeName,
        changeEventLink,
        changeDuration,
        changeDescription,
      }}
    >
      {children}
    </EventDataContext.Provider>
  );
};
