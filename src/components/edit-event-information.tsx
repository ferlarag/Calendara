import { useEventData } from "@/context/useEventData";
import React, { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EventColors } from "@prisma/client";
import { Button } from "./ui/button";
import { EditEventWindow } from "@/context/event-data-context";
import { ChevronLeft } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const EditEventInformation = () => {
  const {
    eventInformation,
    changeEventColor,
    changeWindow,
    currentWindow,
    changeName,
    changeEventLink,
    changeDuration,
    changeDescription,
  } = useEventData();

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
    duration: z.string(),
    description: z.string(),
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
      color: eventInformation.color,
      description: eventInformation.description,
      name: eventInformation.name,
      link: eventInformation.link,
      duration: eventInformation.duration,
      locations: eventInformation.locations,
    },
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
                      defaultValue={eventInformation.name}
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
                    defaultValue={eventInformation.link}
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
                  https://calendara.app/your_business/{eventInformation.link}
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
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    changeDuration(value);
                  }}
                  value={field.value}
                  defaultValue={eventInformation.duration}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a duration" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="5">5 minutes</SelectItem>
                    <SelectItem value="10">10 minutes</SelectItem>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="20">20 minutes</SelectItem>
                    <SelectItem value="25">25 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
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
                    defaultValue={eventInformation.description}
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

export default EditEventInformation;
