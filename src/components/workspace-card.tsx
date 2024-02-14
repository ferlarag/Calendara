import { cn } from "@/lib/utils";
import { type Workspace } from "@prisma/client";
import Link from "next/link";
import React from "react";

interface Props {
  workspace: Pick<Workspace, "id" | "name" | "link" | "workspaceLogoURL">;
  className?: string;
}

const WorkspaceCard = ({ workspace, className }: Props) => {
  const { id, name } = workspace;
  return (
    <Link
      href={`/dashboard/w/${id}/events`}
      className={cn("flex flex-col rounded-lg border bg-white p-4", className)}
    >
      {name}
    </Link>
  );
};

export default WorkspaceCard;
