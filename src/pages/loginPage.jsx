
import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Input } from '@/components/base/input/input'
import { Button } from '@/components/base/buttons/button'
import { Checkbox } from '@/components/base/checkbox/checkbox'
import { RatingStars } from '@/components/foundations/rating-stars'
import { ChevronLeft, ChevronRight } from '@untitledui/icons'
import { useNavigate } from 'react-router'
import { useToast } from '@/components/base/toast'

// Testimonial data
const testimonials = [
    {
        id: 1,
        quote: "This platform has transformed the way I connect with vendors and peers. Managing events, learning, and staying updated is now seamless — all in one place.",
        author: "Dr. Emily Carter",
        role: "Oral & Maxillofacial Surgeon",
        rating: 5
    },
    {
        id: 2,
        quote: "This platform has transformed the way I connect with vendors and peers. Managing events, learning, and staying updated is now seamless — all in one place.",
        author: "Dr. Emily Carter",
        role: "Oral & Maxillofacial Surgeon",
        rating: 5
    },
    {
        id: 3,
        quote: "The user experience is outstanding. Everything we need is right at our fingertips, making our daily workflow so much more efficient.",
        author: "Michael Chen",
        role: "Director of Technology, MedTech Solutions",
        rating: 5
    },
    {
        id: 4,
        quote: "We've seen a 40% improvement in our operational efficiency since implementing this platform. It's been a game-changer for our team.",
        author: "Lisa Rodriguez",
        role: "Chief Operations Officer, HealthFirst",
        rating: 5
    }
]

// Enhanced animation variants for stunning slide transitions
const slideVariants = {
    enter: (direction) => ({
        x: direction > 0 ? 400 : -400,
        opacity: 0,
        scale: 0.85,
        rotateY: direction > 0 ? 15 : -15,
        filter: "blur(8px)",
    }),
    center: {
        x: 0,
        opacity: 1,
        scale: 1,
        rotateY: 0,
        filter: "blur(0px)",
        transition: {
            type: "spring",
            stiffness: 120,
            damping: 20,
            mass: 1,
        }
    },
    exit: (direction) => ({
        x: direction < 0 ? 400 : -400,
        opacity: 0,
        scale: 0.85,
        rotateY: direction < 0 ? 15 : -15,
        filter: "blur(8px)",
        transition: {
            type: "spring",
            stiffness: 200,
            damping: 25,
            duration: 0.3,
        }
    }),
}

const slideTransition = {
    type: "spring",
    stiffness: 120,
    damping: 20,
    mass: 1,
}

const contentVariants = {
    hidden: {
        opacity: 0,
        y: 30,
        scale: 0.95,
        filter: "blur(4px)",
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15,
            staggerChildren: 0.08,
            delayChildren: 0.15,
        }
    },
}

const itemVariants = {
    hidden: {
        opacity: 0,
        y: 20,
        x: -10,
        scale: 0.9,
    },
    visible: {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 150,
            damping: 12,
            duration: 0.4,
        }
    },
}

const quoteVariants = {
    hidden: {
        opacity: 0,
        y: 40,
        scale: 0.9,
        rotateX: -10,
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        transition: {
            type: "spring",
            stiffness: 80,
            damping: 15,
            duration: 0.6,
        }
    },
}

const authorVariants = {
    hidden: {
        opacity: 0,
        y: 25,
        x: 20,
        scale: 0.95,
    },
    visible: {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 120,
            damping: 10,
            duration: 0.5,
        }
    },
}

const ratingVariants = {
    hidden: {
        opacity: 0,
        scale: 0.8,
        rotateZ: -10,
    },
    visible: {
        opacity: 1,
        scale: 1,
        rotateZ: 0,
        transition: {
            type: "spring",
            stiffness: 200,
            damping: 8,
            duration: 0.4,
            delay: 0.2,
        }
    },
}

const buttonVariants = {
    rest: {
        scale: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderColor: 'rgba(255, 255, 255, 0.3)',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
        rotateZ: 0,
    },
    hover: {
        scale: 1.08,
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        borderColor: 'rgba(255, 255, 255, 0.6)',
        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2), 0 0 20px rgba(255, 255, 255, 0.1)',
        rotateZ: 2,
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 25,
            duration: 0.3,
        },
    },
    tap: {
        scale: 0.92,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
        rotateZ: -1,
        transition: {
            type: "spring",
            stiffness: 600,
            damping: 20,
            duration: 0.1,
        },
    },
}

