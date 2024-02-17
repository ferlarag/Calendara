import { type OnboardingStep } from "@prisma/client";
import { type ReactNode, createContext, useState } from "react";

export interface OnboardingContextType {
  step: OnboardingStep;
  changeStep: (moveTo: OnboardingStep) => void;
}

export const OnboardingContext = createContext<
  OnboardingContextType | undefined
>(undefined);

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const [step, setStep] = useState<OnboardingStep>("DONE");
  const changeStep = (moveTo: OnboardingStep) => {
    setStep(moveTo);
  };
  return (
    <OnboardingContext.Provider
      value={{
        step,
        changeStep,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};
