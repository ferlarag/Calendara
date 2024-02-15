import { env } from "@/env";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

export default async function Home() {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center gap-4">
      <nav>
        {env.NODE_ENV}
        <LoginLink postLoginRedirectURL="/auth-callback">Log In</LoginLink>
        <RegisterLink postLoginRedirectURL="/auth-callback">
          Register
        </RegisterLink>
      </nav>
      <h1 className="text-3xl font-medium">
        The best way tool for online businesses
      </h1>
    </main>
  );
}
