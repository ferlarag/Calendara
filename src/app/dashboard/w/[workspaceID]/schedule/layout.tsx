import { type ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="h-[calc(100vh-76px)] overflow-y-scroll pb-10">
      {children}
    </main>
  );
}
