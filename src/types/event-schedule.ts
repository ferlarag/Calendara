import {
  type DateRangeAvailability,
  type DateRangeAvailabilityInTheFuture,
} from "@prisma/client";

export interface EventSchedule {
  pickingRange: DateRangeAvailability;
  availableFrom?: Date;
  avialableUntil?: Date;
  dateRangeAvailabilityInTheFuture: DateRangeAvailabilityInTheFuture;
  availableFor?: number;
  scheduleID?: string;
  minutesBeforeNextEvent: number;
  minutesAfterPreviousEvent: number;
  maxNumberOfEventsPerDay?: number;
  minNoticeHours: number;
  availabilitySlotsSpacingMinutes: number;
  includeHolidays: boolean;
  schedule?: string;
}
