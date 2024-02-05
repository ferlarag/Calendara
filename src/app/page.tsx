import Logo from "@/components/logo";
import Image from "next/image";

export default async function Home() {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center gap-4">
      <Logo />
      <p className="text-md max-w-[500px] text-center">
        A tool helping businesses handle appoinments, charge for their services
        and store customers data for marketing.
      </p>
    </main>
  );
}
