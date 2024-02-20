"use client";
import { EventInformationSchema } from "@/types/event";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { type Event, EventColors } from "@prisma/client";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { type inferProcedureOutput } from "@trpc/server";
import { type AppRouter } from "@/server/api/root";
import { type QueryObserverResult } from "@tanstack/react-query";
import { type TRPCClientErrorLike } from "@trpc/client";

export type EventData = inferProcedureOutput<
  AppRouter["event"]["getEventData"]
>;
export type RefetchEventFunction = () => Promise<
  QueryObserverResult<EventData, TRPCClientErrorLike<AppRouter>>
>;

interface Props {
  event: Event;
  refetchEvent?: RefetchEventFunction;
}

type DurationOptions = "10" | "15" | "30" | "45" | "60" | "custom";

const Info = ({ event }: Props) => {
  // TODO: match the current event duration witht the duration picker
  const [duration, setDuration] = useState<DurationOptions>("30");

  const form = useForm<z.infer<typeof EventInformationSchema>>({
    resolver: zodResolver(EventInformationSchema),
    defaultValues: {
      color: event.color,
      description: event.description ? event.description : "",
      duration: event.duration,
      link: event.link,
      locations: [],
      name: event.name,
      state: event.state,
      visibility: event.visibility,
    },
  });

  const { mutate: updateEvent, isLoading } = api.event.updateEvent.useMutation({
    onSuccess: async ({ updatedEvent: data }) => {
      toast("Event succesfully updated", {
        action: {
          label: "Undo",
          onClick: () => {
            console.log("Undo");
          },
        },
      });

      form.reset({
        color: data.color,
        name: data.name,
        link: data.link,
        description: data.description ? data.description : "",
        duration: data.duration,
        state: data.state,
        visibility: data.visibility,
        locations: [],
      });
    },
  });

  function handleFormSubmit(values: z.infer<typeof EventInformationSchema>) {
    updateEvent({ data: values, eventID: event.id });
  }

  function handleDurationChange(newValue: DurationOptions) {
    setDuration(newValue);
    if (newValue !== "custom") {
      form.setValue("duration", parseInt(newValue), {
        shouldValidate: true,
        shouldTouch: true,
        shouldDirty: true,
      });
      return;
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-medium">Event Information</h1>
      <Form {...form}>
        <form
          className="flex max-w-[500px] flex-col-reverse gap-2 md:flex-col"
          onSubmit={form.handleSubmit(handleFormSubmit)}
        >
          <div className="flex w-full gap-2">
            <button
              disabled={!form.formState.isDirty || isLoading}
              type="submit"
              className={buttonVariants({
                className: "w-full md:ml-auto md:w-[100px]",
              })}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Update"
              )}
            </button>
          </div>

          {/* form goes here */}
          <div className="flex flex-1 flex-col gap-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event name</FormLabel>
                  <div className="flex gap-2">
                    <FormField
                      control={form.control}
                      name="color"
                      render={({ field: selectField }) => (
                        <FormItem>
                          <Select
                            onValueChange={selectField.onChange}
                            value={selectField.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-[65px]">
                                <SelectValue placeholder="Select a color" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value={EventColors.LIGHT_BLUE_SKY}>
                                <div className="h-5 w-5 rounded-full bg-[#77C8FF]" />
                              </SelectItem>
                              <SelectItem value={EventColors.GREEN_ELECTRIC}>
                                <div className="h-5 w-5 rounded-full bg-[#B0ED47]" />
                              </SelectItem>
                              <SelectItem value={EventColors.YELLOW_SUNSHINE}>
                                <div className="h-5 w-5 rounded-full bg-[#FFD920]" />
                              </SelectItem>
                              <SelectItem value={EventColors.ORANGE_PEACH}>
                                <div className="h-5 w-5 rounded-full bg-[#FEA96C]" />
                              </SelectItem>
                              <SelectItem value={EventColors.VIOLET_MARKER}>
                                <div className="h-5 w-5 rounded-full bg-[#B59CF7]" />
                              </SelectItem>
                              <SelectItem value={EventColors.PINK_CANDY}>
                                <div className="h-5 w-5 rounded-full bg-[#FF82EC]" />
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                    <FormControl>
                      <Input
                        defaultValue={field.value}
                        placeholder="My awesome event"
                        onChange={field.onChange}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event link</FormLabel>
                  <FormControl>
                    <Input
                      defaultValue={field.value}
                      placeholder="your-link"
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription>
                    https://calendara.app/your_business/{field.value}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-2">
              {/* Select duration */}

              <FormItem>
                <FormLabel>Duration</FormLabel>
                <Select value={duration} onValueChange={handleDurationChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="15">15 mins</SelectItem>
                    <SelectItem value="30">30 mins</SelectItem>
                    <SelectItem value="45">45 mins</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>

              {/* Custom Duration */}
              {duration === "custom" && (
                <div className="flex gap-2">
                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex items-center gap-2">
                            <Input
                              className="w-[100px] text-right"
                              type="number"
                              value={field.value}
                              placeholder="Hours"
                              onChange={field.onChange}
                            />
                            <p className="text-sm text-brand-500">/ Hours</p>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex items-center gap-2">
                            <Input
                              className="w-[100px] text-right"
                              type="number"
                              placeholder="Minutes"
                              onChange={field.onChange}
                              value={field.value}
                            />
                            <p className="text-sm text-brand-500">/ Minutes</p>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter a description"
                      onChange={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                  <FormDescription>
                    This will appear in your product page.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Info;
