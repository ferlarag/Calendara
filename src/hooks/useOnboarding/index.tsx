import { useContext } from "react";
import {
  OnboardingContext,
  type OnboardingContextType,
} from "./oboarding-context";

export const useOnboarding = (): OnboardingContextType => {
  const context = useContext(OnboardingContext);

  if (!context)
    throw new Error(
      "useOnboarding must be used inside a OnboardingContextProvider",
    );

  return context;
};
