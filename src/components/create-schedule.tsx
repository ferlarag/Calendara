"use client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import React, { useState } from "react";
import { Button, buttonVariants } from "./ui/button";
import { api } from "@/trpc/react";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { ScheduleSchema, defaultState } from "@/types/schedule";
import { timePickerOptions } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Switch } from "./ui/switch";
import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const CreateScheduleModal = () => {
  const [open, setOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const params = useParams<{ workspaceID: string }>();

  const { mutate, isLoading } = api.schedule.createSchedule.useMutation({
    onSuccess: () => {
      setOpen(false);
      setCreating(false);
      toast("Schedule Succesfully Created");
    },
    onError: () => {
      toast("An error ocurred");
    },
  });

  const form = useForm<z.infer<typeof ScheduleSchema>>({
    resolver: zodResolver(ScheduleSchema),
    defaultValues: {
      ...defaultState,
    },
  });

  function handleFormSubmit(values: z.infer<typeof ScheduleSchema>) {
    mutate({ workspaceID: params.workspaceID, schedule: values });
  }

  return (
    <AlertDialog onOpenChange={setOpen} open={open}>
      <AlertDialogTrigger asChild>
        <Button className={buttonVariants()}>Create Schedule</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create Schedule</AlertDialogTitle>
        </AlertDialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Schedule Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="i.e 'Working Hours', 'July 2024 Schedule'"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    This name will be used by your team to identify this
                    Schedule
                  </FormDescription>
                </FormItem>
              )}
            />

            <div className="flex max-h-[400px] flex-col gap-2 overflow-y-scroll ">
              {/* monday */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2">
                  <FormField
                    control={form.control}
                    name="days.monday.open"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center gap-2">
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel>Monday</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                  <div className="flex items-center gap-2">
                    <FormField
                      control={form.control}
                      name="days.monday.availableHours.opensAt"
                      render={({ field }) => (
                        <FormItem>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <FormControl>
                              <SelectTrigger
                                disabled={!form.getValues("days.monday.open")}
                              >
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
                    <span className="text-xl font-medium">:</span>
                    <FormField
                      control={form.control}
                      name="days.monday.availableHours.endsAt"
                      render={({ field }) => (
                        <FormItem>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <FormControl>
                              <SelectTrigger
                                disabled={!form.getValues("days.monday.open")}
                              >
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
                </div>
                {checkDateError(
                  form.getValues("days.monday.availableHours.opensAt"),
                  form.getValues("days.monday.availableHours.endsAt"),
                ) && <ErrorMessage />}
              </div>

              {/* tuesday */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2">
                  <FormField
                    control={form.control}
                    name="days.tuesday.open"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center gap-2">
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel>Tuesday</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                  <div className="flex items-center gap-2">
                    <FormField
                      control={form.control}
                      name="days.tuesday.availableHours.opensAt"
                      render={({ field }) => (
                        <FormItem>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <FormControl>
                              <SelectTrigger
                                disabled={!form.getValues("days.tuesday.open")}
                              >
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
                    <span className="text-xl font-medium">:</span>
                    <FormField
                      control={form.control}
                      name="days.tuesday.availableHours.endsAt"
                      render={({ field }) => (
                        <FormItem>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <FormControl>
                              <SelectTrigger
                                disabled={!form.getValues("days.tuesday.open")}
                              >
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
                </div>
                {checkDateError(
                  form.getValues("days.tuesday.availableHours.opensAt"),
                  form.getValues("days.tuesday.availableHours.endsAt"),
                ) && <ErrorMessage />}
              </div>

              {/* wednesday */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2">
                  <FormField
                    control={form.control}
                    name="days.wednesday.open"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center gap-2">
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel>Wednesday</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                  <div className="flex items-center gap-2">
                    <FormField
                      control={form.control}
                      name="days.wednesday.availableHours.opensAt"
                      render={({ field }) => (
                        <FormItem>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <FormControl>
                              <SelectTrigger
                                disabled={
                                  !form.getValues("days.wednesday.open")
                                }
                              >
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
                    <span className="text-xl font-medium">:</span>
                    <FormField
                      control={form.control}
                      name="days.wednesday.availableHours.endsAt"
                      render={({ field }) => (
                        <FormItem>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <FormControl>
                              <SelectTrigger
                                disabled={
                                  !form.getValues("days.wednesday.open")
                                }
                              >
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
                </div>
                {checkDateError(
                  form.getValues("days.wednesday.availableHours.opensAt"),
                  form.getValues("days.wednesday.availableHours.endsAt"),
                ) && <ErrorMessage />}
              </div>

              {/* thursday */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2">
                  <FormField
                    control={form.control}
                    name="days.thursday.open"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center gap-2">
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel>Thursday</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                  <div className="flex items-center gap-2">
                    <FormField
                      control={form.control}
                      name="days.thursday.availableHours.opensAt"
                      render={({ field }) => (
                        <FormItem>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <FormControl>
                              <SelectTrigger
                                disabled={!form.getValues("days.thursday.open")}
                              >
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
                    <span className="text-xl font-medium">:</span>
                    <FormField
                      control={form.control}
                      name="days.thursday.availableHours.endsAt"
                      render={({ field }) => (
                        <FormItem>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <FormControl>
                              <SelectTrigger
                                disabled={!form.getValues("days.thursday.open")}
                              >
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
                </div>
                {checkDateError(
                  form.getValues("days.thursday.availableHours.opensAt"),
                  form.getValues("days.thursday.availableHours.endsAt"),
                ) && <ErrorMessage />}
              </div>

              {/* friday */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2">
                  <FormField
                    control={form.control}
                    name="days.friday.open"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center gap-2">
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel>Friday</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                  <div className="flex items-center gap-2">
                    <FormField
                      control={form.control}
                      name="days.friday.availableHours.opensAt"
                      render={({ field }) => (
                        <FormItem>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <FormControl>
                              <SelectTrigger
                                disabled={!form.getValues("days.friday.open")}
                              >
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
                    <span className="text-xl font-medium">:</span>
                    <FormField
                      control={form.control}
                      name="days.friday.availableHours.endsAt"
                      render={({ field }) => (
                        <FormItem>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <FormControl>
                              <SelectTrigger
                                disabled={!form.getValues("days.friday.open")}
                              >
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
                </div>
                {checkDateError(
                  form.getValues("days.friday.availableHours.opensAt"),
                  form.getValues("days.friday.availableHours.endsAt"),
                ) && <ErrorMessage />}
              </div>

              {/* saturday */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2">
                  <FormField
                    control={form.control}
                    name="days.saturday.open"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center gap-2">
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel>Saturday</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                  <div className="flex items-center gap-2">
                    <FormField
                      control={form.control}
                      name="days.saturday.availableHours.opensAt"
                      render={({ field }) => (
                        <FormItem>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <FormControl>
                              <SelectTrigger
                                disabled={!form.getValues("days.saturday.open")}
                              >
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
                    <span className="text-xl font-medium">:</span>
                    <FormField
                      control={form.control}
                      name="days.saturday.availableHours.endsAt"
                      render={({ field }) => (
                        <FormItem>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <FormControl>
                              <SelectTrigger
                                disabled={!form.getValues("days.saturday.open")}
                              >
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
                </div>
                {checkDateError(
                  form.getValues("days.saturday.availableHours.opensAt"),
                  form.getValues("days.saturday.availableHours.endsAt"),
                ) && <ErrorMessage />}
              </div>

              {/* sunday */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2">
                  <FormField
                    control={form.control}
                    name="days.sunday.open"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center gap-2">
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel>Sunday</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                  <div className="flex items-center gap-2">
                    <FormField
                      control={form.control}
                      name="days.sunday.availableHours.opensAt"
                      render={({ field }) => (
                        <FormItem>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <FormControl>
                              <SelectTrigger
                                disabled={!form.getValues("days.sunday.open")}
                              >
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
                    <span className="text-xl font-medium">:</span>
                    <FormField
                      control={form.control}
                      name="days.sunday.availableHours.endsAt"
                      render={({ field }) => (
                        <FormItem>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <FormControl>
                              <SelectTrigger
                                disabled={!form.getValues("days.sunday.open")}
                              >
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
                </div>
                {checkDateError(
                  form.getValues("days.sunday.availableHours.opensAt"),
                  form.getValues("days.sunday.availableHours.endsAt"),
                ) && <ErrorMessage />}
              </div>
            </div>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button
                type="submit"
                className="gap-2 sm:w-[150px]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Create Schedule"
                )}
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
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

export default CreateScheduleModal;
