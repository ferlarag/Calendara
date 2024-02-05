"use client";

import Link from "next/link";
import React, { type ReactNode } from "react";
import { buttonVariants } from "./ui/button";
import {
  BarChartBig,
  Calendar,
  Contact2,
  List,
  Store,
  Users,
  Zap,
} from "lucide-react";
import { usePathname } from "next/navigation";

interface NavigationItem {
  link: string;
  title: string;
  icon: ReactNode;
}

const items: NavigationItem[] = [
  {
    title: "Your Events",
    link: "/dashboard/events",
    icon: <Store className="h-5 w-5" />,
  },
  {
    title: "Calendar",
    link: "/dashboard/calendar",
    icon: <Calendar className="h-5 w-5" />,
  },
  {
    title: "Plug-ins",
    link: "/dashboard/plugins",
    icon: <Zap className="h-5 w-5" />,
  },
  {
    title: "Customers",
    link: "/dashboard/customers",
    icon: <Contact2 className="h-5 w-5" />,
  },
  {
    title: "Analytics",
    link: "/dashboard/analytics",
    icon: <BarChartBig className="h-5 w-5" />,
  },
  {
    title: "Your Team",
    link: "/dashboard/team",
    icon: <Users className="h-5 w-5" />,
  },
];

const NavigationsItems = () => {
  const path = usePathname();

  return (
    <>
      {items.map((item) => (
        <Link
          className={buttonVariants({
            variant: path === item.link ? "activeMenuLink" : "menuLink",
            className: "gap-2",
          })}
          href={item.link}
          key={item.link}
        >
          {item.icon}
          {item.title}
        </Link>
      ))}
    </>
  );
};

export default NavigationsItems;
