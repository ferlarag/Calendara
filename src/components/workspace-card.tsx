import { cn } from "@/lib/utils";
import { type Role, type Workspace } from "@prisma/client";
import Link from "next/link";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { format } from "date-fns";
import { Button, buttonVariants } from "./ui/button";
import { Clipboard, Settings } from "lucide-react";
import { Checkbox } from "./ui/checkbox";

interface Props {
  workspace: Pick<
    Workspace,
    "id" | "name" | "link" | "workspaceLogoURL" | "createdAt"
  >;
  teamMembers: {
    user: {
      name: string | null;
      id: string;
      pictureUrl: string | null;
    };
    role: Role;
  }[];
}

const WorkspaceCard = ({ workspace, teamMembers }: Props) => {
  const [selected, setSelected] = useState(false);
  const { id, name, link, createdAt } = workspace;
  return (
    <div
      className={cn(
        "flex h-[250px] w-full flex-col overflow-hidden rounded-lg border bg-white shadow-md",
        `${selected ? "border-brand-500 ring-2 ring-brand-500" : "ring-0"}`,
      )}
    >
      {/* top */}
      <div className={`h-2 bg-brand-500`} />

      <div className="flex flex-1 flex-col">
        <div className="flex flex-1 flex-col justify-between px-3 pb-5 pt-0.5">
          <div className="flex items-center justify-between">
            <Checkbox
              checked={selected}
              onCheckedChange={() => {
                setSelected((value) => (value ? !value : true));
              }}
            />
            <Link
              href={`/dashboard/w/${id}/calendar`}
              className={buttonVariants({
                size: "icon",
                variant: "ghost",
              })}
            >
              <Settings className="h-4 w-4" />
            </Link>
          </div>

          <div>
            <h3 className="text-2xl font-medium">{name}</h3>
            <div className="flex w-full justify-between">
              <div className="flex flex-1 flex-col gap-1">
                <Link className="text-brand-500 hover:underline" href={"/"}>
                  calendara.app/{link}
                </Link>
                <div className="flex gap-2">
                  {teamMembers.map(({ user }) => (
                    <Avatar key={user.id}>
                      <AvatarFallback>{name[0]?.toUpperCase()}</AvatarFallback>
                      <AvatarImage
                        src={user.pictureUrl ? user.pictureUrl : ""}
                      />
                    </Avatar>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-1 self-end">
                <p className="text-zinc-400">
                  {format(createdAt, "MM/dd/yyyy")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* buttons at the bottom */}
        <div className="flex justify-between border-t p-3">
          <Button variant={"link"} className="gap-2">
            <Clipboard className="h-4 w-4" />
            Copy Booking Page
          </Button>
          <Link
            className={buttonVariants({})}
            href={`/dashboard/w/${id}/events`}
          >
            See workspace
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceCard;
