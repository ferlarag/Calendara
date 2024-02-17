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
  const { data, isLoading, error } = api.workspace.getWorkspace.useQuery(
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
      <div className="min-h-screen w-full bg-zinc-100 px-8 pb-6 pt-14 md:overflow-y-scroll md:pt-0">
        {isLoading ? (
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading
          </div>
        ) : (
          <>
            <NavigationHeadline workspace={data} />
            {children}
          </>
        )}
      </div>
    </div>
  );
}
