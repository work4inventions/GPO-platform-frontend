import { Button } from "@/components/base/buttons/button";
import { CheckCircle } from "@untitledui/icons";
<<<<<<< HEAD
import { useNavigate } from "react-router";

export const SignupStepFinish = ({ data, onPrevious }) => {
=======
import { useToast } from "@/components/base/toast";
import { useNavigate } from "react-router";

export const SignupStepFinish = ({ data, onPrevious }) => {
  const { showSuccess } = useToast();
>>>>>>> 08559fd0263d9426126897b8ce70b0db6f98c30f
  const navigate = useNavigate();

  const handleFinish = () => {
    // Here you would typically submit the data to your backend
    console.log("Signup completed:", data);
<<<<<<< HEAD
    // Navigate to dashboard
    navigate("/dashboard");
=======
    
    // Show success toast
    showSuccess(
      'Account Created Successfully!',
      'Welcome to 4M Institute! Redirecting to dashboard...',
      { duration: 4000 }
    );
    
    // Navigate to dashboard after showing toast
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
>>>>>>> 08559fd0263d9426126897b8ce70b0db6f98c30f
  };

  const selectedPlan = data.selectedPlan === "basic" ? "Basic plan" : "Education+";
  const planPrice = data.isAnnual 
    ? (data.selectedPlan === "basic" ? "$8/yr" : "$16/yr")
    : (data.selectedPlan === "basic" ? "$10/mth" : "$20/mth");

  return (
    <div className="space-y-6">
      {/* Success Icon */}
      <div className="text-center">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">All Set!</h1>
        <p className="text-sm sm:text-base text-gray-600">
          Your account has been created successfully. Welcome to 4M Institute!
        </p>
      </div>

      {/* Summary */}
      <div className="bg-gray-50 rounded-lg p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Summary</h3>
        
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Name:</span>
            <span className="font-medium">{data.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Email:</span>
            <span className="font-medium">{data.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Business:</span>
            <span className="font-medium">{data.businessName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Role:</span>
            <span className="font-medium">{data.role}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Plan:</span>
            <span className="font-medium">{selectedPlan} ({planPrice})</span>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h4 className="font-semibold text-blue-900 mb-2">What's Next?</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Check your email for a verification link</li>
          <li>• Complete your profile setup</li>
          <li>• Explore our marketplace and community</li>
          <li>• Join your first event or discussion</li>
        </ul>
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
          onClick={handleFinish}
          style={{ backgroundColor: '#2980B9' }}
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};
