"use client";

import Link from "next/link";
import React from "react";
import { buttonVariants } from "./ui/button";
import { Plus } from "lucide-react";
import { useParams } from "next/navigation";

const CreateEventButton = () => {
  const { workspaceID } = useParams<{ workspaceID: string }>();

  return (
    <Link
      className={buttonVariants({
        className: "mt-auto flex items-center gap-2",
      })}
      href={`/dashboard/e/new/${workspaceID}`}
    >
      <Plus className="h-5 w-5" />
      Create
    </Link>
  );
};

export default CreateEventButton;
