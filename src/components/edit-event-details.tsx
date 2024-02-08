import React from "react";
import { useEventData } from "@/context/useEventData";
import { EditEventWindow } from "@/context/event-data-context";
import EditEventInformation from "./edit-event-information";
import EditEventSchedule from "./edit-event-schedule";
import EditEventPayments from "./edit-event-payments";
import EditEventBookingOptions from "./edit-event-booking-options";
import EditEventReminders from "./edit-event-reminders";

const EditEventDetails = () => {
  const { currentWindow } = useEventData();

  const returnWindow = () => {
    switch (currentWindow) {
      case EditEventWindow.EDIT_INFORMATION:
        return <EditEventInformation />;
      case EditEventWindow.SCHEDULE_SETTINGS:
        return <EditEventSchedule />;
      case EditEventWindow.PAYMENT_OPTIONS:
        return <EditEventPayments />;
      case EditEventWindow.BOOKING_OPTIONS:
        return <EditEventBookingOptions />;
      case EditEventWindow.REMIDNERS:
        return <EditEventReminders />;
    }
  };
  return <>{returnWindow()}</>;
};

export default EditEventDetails;
