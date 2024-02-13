import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = async () => {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const user = await getUser();

  return (
    <Link
      className="flex items-center gap-2"
      href={user?.id ? "/dashboard" : ""}
    >
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
