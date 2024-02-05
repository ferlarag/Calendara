import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select-workspace";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "./ui/button";
import {
  CalendarFold,
  ChevronDown,
  HelpCircle,
  Image as ImageIcon,
  Link as LinkIcon,
  LogIn,
  LogOut,
  Mail,
  User2,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { ReactNode } from "react";

interface NavigationItem {
  link: string;
  title: string;
  icon: ReactNode;
}

const settingsItems: NavigationItem[] = [
  {
    title: "Profile",
    link: "/settings/profile",
    icon: <User2 className="h-4 w-4" />,
  },
  {
    title: "Business Branding",
    link: "/settings/business",
    icon: <ImageIcon className="h-4 w-4" />,
  },
  {
    title: "My-Link",
    link: "/settings/my-link",
    icon: <LinkIcon className="h-4 w-4" />,
  },
  {
    title: "Login Preferences",
    link: "/settings/login-preferences",
    icon: <LogIn className="h-4 w-4" />,
  },
  {
    title: "Calendar Sync",
    link: "/settings/calendar-sync",
    icon: <CalendarFold className="h-4 w-4" />,
  },
];

const NavigationHeadline = () => {
  return (
    <div className="flex h-[76px] w-full items-center justify-between">
      {/* dropdown */}
      <Select>
        <SelectTrigger className="w-[180px] border-none bg-transparent">
          <SelectValue placeholder="Calendar" defaultValue="light" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">My Business</SelectItem>
          <SelectItem value="dark">Other Business</SelectItem>
          <SelectItem value="system">And another one</SelectItem>
        </SelectContent>
      </Select>

      <div className="flex items-center gap-4">
        <Button variant={"secondaryColor"} className="flex items-center gap-2">
          <Mail /> Team Member
        </Button>
        <Button className="text-zinc-600" variant={"ghost"}>
          <HelpCircle />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1">
            <Avatar>
              <AvatarFallback>{"FL"}</AvatarFallback>
              <AvatarImage src={""} />
            </Avatar>
            <ChevronDown className="h-5 w-5 text-zinc-500" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[240px]" align="end">
            <DropdownMenuLabel className="text-lg font-medium">
              Account Settings
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            {settingsItems.map((item) => (
              <Link key={item.link} href={item.link}>
                <DropdownMenuItem className="gap-2 text-zinc-600">
                  {item.icon}
                  {item.title}
                </DropdownMenuItem>
              </Link>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 text-zinc-600">
              <LogOut className="h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default NavigationHeadline;
