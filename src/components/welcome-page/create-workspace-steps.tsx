"use client";
import React from "react";
import WorkspaceInfo from "./workspace-info";
import { useOnboarding } from "@/hooks/useOnboarding";
import ConnectCalendar from "./connect-calendar";
import EditCalendar from "./edit-calendar";
import CreateSchedule from "./create-schedule";
import Feedback from "./feedback";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { redirect } from "next/navigation";

const CreateWorspaceCarousel = () => {
  const { step, changeStep } = useOnboarding();
  const { isLoading, error } = api.onboard.getCurrentOnboardingStatus.useQuery(
    undefined,
    {
      onSuccess: (status) => {
        changeStep(status);
      },
    },
  );

  if (error) {
    toast("Something went wrong");
    return (
      <>
        <div>An error ocurred</div>;
      </>
    );
  }

  const markup = () => {
    switch (step) {
      case "CREATE_WORKSPACE":
        return <WorkspaceInfo />;
      case "CONNECT_CALENDAR":
        return <ConnectCalendar />;
      case "EDIT_CALENDAR":
        return <EditCalendar />;
      case "CREATE_SCHEDULE":
        return <CreateSchedule />;
      case "FEEDBACK":
        return <Feedback />;
      case "DONE":
        return redirect("/dashboard");
    }
  };
  return <>{isLoading ? <div>Loading</div> : markup()}</>;
};

export default CreateWorspaceCarousel;
