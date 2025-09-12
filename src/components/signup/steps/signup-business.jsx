import { useState } from "react";
import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import { Button } from "@/components/base/buttons/button";

const countries = [
  { id: "us", label: "United States" },
  { id: "ca", label: "Canada" },
  { id: "uk", label: "United Kingdom" },
  { id: "au", label: "Australia" },
  { id: "de", label: "Germany" },
  { id: "fr", label: "France" },
  { id: "jp", label: "Japan" },
  { id: "in", label: "India" },
];

const phoneCodes = [
  { id: "us", label: "US", supportingText: "+1" },
  { id: "ca", label: "CA", supportingText: "+1" },
  { id: "uk", label: "UK", supportingText: "+44" },
  { id: "au", label: "AU", supportingText: "+61" },
  { id: "de", label: "DE", supportingText: "+49" },
  { id: "fr", label: "FR", supportingText: "+33" },
  { id: "jp", label: "JP", supportingText: "+81" },
  { id: "in", label: "IN", supportingText: "+91" },
];

export const SignupBusiness = ({ data, onDataUpdate, onNext, onPrevious }) => {
  const [errors, setErrors] = useState({});
  const [selectedPhoneCode, setSelectedPhoneCode] = useState(phoneCodes[0]);

  const validateForm = () => {
    const newErrors = {};

    if (!data.businessName.trim()) {
      newErrors.businessName = "Business name is required";
    }

    if (!data.role.trim()) {
      newErrors.role = "Role is required";
    }

    if (!data.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!data.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!data.country.trim()) {
      newErrors.country = "Country is required";
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
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Business Details</h1>
        <p className="text-sm sm:text-base text-gray-600">
          Provide information about your company
        </p>
      </div>

      {/* Form */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Business Name*"
            placeholder="Enter your Business name"
            value={data.businessName}
            onChange={(value) => onDataUpdate({ businessName: value })}
            isInvalid={!!errors.businessName}
            hint={errors.businessName}
          />

          <Input
            label="Role*"
            placeholder="Enter your Role"
            value={data.role}
            onChange={(value) => onDataUpdate({ role: value })}
            isInvalid={!!errors.role}
            hint={errors.role}
          />
        </div>

        <Input
          label="Address*"
          placeholder="Enter your Address"
          value={data.address}
          onChange={(value) => onDataUpdate({ address: value })}
          isInvalid={!!errors.address}
          hint={errors.address}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="City*"
            placeholder="Enter your City"
            value={data.city}
            onChange={(value) => onDataUpdate({ city: value })}
            isInvalid={!!errors.city}
            hint={errors.city}
          />

          <Select
            label="Country*"
            placeholder="Select Country"
            items={countries}
            selectedKey={data.country}
            onSelectionChange={(key) => onDataUpdate({ country: key })}
            isInvalid={!!errors.country}
            hint={errors.country}
          >
            {(item) => (
              <Select.Item key={item.id} id={item.id}>
                {item.label}
              </Select.Item>
            )}
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Phone</label>
          <div className="flex space-x-2">
            <div className="w-24">
              <Select
                placeholder="US"
                items={phoneCodes}
                selectedKey={selectedPhoneCode.id}
                onSelectionChange={(key) => {
                  const code = phoneCodes.find(c => c.id === key);
                  if (code) setSelectedPhoneCode(code);
                }}
              >
                {(item) => (
                  <Select.Item key={item.id} id={item.id}>
                    <div className="flex items-center space-x-2">
                      <span>{item.label}</span>
                      <span className="text-gray-500">{item.supportingText}</span>
                    </div>
                  </Select.Item>
                )}
              </Select>
            </div>
            <div className="flex-1">
              <Input
                placeholder="Enter phone number"
                value={data.phone}
                onChange={(value) => onDataUpdate({ phone: value })}
              />
            </div>
          </div>
        </div>
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
          style={{ backgroundColor: '#2980B9' }}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
