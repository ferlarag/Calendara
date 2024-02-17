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
import { ArrowRight, Loader2 } from "lucide-react";

const WorkspaceInfo = () => {
  const { changeStep } = useOnboarding();

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

  const { isLoading: creating, mutate: createWorkspace } =
    api.onboard.createWorkspace.useMutation({
      onSuccess: () => {
        changeStep(OnboardingStep.CONNECT_CALENDAR);
      },
      onError: ({ data }) => {
        if (data && data.code === "CONFLICT") {
          form.setError("link", {
            message: "Sorry, this url is not available. Plase try another one",
            type: "manual",
          });
          form.setFocus("link");
        }
      },
    });

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-2"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <div className="flex h-[600px] w-full max-w-[500px] flex-col rounded-md border bg-white">
          <div className="flex h-[125px] flex-col  justify-center border-b p-4">
            <h2 className="text-xl font-semibold">Welcome to Calendara!</h2>
            <p className="text-zinc-600">
              We&apos;ll help you get up and running in less than 5 minutes.
            </p>
          </div>

          <div className="flex flex-1 flex-col gap-6 p-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Step 1. Workspace Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Johny's Cakeshop"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    This name will be seen by your Customer and Team Members on
                    invitations, reminders and transactions.
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Step 2. Customize your link</FormLabel>
                  <div className="flex items-center gap-2">
                    <span className="text-md font-medium text-brand-700">
                      calendara.app/
                    </span>
                    <FormControl>
                      <Input
                        placeholder="johnys-cakeshop"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                  <FormDescription>
                    This is where all your events will point to. Is best to keep
                    it short and easy to remember
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="timeZone"
              render={({ field }) => (
                <FormItem className="mt-auto">
                  <FormLabel>Time zone (optional)</FormLabel>
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
        </div>

        <button
          disabled={
            creating || !form.formState.isValid || !form.formState.isDirty
          }
          className={buttonVariants({
            className: "flex items-center gap-2",
          })}
          type="submit"
        >
          {creating ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              Next
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </form>
    </Form>
  );
};

export default WorkspaceInfo;
