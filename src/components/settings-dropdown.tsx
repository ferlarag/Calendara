"use client";
import React, { type ReactNode } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  CalendarFold,
  ChevronDown,
  HelpCircle,
  ImageIcon,
  LinkIcon,
  LogIn,
  LogOut,
  Newspaper,
  User2,
} from "lucide-react";
import Link from "next/link";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useParams } from "next/navigation";

interface NavigationItem {
  path: string;
  title: string;
  icon: ReactNode;
}

const settingsItems: NavigationItem[] = [
  {
    title: "Profile",
    path: "profile",
    icon: <User2 className="h-4 w-4" />,
  },
  {
    title: "Business Branding",
    path: "business",
    icon: <ImageIcon className="h-4 w-4" />,
  },
  {
    title: "My-Link",
    path: "my-link",
    icon: <LinkIcon className="h-4 w-4" />,
  },
  {
    title: "Login Preferences",
    path: "login-preferences",
    icon: <LogIn className="h-4 w-4" />,
  },
  {
    title: "Calendar Sync",
    path: "calendar-sync",
    icon: <CalendarFold className="h-4 w-4" />,
  },
];

const SettingsDropdownMenu = () => {
  const { workspaceID } = useParams<{ workspaceID: string }>();
  const { user } = useKindeBrowserClient();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1">
        <Avatar>
          <AvatarFallback>{user?.given_name?.at(0)}</AvatarFallback>
          <AvatarImage src={user?.picture ? user.picture : ""} />
        </Avatar>
        <ChevronDown className="h-5 w-5 text-zinc-500" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[240px]" align="end">
        <DropdownMenuLabel className="text-md font-medium">
          Account Settings
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {settingsItems.map((item) => (
          <Link
            key={item.path}
            href={`/dashboard/settings/${workspaceID}/${item.path}`}
          >
            <DropdownMenuItem className="gap-2 text-zinc-600">
              {item.icon}
              {item.title}
            </DropdownMenuItem>
          </Link>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/help" className="flex items-center gap-2 text-brand-500">
            <HelpCircle className="h-4 w-4" />
            Help Center
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/blog" className="flex items-center gap-2 text-brand-500">
            <Newspaper className="h-4 w-4" />
            Blog
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogoutLink
            className="flex items-center gap-2 text-red-600"
            postLogoutRedirectURL="/"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </LogoutLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SettingsDropdownMenu;
