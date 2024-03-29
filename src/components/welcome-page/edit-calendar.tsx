import { useOnboarding } from "@/hooks/useOnboarding";
import React from "react";
import { buttonVariants } from "../ui/button";

const EditCalendar = () => {
  const { changeStep } = useOnboarding();
  return (
    <div className="flex w-full max-w-[500px] flex-col items-center gap-2">
      <div className="flex h-[500px] w-full max-w-[500px] flex-col rounded-md border bg-white p-4">
        Edit Calendar
      </div>
      <div className="flex h-10 w-full items-center justify-end gap-2">
        <div className="mr-auto flex gap-2">
          <div className="h-4 w-4 rounded-full bg-brand-500" />
          <div className="h-4 w-4 rounded-full bg-brand-500" />
          <div className="h-4 w-4 rounded-full bg-brand-500" />
          <div className="h-4 w-4 rounded-full bg-zinc-300" />
          <div className="h-4 w-4 rounded-full bg-zinc-300" />
        </div>
        <button
          onClick={() => {
            changeStep("CREATE_SCHEDULE");
          }}
          className={buttonVariants({ variant: "outline" })}
        >
          Skip
        </button>
        <button className={buttonVariants()} type="submit">
          Next
        </button>
      </div>
    </div>
  );
};

export default EditCalendar;
