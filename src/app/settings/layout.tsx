import Logo from "@/components/logo";
import NavigationHeadline from "@/components/navigation-headline";
import NavigationsItems from "@/components/navigation-items";
import SettingsNavigationItems from "@/components/settings-items";
import { Button, buttonVariants } from "@/components/ui/button";
import { ChevronLeft, LogOut, Plus } from "lucide-react";
import Link from "next/link";
import { type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="flex">
      <aside className="flex h-screen w-full max-w-[260px] flex-col gap-8 border-r px-3 py-6">
        <Logo />
        <nav className="flex h-full flex-col gap-2">
          <div className="mb-4 flex flex-col justify-start gap-0 pl-4">
            <Link
              className="flex items-center gap-2 text-zinc-600 underline"
              href={"/dashboard"}
            >
              <ChevronLeft className="h-5 w-5" />
              Go back
            </Link>
            <h2 className="text-xl font-semibold">Account Settings</h2>
          </div>
          <SettingsNavigationItems />
        </nav>
        <Button variant={"menuLink"} className="gap-2 text-red-500">
          <LogOut className="h-5 w-5" />
          Logout
        </Button>
      </aside>
      <div className="h-screen w-full bg-zinc-100 px-8 pb-6">
        <NavigationHeadline />
        {children}
      </div>
    </div>
  );
}
