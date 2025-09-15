import { ProgressDots } from "./progress-dots.jsx";

export const SignupContent = ({ currentStep, children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center mx-auto ">
        <div className="w-full max-w-full">
          {children}
        </div>
      </div>

      {/* Progress Dots */}
      <div className="flex justify-center pb-4 sm:pb-6">
        <ProgressDots currentStep={currentStep} />
      </div>
    </div>
  );
};
