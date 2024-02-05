"use client";

import { useContext } from "react";
import {
  EventDataContext,
  type EventDataContextType,
} from "./event-data-context";

export const useEventData = (): EventDataContextType => {
  const context = useContext(EventDataContext);

  if (!context)
    throw new Error("useEventData must be used inside a EventDataProvider");

  return context;
};
