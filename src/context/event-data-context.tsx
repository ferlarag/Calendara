"use client";

import { type EventInformation } from "@/types/event-information";
import { EventColors } from "@prisma/client";
import { type ReactNode, createContext, useReducer, useState } from "react";
import eventInformationReducer from "./edit-information-reducer";

const eventInformationInitialState: EventInformation = {
  name: "",
  color: EventColors.LIGHT_BLUE_SKY,
  link: "my-new-event", //generate-random-string?
  duration: 30,
  description: "",
  locations: [],
};

export interface EventDataContextType {
  currentWindow: EditEventWindow;
  changeWindow: (newWindow: EditEventWindow) => void;
  eventInformation: EventInformation;
  changeEventColor: (newColor: EventColors) => void;
  changeName: (newName: string) => void;
  changeEventLink: (newUrl: string) => void;
  changeDescription: (newDescription: string) => void;
}

export const EventDataContext = createContext<EventDataContextType | undefined>(
  undefined,
);

export enum EditEventWindow {
  HOME = "Edit Event",
  EDIT_INFORMATION = "Edit Information",
  SCHEDULE_SETTINGS = "Schedule Settings",
  PAYMENT_OPTIONS = "Payment Options",
  BOOKING_OPTIONS = "Booking Options",
  REMIDNERS = "Reminders",
}

export const EventDataProvider = ({ children }: { children: ReactNode }) => {
  const [eventInformation, dispatchEventInformation] = useReducer(
    eventInformationReducer,
    eventInformationInitialState,
  );

  const [currentWindow, setCurrentWindow] = useState<EditEventWindow>(
    EditEventWindow.HOME,
  );

  const changeWindow = (newWidow: EditEventWindow) => {
    setCurrentWindow(newWidow);
  };

  const changeEventColor = (newColor: EventColors) => {
    dispatchEventInformation({ type: "CHANGE_COLOR", newColor });
  };

  const changeName = (newName: string) => {
    dispatchEventInformation({ type: "CHANGE_NAME", newName });
  };

  const changeEventLink = (newUrl: string) => {
    dispatchEventInformation({ type: "CHANGE_URL", newUrl });
  };

  const changeDescription = (newDescription: string) => {
    dispatchEventInformation({ type: "CHANGE_DESCRIPTION", newDescription });
  };

  return (
    <EventDataContext.Provider
      value={{
        currentWindow,
        changeWindow,
        eventInformation,
        changeEventColor,
        changeName,
        changeEventLink,
        changeDescription,
      }}
    >
      {children}
    </EventDataContext.Provider>
  );
};
