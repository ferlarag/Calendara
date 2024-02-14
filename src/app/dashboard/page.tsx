"use client";
import WorkspaceCard from "@/components/workspace-card";
import { api } from "@/trpc/react";
import { redirect } from "next/navigation";
import React from "react";

const Page = () => {
  const { data, error, isLoading } =
    api.workspace.availableBusinesses.useQuery();

  if (error) redirect("/");

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div className="grid grid-cols-3">
      {data ? (
        data.map((workspace) => (
          <WorkspaceCard workspace={workspace} key={workspace.id} />
        ))
      ) : (
        <div>Nothing</div>
      )}
    </div>
  );
};

export default Page;
