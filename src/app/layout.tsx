import "@/styles/globals.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";
import { EventDataProvider } from "@/context/event-data-context";
import EventDataDebugger from "@/components/event-data-debugger";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Calendara",
  description: "The best booking system for businesses",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <TRPCReactProvider>
          <EventDataProvider>
            <EventDataDebugger />
            {children}
          </EventDataProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
