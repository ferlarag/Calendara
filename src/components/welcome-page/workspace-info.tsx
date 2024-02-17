import { WorkspaceSchema, initialState } from "@/types/workspace";
import React from "react";
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
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { buttonVariants } from "../ui/button";
import { api } from "@/trpc/react";
import { useOnboarding } from "@/hooks/useOnboarding";
import { OnboardingStep } from "@prisma/client";

const WorkspaceInfo = () => {
  const { step, changeStep } = useOnboarding();

  const { isLoading, mutate: createWorkspace } =
    api.onboard.createWorkspace.useMutation({
      onSuccess: () => {
        changeStep(OnboardingStep.CONNECT_CALENDAR);
      },
    });

  const form = useForm<z.infer<typeof WorkspaceSchema>>({
    resolver: zodResolver(WorkspaceSchema),
    defaultValues: {
      ...initialState,
      timeZone: "America/El_Salvador",
    },
  });

  function handleSubmit(values: z.infer<typeof WorkspaceSchema>) {
    createWorkspace({ workspaceData: values });
  }
  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-2"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <div className="flex h-[500px] w-full max-w-[500px] flex-col rounded-md border bg-white p-4">
          <h2 className="text-xl font-semibold">Welcome to Calendara!</h2>
          <p className="text-zinc-600">
            Lets start by giving your business a name
          </p>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Johny's Cakeshop"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="link"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Create your url</FormLabel>
                <FormDescription>
                  This is where all your events will point to. It must be unique
                  per business. Make it short and easy to rember
                </FormDescription>
                <div className="flex items-center gap-2">
                  <span className="font-medium">calendara.app/</span>
                  <FormControl>
                    <Input
                      placeholder="johnys-cakeshop"
                      value={field.value}
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
            name="timeZone"
            render={({ field }) => (
              <FormItem className="mt-auto">
                <FormLabel>Time zone</FormLabel>
                <Select>
                  <FormControl>
                    <SelectTrigger
                      onChange={field.onChange}
                      value={field.value}
                    >
                      <SelectValue placeholder="Pick a timezone" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="America/El_Salvador">
                      El Salvador
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>

        <div className="flex h-10 w-full items-center justify-end gap-2">
          <div className="mr-auto flex gap-2">
            <div className="h-4 w-4 rounded-full bg-brand-500" />
            <div className="h-4 w-4 rounded-full bg-zinc-300" />
            <div className="h-4 w-4 rounded-full bg-zinc-300" />
            <div className="h-4 w-4 rounded-full bg-zinc-300" />
            <div className="h-4 w-4 rounded-full bg-zinc-300" />
          </div>
          <button className={buttonVariants()} type="submit">
            Next
          </button>
        </div>
      </form>
    </Form>
  );
};

export default WorkspaceInfo;
