"use client";

import {
  type EventColors,
  type EventState,
  type EventVisibility,
  type Prisma,
} from "@prisma/client";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Clipboard, Settings } from "lucide-react";
import { Checkbox } from "./ui/checkbox";

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
  card: {
    id: string;
    link: string;
    name: string;
    color: EventColors;
    locations: Prisma.JsonValue;
    state: EventState;
    visibility: EventVisibility;
    isPayedEvent: boolean;
    requireOnlinePayment: boolean;
    price: number | null;
  };
}

const EventCard = ({ card }: CardProps) => {
  const [isSelected, setIsSelected] = useState(false);
  const color = getEventColor(card.color);
  return (
    <div className="h-[250px] w-full rounded-lg border shadow-md">
      {/* top */}
      <div className={`bg-[${color}] h-2`} />

      {/* middle */}
      <div className="flex flex-col justify-between px-3 pb-5 pt-0.5">
        <div className="flex items-center justify-between">
          <Checkbox />
          <Button variant={"ghost"} size={"icon"}>
            <Settings className="h-4 w-4" />
          </Button>
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

      {/* bottom */}
      <div className="flex justify-between p-3">
        <Button className="gap-2">
          <Clipboard className="h-4 w-4" />
          Copy invitation
        </Button>
        <Button variant={"secondaryColor"}>Share</Button>
      </div>
    </div>
  );
};

export default EventCard;