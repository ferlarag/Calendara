"use client";

import { EditEventWindow } from "@/context/event-data-context";
import { useEventData } from "@/context/useEventData";
import {
  BellRing,
  CalendarDays,
  ChevronRight,
  CreditCard,
  Pen,
  Subtitles,
} from "lucide-react";

const EditEventItems = () => {
  const { currentWindow, changeWindow } = useEventData();
  return (
    <>
      <button
        onClick={() => {
          changeWindow(EditEventWindow.EDIT_INFORMATION);
        }}
        className="flex items-center gap-2 border-b py-6 hover:bg-brand-25"
      >
        <div className="flex gap-2">
          <div className="flex h-9 w-9 items-center justify-center text-zinc-500">
            <Pen className="h-5 w-5" />
          </div>
          <div className="flex flex-col items-start gap-1">
            <h3 className="text-2xl font-medium">Event Information</h3>
            <p className="text-zinc-500">30min</p>
            <p className="text-zinc-500">Zoom Meeting</p>
          </div>
        </div>
        <div className="ml-auto flex h-9 w-9 items-center justify-center text-zinc-500">
          <ChevronRight className="h-5 w-5 " />
        </div>
      </button>

      <button
        onClick={() => {
          changeWindow(EditEventWindow.SCHEDULE_SETTINGS);
        }}
        className="flex items-center gap-2 border-b py-6 hover:bg-brand-25"
      >
        <div className="flex gap-2">
          <div className="flex h-9 w-9 items-center justify-center text-zinc-500">
            <CalendarDays className="h-5 w-5" />
          </div>
          <div className="flex flex-col items-start gap-1">
            <h3 className="text-2xl font-medium">Schedule Settings</h3>
            <p className="text-zinc-500">All year, exclude holidays</p>
            <p className="text-zinc-500">Closed Sunday</p>
          </div>
        </div>
        <div className="ml-auto flex h-9 w-9 items-center justify-center text-zinc-500">
          <ChevronRight className="h-5 w-5" />
        </div>
      </button>

      <button
        onClick={() => {
          changeWindow(EditEventWindow.PAYMENT_OPTIONS);
        }}
        className="flex items-center gap-2 border-b py-6 hover:bg-brand-25"
      >
        <div className="flex gap-2">
          <div className="flex h-9 w-9 items-center justify-center text-zinc-500">
            <CreditCard className="h-5 w-5" />
          </div>
          <div className="flex flex-col items-start gap-1">
            <h3 className="text-2xl font-medium">Payment Options</h3>
            <p className="text-zinc-500">Payment is required</p>
            <p className="text-zinc-500">
              Paypal, Bank Transfer, Stripe, +2 more
            </p>
          </div>
        </div>
        <div className="ml-auto flex h-9 w-9 items-center justify-center text-zinc-500">
          <ChevronRight className="h-5 w-5" />
        </div>
      </button>

      <button
        onClick={() => {
          changeWindow(EditEventWindow.BOOKING_OPTIONS);
        }}
        className="flex items-center gap-2 border-b py-6 hover:bg-brand-25"
      >
        <div className="flex gap-2">
          <div className="flex h-9 w-9 items-center justify-center text-zinc-500">
            <Subtitles className="h-5 w-5" />
          </div>
          <div className="flex flex-col items-start gap-1">
            <h3 className="text-2xl font-medium">Booking Options</h3>
            <p className="text-zinc-500">Asking for name and contact info</p>
            <p className="text-zinc-500">5 Questions, 2 optional Questions</p>
          </div>
        </div>
        <div className="ml-auto flex h-9 w-9 items-center justify-center text-zinc-500">
          <ChevronRight className="h-5 w-5" />
        </div>
      </button>

      <button
        onClick={() => {
          changeWindow(EditEventWindow.REMIDNERS);
        }}
        className="flex items-center gap-2 py-6 hover:bg-brand-25"
      >
        <div className="flex gap-2">
          <div className="flex h-9 w-9 items-center justify-center text-zinc-500">
            <BellRing className="h-5 w-5" />
          </div>
          <div className="flex flex-col items-start gap-1">
            <h3 className="text-2xl font-medium">Reminders</h3>
            <p className="text-zinc-500">Confirmation request, WhatsApp</p>
            <p className="text-zinc-500">
              1 day before, 1 week before, +3 more
            </p>
          </div>
        </div>
        <div className="ml-auto flex h-9 w-9 items-center justify-center text-zinc-500">
          <ChevronRight className="h-5 w-5" />
        </div>
      </button>
    </>
  );
};

export default EditEventItems;
