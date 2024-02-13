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
import SelectBusiness from "./select-business";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import SettingsDropdownMenu from "./settings-dropdown";

const NavigationHeadline = () => {
  return (
    <div className="flex h-[76px] w-full items-center justify-between">
      {/* dropdown */}
      <SelectBusiness />

      <div className="flex items-center gap-4">
        <Button variant={"secondaryColor"} className="flex items-center gap-2">
          <Mail /> Team Member
        </Button>
        <Button className="text-zinc-600" variant={"ghost"}>
          <HelpCircle />
        </Button>

        <SettingsDropdownMenu />
      </div>
    </div>
  );
};

export default NavigationHeadline;
