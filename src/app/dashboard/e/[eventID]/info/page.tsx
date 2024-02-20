"use client";
import Info from "@/components/edit-event/info";
import { api } from "@/trpc/react";
import { useParams } from "next/navigation";

const Page = () => {
  const { eventID } = useParams<{ eventID: string }>();
  const {
    data: event,
    isLoading,
    error,
  } = api.event.getEventData.useQuery(
    {
      eventID,
    },
    { refetchOnWindowFocus: false },
  );

  if (isLoading) return <div>Laoding</div>;

  if (error)
    return (
      <div>Whoops. It looks like you dont have access to this workspace </div>
    );

  if (!event) return <div>An error ocurred</div>;

  return <Info event={event} />;
};

export default Page;
