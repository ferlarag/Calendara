"use client";

import Link from "next/link";
import React, { useState, type ReactNode } from "react";
import { Button, buttonVariants } from "./ui/button";
import {
  BarChartBig,
  Calendar,
  CalendarCheck,
  ChevronLeft,
  Contact2,
  Menu,
  Store,
  Users,
  Zap,
} from "lucide-react";
import { useParams, usePathname } from "next/navigation";
import CreateEventButton from "./create-event-button";
import Logo from "./logo";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface NavigationItem {
  path: string;
  title: string;
  icon: ReactNode;
}

const items: NavigationItem[] = [
  {
    title: "Your Events",
    path: "events",
    icon: <Store className="h-5 w-5" />,
  },
  {
    title: "Calendar",
    path: "calendar",
    icon: <Calendar className="h-5 w-5" />,
  },
  {
    title: "Customers",
    path: "customers",
    icon: <Contact2 className="h-5 w-5" />,
  },
  {
    title: "Schedules",
    path: "schedule",
    icon: <CalendarCheck className="h-5 w-5" />,
  },
  {
    title: "Plug-ins",
    path: "plugins",
    icon: <Zap className="h-5 w-5" />,
  },
  {
    title: "Analytics",
    path: "analytics",
    icon: <BarChartBig className="h-5 w-5" />,
  },
  {
    title: "Your Team",
    path: "team",
    icon: <Users className="h-5 w-5" />,
  },
];

interface Props {
  className?: string;
}

const DashboardNavigationItems = ({ className }: Props) => {
  const path = usePathname();
  const params = useParams<{ workspaceID: string }>();
  const workspaceID = params.workspaceID;
  const [open, setOpen] = useState(false);

  function toggleOpen() {
    setOpen((prev) => (prev ? !prev : true));
  }

  return (
    <aside className={cn("relative", className)}>
      {/* Mobile topbar */}
      <div className="fixed left-0 top-0 z-10 flex h-14 w-screen items-center bg-zinc-100/70 px-8 backdrop-blur-lg md:hidden">
        <Button variant={"ghost"} className="gap-2 px-0" onClick={toggleOpen}>
          <Menu className="h-5 w-5" />
          <Image
            alt="Calendara logo"
            src="/calendara-logo.svg"
            width={28}
            height={28}
          />
          <h2 className="text-xl font-semibold">Calendara</h2>
        </Button>
      </div>

      <div
        className={`fixed z-30 flex h-screen md:static ${!open ? "left-[-300px]" : "left-0"} w-[300px] flex-col gap-8 border-r bg-white px-3 pb-4 pt-2 transition-all md:py-6`}
      >
        <div className="flex flex-col">
          <Button
            variant={"ghost"}
            className="self-end md:hidden"
            onClick={toggleOpen}
          >
            <ChevronLeft className="h-5 w-5" />
            Close
          </Button>
          <Logo />
        </div>
        <nav className="flex h-full flex-col gap-2">
          {items.map((item) => (
            <Link
              className={buttonVariants({
                variant:
                  path === `/dashboard/w/${workspaceID}/${item.path}`
                    ? "activeMenuLink"
                    : "menuLink",
                className: "gap-2",
              })}
              href={`/dashboard/w/${workspaceID}/${item.path}`}
              key={item.path}
            >
              {item.icon}
              {item.title}
            </Link>
          ))}
        </nav>
        <CreateEventButton />
      </div>
      <div
        onClick={toggleOpen}
        className={`fixed z-20 h-screen w-screen bg-black/75 md:hidden ${!open ? "left-[-300px] hidden opacity-0 " : "left-0 opacity-100"} transition-all`}
      />
    </aside>
  );
};

export default DashboardNavigationItems;
