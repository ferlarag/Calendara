"use client";

import EditEventDetails from "@/components/edit-event-details";
import EditEventItems from "@/components/edit-event-items";
import { Button } from "@/components/ui/button";
import { EditEventWindow } from "@/context/event-data-context";
import { useEventData } from "@/context/useEventData";
import { api } from "@/trpc/react";
import {
  Check,
  ChevronLeft,
  Link as LinkIcon,
  Loader2,
  Send,
  Settings,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { type ReactNode } from "react";

interface Props {
  children: ReactNode;
}
const Layout = ({ children }: Props) => {
  const router = useRouter();
  const { currentWindow, changeWindow } = useEventData();

  // Events
  const handleClick = () => {
    createNewEvent();
  };

  // API Endpoints
  const {
    isSuccess,
    isLoading,
    mutate: createNewEvent,
  } = api.event.createEvent.useMutation({
    onMutate: () => {
      console.log("Mutating");
    },
    onSuccess: () => {
      router.push("/dashboard/events");
    },
  });

  return (
    <div className="relative flex h-screen">
      <div
        className={`absolute left-0 top-0 flex h-screen w-[440px] flex-col border-r bg-white transition-all ${currentWindow !== EditEventWindow.HOME ? "translate-x-[0px]" : "translate-x-[-440px]"}`}
      >
        <EditEventDetails />
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
            <EditEventItems />
          </div>
        </div>

        <div className="space-y-2 border-t px-8 py-4">
          <div className="flex w-full gap-2">
            <Button
              variant={"ghost"}
              className="ml-auto gap-2 text-zinc-500 underline"
            >
              <ChevronLeft className="h-4 w-4" /> Cancel
            </Button>
            <Button
              disabled={isLoading}
              className={`w-[75px] ${isSuccess ? "bg-green-500" : ""}`}
              onClick={handleClick}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : isSuccess ? (
                <Check className="h-4 w-4 " />
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </div>
      </aside>
      <main className="flex-1 bg-zinc-100">{children}</main>
    </div>
  );
};

export default Layout;
