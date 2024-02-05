import Logo from "@/components/logo";
import NavigationHeadline from "@/components/navigation-headline";
import NavigationsItems from "@/components/navigation-items";
import { buttonVariants } from "@/components/ui/button";
import { Plus } from "lucide-react";
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
          <NavigationsItems />
        </nav>
        <Link
          className={buttonVariants({
            className: "mt-auto flex items-center gap-2",
          })}
          href={"/new"}
        >
          <Plus className="h-5 w-5" />
          Create
        </Link>
      </aside>
      <div className="h-screen w-full bg-zinc-100 px-8 pb-6">
        <NavigationHeadline />
        {children}
      </div>
    </div>
  );
}
