"use client";
import { api } from "@/trpc/react";
import { WorkspaceSchema, initialState } from "@/types/workspace";
import { useRouter } from "next/navigation";
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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Page = () => {
  const router = useRouter();

  const { mutate: createWorkspace } = api.workspace.creteWorkspace.useMutation({
    onError: () => {
      return "Woops";
    },
    onSuccess: (data) => {
      if (!data) return;
      const { newWorkspaceID } = data;
      router.push(`/dashboard/w/${newWorkspaceID}/events`);
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
    const { link, name, timeZone } = values;
    createWorkspace({ name, link, timeZone });
  }

  return (
    <div className="flex h-screen items-center justify-center bg-zinc-100">
      <Form {...form}>
        <form
          className="max- flex w-[500px] flex-col gap-4 rounded-lg border bg-white p-8"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <h1 className="text-3xl font-medium">Create your business</h1>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    onChange={field.onChange}
                    value={field.value}
                    placeholder="Your business / name"
                    className=""
                  />
                </FormControl>
                <FormMessage />
                <FormDescription>
                  This name will be seen by Clients and Team Members
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="link"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Link</FormLabel>
                <FormControl>
                  <Input
                    onChange={field.onChange}
                    value={field.value}
                    placeholder="my-awesome-business"
                    className=""
                  />
                </FormControl>
                <FormMessage />
                <FormDescription>
                  https://www.calendara.app/{field.value}
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="timeZone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Timezone</FormLabel>
                <FormControl>
                  <Input onChange={field.onChange} value={field.value} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit">Next</Button>
        </form>
      </Form>
    </div>
  );
};

export default Page;
