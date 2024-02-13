import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { api } from "@/trpc/server";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { Plus } from "lucide-react";

const SelectBusiness = async () => {
  const data = await api.workspace.availableBusinesses.query();

  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Calendar" defaultValue="empty" />
      </SelectTrigger>
      <SelectContent className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <SelectGroup>
            {data?.map((item) => (
              <SelectItem key={item.id} value={item.name}>
                <Link href={`/dashboard/w/${item.id}/events`}>{item.name}</Link>
              </SelectItem>
            ))}
          </SelectGroup>
          <SelectGroup className="border-t p-2">
            <Link
              className={buttonVariants({
                size: "sm",
                variant: "secondaryColor",
                className: "w-full gap-2",
              })}
              href="/create-business"
            >
              <Plus className="h-4 w-4" />
              Create business
            </Link>
          </SelectGroup>
        </div>
      </SelectContent>
    </Select>
  );
};

export default SelectBusiness;
