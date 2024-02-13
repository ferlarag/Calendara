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
import { useParams, usePathname } from "next/navigation";

interface NavigationItem {
  path: string;
  title: string;
  icon: ReactNode;
}

export const settingsItems: NavigationItem[] = [
  {
    title: "Profile",
    path: "profile",
    icon: <User2 className="h-5 w-5" />,
  },
  {
    title: "Business Branding",
    path: "business",
    icon: <ImageIcon className="h-5 w-5" />,
  },
  {
    title: "My-Link",
    path: "my-link",
    icon: <LinkIcon className="h-5 w-5" />,
  },
  {
    title: "Login Preferences",
    path: "login-preferences",
    icon: <LogIn className="h-5 w-5" />,
  },
  {
    title: "Calendar Sync",
    path: "calendar-sync",
    icon: <CalendarFold className="h-5 w-5" />,
  },
];

const SettingsNavigationItems = () => {
  const path = usePathname();
  const { workspaceID } = useParams<{ workspaceID: string }>();

  return (
    <>
      {settingsItems.map((item) => (
        <Link
          className={buttonVariants({
            variant:
              path === `/dashboard/settings/${workspaceID}/${item.path}`
                ? "activeMenuLink"
                : "menuLink",
            className: "gap-2",
          })}
          href={`/dashboard/settings/${workspaceID}/${item.path}`}
          key={item.path}
        >
          {item.icon}
          {item.title}
        </Link>
      ))}
    </>
  );
};

export default SettingsNavigationItems;
