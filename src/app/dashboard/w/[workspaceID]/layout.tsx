"use client";
import NavigationHeadline from "@/components/navigation-headline";
import DashboardNavigationItems from "@/components/dashboard-navigation-items";
import { type ReactNode } from "react";
import { api } from "@/trpc/react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  const { workspaceID } = useParams<{ workspaceID: string }>();
  const { data, isLoading } = api.workspace.getWorkspace.useQuery(
    {
      workspaceID,
    },
    {
      onError: () => {
        toast(
          "An error occurred loding this Workspace. Please try again later",
        );
      },
    },
  );

  return (
    <div className="flex flex-col md:flex-row">
      <DashboardNavigationItems className="shrink-0" />
      <div className="w-full bg-zinc-100 px-4 pt-14 md:overflow-y-scroll md:px-8 md:pt-0">
        {isLoading ? (
          <div className="flex h-svh items-center justify-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading
          </div>
        ) : (
          <div className="mx-auto max-w-[1200px]">
            <NavigationHeadline workspace={data} />
            <div className="h-[calc(100svh-76px)] w-full pb-6">{children}</div>
          </div>
        )}
      </div>
    </div>
  );
}
