"use client";
import React from "react";
import { buttonVariants } from "../ui/button";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const Feedback = () => {
  const router = useRouter();
  const { isLoading, mutate } = api.onboard.getFeedback.useMutation({
    onSuccess: ({ workspaceID }) => {
      if (!workspaceID) {
        router.push("/dashboard");
      } else {
        router.push(`/dashboard/w/${workspaceID}/events`);
      }
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
          disabled={isLoading}
          onClick={() => {
            mutate();
          }}
          className={buttonVariants()}
          type="submit"
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Finish"}
        </button>
      </div>
    </div>
  );
};

export default Feedback;
