import { useOnboarding } from "@/hooks/useOnboarding";
import React from "react";
import { buttonVariants } from "../ui/button";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { OnboardingStep } from "@prisma/client";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ArrowRight, Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ScheduleSchema, defaultState } from "@/types/schedule";
import { Checkbox } from "../ui/checkbox";
import { timePickerOptions } from "@/lib/utils";

const CreateSchedule = () => {
  const { changeStep } = useOnboarding();

  const { mutate: skipStep, isLoading: skipingStep } =
    api.onboard.skipOnboardingStep.useMutation({
      onError: () => {
        toast("An error ocurred. Please try again later");
      },
      onSuccess: () => {
        changeStep(OnboardingStep.FEEDBACK);
      },
    });
  const { mutate: createSchedule, isLoading: creatingSchedule } =
    api.onboard.createFirstSchedule.useMutation({
      onSuccess: () => {
        toast("Successfully created workspace", {
          description: "You can see this later",
          action: {
            label: "Undo",
            onClick: () => {
              console.log("Undo");
            },
          },
        });
        changeStep(OnboardingStep.FEEDBACK);
      },
      onError: () => {
        toast("An error ocurred. Please try again later");
      },
    });

  const form = useForm<z.infer<typeof ScheduleSchema>>({
    resolver: zodResolver(ScheduleSchema),
    defaultValues: {
      ...defaultState,
      name: "Available Hours",
    },
  });

  function handleSubmit(values: z.infer<typeof ScheduleSchema>) {
    createSchedule(values);
  }

  return (
    <Form {...form}>
      <form
        className="mx-auto flex w-full max-w-[500px] flex-col gap-2"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <div className="flex h-[600px] max-w-[500px] flex-col rounded-md border bg-white">
          {/* header */}
          <div className="flex h-[125px] flex-col  justify-center border-b p-4">
            <h2 className="text-xl font-semibold">Set your availability</h2>
            <p className="text-zinc-600">
              Let your customers know when your are available
            </p>
          </div>

          {/* content */}
          <div className="flex flex-1 flex-col gap-6 p-4">
            <div className="flex flex-col gap-2">
              <FormLabel>Available Hours</FormLabel>
              <div className="flex gap-2">
                <FormField
                  control={form.control}
                  name="days.monday.availableHours.opensAt"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger className="font-semibold">
                            <SelectValue placeholder="Select an Item" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {timePickerOptions.map((item) => (
                            <SelectItem key={item} value={item}>
                              {item}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="days.monday.availableHours.endsAt"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger className="font-semibold">
                            <SelectValue placeholder="Select an Item" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {timePickerOptions.map((item) => (
                            <SelectItem key={item} value={item}>
                              {item}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
              {checkDateError(
                form.getValues("days.monday.availableHours.opensAt"),
                form.getValues("days.monday.availableHours.endsAt"),
              ) && <ErrorMessage />}
            </div>

            <div className="flex flex-col gap-2">
              <FormLabel>Available Days</FormLabel>
              <div className="flex flex-wrap justify-center gap-2">
                <FormField
                  control={form.control}
                  name="days.monday.open"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="flex flex-col items-center justify-center gap-2 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        Monday
                      </FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="days.tuesday.open"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="flex flex-col items-center justify-center gap-2 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        Tuesday
                      </FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="days.wednesday.open"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="flex flex-col items-center justify-center gap-2 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        Wednesday
                      </FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="days.thursday.open"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="flex flex-col items-center justify-center gap-2 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        Thursday
                      </FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="days.friday.open"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="flex flex-col items-center justify-center gap-2 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        Friday
                      </FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="days.saturday.open"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="flex flex-col items-center justify-center gap-2 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        Saturday
                      </FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="days.sunday.open"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="flex flex-col items-center justify-center gap-2 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        Sunday
                      </FormLabel>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <p className="mt-auto text-center text-sm text-zinc-400">
              Don&apos;t worry. You can personalize this more later.
            </p>
          </div>
        </div>

        {/* buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => {
              skipStep({ step: "CREATE_SCHEDULE" });
            }}
            disabled={creatingSchedule || skipingStep}
            className={buttonVariants({
              className: "flex flex-1 items-center gap-2",
              variant: "outline",
            })}
          >
            {creatingSchedule ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>Set up later</>
            )}
          </button>

          <button
            disabled={
              creatingSchedule || skipingStep || !form.formState.isValid
            }
            className={buttonVariants({
              className: "flex flex-1 items-center gap-2",
            })}
            type="submit"
          >
            {creatingSchedule ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                Next
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </Form>
  );
};

const ErrorMessage = () => {
  return (
    <p className="text-right text-sm font-medium text-destructive">
      Closing Hour must be after Start Hour
    </p>
  );
};

const checkDateError = (opensAt: string, endsAt: string) => {
  const start = timePickerOptions.indexOf(opensAt);
  const end = timePickerOptions.indexOf(endsAt);
  return end <= start;
};

export default CreateSchedule;
