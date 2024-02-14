"use client";
import { api } from "@/trpc/react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";

const Page = () => {
  const { user, isAuthenticated } = useKindeBrowserClient();
  if (!user || !isAuthenticated)
    redirect("/api/auth/login?post_login_redirect_url=/dashboard");

  const { error, isLoading } = api.user.validateUser.useMutation();

  if (error) {
    return <div>Something went wrong. Please try again later</div>;
  }

  if (!isLoading && !error) {
    redirect("/dashboard");
  } else {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin" />
        <p>You&apos;ll be redirected soon</p>
      </div>
    );
  }
};

export default Page;
