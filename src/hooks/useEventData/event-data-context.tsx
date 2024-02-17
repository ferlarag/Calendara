"use client";
import { type Event } from "@prisma/client";
import { type ReactNode, createContext, useState } from "react";

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
  currentWindow: EditEventWindow;
  changeWindow: (newWindow: EditEventWindow) => void;
}

export const EventDataContext = createContext<EventDataContextType | undefined>(
  undefined,
);

// ---- PROVIDER -----

export const EventDataProvider = ({ children }: { children: ReactNode }) => {
  const [currentWindow, setCurrentWindow] = useState<EditEventWindow>(
    EditEventWindow.HOME,
  );

  const changeWindow = (newWidow: EditEventWindow) => {
    setCurrentWindow(newWidow);
  };

  return (
    <EventDataContext.Provider
      value={{
        currentWindow,
        changeWindow,
      }}
    >
      {children}
    </EventDataContext.Provider>
  );
};
