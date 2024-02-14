"use client";

import { useState, type ReactNode } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEventData } from "@/hooks/useEventData/useEventData";
import { Button } from "./ui/button";
import { FileText } from "lucide-react";

const EventDataDebugger = () => {
  const [open, setOpen] = useState(false);
  const { event } = useEventData();

  return (
    <>
      <Button
        onClick={() => {
          setOpen((prev) => (prev ? !prev : true));
        }}
        className="fixed bottom-2 right-2 z-50 w-[175px] gap-2 p-4"
      >
        <FileText />
        Event Data
      </Button>
      {open && (
        <div className="fixed right-2 top-2 z-20 flex w-[70vw] flex-col rounded-md border border-white/15 bg-black/90 backdrop-blur-md">
          <div className=" border-b border-white/15 px-4 py-2 text-zinc-100">
            <div className="flex items-center justify-between">
              <h2 className="font-mono text-xl ">useEventData</h2>
              <p className="font-mono text-xl">Current Data</p>
            </div>
            <div className="flex w-full gap-2 pt-3 text-zinc-300">
              <p className="flex-1 truncate font-mono">Key</p>
              <div className="flex flex-1">
                <p className="flex-1 truncate font-mono">Type</p>
                <p className="flex-1 break-all font-mono">Value</p>
              </div>
            </div>
          </div>
          <div className="max-h-[calc(100vh-100px)] overflow-scroll px-4 py-2">
            <ul>
              {Object.entries(event).map(([key, value]) => (
                <li
                  className="flex w-full gap-2 border-b border-zinc-600 py-3"
                  key={key}
                >
                  <p className="flex-1 truncate font-mono text-blue-400">
                    {key}
                  </p>
                  <div className="flex flex-1">
                    <p className="flex-1 truncate font-mono text-zinc-600">
                      {typeof value}
                    </p>
                    <p className="flex-1 break-all font-mono text-zinc-300">
                      {JSON.stringify(value)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default EventDataDebugger;
