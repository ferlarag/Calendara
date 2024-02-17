"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { api } from "@/trpc/react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { ChevronDown, Loader2, Plus } from "lucide-react";
import { useParams } from "next/navigation";
import { Workspace } from "@prisma/client";

interface Props {
  currentWorkspace: Workspace | undefined;
}

const SelectWorkspace = ({ currentWorkspace }: Props) => {
  const { data, isLoading, error } =
    api.workspace.availableWorkspaces.useQuery();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex h-10 w-[200px] items-center justify-between rounded-md border bg-white px-4">
          {currentWorkspace ? (
            <p className="flex-1 truncate text-start">
              {currentWorkspace.name}
            </p>
          ) : (
            <Loader2 className="h-4 w-4 animate-spin" />
          )}
          <ChevronDown className="h-4 w-4 text-zinc-400" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[200px]" align="start">
          <DropdownMenuLabel>Your Workspaces</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {isLoading ? (
            <div>
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>
          ) : data ? (
            data.map((workspace) => (
              <Link
                key={workspace.id}
                className={
                  workspace.id === currentWorkspace?.id ? "text-brand-500" : ""
                }
                href={`/dashboard/w/${workspace.id}/events`}
              >
                <DropdownMenuItem>{workspace.name}</DropdownMenuItem>
              </Link>
            ))
          ) : (
            <div>Hey</div>
          )}

          <Link
            className={buttonVariants({
              size: "sm",
              variant: "secondaryColor",
              className: "mt-2 w-full gap-1",
            })}
            href="/create-business"
          >
            <Plus className="h-4 w-4" />
            Create business
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default SelectWorkspace;
