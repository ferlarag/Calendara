"use client";
import WorkspaceCard from "@/components/workspace-card";
import { api } from "@/trpc/react";

const Page = () => {
  const { data, isLoading, error } =
    api.workspace.availableWorkspaces.useQuery();

  if (error) return <div>An error ocurred</div>;

  if (isLoading) return <div>Loading</div>;

  return (
    <div className="grid grid-cols-3">
      {data.length !== 0 ? (
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
