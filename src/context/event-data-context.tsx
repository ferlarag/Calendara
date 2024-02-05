"use client";

import { ReactNode, createContext, useState } from "react";

export interface EventDataContextType {
  currentWindow: EditEventWindow;
  changeWindow: (newWindow: EditEventWindow) => void;
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
  const [currentWindow, setCurrentWindow] = useState<EditEventWindow>(
    EditEventWindow.HOME,
  );

  const changeWindow = (newWidow: EditEventWindow) => {
    setCurrentWindow(newWidow);
  };

  return (
    <EventDataContext.Provider value={{ currentWindow, changeWindow }}>
      {children}
    </EventDataContext.Provider>
  );
};
