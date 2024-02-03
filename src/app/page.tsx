import Image from "next/image";

export default async function Home() {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center gap-4">
      <div className="flex items-center gap-2">
        <Image
          alt="Calendara logo"
          src="/calendara-logo.svg"
          width={64}
          height={64}
        />
        <h1 className="text-4xl font-semibold leading-[44px]">Calendara</h1>
      </div>
      <p className="text-md max-w-[500px] text-center">
        A tool helping businesses handle appoinments, charge for their services
        and store customers data for marketing.
      </p>
    </main>
  );
}
