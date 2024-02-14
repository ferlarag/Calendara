"use client";
import WorkspaceCard from "@/components/workspace-card";
import { api } from "@/trpc/react";
import { redirect } from "next/navigation";
import React from "react";

const Page = () => {
  const { data, error, isLoading } =
    api.workspace.availableBusinesses.useQuery();

  if (!data || error) redirect("/dashboard/create-business");

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div className="grid grid-cols-3">
      {data.map((workspace) => (
        <WorkspaceCard workspace={workspace} key={workspace.id} />
      ))}
    </div>
  );
};

export default Page;
