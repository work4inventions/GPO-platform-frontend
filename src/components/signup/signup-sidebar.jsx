import { Check } from "@untitledui/icons";

const steps = [
  {
    id: "account",
    title: "Create Account",
    description: "Please provide your name and email",
  },
  {
    id: "business",
    title: "Business Details",
    description: "Provide information about your company",
  },
  {
    id: "plan",
    title: "Select Plan",
    description: "Select the best plan for your needs",
  },
  {
    id: "finish",
    title: "Finish",
    description: "Here you Go!",
  },
];

export const SignupSidebar = ({ currentStep, onStepChange, isMobile = false }) => {
  const currentStepIndex = steps.findIndex(step => step.id === currentStep);

  return (
    <div className={`${isMobile ? 'w-full h-auto' : 'w-full h-full'} bg-[#304258] text-white flex flex-col`}>
      {/* Header */}
      <div className="p-6 lg:pt-12 lg:pb-20 lg:pl-12">
        <img src="./assets/signupPage/signUpLogo.png" alt="4M Institute" className="" />
        {/* <div className="text-2xl font-bold tracking-wider">
          4MINSTITUTE
        </div> */}
      </div>

      {/* Steps */}
      <div className={`${isMobile ? 'px-6 py-4' : 'flex-1 px-6 lg:pr-8 lg:pl-12'}`}>
        <div className={`${isMobile ? 'flex space-x-4 overflow-x-auto pb-4 max-lg:justify-center' : 'space-y-8'}`}>
          {steps.map((step, index) => {
            const isCompleted = index < currentStepIndex;
            const isActive = step.id === currentStep;
            const isClickable = index <= currentStepIndex;

            return (
              <div
                key={step.id}
                className={`${isMobile ? 'flex-shrink-0 w-48' : 'flex items-start space-x-4 '} ${
                  isClickable ? 'cursor-pointer' : 'cursor-not-allowed'
                }`}
                onClick={() => isClickable && onStepChange(step.id)}
              >
                {/* Step Circle */}
                <div className="flex-shrink-0">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-200 ${
                      isCompleted
                        ? 'bg-white border-white'
                        : isActive
                        ? 'bg-white border-white'
                        : 'bg-transparent border-white/30'
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-5 h-5 text-[#304258]" />
                    ) : isActive ? (
                      <div className="w-2 h-2 bg-[#2980B9] rounded-full" />
                    ) : (
                      <div className="w-2 h-2 bg-white/30 rounded-full" />
                    )}
                  </div>
                </div>

                {/* Step Content */}
                <div className={`${isMobile ? 'text-center' : 'flex-1 min-w-0'}`}>
                  <h3
                    className={`${isMobile ? 'text-sm' : 'text-base'} font-bold mt-1 ${
                      isActive || isCompleted ? 'text-white' : 'text-white/60'
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={`text-base mt-[2px] max-lg:text-sm ${
                      isActive || isCompleted ? 'text-white/80' : 'text-white/40'
                    }`}
                  >
                    {step.description}
                  </p>
                </div>

              
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      {!isMobile && (
        <div className="border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-8 pb-8">
            <p className="text-sm text-[#D3D8E0] max-2xl:text-xs">© 4M Institute 2077</p>
            <div className="flex items-center mt-2 sm:mt-0">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <p className="text-sm text-[#D3D8E0]  max-2xl:text-xs">help@4minstitute.com</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
