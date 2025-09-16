import React, { useState, useRef, useEffect } from 'react'
import './otp-input.css'

const OTPInput = ({ 
    length = 6, 
    value = '', 
    onChange, 
    onComplete,
    isInvalid = false,
    hint = '',
    className = '',
    disabled = false
}) => {
    const [otp, setOtp] = useState(Array(length).fill(''))
    const [activeIndex, setActiveIndex] = useState(0)
    const inputRefs = useRef([])

    useEffect(() => {
        // Initialize OTP array with current value
        const otpArray = Array(length).fill('')
        for (let i = 0; i < Math.min(value.length, length); i++) {
            otpArray[i] = value[i] || ''
        }
        setOtp(otpArray)
    }, [value, length])

    useEffect(() => {
        // Focus the first empty field or the last field
        const nextIndex = otp.findIndex(digit => digit === '')
        const targetIndex = nextIndex !== -1 ? nextIndex : length - 1
        setActiveIndex(targetIndex)
        if (inputRefs.current[targetIndex]) {
            inputRefs.current[targetIndex].focus()
        }
    }, [])

    const handleChange = (index, inputValue) => {
        // Only allow single digit
        if (inputValue.length > 1) {
            inputValue = inputValue.slice(-1)
        }

        // Only allow numbers
        if (inputValue && !/^\d$/.test(inputValue)) {
            return
        }

        const newOtp = [...otp]
        newOtp[index] = inputValue
        setOtp(newOtp)

        const otpString = newOtp.join('')
        onChange?.(otpString)

        // Auto-focus next field
        if (inputValue && index < length - 1) {
            const nextIndex = index + 1
            setActiveIndex(nextIndex)
            setTimeout(() => {
                inputRefs.current[nextIndex]?.focus()
            }, 150)
        }

        // Check if OTP is complete
        if (otpString.length === length && !otpString.includes('')) {
            onComplete?.(otpString)
        }
    }

    const handleKeyDown = (index, e) => {
        // Handle backspace
        if (e.key === 'Backspace') {
            e.preventDefault()
            
            if (otp[index]) {
                // Clear current field
                const newOtp = [...otp]
                newOtp[index] = ''
                setOtp(newOtp)
                onChange?.(newOtp.join(''))
            } else if (index > 0) {
                // Move to previous field
                const prevIndex = index - 1
                setActiveIndex(prevIndex)
                setTimeout(() => {
                    inputRefs.current[prevIndex]?.focus()
                }, 150)
            }
        }

        // Handle arrow keys
        if (e.key === 'ArrowLeft' && index > 0) {
            e.preventDefault()
            const prevIndex = index - 1
            setActiveIndex(prevIndex)
            inputRefs.current[prevIndex]?.focus()
        }

        if (e.key === 'ArrowRight' && index < length - 1) {
            e.preventDefault()
            const nextIndex = index + 1
            setActiveIndex(nextIndex)
            inputRefs.current[nextIndex]?.focus()
        }
    }

    const handlePaste = (e) => {
        e.preventDefault()
        const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length)
        
        if (pastedData) {
            const newOtp = Array(length).fill('')
            for (let i = 0; i < pastedData.length; i++) {
                newOtp[i] = pastedData[i]
            }
            setOtp(newOtp)
            onChange?.(pastedData)
            
            // Focus the next empty field or last field
            const nextIndex = Math.min(pastedData.length, length - 1)
            setActiveIndex(nextIndex)
            setTimeout(() => {
                inputRefs.current[nextIndex]?.focus()
            }, 150)
        }
    }

    const handleFocus = (index) => {
        setActiveIndex(index)
    }

    return (
        <div className={`otp-input-container ${className}`}>
            <div className="flex gap-3 justify-center">
                {otp.map((digit, index) => (
                    <div
                        key={index}
                        className={`
                            otp-field-wrapper relative transition-all duration-300 ease-in-out
                            ${activeIndex === index ? 'active transform scale-110' : 'transform scale-100'}
                        `}
                    >
                        <input
                            ref={(el) => (inputRefs.current[index] = el)}
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]"
                            value={digit}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            onPaste={handlePaste}
                            onFocus={() => handleFocus(index)}
                            disabled={disabled}
                            className={`
                                w-14 h-14 text-center text-2xl font-bold
                                border-2 rounded-xl transition-all duration-300 ease-in-out
                                focus:outline-none focus:ring-4 focus:ring-opacity-20
                                ${isInvalid 
                                    ? 'border-red-500 bg-red-50 focus:ring-red-500 text-red-600' 
                                    : digit && !isInvalid
                                        ? 'border-green-500 bg-green-50 text-green-600 shadow-md'
                                        : activeIndex === index 
                                            ? 'border-[#2980B9] bg-blue-50 focus:ring-[#2980B9] text-[#2980B9] shadow-lg' 
                                            : 'border-gray-300 bg-white hover:border-gray-400 text-gray-700 hover:shadow-md'
                                }
                                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-text'}
                            `}
                            maxLength={1}
                            autoComplete="off"
                        />
                        {/* Animated border effect */}
                        {activeIndex === index && !isInvalid && !digit && (
                            <div className="absolute inset-0 rounded-xl border-2 border-[#2980B9] animate-ping opacity-20 pointer-events-none"></div>
                        )}
                        {/* Success pulse effect for filled fields */}
                        {digit && !isInvalid && (
                            <div className="absolute inset-0 rounded-xl border-2 border-green-500 animate-pulse opacity-30 pointer-events-none"></div>
                        )}
                    </div>
                ))}
            </div>
            {hint && (
                <p className={`text-sm mt-3 text-center transition-colors duration-200 ${isInvalid ? 'text-red-500' : 'text-gray-500'}`}>
                    {hint}
                </p>
            )}
        </div>
    )
}

export default OTPInput
