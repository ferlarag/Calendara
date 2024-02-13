"use client";

import { useEventData } from "@/hooks/useEventData/useEventData";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EventColors } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { EditEventWindow } from "@/hooks/useEventData/event-data-context";
import { ChevronDown, ChevronLeft, ZoomIn } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { type ReactNode } from "react";
import { z } from "zod";

interface Props {
  children: ReactNode;
}
const Layout = ({ children }: Props) => {
  const router = useRouter();

  const {
    changeWindow,
    event,
    changeEventColor,
    changeName,
    changeEventLink,
    changeDuration,
    changeDescription,
  } = useEventData();

  // API Endpoints
  const {
    isSuccess,
    isLoading,
    mutate: createNewEvent,
  } = api.event.createEvent.useMutation({
    onMutate: () => {
      console.log("Mutating");
    },
    onSuccess: ({ eventID }) => {
      changeWindow(EditEventWindow.HOME);
      router.push(`/edit/${eventID}`);
    },
  });

  const formSchema = z.object({
    color: z.string(),
    name: z.string(),
    link: z
      .string()
      .min(3, { message: "The link must be at least 3 characters long" })
      .trim()
      .regex(
        /^[a-z0-9-]+$/,
        "The custom URL must only contain lowercase letters, numbers, and hyphens",
      )
      .transform((str) => str.toLowerCase().replace(/\s+/g, "-")),
    duration: z.string().transform((value) => parseInt(value)),
    description: z.string().optional(),
    locations: z.array(
      z.object({
        id: z.string(),
        type: z.enum(["zoom", "phone", "googleMeets", "inPerson"]),
        location: z.string().optional(),
        phoneCountryCode: z.string().optional(),
        phoneNumber: z.string().optional(),
        instructions: z.string().optional(),
      }),
    ),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      color: event.color,
      description: event.description,
      name: event.name,
      link: event.link,
      duration: event.duration,
      // locations: event.locations,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createNewEvent({
      color: event.color,
      description: event.description,
      link: event.link,
      name: event.name,
      state: event.state,
      duration: event.duration,
      locations: event.locations,
      visibility: event.visibility,
    });
  }

  return (
    <div className="relative flex h-screen">
      <aside className="flex w-[440px] flex-col border-r shadow-lg">
        <Form {...form}>
          <form
            className="flex h-full flex-col"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="space-y-2 border-b px-8 py-4">
              <div className="flex">
                <Button
                  onClick={() => {
                    router.push("/dashboard");
                  }}
                  variant={"ghost"}
                  className="mr-auto gap-2 text-zinc-500 underline"
                >
                  <ChevronLeft className="h-4 w-4" /> Cancel
                </Button>
              </div>
              <h1 className="text-3xl font-medium">Create Event</h1>
            </div>

            {/* form goes here */}
            <div className="flex flex-1 flex-col gap-5 overflow-scroll p-8">
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
                              onValueChange={(color) => {
                                selectField.onChange(color);
                                changeEventColor(color as EventColors);
                              }}
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
                          defaultValue={event.name}
                          placeholder="My awesome event"
                          onChange={(e) => {
                            field.onChange(e);
                            changeName(e.target.value);
                          }}
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
                        defaultValue={event.link}
                        placeholder="your-link"
                        onChange={(event) => {
                          const transformedValue = event.target.value
                            .toLowerCase()
                            .replace(/\s+/g, "-");
                          field.onChange(transformedValue);
                          form.setValue("link", transformedValue, {
                            shouldValidate: true,
                          });
                          changeEventLink(transformedValue);
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      https://calendara.app/your_business/{event.link}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <Input
                          className="w-[100px] text-right"
                          type="number"
                          defaultValue={event.duration}
                          placeholder="Enter a duration"
                          onChange={(event) => {
                            const value = event.target.valueAsNumber;
                            field.onChange(event);
                            changeDuration(value);
                            console.log(value);
                          }}
                        />
                        <p className="text-brand-500">Minutes</p>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        defaultValue={event.description}
                        placeholder="Enter a description"
                        onChange={(event) => {
                          field.onChange(event);
                          changeDescription(event.target.value);
                        }}
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

            <div className="space-y-2 border-t px-8 py-4">
              <div className="flex w-full gap-2">
                <Button variant={"secondary"} className="ml-auto">
                  Save as draft
                </Button>
                <Button type="submit" className={`w-[75px]`}>
                  Save
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </aside>
      <main className="flex-1 bg-zinc-100">{children}</main>
    </div>
  );
};

export default Layout;
