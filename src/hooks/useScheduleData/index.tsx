"use client";
import { useContext } from "react";
import {
  ScheduleDataContext,
  type ScheduleDataContextType,
} from "./schedule-data-context";

export const useScheduleData = (): ScheduleDataContextType => {
  const context = useContext(ScheduleDataContext);

  if (!context)
    throw new Error(
      "useScheduleData must be used inside a ScheduleDataProvider",
    );

  return context;
};
