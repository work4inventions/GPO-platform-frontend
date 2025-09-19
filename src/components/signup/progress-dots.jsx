const steps = ["account", "business", "plan", "finish"];

export const ProgressDots = ({ currentStep }) => {
  const currentStepIndex = steps.findIndex(step => step === currentStep);

  return (
    <div className="flex space-x-2">
      {steps.map((_, index) => (
        <div
          key={index}
          className={`w-2 h-2 rounded-full transition-all duration-200 ${
            index === currentStepIndex
              ? 'bg-[var(--color-brand-primary)] scale-125'
              : index < currentStepIndex
              ? 'bg-[var(--color-brand-primary)]'
              : 'bg-gray-300'
          }`}
        />
      ))}
    </div>
  );
};
