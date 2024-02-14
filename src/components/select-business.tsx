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
import { ChevronDown, Plus } from "lucide-react";
import { useParams } from "next/navigation";

const SelectBusiness = () => {
  const { data } = api.workspace.availableBusinesses.useQuery();
  const { workspaceID } = useParams<{ workspaceID: string }>();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex h-10 w-[200px] items-center justify-between rounded-md border bg-white px-4">
          <p className="flex-1 truncate text-start">
            {data?.find((item) => item.id === workspaceID)?.name}
          </p>
          <ChevronDown className="h-4 w-4 text-zinc-400" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[200px]" align="start">
          <DropdownMenuLabel>Your Workspaces</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {data?.map((item) => (
            <Link
              key={item.id}
              className={item.id === workspaceID ? "text-brand-500" : ""}
              href={`/dashboard/w/${item.id}/events`}
            >
              <DropdownMenuItem>{item.name}</DropdownMenuItem>
            </Link>
          ))}

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

export default SelectBusiness;
