import { useState } from "react";
import { Button } from "@/components/base/buttons/button";
import { Toggle } from "@/components/base/toggle/toggle";
import { Check } from "@untitledui/icons";

const plans = [
  {
    id: "basic",
    name: "Basic plan",
    monthlyPrice: 10,
    annualPrice: 8,
    features: [
      "Access to Marketplace Vendors",
      "Join Community Discussions",
      "Free Event Registration",
    ],
  },
  {
    id: "education",
    name: "Education+",
    monthlyPrice: 20,
    annualPrice: 16,
    features: [
      "All Basic Features",
      "Unlimited Event Access",
      "CME / Credit Tracking",
      "Priority Support",
      "Access to Private Sub-Groups (specializations, regions, etc.)",
    ],
  },
];

export const SignupPlan = ({ data, onDataUpdate, onNext, onPrevious }) => {
  const [selectedPlan, setSelectedPlan] = useState(data.selectedPlan);

  const handlePlanSelect = (planId) => {
    setSelectedPlan(planId);
    onDataUpdate({ selectedPlan: planId });
  };

  const handleNext = () => {
    if (selectedPlan) {
      onNext();
    }
  };

  const getPrice = (plan) => {
    return data.isAnnual ? plan.annualPrice : plan.monthlyPrice;
  };

  const getPriceText = (plan) => {
    const price = getPrice(plan);
    return data.isAnnual ? `$${price}/yr` : `$${price}/mth`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Subscription Plan</h1>
        <p className="text-sm sm:text-base text-gray-600">
          Select the best plan for your needs
        </p>
      </div>

      {/* Annual Toggle */}
      <div className="flex items-center justify-center space-x-3">
        <span className={`text-sm ${!data.isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
          Monthly
        </span>
        <Toggle
          isSelected={data.isAnnual}
          onChange={(isSelected) => onDataUpdate({ isAnnual: isSelected })}
        />
        <span className={`text-sm ${data.isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
          Annual pricing
        </span>
        {data.isAnnual && (
          <span className="text-sm font-medium text-orange-600">(save 20%)</span>
        )}
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {plans.map((plan) => {
          const isSelected = selectedPlan === plan.id;
          const priceText = getPriceText(plan);

          return (
            <div
              key={plan.id}
              className={`relative p-6 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                isSelected
                  ? 'border-[#2980B9] bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handlePlanSelect(plan.id)}
            >
              {/* Selection Indicator */}
              {isSelected && (
                <div className="absolute top-4 right-4 w-6 h-6 bg-[#2980B9] rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}

              {/* Price */}
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {priceText}
                </div>
                <div className="text-lg font-medium text-gray-700">
                  {plan.name}
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Button */}
              <Button
                size="lg"
                className="w-full"
                color={isSelected ? "primary" : "secondary"}
                onClick={() => handlePlanSelect(plan.id)}
                style={isSelected ? { backgroundColor: '#2980B9' } : undefined}
              >
                Subscribe to {plan.name}
              </Button>
            </div>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
        <Button
          size="md"
          color="secondary"
          className="flex-1"
          onClick={onPrevious}
        >
          Previous
        </Button>
        <Button
          size="md"
          className="flex-1"
          onClick={handleNext}
          disabled={!selectedPlan}
          style={{ backgroundColor: '#2980B9' }}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
