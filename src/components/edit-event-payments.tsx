import { useEventData } from "@/context/useEventData";
import React from "react";
import { Button } from "./ui/button";
import { EditEventWindow } from "@/context/event-data-context";
import { ChevronLeft } from "lucide-react";
import { Form } from "./ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const EditEventPayments = () => {
  const { eventPayments, changeWindow, currentWindow } = useEventData();

  const formSchema = z.object({});

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        className="flex h-full flex-col"
        onSubmit={form.handleSubmit(onSubmit)}
      >
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

        {/* form goes here */}
        <div className="flex flex-1 flex-col gap-5 overflow-scroll p-8">
          Form fields here
        </div>

        <div className="space-y-2 border-t px-8 py-4">
          <div className="flex w-full gap-2">
            <Button
              variant={"ghost"}
              className="ml-auto gap-2 text-zinc-500 underline"
            >
              <ChevronLeft className="h-4 w-4" /> Cancel
            </Button>
            <Button type="submit" className={`w-[75px]`}>
              Save
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default EditEventPayments;
