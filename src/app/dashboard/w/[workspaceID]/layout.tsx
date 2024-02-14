import NavigationHeadline from "@/components/navigation-headline";
import DashboardNavigationItems from "@/components/dashboard-navigation-items";
import { type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="flex flex-col md:flex-row">
      <DashboardNavigationItems className="shrink-0" />
      <div className="w-full bg-zinc-100 px-8 pb-6 pt-14 md:h-screen md:overflow-y-scroll md:pt-0">
        <NavigationHeadline />
        {children}
      </div>
    </div>
  );
}
