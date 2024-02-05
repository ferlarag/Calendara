import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link className="flex items-center gap-2" href={"/"}>
      <Image
        alt="Calendara logo"
        src="/calendara-logo.svg"
        width={48}
        height={48}
      />
      <h2 className="text-3xl font-semibold">Calendara</h2>
    </Link>
  );
};

export default Logo;
