import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/base/buttons/button'
import { Input } from '@/components/base/input/input'

interface SettingsContentProps {
  activeTab: string
}

// Icons

const UploadIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
  </svg>
)

const DownloadIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
)

const EyeIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
)

const EyeOffIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
  </svg>
)

const QuestionMarkIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const CheckIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
)


const ChevronDownIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
)

// Sample data
const countries = [
  { value: 'us', label: 'United States' },
  { value: 'au', label: 'Australia' },
  { value: 'ca', label: 'Canada' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'jp', label: 'Japan' },
  { value: 'in', label: 'India' },
  { value: 'br', label: 'Brazil' },
  { value: 'mx', label: 'Mexico' },
  { value: 'it', label: 'Italy' },
  { value: 'es', label: 'Spain' },
  { value: 'nl', label: 'Netherlands' },
  { value: 'se', label: 'Sweden' },
  { value: 'no', label: 'Norway' },
  { value: 'dk', label: 'Denmark' },
  { value: 'fi', label: 'Finland' },
  { value: 'ch', label: 'Switzerland' },
  { value: 'at', label: 'Austria' },
  { value: 'be', label: 'Belgium' },
  { value: 'ie', label: 'Ireland' },
  { value: 'nz', label: 'New Zealand' },
  { value: 'sg', label: 'Singapore' },
  { value: 'hk', label: 'Hong Kong' },
  { value: 'kr', label: 'South Korea' },
  { value: 'cn', label: 'China' },
  { value: 'th', label: 'Thailand' },
  { value: 'my', label: 'Malaysia' },
  { value: 'ph', label: 'Philippines' },
  { value: 'id', label: 'Indonesia' },
  { value: 'vn', label: 'Vietnam' },
  { value: 'za', label: 'South Africa' },
  { value: 'eg', label: 'Egypt' },
  { value: 'ng', label: 'Nigeria' },
  { value: 'ke', label: 'Kenya' },
  { value: 'ma', label: 'Morocco' },
  { value: 'ar', label: 'Argentina' },
  { value: 'cl', label: 'Chile' },
  { value: 'co', label: 'Colombia' },
  { value: 'pe', label: 'Peru' },
  { value: 've', label: 'Venezuela' },
  { value: 'ru', label: 'Russia' },
  { value: 'pl', label: 'Poland' },
  { value: 'cz', label: 'Czech Republic' },
  { value: 'hu', label: 'Hungary' },
  { value: 'ro', label: 'Romania' },
  { value: 'bg', label: 'Bulgaria' },
  { value: 'hr', label: 'Croatia' },
  { value: 'si', label: 'Slovenia' },
  { value: 'sk', label: 'Slovakia' },
  { value: 'lt', label: 'Lithuania' },
  { value: 'lv', label: 'Latvia' },
  { value: 'ee', label: 'Estonia' },
  { value: 'gr', label: 'Greece' },
  { value: 'pt', label: 'Portugal' },
  { value: 'tr', label: 'Turkey' },
  { value: 'il', label: 'Israel' },
  { value: 'ae', label: 'United Arab Emirates' },
  { value: 'sa', label: 'Saudi Arabia' },
  { value: 'qa', label: 'Qatar' },
  { value: 'kw', label: 'Kuwait' },
  { value: 'bh', label: 'Bahrain' },
  { value: 'om', label: 'Oman' },
]


const billingData = [
  { id: 1, date: 'Dec 1, 2024', amount: '$29.00', status: 'Paid', cycle: 'Monthly', invoice: 'INV-001' },
  { id: 2, date: 'Nov 1, 2024', amount: '$29.00', status: 'Paid', cycle: 'Monthly', invoice: 'INV-002' },
  { id: 3, date: 'Oct 1, 2024', amount: '$29.00', status: 'Paid', cycle: 'Monthly', invoice: 'INV-003' },
  { id: 4, date: 'Sep 1, 2024', amount: '$19.00', status: 'Paid', cycle: 'Monthly', invoice: 'INV-004' },
  { id: 5, date: 'Aug 1, 2024', amount: '$19.00', status: 'Paid', cycle: 'Monthly', invoice: 'INV-005' },
]

