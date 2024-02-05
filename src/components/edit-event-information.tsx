import { useEventData } from "@/context/useEventData";
import React from "react";
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

const EditEventInformation = () => {
  const {
    eventInformation,
    changeEventColor,
    changeWindow,
    currentWindow,
    changeName,
    changeEventLink,
    changeDescription,
  } = useEventData();

  const formSchema = z.object({
    color: z.string(),
    name: z.string(),
    link: z.string(),
    duration: z.number(),
    description: z.string().optional(),
    locations: z.array(
      z.object({
        id: z.string(),
        type: z.enum(["zoom", "phone", "googleMeets", "inPerson"]),
        location: z.string(),
        phoneCountryCode: z.string(),
        phoneNumber: z.string(),
        instructions: z.string(),
      }),
    ),
  });

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
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          onValueChange={(color) => {
                            field.onChange(color);
                            changeEventColor(color as EventColors);
                          }}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-[75px]">
                              <SelectValue placeholder="Select a color" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Object.entries(EventColors).map(([key, value]) => (
                              <SelectItem key={key} value={key}>
                                {value}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  <FormControl>
                    <Input
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
                    placeholder="your-link"
                    onChange={(event) => {
                      field.onChange(event);
                      changeEventLink(event.target.value);
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
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
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
