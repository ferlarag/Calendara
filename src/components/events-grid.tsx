"use client";

import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { Loader2 } from "lucide-react";
import EventCard from "./event-card";

interface Props {
  className?: string;
}

const EventsGrid = ({ className }: Props) => {
  const { data, isLoading, error } = api.event.getMostRecentEvents.useQuery({
    skip: 0,
  });
  return (
    <div className={cn(className, "grid w-full grid-cols-3")}>
      {isLoading ? (
        <div className="fle-col col-span-3 flex items-center justify-center">
          <Loader2 className="animate-spin" />
        </div>
      ) : error ? (
        <div className="fle-col col-span-3 flex items-center justify-center">
          <p>An error ocurred!</p>
        </div>
      ) : data && data.length > 0 ? (
        <>
          {data.map((card) => (
            <EventCard key={card.id} card={card} />
          ))}
        </>
      ) : (
        <div className="fle-col col-span-3 flex items-center justify-center">
          <p>Empty</p>
        </div>
      )}
    </div>
  );
};

export default EventsGrid;
