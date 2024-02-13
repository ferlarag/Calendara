import { z } from "zod";

// Assuming these enums are defined somewhere in your codebase
// Replace these with actual definitions
export const EventColors = z.enum([
  "LIGHT_BLUE_SKY",
  "GREEN_ELECTRIC",
  "YELLOW_SUNSHINE",
  "ORANGE_PEACH",
  "VIOLET_MARKER",
  "PINK_CANDY",
]); // Example, replace with actual colors
export const EventState = z.enum(["LIVE", "OFF", "DRAFT"]); // Example, replace with actual states
export const EventVisibility = z.enum(["PUBLIC", "LINK_ONLY"]); // Adjust as needed
export const DateRangeAvailability = z.enum([
  "INDEFINETLY_FUTURE",
  "WITHIN_DATES",
  "DAYS_IN_FUTURE",
]); // Adjust as needed
export const DateRangeAvailabilityInTheFuture = z.enum([
  "CALENDAR_DAYS",
  "WEEK_DAYS",
]); // Adjust

export const EventZodSchema = z.object({
  // Event information
  name: z.string(),
  color: EventColors,
  link: z.string(),
  duration: z.number().default(30),
  description: z.string(),
  locations: z.any().optional(), // Json field, adjust as needed
  state: EventState,
  visibility: EventVisibility.default("PUBLIC"),
  // Schedule Settings
  pickingRange: DateRangeAvailability.default("INDEFINETLY_FUTURE"),
  availableFrom: z.date().optional(),
  avialableUntil: z.date().optional(),
  dateRangeAvailabilityInTheFuture:
    DateRangeAvailabilityInTheFuture.default("CALENDAR_DAYS"),
  availableFor: z.number().optional(),
  scheduleID: z.string().optional(),
  minutesBeforeNextEvent: z.number().default(10),
  minutesAfterPreviousEvent: z.number().default(10),
  maxNumberOfEventsPerDay: z.number().optional().default(12),
  minNoticeHours: z.number().default(24),
  availabilitySlotsSpacingMinutes: z.number().default(20),
  includeHolidays: z.boolean().default(true),
  schedule: z.any().optional(), // Json field, adjust as needed
  // Payment Options
  isPayedEvent: z.boolean().default(false),
  requireOnlinePayment: z.boolean().default(true),
  showPricing: z.boolean().default(true),
  price: z.number().optional(),
  paymentOptions: z.any().optional(), // Json field, adjust as needed
  // Booking Options
  askForName: z.boolean().default(true),
  askForLastName: z.boolean().default(true),
  askForEmail: z.boolean().default(true),
  askForNumber: z.boolean().default(true),
  questions: z.any().optional(), // Json field, adjust as needed
  // Reminders and notifications
  requestUserForConfirmation: z.boolean().default(true),
  requestConfirmationHours: z.number().optional().default(24),
  remindOneDayBefore: z.boolean().default(true),
  remindTwoDaysBefore: z.boolean().default(false),
  remindOneWeekBefore: z.boolean().default(true),
  remindTwoWeekBefore: z.boolean().default(false),
  remindOneMonthBefore: z.boolean().default(false),
  attachments: z.any().optional(), // Json field, adjust as needed
});
