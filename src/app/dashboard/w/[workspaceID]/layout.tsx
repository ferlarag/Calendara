import Logo from "@/components/logo";
import NavigationHeadline from "@/components/navigation-headline";
import DashboardNavigationItems from "@/components/dashboard-navigation-items";
import { type ReactNode } from "react";
import CreateEventButton from "@/components/create-event-button";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="flex">
      <aside className="flex h-screen w-full max-w-[260px] flex-col gap-8 border-r px-3 py-6">
        <Logo />
        <nav className="flex h-full flex-col gap-2">
          <DashboardNavigationItems />
        </nav>
        <CreateEventButton />
      </aside>
      <div className="h-screen w-full bg-zinc-100 px-8 pb-6">
        <NavigationHeadline />
        {children}
      </div>
    </div>
  );
}
