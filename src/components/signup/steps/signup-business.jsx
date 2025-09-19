import { useState, useEffect } from "react";
import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import { Button } from "@/components/base/buttons/button";
import { all } from "country-codes-list";

// Get all countries from the library
const allCountries = all();

// Transform the data for our dropdowns
const countries = allCountries.map(country => ({
  id: country.countryCode,
  label: country.countryNameEn,
  flag: country.flag
}));

// Create phone codes from the same data
const phoneCodes = allCountries.map(country => ({
  id: country.countryCode,
  label: country.countryCode,
  supportingText: `+${country.countryCallingCode}`,
  flag: country.flag
}));

export const SignupBusiness = ({ data, onDataUpdate, onNext, onPrevious }) => {
  const [errors, setErrors] = useState({});
  const [selectedPhoneCode, setSelectedPhoneCode] = useState(phoneCodes[0]);

  // Function to handle country selection and update phone code
  const handleCountryChange = (countryCode) => {
    onDataUpdate({ country: countryCode });
    
    // Find the corresponding phone code for the selected country
    const matchingPhoneCode = phoneCodes.find(code => code.id === countryCode);
    if (matchingPhoneCode) {
      setSelectedPhoneCode(matchingPhoneCode);
    }
  };

  // Initialize phone code based on selected country
  useEffect(() => {
    if (data.country) {
      const matchingPhoneCode = phoneCodes.find(code => code.id === data.country);
      if (matchingPhoneCode) {
        setSelectedPhoneCode(matchingPhoneCode);
      }
    }
  }, [data.country]);

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
    <div className="space-y-6 w-[744px] max-md:px-5 max-md:w-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-3 leading-[1.266666666666667] max-md:text-center max-md:mt-[25px]">Business Details</h1>
        <p className="text-sm sm:text-base text-gray-600 max-md:text-center">
          Provide information about your company
        </p>
      </div>

      {/* Form */}
      <div className="space-y-4">
        <div className="flex gap-6 max-md:flex-col">
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

      <div className="flex gap-6 max-md:flex-col">
      <Input
          label="Address*"
          placeholder="Enter your Address"
          value={data.address}
          onChange={(value) => onDataUpdate({ address: value })}
          isInvalid={!!errors.address}
          hint={errors.address}
        />

        <Input
          label="City*"
          placeholder="Enter your City"
          value={data.city}
          onChange={(value) => onDataUpdate({ city: value })}
          isInvalid={!!errors.city}
          hint={errors.city}
        />
      </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


          <Select
            label="Country*"
            placeholder="Select Country"
            items={countries}
            selectedKey={data.country}
            onSelectionChange={handleCountryChange}
            isInvalid={!!errors.country}
            hint={errors.country}
          >
            {(item) => (
              <Select.Item key={item.id} id={item.id}>
                <div className="flex items-center space-x-2">
                  <span>{item.flag}</span>
                  <span>{item.label}</span>
                </div>
              </Select.Item>
            )}
          </Select>
          
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Phone</label>
          <div className="relative flex w-full items-center rounded-lg bg-primary shadow-xs ring-1 ring-primary ring-inset">
            <div className="min-w-28">
              <Select
                placeholder={`${selectedPhoneCode.flag} ${selectedPhoneCode.label} ${selectedPhoneCode.supportingText}`}
                items={phoneCodes}
                selectedKey={selectedPhoneCode.id}
                isDisabled={!data.country}
                className="[&>button]:bg-transparent [&>button]:ring-0 [&>button]:shadow-none [&>button]:rounded-none"
                onSelectionChange={(key) => {
                  const code = phoneCodes.find(c => c.id === key);
                  if (code) setSelectedPhoneCode(code);
                }}
              >
                {(item) => (
                  <Select.Item key={item.id} id={item.id}>
                    <div className="flex items-center space-x-2">
                      <span>{item.flag}</span>
                      <span className="font-medium">{item.label}</span>
                      <span className="text-gray-500">{item.supportingText}</span>
                    </div>
                  </Select.Item>
                )}
              </Select>
            </div>
            <input
              type="text"
              placeholder="Enter phone number"
              value={data.phone}
              onChange={(e) => onDataUpdate({ phone: e.target.value })}
              className="m-0 w-full bg-transparent text-md text-primary ring-0 outline-hidden px-3 py-2.5"
            />
          </div>
        </div>
        </div>

      </div>

      {/* Actions */}
      <div className=" flex w-full justify-between gap-6 max-md:flex-col">
        <Button
          size="md"
          color="secondary"
          className="md:w-[48%] w-full text-base leading-[1.5] font-semibold "
          onClick={onPrevious}
        >   
          Previous
        </Button>
       
      <Button
          size="md"
          className="md:w-[48%] w-full text-base leading-[1.5] font-semibold"
          onClick={handleNext}
          style={{ backgroundColor: '#2980B9' }}
        >
          Continue
        </Button>
        
      </div>
    </div>
  );
};
