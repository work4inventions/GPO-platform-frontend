import { useState } from "react";
import { Input } from "@/components/base/input/input";
import { Button } from "@/components/base/buttons/button";

export const SignupAccount = ({ data, onDataUpdate, onNext }) => {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!data.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!data.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!data.password.trim()) {
      newErrors.password = "Password is required";
    } else if (data.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Sign up</h1>
        <p className="text-sm sm:text-base text-gray-600">
          Create your account by entering your details below.
        </p>
      </div>

      {/* Form */}
      <div className="space-y-4">
        <Input
          label="Name*"
          placeholder="Enter your name"
          value={data.name}
          onChange={(value) => onDataUpdate({ name: value })}
          isInvalid={!!errors.name}
          hint={errors.name}
        />

        <Input
          label="Email*"
          placeholder="Enter your email"
          type="email"
          value={data.email}
          onChange={(value) => onDataUpdate({ email: value })}
          isInvalid={!!errors.email}
          hint={errors.email}
        />

        <Input
          label="Password*"
          placeholder="Create a password"
          type="password"
          value={data.password}
          onChange={(value) => onDataUpdate({ password: value })}
          isInvalid={!!errors.password}
          hint={errors.password || "Must be at least 8 characters"}
        />
      </div>

      {/* Actions */}
      <div className="space-y-4">
        <Button
          size="md"
          className="w-full"
          onClick={handleNext}
          style={{ backgroundColor: '#2980B9' }}
        >
          Continue
        </Button>

        <div className="text-center">
          <span className="text-gray-600">Already have an account? </span>
          <button className="text-[#2980B9] hover:underline font-medium">
            Log in
          </button>
        </div>
      </div>
    </div>
  );
};