export default function SettingsContent({ activeTab: initialActiveTab }: SettingsContentProps) {
  const [activeTab, setActiveTab] = useState(initialActiveTab || 'my-profile')
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
  // Image upload states
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null)
  
  // Dropdown states
  const [selectedCountry, setSelectedCountry] = useState('au')
  const [selectedPhoneCountry, setSelectedPhoneCountry] = useState('ad')
  const [isCountryOpen, setIsCountryOpen] = useState(false)
  const [isPhoneCountryOpen, setIsPhoneCountryOpen] = useState(false)

  // Refs for click outside detection
  const countryDropdownRef = useRef<HTMLDivElement>(null)
  const phoneCountryDropdownRef = useRef<HTMLDivElement>(null)

  // Debug logging
  console.log('Current activeTab:', activeTab)

  // Click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(target)) {
        setIsCountryOpen(false)
      }
      if (phoneCountryDropdownRef.current && !phoneCountryDropdownRef.current.contains(target)) {
        setIsPhoneCountryOpen(false)
      }
    }

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsCountryOpen(false)
        setIsPhoneCountryOpen(false)
      }
    }

    if (isCountryOpen || isPhoneCountryOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscapeKey)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [isCountryOpen, isPhoneCountryOpen])

  // Custom Dropdown Component
  const CustomDropdown = ({ 
    options, 
    value, 
    onChange, 
    isOpen, 
    setIsOpen, 
    placeholder = "Select an option" 
  }: {
    options: Array<{ value: string; label: string }>
    value: string
    onChange: (value: string) => void
    isOpen: boolean
    setIsOpen: (open: boolean) => void
    placeholder?: string
  }) => {
    const selectedOption = options.find(option => option.value === value)
    const validOptions = options.filter(option => option && option.value && option.label && option.value.trim() !== '' && option.label.trim() !== '')
    
    return (
      <div className="relative">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setIsOpen(!isOpen)
          }}
          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-left bg-white focus:outline-none focus:ring-2 focus:ring-[#2980B9] focus:border-[#2980B9] transition-colors duration-200 hover:border-gray-400 flex items-center justify-between cursor-pointer"
        >
          <span className={selectedOption ? 'text-black' : 'text-gray-500'}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <div className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
            <ChevronDownIcon />
          </div>
        </button>
        
        {isOpen && validOptions.length > 0 && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-xl max-h-48 sm:max-h-60 overflow-auto">
            {validOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  onChange(option.value)
                  setIsOpen(false)
                }}
                className={`w-full px-3 py-2 sm:py-2.5 text-left text-xs sm:text-sm transition-colors duration-150 first:rounded-t-lg last:rounded-b-lg cursor-pointer ${
                  option.value === value 
                    ? 'bg-[#2980B9] text-white hover:bg-[#2980B9]/90' 
                    : 'text-black hover:bg-gray-50'
                }`}
              >
                <span className="block truncate">{option.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    )
  }

  // Handle profile image upload
  const handleProfileImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/svg+xml']
      if (!validTypes.includes(file.type)) {
        alert('Please upload a valid image file (JPEG, PNG, GIF, or SVG)')
        return
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB')
        return
      }
      
      setProfileImageFile(file)
      
      // Create preview URL
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }
  // Handle drag and drop for profile image
  const handleProfileImageDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/svg+xml']
      if (!validTypes.includes(file.type)) {
        alert('Please upload a valid image file (JPEG, PNG, GIF, or SVG)')
        return
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB')
        return
      }
      
      setProfileImageFile(file)
      
      // Create preview URL
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }


  const renderMyProfile = () => (
    <div className="space-y-8">
      {/* Personal Info Section */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-base sm:text-lg font-semibold text-black">Personal info</h3>
            <p className="text-xs sm:text-sm text-tertiary">Update your photo and personal details here.</p>
          </div>
          <div className="flex flex-col xs:flex-row gap-2 xs:gap-3 w-full xs:w-auto">
            <Button color="secondary" size="sm" className="w-full xs:w-auto">Cancel</Button>
            <Button color="primary" size="sm" className='w-full xs:w-auto bg-[#2980B9] hover:bg-[#2980B9]/80'>Save</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Name Fields */}
          <div className="space-y-4">
            <Input
              label="First name *"
              placeholder="Olivia"
              defaultValue="Olivia"
              size="md"
            />
            
          </div>

          {/* Email */}
          <div className="space-y-4">
            <Input
              label="Email address *"
              placeholder="olivia@untitledui.com"
              defaultValue="olivia@untitledui.com"
              size="md"
            />
          </div>
        </div>

        {/* Profile Photo */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-black">Your photo</label>
            <QuestionMarkIcon />
          </div>
          <p className="text-sm text-tertiary">This will be displayed on your profile.</p>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            {/* Current Photo */}
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0 mx-auto sm:mx-0">
              {profileImage ? (
                <>
                  <img 
                    src={profileImage} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </>
              ) : (
                <img 
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Upload Area */}
            <div className="flex-1 w-full max-w-md">
              <label htmlFor="profile-image-upload" className="cursor-pointer">
              <div 
                  className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 text-center hover:border-brand transition-colors"
                  onDrop={handleProfileImageDrop}
                  onDragOver={(e) => e.preventDefault()}
                  onDragEnter={(e) => e.preventDefault()}
                >
                  <UploadIcon />
                  <p className="text-xs sm:text-sm font-medium text-black mb-1">Click to upload or drag and drop</p>
                  <p className="text-xs text-tertiary">SVG, PNG, JPG or GIF (max. 5MB)</p>
                  <div className="mt-2">
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-600">
                      {profileImageFile ? profileImageFile.name.split('.').pop()?.toUpperCase() : '.JPG'}
                    </span>
                  </div>
                </div>
              </label>
              <input
                id="profile-image-upload"
                type="file"
                accept="image/*"
                onChange={handleProfileImageUpload}
                className="hidden"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Business Details Section */}
      <div className="space-y-6 pt-8 border-t border-gray-200">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-base sm:text-lg font-semibold text-black">Business Details</h3>
            <p className="text-xs sm:text-sm text-tertiary">Update your business details here.</p>
          </div>
          <div className="flex flex-col xs:flex-row gap-2 xs:gap-3 w-full xs:w-auto">
            <Button color="secondary" size="sm" className="w-full xs:w-auto">Cancel</Button>
            <Button color="primary" size="sm" className='w-full xs:w-auto bg-[#2980B9] hover:bg-[#2980B9]/80'>Save</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {/* Left Column */}
          <div className="space-y-4 sm:space-y-6">
            {/* Business Name */}
            <Input
              label="Business Name *"
              placeholder="Enter your Business name"
              defaultValue=""
              size="md"
            />
            
            {/* Address */}
            <Input
              label="Address *"
              placeholder="Enter your Address"
              defaultValue=""
              size="md"
            />
            
            {/* Country */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-black">Country *</label>
              <div ref={countryDropdownRef} className="relative">
                <CustomDropdown
                  options={countries}
                  value={selectedCountry}
                  onChange={setSelectedCountry}
                  isOpen={isCountryOpen}
                  setIsOpen={setIsCountryOpen}
                  placeholder="Select Country"
                />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4 sm:space-y-6">
            {/* Role */}
            <Input
              label="Role *"
              placeholder="Enter your Role"
              defaultValue=""
              size="md"
            />
            
            {/* City */}
            <Input
              label="City *"
              placeholder="Enter your City"
              defaultValue=""
              size="md"
            />
            
            {/* Phone */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-black">Phone</label>
              <div className="flex gap-2">
                {/* Country Code Dropdown */}
                <div className="w-24 flex-shrink-0" ref={phoneCountryDropdownRef}>
                  <CustomDropdown
                    options={[
                      { value: 'ad', label: 'A. +376' },
                      { value: 'us', label: 'A. +1' },
                      { value: 'au', label: 'A. +61' },
                      { value: 'ca', label: 'A. +1' },
                      { value: 'uk', label: 'A. +44' },
                      { value: 'de', label: 'A. +49' },
                      { value: 'fr', label: 'A. +33' },
                      { value: 'jp', label: 'A. +81' },
                      { value: 'in', label: 'A. +91' },
                      { value: 'br', label: 'A. +55' },
                      { value: 'mx', label: 'A. +52' },
                      { value: 'it', label: 'A. +39' },
                      { value: 'es', label: 'A. +34' },
                      { value: 'nl', label: 'A. +31' },
                      { value: 'se', label: 'A. +46' },
                      { value: 'no', label: 'A. +47' },
                      { value: 'dk', label: 'A. +45' },
                      { value: 'fi', label: 'A. +358' },
                      { value: 'ch', label: 'A. +41' },
                      { value: 'at', label: 'A. +43' },
                      { value: 'be', label: 'A. +32' },
                      { value: 'ie', label: 'A. +353' },
                      { value: 'nz', label: 'A. +64' },
                      { value: 'sg', label: 'A. +65' },
                      { value: 'hk', label: 'A. +852' },
                      { value: 'kr', label: 'A. +82' },
                      { value: 'cn', label: 'A. +86' },
                      { value: 'th', label: 'A. +66' },
                      { value: 'my', label: 'A. +60' },
                      { value: 'ph', label: 'A. +63' },
                      { value: 'id', label: 'A. +62' },
                      { value: 'vn', label: 'A. +84' },
                      { value: 'za', label: 'A. +27' },
                      { value: 'eg', label: 'A. +20' },
                      { value: 'ng', label: 'A. +234' },
                      { value: 'ke', label: 'A. +254' },
                      { value: 'ma', label: 'A. +212' },
                      { value: 'ar', label: 'A. +54' },
                      { value: 'cl', label: 'A. +56' },
                      { value: 'co', label: 'A. +57' },
                      { value: 'pe', label: 'A. +51' },
                      { value: 've', label: 'A. +58' },
                      { value: 'ru', label: 'A. +7' },
                      { value: 'pl', label: 'A. +48' },
                      { value: 'cz', label: 'A. +420' },
                      { value: 'hu', label: 'A. +36' },
                      { value: 'ro', label: 'A. +40' },
                      { value: 'bg', label: 'A. +359' },
                      { value: 'hr', label: 'A. +385' },
                      { value: 'si', label: 'A. +386' },
                      { value: 'sk', label: 'A. +421' },
                      { value: 'lt', label: 'A. +370' },
                      { value: 'lv', label: 'A. +371' },
                      { value: 'ee', label: 'A. +372' },
                      { value: 'gr', label: 'A. +30' },
                      { value: 'pt', label: 'A. +351' },
                      { value: 'tr', label: 'A. +90' },
                      { value: 'il', label: 'A. +972' },
                      { value: 'ae', label: 'A. +971' },
                      { value: 'sa', label: 'A. +966' },
                      { value: 'qa', label: 'A. +974' },
                      { value: 'kw', label: 'A. +965' },
                      { value: 'bh', label: 'A. +973' },
                      { value: 'om', label: 'A. +968' }
                    ]}
                    value={selectedPhoneCountry}
                    onChange={setSelectedPhoneCountry}
                    isOpen={isPhoneCountryOpen}
                    setIsOpen={setIsPhoneCountryOpen}
                    placeholder="A. +376"
                  />
                </div>
                {/* Phone Number Input */}
                <div className="flex-1">
                  <Input
                    placeholder="Enter phone number"
                    defaultValue=""
                    size="md"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderPassword = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-black">Password</h3>
        <p className="text-sm text-tertiary">Update your password to keep your account secure.</p>
      </div>

      <div className="max-w-md space-y-4 sm:space-y-6">
        {/* Current Password */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-black">Current password *</label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter current password"
              size="md"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-black">New password *</label>
          <div className="relative">
            <Input
              type={showNewPassword ? "text" : "password"}
              placeholder="Enter new password"
              size="md"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showNewPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
          <p className="text-xs text-tertiary">Must be at least 8 characters long.</p>
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-black">Confirm new password *</label>
          <div className="relative">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm new password"
              size="md"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col xs:flex-row gap-2 xs:gap-3 pt-4">
          <Button color="secondary" size="md" className="w-full xs:w-auto">Cancel</Button>
          <Button color="primary" size="md" className='w-full xs:w-auto bg-[#2980B9] hover:bg-[#2980B9]/80'>Update password</Button>
        </div>
      </div>
    </div>
  ) 

  const renderSubscription = () => (
    <div className="space-y-8">
      {/* Active Subscription Plan */}
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-black">Active subscription plan</h3>
          <p className="text-sm text-tertiary">Manage your current subscription and billing.</p>
        </div>

        {/* Beautiful Subscription Plan Card */}
        <div className="relative bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300">
          {/* Decorative Elements */}
          <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-tr from-[#2980B9]/5 to-transparent rounded-full translate-y-6 sm:translate-y-8 lg:translate-y-12 -translate-x-6 sm:-translate-x-8 lg:-translate-x-12"></div>
          
          <div className="relative z-10">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4 sm:mb-6">
              <div className="space-y-2 flex-1 min-w-0">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#2980B9] to-[#1e5a8a] rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-black truncate">Pro Plan</h4>
                    <p className="text-xs sm:text-sm text-tertiary">Premium features for professionals</p>
                  </div>
                </div>
                <div className="flex flex-col xs:flex-row xs:items-baseline gap-1 xs:gap-2">
                  <div className="flex items-baseline gap-1 xs:gap-2">
                    <span className="text-2xl sm:text-3xl font-bold text-black">$29</span>
                    <span className="text-sm sm:text-base text-tertiary">/month</span>
                  </div>
                  <span className="text-xs text-tertiary bg-gray-100 px-2 py-1 rounded-full w-fit">Billed monthly</span>
                </div>
              </div>
              
              {/* Status Badge */}
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="inline-flex items-center px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium bg-green-100 text-green-800 border border-green-200">
                  Active
                </span>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-white/50 transition-colors">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckIcon />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-medium text-black">Unlimited projects</p>
                  <p className="text-xs text-tertiary">Create as many projects as you need</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-white/50 transition-colors">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckIcon />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-medium text-black">Advanced analytics</p>
                  <p className="text-xs text-tertiary">Detailed insights and reporting</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-white/50 transition-colors">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckIcon />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-medium text-black">Priority support</p>
                  <p className="text-xs text-tertiary">24/7 dedicated support team</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-white/50 transition-colors">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckIcon />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-medium text-black">Custom integrations</p>
                  <p className="text-xs text-tertiary">Connect with your favorite tools</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <Button 
                color="primary" 
                size="sm" 
                className="bg-gradient-to-r from-[#2980B9] to-[#1e5a8a] hover:from-[#1e5a8a] hover:to-[#2980B9] shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
              >
                <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                <span className="text-xs sm:text-sm">Upgrade plan</span>
              </Button>
              <Button 
                color="secondary" 
                size="sm" 
                className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all duration-300 w-full sm:w-auto"
              >
                <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span className="text-xs sm:text-sm">Cancel subscription</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Billing Table */}
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-black">Billing history</h3>
          <p className="text-sm text-tertiary">View and download your past invoices.</p>
        </div>

        {/* Mobile Card View */}
        <div className="block sm:hidden space-y-3">
          {billingData.map((item) => (
            <div key={item.id} className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-black">{item.date}</span>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {item.status}
                  </span>
                </div>
                <span className="text-lg font-bold text-black">{item.amount}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-tertiary">
                <span>{item.cycle}</span>
                <span>{item.invoice}</span>
              </div>
              <div className="flex justify-end">
                <button className="flex items-center gap-1 text-[#2980B9] hover:text-[#2980B9]/80 cursor-pointer text-sm">
                  <DownloadIcon />
                  <span>Download</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table View */}
        <div className="hidden sm:block bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Billing cycle
                  </th>
                  <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Invoice
                  </th>
                  <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {billingData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-sm text-black">
                      {item.date}
                    </td>
                    <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
                      {item.amount}
                    </td>
                    <td className="px-3 lg:px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {item.status}
                      </span>
                    </td>
                    <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-sm text-tertiary">
                      {item.cycle}
                    </td>
                    <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-sm text-tertiary">
                      {item.invoice}
                    </td>
                    <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-sm">
                      <button className="flex items-center gap-1 text-[#2980B9] hover:text-[#2980B9]/80 cursor-pointer">
                        <DownloadIcon />
                        <span className="hidden lg:inline">Download</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-xl sm:text-2xl font-bold text-black">Settings</h1>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-4 sm:space-x-8 overflow-x-auto scrollbar-hide">
          {[
            { id: 'my-profile', label: 'My profile' },
            { id: 'password', label: 'Password' },
            { id: 'subscription', label: 'Subscription' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                console.log('Switching to tab:', tab.id)
                setActiveTab(tab.id)
              }}
              className={`py-3 sm:py-4 px-2 sm:px-1 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap transition-colors duration-200 cursor-pointer ${
                activeTab === tab.id
                  ? 'border-[#2980B9] text-[#2980B9] font-semibold'
                  : 'border-transparent text-tertiary hover:text-secondary hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="py-4 sm:py-6">
        {activeTab === 'my-profile' && renderMyProfile()}
        {activeTab === 'password' && renderPassword()}
        {activeTab === 'subscription' && renderSubscription()}
        {!activeTab && (
          <div className="text-center py-8 sm:py-12">
            <p className="text-sm sm:text-base text-tertiary">Please select a tab to view settings</p>
          </div>
        )}
      </div>
    </motion.div>
  )
}
