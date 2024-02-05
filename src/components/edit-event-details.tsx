import React from "react";
import { Button } from "./ui/button";
import { useEventData } from "@/context/useEventData";
import { EditEventWindow } from "@/context/event-data-context";
import { ChevronLeft } from "lucide-react";

const EditEventDetails = () => {
  const { changeWindow, currentWindow } = useEventData();
  return (
    <>
      <div className="space-y-2 border-b px-8 py-4">
        <div className="flex">
          <Button
            onClick={() => {
              changeWindow(EditEventWindow.HOME);
            }}
            variant={"ghost"}
            className="mr-auto gap-2 text-zinc-500 underline"
          >
            <ChevronLeft className="h-4 w-4" /> Go Back
          </Button>
        </div>
        <h1 className="text-3xl font-medium">{currentWindow}</h1>
      </div>

      <div className="flex-1 overflow-scroll px-4 py-0">
        <div className="flex flex-col">Content here</div>
      </div>

      <div className="space-y-2 border-t px-8 py-4">
        <div className="flex w-full gap-2">
          <Button
            variant={"ghost"}
            className="ml-auto gap-2 text-zinc-500 underline"
          >
            <ChevronLeft className="h-4 w-4" /> Cancel
          </Button>
          <Button className={`w-[75px]`}>Save</Button>
        </div>
      </div>
    </>
  );
};

export default EditEventDetails;
