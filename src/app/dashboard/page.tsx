import WorkspaceCard from "@/components/workspace-card";
import { api } from "@/trpc/server";
import React from "react";

export const dynamic = "force-dynamic";

const Page = async () => {
  const data = await api.workspace.availableBusinesses.query();

  return (
    <div className="grid grid-cols-3">
      {data?.map((workspace) => (
        <WorkspaceCard workspace={workspace} key={workspace.id} />
      ))}
    </div>
  );
};

export default Page;
