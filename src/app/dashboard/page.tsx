"use client";

import WorkspaceCard from "@/components/workspace-card";
import { api } from "@/trpc/react";
import { Loader2 } from "lucide-react";

const Page = () => {
  const { data, isLoading } = api.workspace.availableWorkspaces.useQuery();

  return (
    <main className="h-screen bg-zinc-100">
      <div className="mx-auto w-full max-w-[1200px] space-y-4  px-4 py-10 md:px-4">
        <h1 className="text-3xl font-medium">Your Workspaces</h1>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            <div className="col-span-3">
              <Loader2 className="h-5 w-5 animate-ping" />
            </div>
          ) : data ? (
            data.map((workspace) => (
              <WorkspaceCard
                workspace={workspace}
                teamMembers={workspace.teamMembers}
                key={workspace.id}
              />
            ))
          ) : (
            <div>No data</div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Page;
