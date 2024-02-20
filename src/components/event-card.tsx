"use client";

import { type Event, type EventColors } from "@prisma/client";
import Link from "next/link";
import React, { useState } from "react";
import { Button, buttonVariants } from "./ui/button";
import { Clipboard, Settings } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import { cn } from "@/lib/utils";

export const getEventColor = (color: EventColors): string => {
  return EventColorValues[color as keyof typeof EventColorValues] || "#FFFFFF";
};

export enum EventColorValues {
  LIGHT_BLUE_SKY = "#77C8FF",
  GREEN_ELECTRIC = "#B0ED47",
  YELLOW_SUNSHINE = "#FFD920",
  ORANGE_PEACH = "#FEA96C",
  VIOLET_MARKER = "#B59CF7",
  PINK_CANDY = "#FF82EC",
}

export interface CardProps {
  card: Pick<
    Event,
    | "id"
    | "link"
    | "name"
    | "color"
    | "locations"
    | "state"
    | "visibility"
    | "isPayedEvent"
    | "requireOnlinePayment"
    | "price"
    | "workspaceID"
  >;
}

const EventCard = ({ card }: CardProps) => {
  const [selected, setSelected] = useState(false);
  const color = getEventColor(card.color);

  return (
    <div
      className={cn(
        "flex h-[250px] w-full flex-col overflow-hidden rounded-lg border bg-white shadow-md",
        `${selected ? "border-brand-500 ring-2 ring-brand-500" : "ring-0"}`,
      )}
    >
      {/* top */}
      <div className={`bg-[${color}] h-2`} />

      <div className="flex flex-1 flex-col">
        <div className="flex flex-1 flex-col justify-between px-3 pb-5 pt-0.5">
          <div className="flex items-center justify-between">
            <Checkbox
              checked={selected}
              onCheckedChange={() => {
                setSelected((value) => (value ? !value : true));
              }}
            />
            <Link
              href={`/dashboard/e/${card.id}/info?origin=${card.workspaceID}`}
              className={buttonVariants({
                size: "icon",
                variant: "ghost",
              })}
            >
              <Settings className="h-4 w-4" />
            </Link>
          </div>

          <div>
            <h3 className="text-2xl font-medium">{card.name}</h3>
            <div className="flex w-full justify-between">
              <div className="flex flex-1 flex-col gap-1">
                <p>{"Locations"}</p>
                <Link href={"/"}>View Booking Page</Link>
              </div>
              <div className="flex flex-col gap-1">
                <p>{"Paid?"}</p>
                <p>{"Price"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* buttons at the bottom */}
        <div className="flex justify-between border-t p-3">
          <Button variant={"link"} className="gap-2">
            <Clipboard className="h-4 w-4" />
            Copy invitation
          </Button>
          <Button variant={"secondaryColor"}>Share</Button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
