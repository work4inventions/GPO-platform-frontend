import React, { useState } from 'react'
import OTPInput from '@/components/base/input/otp-input'
import { Button } from '@/components/base/buttons/button'
import { useNavigate } from 'react-router'
import { useToast } from '@/components/base/toast'

function ForgotPasswordOtp() {
    const [otp, setOtp] = useState('')
    const [otpError, setOtpError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const { showSuccess, showError } = useToast()

    const validateOtp = (value, isComplete = false) => {
        if (!value.trim()) return 'OTP is required'
        if (isComplete && !/^\d{6}$/.test(value)) return 'Enter a valid 6-digit OTP'
        return ''
    }

    const handleOtpChange = (value) => {
        setOtp(value)
        // Only show error if user has completed typing and it's invalid
        if (value.length === 6) {
            setOtpError(validateOtp(value, true))
        } else {
            // Clear error while typing
            setOtpError('')
        }
    }

    const handleOtpComplete = (value) => {
        setOtp(value)
        const error = validateOtp(value, true)
        setOtpError(error)
        if (!error) {
            // Auto-submit when OTP is complete
            handleSubmit({ preventDefault: () => {} })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const msg = validateOtp(otp, true)
        setOtpError(msg)
        if (msg) return
        setIsLoading(true)
        try {
            await new Promise(r => setTimeout(r, 800))
            
            // Simulate OTP verification - in real app, this would be an API call
            // For demo purposes, we'll simulate a 50% chance of success
            const isOtpValid = Math.random() > 0.5
            
            if (isOtpValid) {
                // Show success toast
                showSuccess(
                    'OTP Verified Successfully!',
                    'Redirecting to password change page...',
                    { duration: 3000 }
                )
                
                // Navigate after showing toast
                setTimeout(() => {
                    navigate('/forgot-password/change')
                }, 1500)
            } else {
                // Show error toast for invalid OTP
                showError(
                    'OTP Verification Failed',
                    'Invalid OTP. Please try again.',
                    { duration: 5000 }
                )
                setOtpError('Invalid OTP. Please try again.')
            }
        } catch (err) {
            showError(
                'OTP Verification Failed',
                'Something went wrong. Please try again.',
                { duration: 5000 }
            )
            setOtpError('Something went wrong. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="relative min-h-screen bg-white flex w-full mx-auto">
            <div className='main-welcome-back flex items-center w-full justify-center max-[1024px]:flex-col max-[1024px]:pt-[30px]'>
                <div className="justify-center relative px-3 w-full max-w-[360px]">
                    <div className="mb-8">
                        <h2 className="text-3xl text-[var(--color-text-primary)] font-semibold">Enter OTP</h2>
                        <p className="mt-3 text-base text-[var(--color-text-tertiary)]">We have sent an OTP to your email.</p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className='mb-5'>
                            <p className='text-sm font-medium text-[var(--color-text-secondary)] mb-1.5 text-center'>One-Time Password</p>
                            <OTPInput
                                length={6}
                                value={otp}
                                onChange={handleOtpChange}
                                onComplete={handleOtpComplete}
                                isInvalid={!!otpError}
                                hint={otpError} 
                                disabled={isLoading}
                            />
                        </div>
                        <Button
                            type="submit"
                            disabled={isLoading || otp.length !== 6}
                            className="w-full bg-[var(--color-brand-primary)] text-white py-2.5 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Verifying...' : 'Verify OTP'}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ForgotPasswordOtp


