import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Input } from '@/components/base/input/input'
import { Button } from '@/components/base/buttons/button'
import { useNavigate } from 'react-router'
import { useToast } from '@/components/base/toast'

function ForgotPassword() {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const { showSuccess, showError } = useToast()

    const validateEmail = (value) => {
        if (!value.trim()) return 'Email is required'
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!re.test(value)) return 'Please enter a valid email address'
        return ''
    }

    const handleEmailChange = (value) => {
        setEmail(value)
        setEmailError(validateEmail(value))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        // Validate before submit
        const msg = validateEmail(email)
        setEmailError(msg)
        if (msg) return
        setIsLoading(true)
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000))
            
            // Show success toast
            showSuccess(
                'OTP Sent Successfully!',
                'Please check your email for the verification code.',
                { duration: 4000 }
            )
            
            // Navigate after showing toast
            setTimeout(() => {
                navigate('/forgot-password/otp')
            }, 2000)
        } catch (err) {
            showError(
                'Failed to Send OTP',
                'Failed to send reset email. Please try again.',
                { duration: 5000 }
            )
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <div className="pt-[35px] ps-[37px] max-[1401px]:ps-3 max-[1401px]:pt-3">
                <img
                    className="h-12 w-auto max-[767px]:w-[197px] max-[767px]:object-contain"
                    src="/assets/loginPage/componyLogo.png"
                    alt="Company Logo"
                />
            </div>
            <div className="relative min-h-screen bg-white flex w-full mx-auto">
                <div className='main-welcome-back flex items-center w-full gap-[180px] justify-center max-[1024px]:flex-col max-[1024px]:gap-[30px] max-[1024px]:pt-[30px] max-[1501px]:justify-end'>
                    <div className="justify-center relative ps-3 max-[1024px]:px-3 max-[768px]:w-full">
                        <div className="mx-auto w-[360px] max-[768px]:w-full">
                            <div className="mb-8 max-[767px]:mb-4">
                                <h2 className="text-3xl text-[#101828] leading-[1.267] font-semibold max-[767px]:leading-[1.3]">Forgot Password</h2>
                                <p className="mt-3 text-base text-[#475467] font-normal leading-[1.5] max-[767px]:m-0">
                                    Enter your email address and we'll send you a link to reset your password.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className='mb-5'>
                                    <p className='leading-[1.429] text-sm font-medium text-[#344054] mb-1.5'>Email</p>
                                    <Input
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}   
                                        onChange={handleEmailChange}
                                        isRequired
                                        size="md"
                                        isInvalid={!!emailError}
                                        hint={emailError}
                                    />
                                </div>

                                {error && (
                                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                                        <p className="text-red-600 text-sm">{error}</p>
                                    </div>
                                )}

                                <div className='mb-8 mt-6 max-[767px]:mb-3'>
                                    <Button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full bg-[#2980B9] text-base leading-[1.5] text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-50 ease-in-out transform hover:bg-[#1f5f8b] hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] active:bg-[#1a4d73] focus:outline-none focus:ring-2 focus:ring-[#2980B9] focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isLoading ? 'Sending...' : 'Send otp'}
                                    </Button>
                                </div>

                                <div className="text-center">
                                    <p className="text-sm text-[#475467] font-normal leading-[1.429]">
                                        Remember your password?{' '}
                                        <Button
                                            color="link-color"
                                            size="sm"
                                            onClick={() => navigate('/')}
                                            className="text-sm text-[#2980B9]"
                                        >
                                            Sign in
                                        </Button>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword
