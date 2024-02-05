import { Button } from "@/components/ui/button";
import { ChevronLeft, Link as LinkIcon, Send, Settings } from "lucide-react";
import { type ReactNode } from "react";

interface Props {
  children: ReactNode;
}
const Layout = ({ children }: Props) => {
  return (
    <div className="flex h-screen">
      <aside className="flex w-[440px] flex-col border-r shadow-lg">
        <div className="space-y-2 border-b px-8 py-4">
          <div className="flex">
            <Button
              variant={"ghost"}
              className="mr-auto gap-2 text-zinc-500 underline"
            >
              <ChevronLeft className="h-4 w-4" /> Go Back
            </Button>
            <Button size={"icon"} variant={"ghost"}>
              <Settings className="h-4 w-4" />
            </Button>
            <Button size={"icon"} variant={"ghost"}>
              <LinkIcon className="h-4 w-4" />
            </Button>
            <Button size={"icon"} variant={"ghost"}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <h1 className="text-3xl font-medium">Edit Event</h1>
        </div>
        <div className="flex-1 overflow-scroll px-8 py-4">
          <div className="h-screen">Item goes here</div>
        </div>
        <div className="space-y-2 border-t px-8 py-4">
          <div className="flex w-full gap-2">
            <Button
              variant={"ghost"}
              className="ml-auto gap-2 text-zinc-500 underline"
            >
              <ChevronLeft className="h-4 w-4" /> Cancel
            </Button>
            <Button>Save</Button>
          </div>
        </div>
      </aside>
      <main className="flex-1 bg-zinc-100">{children}</main>
    </div>
  );
};

export default Layout;
