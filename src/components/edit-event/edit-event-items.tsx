"use client";

import { EditEventWindow } from "@/hooks/useEventData/event-data-context";
import { useEventData } from "@/hooks/useEventData/useEventData";
import {
  BellRing,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  LinkIcon,
  Pen,
  Send,
  Settings,
  Subtitles,
} from "lucide-react";
import EditEventDetails from "./edit-event-details";
import { Button } from "../ui/button";

const EditEventItems = () => {
  const { currentWindow, changeWindow } = useEventData();
  return (
    <div className="relative flex h-screen">
      <div
        className={`absolute left-0 top-0 flex h-screen w-[440px] flex-col border-r bg-white transition-all ${currentWindow !== EditEventWindow.HOME ? "translate-x-[0px]" : "translate-x-[-440px]"}`}
      >
        {/* <EditEventDetails /> */}
      </div>
      <aside className="flex w-[440px] flex-col border-r shadow-lg">
        <div className="space-y-2 border-b px-8 py-4">
          <div className="flex">
            <Button
              variant={"ghost"}
              className="mr-auto gap-2 text-zinc-500 underline"
            >
              <ChevronLeft className="h-4 w-4" /> Go Back
            </Button>
            <Button size={"icon"} variant={"ghost"}>
              <Settings className="h-4 w-4" />
            </Button>
            <Button size={"icon"} variant={"ghost"}>
              <LinkIcon className="h-4 w-4" />
            </Button>
            <Button size={"icon"} variant={"ghost"}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <h1 className="text-3xl font-medium">Edit Event</h1>
        </div>

        <div className="flex-1 overflow-scroll px-4 py-0">
          <div className="flex flex-col">
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
                  <p className="text-zinc-500">
                    Asking for name and contact info
                  </p>
                  <p className="text-zinc-500">
                    5 Questions, 2 optional Questions
                  </p>
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
                  <p className="text-zinc-500">
                    Confirmation request, WhatsApp
                  </p>
                  <p className="text-zinc-500">
                    1 day before, 1 week before, +3 more
                  </p>
                </div>
              </div>
              <div className="ml-auto flex h-9 w-9 items-center justify-center text-zinc-500">
                <ChevronRight className="h-5 w-5" />
              </div>
            </button>
          </div>
        </div>
      </aside>
      <main className="flex-1 bg-zinc-100">Hey</main>
    </div>
  );
};

export default EditEventItems;
