"use client";

import Link from "next/link";
import React, { type ReactNode } from "react";
import { buttonVariants } from "./ui/button";
import {
  BarChartBig,
  Calendar,
  CalendarCheck,
  Contact2,
  Store,
  Users,
  Zap,
} from "lucide-react";
import { useParams, usePathname } from "next/navigation";

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

const DashboardNavigationItems = () => {
  const path = usePathname();
  const params = useParams<{ workspaceID: string }>();
  const workspaceID = params.workspaceID;

  return (
    <>
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
    </>
  );
};

export default DashboardNavigationItems;
