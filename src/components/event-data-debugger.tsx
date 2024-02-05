"use client";

import { type ReactNode } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const EventDataDebugger = () => {
  return (
    <div className="fixed right-2 top-2 z-20 flex w-[800px] flex-col rounded-md border bg-white">
      <Tabs defaultValue="state" className="w-full">
        <div className="flex items-center justify-between border-b px-4 py-2">
          <h2 className="text-lg font-semibold">
            <span className="text-brand-500">useEventData</span> dev tools
          </h2>
          <TabsList>
            <TabsTrigger value="state">State</TabsTrigger>
            <TabsTrigger value="dataStructure">Data Structure</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="state">
          <div className="max-h-[calc(100vh-100px)] overflow-scroll px-4 py-2">
            All your data here
          </div>
        </TabsContent>
        <TabsContent className="mt-0" value="dataStructure">
          <div className="max-h-[calc(100vh-100px)] overflow-scroll px-4 py-2">
            {schemaItems.map((item) => (
              <div
                key={item.title}
                className="flex w-full justify-between gap-3"
              >
                <DataKey>{item.title}</DataKey>
                <DataType>{item.type}</DataType>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface EventSchemaType {
  title: string;
  type: string;
}

const DataKey = ({ children }: { children: ReactNode }) => {
  return <p className="flex-1 truncate font-mono text-green-500">{children}</p>;
};
const DataType = ({ children }: { children: ReactNode }) => {
  return <p className="flex-1 truncate font-mono text-zinc-800">{children}</p>;
};

const schemaItems: EventSchemaType[] = [
  {
    title: "id",
    type: "String",
  },
  {
    title: "businessID",
    type: "String",
  },
  {
    title: "createdAt",
    type: "DateTime",
  },
  {
    title: "updatedAt",
    type: "DateTime",
  },

  // Event information
  {
    title: "name",
    type: "String",
  },
  {
    title: "color",
    type: "EventColors",
  },
  {
    title: "link",
    type: "String",
  },
  {
    title: "duration",
    type: "Int",
  },
  {
    title: "description",
    type: "String?",
  },
  {
    title: "locations",
    type: "Json?",
  },
  {
    title: "state",
    type: "EventState",
  },
  {
    title: "visibility",
    type: "EventVisibility",
  },

  // Schedule Settings
  {
    title: "pickingRange",
    type: "DateRangeAvailbility",
  },
  {
    title: "availableFrom",
    type: "DateTime?",
  },
  {
    title: "availableUntil",
    type: "DateTime?",
  },
  {
    title: "dateRangeAvailabilityInTheFuture",
    type: "DateRangeAvailabilityInTheFuture",
  },
  {
    title: "availableFor",
    type: "Int?",
  },
  {
    title: "scheduleID",
    type: "String?",
  },
  {
    title: "minutesBeforeNextEvent",
    type: "Int",
  },
  {
    title: "minutesAfterPreviousEvent",
    type: "Int",
  },
  {
    title: "maxNumberOfEventsPerDay",
    type: "Int?",
  },
  {
    title: "minNoticeHours",
    type: "Int",
  },
  {
    title: "availabilitySlotsSpacingMinutes",
    type: "Int",
  },
  {
    title: "includeHolidays",
    type: "Boolean",
  },
  {
    title: "schedule",
    type: "Json?",
  },

  // Payment Options
  {
    title: "isPayedEvent",
    type: "Boolean",
  },
  {
    title: "requireOnlinePayment",
    type: "Boolean",
  },
  {
    title: "showPricing",
    type: "Boolean",
  },
  {
    title: "price",
    type: "Int?",
  },
  {
    title: "paymentOptions",
    type: "Json?",
  },

  // Booking Options
  {
    title: "askForName",
    type: "Boolean",
  },
  {
    title: "askForLastName",
    type: "Boolean",
  },
  {
    title: "askForEmail",
    type: "Boolean",
  },
  {
    title: "askForNumber",
    type: "Boolean",
  },
  {
    title: "questions",
    type: "Json?",
  },
  {
    title: "requestUserForConfirmation",
    type: "Boolean",
  },

  // Reminders and notifications
  {
    title: "requestConfirmationHours",
    type: "Int?",
  },
  {
    title: "remindOneDayBefore",
    type: "Boolean",
  },
  {
    title: "remindTwoDaysBefore",
    type: "Boolean",
  },
  {
    title: "remindOneWeekBefore",
    type: "Boolean",
  },
  {
    title: "remindTwoWeekBefore",
    type: "Boolean",
  },
  {
    title: "remindOneMonthBefore",
    type: "Boolean",
  },
  {
    title: "attachments",
    type: "Json?",
  },
];

export default EventDataDebugger;