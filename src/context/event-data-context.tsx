"use client";

import { type EventInformation } from "@/types/event-information";
import { EventColors } from "@prisma/client";
import { type ReactNode, createContext, useReducer, useState } from "react";
import eventInformationReducer from "./edit-information-reducer";
import eventScheduleReducer from "./edit-schedule-reducer";
import { type EventSchedule } from "@/types/event-schedule";
import { type EventPayments } from "@/types/event-payments";
import { type EventBookingOptions } from "@/types/event-booking";
import { type EventReminders } from "@/types/event-reminders";
import eventPaymentsReducer from "./edit-payments-reducer";
import eventRemindersReducer from "./edit-reminders-reducer";
import eventBookingReducer from "./edit-booking-reducer";

// ---- INITIAL STATE -----
const eventInformationInitialState: EventInformation = {
  name: "My new event",
  color: EventColors.LIGHT_BLUE_SKY,
  link: "my-new-event", //generate-random-string?
  duration: "30",
  description: "",
  locations: [],
};

const eventScheduleInitialState: EventSchedule = {
  availabilitySlotsSpacingMinutes: 10,
  dateRangeAvailabilityInTheFuture: "CALENDAR_DAYS",
  includeHolidays: true,
  minNoticeHours: 24,
  minutesAfterPreviousEvent: 10,
  minutesBeforeNextEvent: 10,
  pickingRange: "INDEFINETLY_FUTURE",
  availableFor: undefined,
  availableFrom: undefined,
  avialableUntil: undefined,
  maxNumberOfEventsPerDay: undefined,
  schedule: undefined,
  scheduleID: undefined,
};

const eventPaymentsInitialState: EventPayments = {
  isPayedEvent: true,
  requireOnlinePayment: true,
  showPricing: true,
  paymentOptions: undefined,
  price: undefined,
};

const eventBookingOptionsInitialState: EventBookingOptions = {
  askForEmail: true,
  askForLastName: true,
  askForName: true,
  askForNumber: true,
  questions: [],
};

const eventRemindersInitialState: EventReminders = {
  remindOneDayBefore: true,
  remindOneMonthBefore: false,
  remindOneWeekBefore: false,
  requestUserForConfirmation: true,
  remindTwoDaysBefore: false,
  remindTwoWeekBefore: false,
  requestConfirmationHours: 24,
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
  eventInformation: EventInformation;
  eventSchedule: EventSchedule;
  eventReminders: EventReminders;
  eventBookingOptions: EventBookingOptions;
  eventPayments: EventPayments;
  changeEventColor: (newColor: EventColors) => void;
  changeName: (newName: string) => void;
  changeEventLink: (newUrl: string) => void;
  changeDescription: (newDescription: string) => void;
  changeDuration: (newDuration: string) => void;
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

  const [eventInformation, dispatchEventInformation] = useReducer(
    eventInformationReducer,
    eventInformationInitialState,
  );

  const changeEventColor = (newColor: EventColors) => {
    dispatchEventInformation({ type: "CHANGE_COLOR", newColor });
  };

  const changeName = (newName: string) => {
    dispatchEventInformation({ type: "CHANGE_NAME", newName });
  };

  const changeEventLink = (newUrl: string) => {
    dispatchEventInformation({ type: "CHANGE_URL", newUrl });
  };

  const changeDuration = (newDuration: string) => {
    dispatchEventInformation({ type: "CHANGE_DURATION", newDuration });
  };

  const changeDescription = (newDescription: string) => {
    dispatchEventInformation({ type: "CHANGE_DESCRIPTION", newDescription });
  };

  const [eventSchedule, dispatchEventSchedule] = useReducer(
    eventScheduleReducer,
    eventScheduleInitialState,
  );
  const [eventPayments, dispatchEventPayments] = useReducer(
    eventPaymentsReducer,
    eventPaymentsInitialState,
  );
  const [eventReminders, dispatchEventReminders] = useReducer(
    eventRemindersReducer,
    eventRemindersInitialState,
  );
  const [eventBookingOptions, dispatchEventBookingOptions] = useReducer(
    eventBookingReducer,
    eventBookingOptionsInitialState,
  );

  return (
    <EventDataContext.Provider
      value={{
        currentWindow,
        changeWindow,
        eventInformation,
        eventSchedule,
        eventPayments,
        eventReminders,
        eventBookingOptions,
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
