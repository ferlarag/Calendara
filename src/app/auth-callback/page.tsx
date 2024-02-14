"use client";
import { api } from "@/trpc/react";
import { redirect } from "next/navigation";

const Page = () => {
  const { data, error, isLoading } = api.user.validateUser.useMutation();
  if (!data?.success || error) redirect("/");

  if (isLoading) {
    <div>Loading</div>;
  }

  redirect("/dashboard");
};

export default Page;
