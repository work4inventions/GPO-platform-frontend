import { SignupSidebar } from "./signup-sidebar.jsx";
import { SignupContent } from "./signup-content.jsx";

export const SignupLayout = ({ currentStep, onStepChange, children }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row">
      {/* Sidebar */}
      <div className="hidden lg:flex lg:w-[480px]">
        <SignupSidebar currentStep={currentStep} onStepChange={onStepChange} />
      </div>
      
      {/* Mobile Sidebar - Hidden on desktop */}
      <div className="lg:hidden w-full">
        <SignupSidebar currentStep={currentStep} onStepChange={onStepChange} isMobile />
      </div>
      
      {/* Content */}
      <div className="flex-1">
        <SignupContent currentStep={currentStep}>
          {children}
        </SignupContent>
      </div>
    </div>
  );
};
