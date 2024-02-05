"use client";

import Link from "next/link";
import React, { type ReactNode } from "react";
import { buttonVariants } from "./ui/button";
import {
  CalendarFold,
  Image as ImageIcon,
  Link as LinkIcon,
  LogIn,
  User2,
} from "lucide-react";
import { usePathname } from "next/navigation";

interface NavigationItem {
  link: string;
  title: string;
  icon: ReactNode;
}

export const settingsItems: NavigationItem[] = [
  {
    title: "Profile",
    link: "/settings/profile",
    icon: <User2 className="h-5 w-5" />,
  },
  {
    title: "Business Branding",
    link: "/settings/business",
    icon: <ImageIcon className="h-5 w-5" />,
  },
  {
    title: "My-Link",
    link: "/settings/my-link",
    icon: <LinkIcon className="h-5 w-5" />,
  },
  {
    title: "Login Preferences",
    link: "/settings/login-preferences",
    icon: <LogIn className="h-5 w-5" />,
  },
  {
    title: "Calendar Sync",
    link: "/settings/calendar-sync",
    icon: <CalendarFold className="h-5 w-5" />,
  },
];

const SettingsNavigationItems = () => {
  const path = usePathname();

  return (
    <>
      {settingsItems.map((item) => (
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

export default SettingsNavigationItems;
