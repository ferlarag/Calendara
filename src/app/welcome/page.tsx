"use client";
import CreateWorspaceCarousel from "@/components/welcome-page/create-workspace-steps";
import { OnboardingProvider } from "@/hooks/useOnboarding/oboarding-context";
import React from "react";

const Page = () => {
  return (
    <OnboardingProvider>
      <div className="flex min-h-screen items-center justify-center bg-zinc-100 p-4">
        <CreateWorspaceCarousel />
      </div>
    </OnboardingProvider>
  );
};

export default Page;
