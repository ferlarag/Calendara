"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type Event, EventColors } from "@prisma/client";
import { Button, buttonVariants } from "../ui/button";
import { ChevronLeft, Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { type z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { EventInformationSchema } from "@/types/event";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { useEventData } from "@/hooks/useEventData/useEventData";
import { EditEventWindow } from "@/hooks/useEventData/event-data-context";

interface Props {
  event: Event;
}

const EditEventInformation = ({ event }: Props) => {
  const { changeWindow } = useEventData();

  const { isLoading, mutate: updateEvent } = api.event.updateEvent.useMutation({
    onSuccess: () => {
      // TODO - Refetch the data?
      toast("Event Updated Successfully");
      changeWindow(EditEventWindow.HOME);
    },
    onError: () => {
      toast("An error ocurred");
    },
  });
  const form = useForm<z.infer<typeof EventInformationSchema>>({
    resolver: zodResolver(EventInformationSchema),
    defaultValues: {
      color: event?.color,
      name: event?.name,
      link: event?.link,
      state: event?.state,
      duration: event?.duration,
      visibility: event?.visibility,
      locations: [],
      description: event?.description ? event.description : "",
    },
  });

  function onSubmit(data: z.infer<typeof EventInformationSchema>) {
    if (!form.formState.isDirty) {
      changeWindow(EditEventWindow.HOME);
      return;
    }
    updateEvent({ data, eventID: event.id });
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
              variant={"ghost"}
              className="mr-auto gap-2 text-zinc-500 underline"
            >
              <ChevronLeft className="h-4 w-4" /> Save & Go back
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
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration</FormLabel>
                  <Select
                    value={`${field.value}`}
                    onValueChange={field.onChange}
                  >
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
                </FormItem>
              )}
            />

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
                          defaultValue={field.value}
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
                          defaultValue={field.value}
                          placeholder="Minutes"
                          onChange={field.onChange}
                        />
                        <p className="text-sm text-brand-500">/ Minutes</p>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    defaultValue={field.value}
                    placeholder="Enter a description"
                    onChange={field.onChange}
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
            <button
              className={buttonVariants({
                variant: "secondary",
                className: "ml-auto",
              })}
            >
              Discard changes
            </button>
            <Button
              disabled={!form.formState.isDirty || isLoading}
              type="submit"
              className={`w-[75px]`}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Update"
              )}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default EditEventInformation;
