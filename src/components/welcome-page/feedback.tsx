"use client";
import React from "react";
import { buttonVariants } from "../ui/button";
import { api } from "@/trpc/react";
import { useOnboarding } from "@/hooks/useOnboarding";

const Feedback = () => {
  const { changeStep } = useOnboarding();
  const { isLoading, mutate: finishOnboarding } =
    api.onboard.getFeedback.useMutation({
      onSuccess: () => {
        changeStep("DONE");
      },
    });
  return (
    <div className="flex w-full max-w-[500px] flex-col items-center gap-2">
      <div className="flex h-[500px] w-full max-w-[500px] flex-col rounded-md border bg-white p-4">
        Feedback form here
      </div>
      <div className="flex h-10 w-full items-center justify-end gap-2">
        <div className="mr-auto flex gap-2">
          <div className="h-4 w-4 rounded-full bg-brand-500" />
          <div className="h-4 w-4 rounded-full bg-brand-500" />
          <div className="h-4 w-4 rounded-full bg-brand-500" />
          <div className="h-4 w-4 rounded-full bg-brand-500" />
          <div className="h-4 w-4 rounded-full bg-brand-500" />
        </div>
        <button
          onClick={() => {
            finishOnboarding();
          }}
          className={buttonVariants()}
          type="submit"
        >
          Finish
        </button>
      </div>
    </div>
  );
};

export default Feedback;