const buttonIconVariants = {
    rest: {
        scale: 1,
        rotate: 0,
        opacity: 0.9,
    },
    hover: {
        scale: 1.1,
        rotate: 5,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 500,
            damping: 20,
        },
    },
    tap: {
        scale: 0.9,
        rotate: -3,
        transition: {
            type: "spring",
            stiffness: 800,
            damping: 15,
            duration: 0.1,
        },
    },
}

function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)
    const [currentTestimonial, setCurrentTestimonial] = useState(0)
    const [direction, setDirection] = useState(0)
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [isAutoplay, setIsAutoplay] = useState(true)
    const [progress, setProgress] = useState(0)
    const navigate = useNavigate()
    const { showSuccess, showError } = useToast()
    const autoplayRef = useRef(null)
    const progressRef = useRef(null)

    // Validation functions
    const validateEmail = (email) => {
        if (!email.trim()) {
            return 'Email is required'
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return 'Please enter a valid email address'
        }
        return ''
    }

    const validatePassword = (password) => {
        if (!password.trim()) {
            return 'Password is required'
        }
        return ''
    }

    const validateForm = () => {
        const emailValidation = validateEmail(email)
        const passwordValidation = validatePassword(password)

        setEmailError(emailValidation)
        setPasswordError(passwordValidation)

        return !emailValidation && !passwordValidation
    }

    const handleEmailChange = (value) => {
        setEmail(value)

        // Validate on change (required + format)
        if (!value.trim()) {
            setEmailError('Email is required')
        } else {
            const msg = validateEmail(value)
            setEmailError(msg)
        }
    }

    const handlePasswordChange = (value) => {
        setPassword(value)

        // Validate on change (required)
        if (!value.trim()) {
            setPasswordError('Password is required')
        } else {
            setPasswordError('')
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        // Validate form before submission
        if (!validateForm()) {
            return
        }

        setIsLoading(true)

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000))

            // Show success toast
            showSuccess(
                'Login Successful!',
                'Redirecting to dashboard...',
                { duration: 3000 }
            )

            // Navigate after a short delay to show the toast
            setTimeout(() => {
                navigate('/dashboard')
            }, 1500)
        } catch (err) {
            showError(
                'Login Failed',
                'Invalid email or password. Please try again.',
                { duration: 5000 }
            )
        } finally {
            setIsLoading(false)
        }
    }

    // Autoplay functionality with progress tracking
    useEffect(() => {
        if (isAutoplay) {
            setProgress(0)
            autoplayRef.current = setInterval(() => {
                setDirection(1)
                setCurrentTestimonial((prev) =>
                    prev === testimonials.length - 1 ? 0 : prev + 1
                )
            }, 5000) // Change slide every 5 seconds
        } else {
            if (autoplayRef.current) {
                clearInterval(autoplayRef.current)
                autoplayRef.current = null
            }
        }

        return () => {
            if (autoplayRef.current) {
                clearInterval(autoplayRef.current)
            }
        }
    }, [isAutoplay])

    // Progress animation for autoplay
    useEffect(() => {
        if (isAutoplay) {
            setProgress(0)
            progressRef.current = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        return 0
                    }
                    return prev + 2 // Update every 100ms for smooth progress
                })
            }, 100)
        } else {
            if (progressRef.current) {
                clearInterval(progressRef.current)
                progressRef.current = null
            }
            setProgress(0)
        }

        return () => {
            if (progressRef.current) {
                clearInterval(progressRef.current)
            }
        }
    }, [isAutoplay, currentTestimonial])

    // Carousel navigation functions
    const goToPrevious = () => {
        setIsAutoplay(false) // Pause autoplay when user interacts
        setDirection(-1)
        setCurrentTestimonial((prev) =>
            prev === 0 ? testimonials.length - 1 : prev - 1
        )
        // Resume autoplay after 10 seconds of inactivity
        setTimeout(() => setIsAutoplay(true), 10000)
    }

    const goToNext = () => {
        setIsAutoplay(false) // Pause autoplay when user interacts
        setDirection(1)
        setCurrentTestimonial((prev) =>
            prev === testimonials.length - 1 ? 0 : prev + 1
        )
        // Resume autoplay after 10 seconds of inactivity
        setTimeout(() => setIsAutoplay(true), 10000)
    }

    // Get current testimonial
    const currentTestimonialData = testimonials[currentTestimonial]

    return (
        <>
            <div className=' flex h-screen relative overflow-hidden'>

                <div className='w-2/4 flex flex-col max-lg:w-full '>
                    {/* header logo */}
                    <div className="pt-[35px] ps-[37px] max-[1401px]:ps-3 max-[1401px]:pt-3">
                        <img
                            className="h-12 w-auto max-[767px]:w-[197px] max-[767px]:object-contain"
                            src="/assets/loginPage/componyLogo.png"
                            alt="Company Logo"
                        />
                    </div>

                    {/* form container */}
                    <div className=" relative ps-3 max-[1024px]:px-3 max-[768px]:w-full m-auto">
                        <div className="m-auto w-[360px] max-[768px]:w-full">
                            {/* Logo */}


                            {/* Form Header */}
                            <div className="mb-8 max-[767px]:mb-4">
                                <h2 className="text-3xl text-[#101828] leading-[1.267] font-semibold max-[767px]:leading-[1.3]">Welcome back</h2>
                                <p className="mt-3 text-base text-[#475467] font-normal leading-[1.5] max-[767px]:m-0">
                                    Welcome back! Please enter your details.
                                </p>
                            </div>

                            {/* Login Form */}
                            <form className="" onSubmit={handleSubmit}>
                                {/* Email Input */}
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

                                {/* Password Input */}
                                <div className='mb-6'>
                                    <p className='leading-[1.429] text-sm font-medium text-[#344054] mb-1.5'>Password</p>
                                    <Input
                                        type="password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={handlePasswordChange}
                                        isRequired
                                        size="md"
                                        isInvalid={!!passwordError}
                                        hint={passwordError}
                                    />
                                </div>

                                {/* Error Message */}
                                {error && (
                                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                                        <p className="text-red-600 text-sm">{error}</p>
                                    </div>
                                )}

                                {/* Remember me and Forgot password */}
                                <div className="flex items-center justify-between">
                                    <Checkbox
                                        isSelected={rememberMe}
                                        onChange={setRememberMe}
                                        label="Remember me"
                                        size="sm"
                                        className='leading-[1.429] text-sm text-black'
                                    />
                                    <Button
                                        color="link-gray"
                                        size="sm"
                                        onClick={() => navigate('/forgot-password')}
                                        className="text-sm text-[#425D7E] "
                                    >
                                        Forgot password?
                                    </Button>
                                </div>

                                {/* Sign In Button */}
                                <div className='mb-8 mt-6 max-[767px]:mb-3'>
                                    <Button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full bg-[#2980B9] text-base leading-[1.5] text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-50 ease-in-out transform hover:bg-[#1f5f8b] hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] active:bg-[#1a4d73] focus:outline-none focus:ring-2 focus:ring-[#2980B9] focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isLoading ? 'Signing in...' : 'Sign in'}
                                    </Button>
                                </div>

                                {/* Footer Text */}
                                <div className="text-center">
                                    <p className="text-sm text-[#475467] font-normal leading-[1.429]">
                                        Don't have an account?{' '}
                                        <Button
                                            color="link-color"
                                            size="sm"
                                            onClick={() => navigate('/signup')}
                                            className="text-sm text-[#2980B9]"
                                        >
                                            Sign up
                                        </Button>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
                <div className='w-2/4 h-full max-lg:hidden'>
                    {/* Right side - Testimonial */}
                    <div className=" relative w-full h-full ">
                                
                        {/* Overlay */}
                        <div className='max-w-full w-full max-lg:hidden h-full'>
                            <div className='h-full w-full relative'>
                            <img src="/assets/loginPage/loginImg.svg" alt="loginImg" className='absolute top-0 left-0 w-full h-full block object-cover' />
                            </div>
                            {/* Testimonial Card */}
                            <div className="absolute inset-0 top-auto w-full z-10 flex flex-col justify-center items-center px-[40px] pb-[40px] max-[1100px]:px-3 max-[1100px]:pb-3">
                                <div className="max-w-full px-[24px] py-[32px] text-center backdrop-blur-xl max-[1024px]:px-3 max-[1024px]:py-3">
                                    <AnimatePresence mode="popLayout" custom={direction}>
                                        <motion.div
                                            key={currentTestimonial}
                                            custom={direction}
                                            variants={slideVariants}
                                            initial="enter"
                                            animate="center"
                                            exit="exit"
                                            transition={slideTransition}
                                            className="w-full"
                                        >
                                            <motion.div
                                                variants={contentVariants}
                                                initial="hidden"
                                                animate="visible"
                                                className="w-full"
                                            >
                                                {/* Quote */}
                                                <motion.blockquote
                                                    className="text-white text-3xl text-left leading-[1.5834] font-medium mb-8 max-[1100px]:text-[20px] max-[1100px]:text-center max-[420px]:text-[16px]"
                                                    variants={quoteVariants}
                                                >
                                                    "{currentTestimonialData.quote}"
                                                </motion.blockquote>

                                                {/* Author Info */}
                                                <motion.div
                                                    className="mb-4 flex justify-between h-[44px] max-[767px]:mb-[4px] max-[414px]:mb-0"
                                                    variants={itemVariants}
                                                >
                                                    <motion.p
                                                        className="text-white font-semibold text-4xl max-[1100px]:text-[24px] max-[1024px]:text-[20px]"
                                                        variants={authorVariants}
                                                    >
                                                        {currentTestimonialData.author}
                                                    </motion.p>
                                                    {/* Rating Stars */}
                                                    <motion.div
                                                        className="flex justify-center mb-8"
                                                        variants={ratingVariants}
                                                    >
                                                        <RatingStars rating={currentTestimonialData.rating} stars={5} />
                                                    </motion.div>
                                                </motion.div>

                                                <motion.div
                                                    className='flex justify-between max-[767px]:items-center max-[414px]:flex-col max-[414px]:gap-3'
                                                    variants={itemVariants}
                                                >
                                                    <motion.p
                                                        className="text-gray-200 text-lg max-[767px]:text-[16px] max-[767px]:text-left"
                                                        variants={itemVariants}
                                                    >
                                                        {currentTestimonialData.role}
                                                    </motion.p>
                                                    {/* Navigation Buttons */}
                                                    <div className="flex justify-center gap-8 max-[1024px]:gap-3 ">
                                                        <motion.button
                                                            onClick={goToPrevious}
                                                            className="cursor-pointer p-[21px] rounded-[28px] bg-transparent border border-white h-14 w-14 flex items-center justify-center backdrop-blur-sm"
                                                            aria-label="Previous testimonial"
                                                            variants={buttonVariants}
                                                            initial="rest"
                                                            whileHover="hover"
                                                            whileTap="tap"
                                                            style={{
                                                                backdropFilter: 'blur(10px)',
                                                                WebkitBackdropFilter: 'blur(10px)',
                                                            }}
                                                        >
                                                            <motion.img
                                                                className='w-[24px]'
                                                                src="/assets/loginPage/leftArrow.svg"
                                                                alt="leftArrow"
                                                                variants={buttonIconVariants}
                                                                initial="rest"
                                                                whileHover="hover"
                                                                whileTap="tap"
                                                            />
                                                        </motion.button>
                                                        <motion.button
                                                            onClick={goToNext}
                                                            className="cursor-pointer p-[21px] rounded-full bg-transparent border border-white h-14 w-14 flex items-center justify-center backdrop-blur-sm"
                                                            aria-label="Next testimonial"
                                                            variants={buttonVariants}
                                                            initial="rest"
                                                            whileHover="hover"
                                                            whileTap="tap"
                                                            style={{
                                                                backdropFilter: 'blur(10px)',
                                                                WebkitBackdropFilter: 'blur(10px)',
                                                            }}
                                                        >
                                                            <motion.img
                                                                src="/assets/loginPage/rightArrow.svg"
                                                                alt="rightArrow"
                                                                variants={buttonIconVariants}
                                                                initial="rest"
                                                                whileHover="hover"
                                                                whileTap="tap"
                                                            />
                                                        </motion.button>
                                                    </div>
                                                </motion.div>

                                                {/* Slide Indicators with Progress */}
                                                <motion.div
                                                    className="flex justify-center gap-2 mt-6"
                                                    variants={itemVariants}
                                                >
                                                    {testimonials.map((_, index) => (
                                                        <motion.div
                                                            key={index}
                                                            className="relative h-1 bg-white/20 rounded-full overflow-hidden"
                                                            style={{ width: '40px' }}
                                                            whileHover={{ scale: 1.1 }}
                                                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                                        >
                                                            <motion.div
                                                                className="absolute top-0 left-0 h-full bg-white rounded-full"
                                                                initial={{ width: 0 }}
                                                                animate={{
                                                                    width: index === currentTestimonial ? `${progress}%` : 0
                                                                }}
                                                                transition={{
                                                                    duration: 0.1,
                                                                    ease: "linear"
                                                                }}
                                                            />
                                                            {index === currentTestimonial && (
                                                                <motion.div
                                                                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-white/60 to-white rounded-full"
                                                                    initial={{ width: 0 }}
                                                                    animate={{ width: `${progress}%` }}
                                                                    transition={{
                                                                        duration: 0.1,
                                                                        ease: "linear"
                                                                    }}
                                                                    style={{
                                                                        background: 'linear-gradient(90deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,1) 100%)',
                                                                        boxShadow: '0 0 8px rgba(255,255,255,0.5)'
                                                                    }}
                                                                />
                                                            )}
                                                        </motion.div>
                                                    ))}
                                                </motion.div>
                                            </motion.div>
                                        </motion.div>
                                    </AnimatePresence>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* main container */}
            </div>


        </>
    )
}

export default LoginPage    