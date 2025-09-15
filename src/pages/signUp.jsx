import { useState } from "react";
import { SignupLayout } from "../components/signup/signup-layout.jsx";
import { SignupAccount } from "../components/signup/steps/signup-account.jsx";
import { SignupBusiness } from "../components/signup/steps/signup-business.jsx";
import { SignupPlan } from "../components/signup/steps/signup-plan.jsx";
import { SignupStepFinish } from "../components/signup/steps/signup-step-finish.jsx";

export const SignUp = () => {
  const [currentStep, setCurrentStep] = useState("account");
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    businessName: "",
    role: "",
    address: "",
    city: "",
    country: "",
    phone: "",
    selectedPlan: null,
    isAnnual: false,
  });

  const steps = ["account", "business", "plan", "finish"];

  const handleNext = () => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const handlePrevious = () => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const handleDataUpdate = (data) => {
    setSignupData(prev => ({ ...prev, ...data }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case "account":
        return (
          <SignupAccount
            data={signupData}
            onDataUpdate={handleDataUpdate}
            onNext={handleNext}
          />
        );
      case "business":
        return (
          <SignupBusiness
            data={signupData}
            onDataUpdate={handleDataUpdate}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case "plan":
        return (
          <SignupPlan
            data={signupData}
            onDataUpdate={handleDataUpdate}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case "finish":
        return (
          <SignupStepFinish
            data={signupData}
            onPrevious={handlePrevious}
          />
        );
      default:
        return null;
    }
  };

  return (
    <SignupLayout
      currentStep={currentStep}
      onStepChange={setCurrentStep}
    >
      {renderStep()}
    </SignupLayout>
  );
};
