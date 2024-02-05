import React from "react";
import { Button } from "./ui/button";
import { useEventData } from "@/context/useEventData";
import { EditEventWindow } from "@/context/event-data-context";
import { ChevronLeft } from "lucide-react";
import EditEventInformation from "./edit-event-information";

const EditEventDetails = () => {
  const { changeWindow, currentWindow } = useEventData();
  return (
    <>
      <EditEventInformation />
    </>
  );
};

export default EditEventDetails;
