"use client";

import { type ReactNode, createContext, useReducer, useCallback } from "react";
import scheduleReducer from "./schedule-reducer";
import { type z } from "zod";
import {
  type WeekSchema,
  type ScheduleSchema,
  type Day,
  type AvailableHours,
} from "@/types/schedule";

const initialState: z.infer<typeof ScheduleSchema> = {
  name: "",
  days: {
    monday: {
      open: true,
      availableHours: {
        opensAt: "09:00",
        endsAt: "09:15",
      },
      unavailable: [],
    },
    tuesday: {
      open: true,
      availableHours: {
        opensAt: "09:00",
        endsAt: "17:00",
      },
      unavailable: [],
    },
    wednesday: {
      open: true,
      availableHours: {
        opensAt: "09:00",
        endsAt: "17:00",
      },
      unavailable: [],
    },
    thursday: {
      open: true,
      availableHours: {
        opensAt: "09:00",
        endsAt: "17:00",
      },
      unavailable: [],
    },
    friday: {
      open: true,
      availableHours: {
        opensAt: "09:00",
        endsAt: "17:00",
      },
      unavailable: [],
    },
    saturday: {
      open: true,
      availableHours: {
        opensAt: "09:00",
        endsAt: "12:00",
      },
      unavailable: [],
    },
    sunday: {
      open: false,
      availableHours: {
        opensAt: "09:00",
        endsAt: "12:00",
      },
      unavailable: [],
    },
  },
  timeZone: "",
};

export interface ScheduleDataContextType {
  schedule: z.infer<typeof ScheduleSchema>;
  changeName: (newName: string) => void;
  updateDay: (
    day: keyof z.infer<typeof WeekSchema>,
    data: z.infer<typeof Day>,
  ) => void;
  toggleDayAvailability: (
    day: keyof z.infer<typeof WeekSchema>,
    isOpen: boolean,
  ) => void;
  changeTime: (
    day: keyof z.infer<typeof WeekSchema>,
    schedule: keyof z.infer<typeof AvailableHours>,
    newValue: string,
  ) => void;
}

export const ScheduleDataContext = createContext<
  ScheduleDataContextType | undefined
>(undefined);

export const ScheduleDataProvider = ({ children }: { children: ReactNode }) => {
  const [schedule, dispatch] = useReducer(scheduleReducer, initialState);

  const changeName = useCallback((newName: string) => {
    dispatch({ type: "CHANGE_NAME", newName: newName });
  }, []);

  const updateDay = useCallback(
    (day: keyof z.infer<typeof WeekSchema>, data: z.infer<typeof Day>) => {
      dispatch({ type: "UPDATE_DAY", day, data });
    },
    [],
  );

  const toggleDayAvailability = useCallback(
    (day: keyof z.infer<typeof WeekSchema>, isOpen: boolean) => {
      dispatch({ type: "TOGGLE_AVAILABILITY", day, isOpen });
    },
    [],
  );

  const changeTime = useCallback(
    (
      day: keyof z.infer<typeof WeekSchema>,
      schedule: keyof z.infer<typeof AvailableHours>,
      newValue: string,
    ) => {
      dispatch({ type: "CHANGE_TIME", day, newValue, schedule });
    },
    [],
  );

  return (
    <ScheduleDataContext.Provider
      value={{
        schedule,
        changeName,
        updateDay,
        toggleDayAvailability,
        changeTime,
      }}
    >
      {children}
    </ScheduleDataContext.Provider>
  );
};
