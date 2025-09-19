import React, { useState } from 'react'
import { Input } from '@/components/base/input/input'
import { Button } from '@/components/base/buttons/button'
import { useNavigate } from 'react-router'
import { useToast } from '@/components/base/toast'

function ChangePassword() {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [confirmError, setConfirmError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const { showSuccess, showError } = useToast()

    const validatePassword = (value) => {
        if (!value.trim()) return 'New password is required'
        if (value.length < 8) return 'Password must be at least 8 characters'
        return ''
    }

    const validateConfirm = (value, pass) => {
        if (!value.trim()) return 'Please confirm your password'
        if (value !== pass) return 'Passwords do not match'
        return ''
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const pErr = validatePassword(password)
        const cErr = validateConfirm(confirmPassword, password)
        setPasswordError(pErr)
        setConfirmError(cErr)
        if (pErr || cErr) return
        setIsLoading(true)
        try {
            await new Promise(r => setTimeout(r, 1000))
            
            // Show success toast
            showSuccess(
                'Password Changed Successfully!',
                'Your password has been updated. Redirecting to login...',
                { duration: 4000 }
            )
            
            // Navigate after showing toast
            setTimeout(() => {
                navigate('/')
            }, 2000)
        } catch (err) {
            showError(
                'Password Change Failed',
                'Failed to update password. Please try again.',
                { duration: 5000 }
            )
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="relative min-h-screen bg-white flex w-full mx-auto">
            <div className='main-welcome-back flex items-center w-full justify-center max-[1024px]:flex-col max-[1024px]:pt-[30px]'>
                <div className="justify-center relative px-3 w-full max-w-[360px]">
                    <div className="mb-8">
                        <h2 className="text-3xl text-[var(--color-text-primary)] font-semibold">Change Password</h2>
                        <p className="mt-3 text-base text-[var(--color-text-tertiary)]">Set a new password for your account.</p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className='mb-5'>
                            <p className='text-sm font-medium text-[var(--color-text-secondary)] mb-1.5'>New Password</p>
                            <Input
                                type="password"
                                placeholder="Enter new password"
                                value={password}
                                onChange={setPassword}
                                isRequired
                                size="md"
                                isInvalid={!!passwordError}
                                hint={passwordError}
                            />
                        </div>
                        <div className='mb-6'>
                            <p className='text-sm font-medium text-[var(--color-text-secondary)] mb-1.5'>Confirm Password</p>
                            <Input
                                type="password"
                                placeholder="Confirm new password"
                                value={confirmPassword}
                                onChange={setConfirmPassword}
                                isRequired
                                size="md"
                                isInvalid={!!confirmError}
                                hint={confirmError}
                            />
                        </div>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[var(--color-brand-primary)] text-white py-2.5 rounded-lg"
                        >
                            {isLoading ? 'Updating...' : 'Update Password'}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword


