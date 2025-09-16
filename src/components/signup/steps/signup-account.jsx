import { useState } from "react";
import { Input } from "@/components/base/input/input";
import { Button } from "@/components/base/buttons/button";

export const SignupAccount = ({ data, onDataUpdate, onNext }) => {
  const [errors, setErrors] = useState({});

  const validateName = (value) => {
    if (!value.trim()) return "Name is required";
    return "";
  };

  const validateEmail = (value) => {
    if (!value.trim()) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email";
    return "";
  };

  const validatePassword = (value) => {
    if (!value.trim()) return "Password is required";
    if (value.length < 8) return "Password must be at least 8 characters";
    return "";
  };

  const validateForm = () => {
    const newErrors = {};

    const nameErr = validateName(data.name);
    const emailErr = validateEmail(data.email);
    const passwordErr = validatePassword(data.password);

    if (nameErr) newErrors.name = nameErr;
    if (emailErr) newErrors.email = emailErr;
    if (passwordErr) newErrors.password = passwordErr;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Live onChange validators
  const handleNameChange = (value) => {
    onDataUpdate({ name: value });
    setErrors((prev) => ({ ...prev, name: validateName(value) }));
  };

  const handleEmailChange = (value) => {
    onDataUpdate({ email: value });
    setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
  };

  const handlePasswordChange = (value) => {
    onDataUpdate({ password: value });
    setErrors((prev) => ({ ...prev, password: validatePassword(value) }));
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  return (
    <div className="space-y-6 w-[390px] max-md:px-5 max-md:w-full">
      {/* Header */}
      <div className=" mb-8">
        <h1 className="text-3xl max-sm:text-2xl font-semibold text-[#000D22] mb-3 leading-[1.267]">Sign up</h1>
        <p className="text-sm sm:text-base text-[#2C3F56] font-normal">
          Create your account by entering your details below.
        </p>
      </div>

      {/* Form */}
      <div className="space-y-4 mb-6">
        <Input
          label="Name*"
          placeholder="Enter your name"
          value={data.name}
          onChange={handleNameChange}
          isInvalid={!!errors.name}
          hint={errors.name}
        />

        <Input
          label="Email*"
          placeholder="Enter your email"
          type="email"
          value={data.email}
          onChange={handleEmailChange}
          isInvalid={!!errors.email}
          hint={errors.email}
        />

        <Input
          label="Password*"
          placeholder="Create a password"
          type="password"
          value={data.password}
          onChange={handlePasswordChange}
          isInvalid={!!errors.password}
          hint={errors.password || "Must be at least 8 characters"}
        />
      </div>

      {/* Actions */}
      <div className="space-y-4">
        <Button
          size="md"
          className="w-full py-2.5 text-base leading-[1.5] font-semibold mb-8"
          onClick={handleNext}
          style={{ backgroundColor: '#2980B9' }}
        >
          Continue
        </Button>

        <div className="text-center">
          <span className="text-[#2A3D56] ">Already have an account? </span>
          <button className="text-[#2980B9] hover:underline font-semibold text-sm">
            Log in
          </button>
        </div>
      </div>
    </div>
  );
};
