
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Input } from '@/components/base/input/input'
import { Button } from '@/components/base/buttons/button'
import { Checkbox } from '@/components/base/checkbox/checkbox'
import { RatingStars } from '@/components/foundations/rating-stars'
// Removed unused imports

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

// Animation variants for smooth slide transitions
const slideVariants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 300 : -300,
        opacity: 0,
        scale: 0.9,
    }),
    center: {
        x: 0,
        opacity: 1,
        scale: 1,
    },
    exit: (direction: number) => ({
        x: direction < 0 ? 300 : -300,
        opacity: 0,
        scale: 0.9,
    }),
}

const slideTransition = {
    x: { type: "spring" as const, stiffness: 300, damping: 30 },
    opacity: { duration: 0.2 },
    scale: { duration: 0.3 },
}

const contentVariants = {
    hidden: {
        opacity: 0,
        y: 20,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut" as const,
            staggerChildren: 0.1,
            delayChildren: 0.2,
        }
    },
}

const itemVariants = {
    hidden: {
        opacity: 0,
        y: 15,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: "easeOut" as const
        }
    },
}

const buttonVariants = {
    rest: {
        scale: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    hover: {
        scale: 1.05,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        transition: {
            duration: 0.2,
            ease: "easeOut" as const
        },
    },
    tap: {
        scale: 0.95,
        transition: {
            duration: 0.1,
            ease: "easeIn" as const
        },
    },
}

function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)
    const [currentTestimonial, setCurrentTestimonial] = useState(0)
    const [direction, setDirection] = useState(0)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // Handle login logic here
        console.log('Login attempt:', { email, password, rememberMe })
    }

    // Carousel navigation functions
    const goToPrevious = () => {
        setDirection(-1)
        setCurrentTestimonial((prev) =>
            prev === 0 ? testimonials.length - 1 : prev - 1
        )
    }

    const goToNext = () => {
        setDirection(1)
        setCurrentTestimonial((prev) =>
            prev === testimonials.length - 1 ? 0 : prev + 1
        )
    }

    // Get current testimonial
    const currentTestimonialData = testimonials[currentTestimonial]

    return (
        <>
            <div className="pt-[35px] ps-[37px] max-[1401px]:ps-3 max-[1401px]:pt-3">
                <img
                    className="h-12 w-auto max-[767px]:w-[197px] max-[767px]:object-contain"
                    src="/assets/loginPage/componyLogo.png"
                    alt="Company Logo"
                />
            </div>
            <div className="relative min-h-screen bg-white flex w-full mx-auto" >
                {/* Left side - Login Form */}
                <div className='main-welcome-back flex items-center w-full gap-[180px] justify-center max-[1024px]:flex-col max-[1024px]:gap-[30px] max-[1024px]:pt-[30px] max-[1501px]:justify-end'>
                    <div className="justify-center relative ps-3 max-[1024px]:px-3 max-[768px]:w-full">
                        <div className="mx-auto w-[360px] max-[768px]:w-full">
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
                                        onChange={setEmail}
                                        isRequired
                                        size="md"
                                    />
                                </div>

                                {/* Password Input */}
                                <div className='mb-6'>
                                    <p className='leading-[1.429] text-sm font-medium text-[#344054] mb-1.5'>Password</p>
                                    <Input
                                        type="password"
                                        placeholder="Enter your password"
                                        onChange={setPassword}
                                        isRequired
                                        size="md"
                                    />
                                </div>

                                {/* Remember me and Forgot password */}
                                <div className="flex items-center justify-between">
                                    <Checkbox
                                        isSelected={rememberMe}
                                        onChange={setRememberMe}
                                        label="Remember me"
                                        size="sm"
                                        className='leading-[1.429] text-sm'
                                    />
                                    <Button
                                        color="link-gray"
                                        size="sm"
                                        href="#"
                                        className="text-sm text-[#425D7E] "
                                    >
                                        Forgot password?
                                    </Button>
                                </div>

                                {/* Sign In Button */}
                                <div className='mb-8 mt-6 max-[767px]:mb-3'>
                                    <Button
                                        type="submit"
                                        className="w-full bg-[#2980B9] text-base leading-[1.5] text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-50 ease-in-out transform hover:bg-[#1f5f8b] hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] active:bg-[#1a4d73] focus:outline-none focus:ring-2 focus:ring-[#2980B9] focus:ring-opacity-50"
                                    >
                                        Sign in
                                    </Button>
                                </div>

                                {/* Footer Text */}
                                <div className="text-center">
                                    <p className="text-sm text-[#475467] font-normal leading-[1.429]">
                                        Don't have an account?{' '}
                                        <Button
                                            color="link-color"
                                            size="sm"
                                            href="#"
                                            className="text-sm text-[#2980B9]"
                                        >
                                            Sign up
                                        </Button>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Right side - Testimonial */}
                    <div className=" relative max-w-[720px] w-full mt-[-151px] max-[1024px]:mt-0">

                {/* Overlay */}
                <div className='max-w-full w-full'>
                    <img src="/assets/loginPage/loginImg.svg" alt="loginImg" />
                    {/* Testimonial Card */}
                    <div className="absolute inset-0 top-auto w-full z-10 flex flex-col justify-center items-center px-[40px] pb-[40px] max-[1100px]:px-3 max-[1100px]:pb-3">
                        <div className="max-w-full px-[24px] py-[32px] text-center backdrop-blur-xl max-[1024px]:px-3 max-[1024px]:py-3">
                            <AnimatePresence mode="wait" custom={direction}>
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
                                            variants={itemVariants}
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
                                                variants={itemVariants}
                                            >
                                                {currentTestimonialData.author}
                                            </motion.p>
                                            {/* Rating Stars */}
                                            <motion.div
                                                className="flex justify-center mb-8"
                                                variants={itemVariants}
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
                                                    className="p-[21px] rounded-[28px] bg-transparent border border-white h-14 w-14 flex items-center justify-center"
                                                    aria-label="Previous testimonial"
                                                    variants={buttonVariants}
                                                    initial="rest"
                                                    whileHover="hover"
                                                    whileTap="tap"
                                                >
                                                    <img className='w-[24px]' src="/assets/loginPage/leftArrow.svg" alt="leftArrow" />
                                                </motion.button>
                                                <motion.button
                                                    onClick={goToNext}
                                                    className="p-[21px] rounded-full bg-transparent border border-white h-14 w-14 flex items-center justify-center"
                                                    aria-label="Next testimonial"
                                                    variants={buttonVariants}
                                                    initial="rest"
                                                    whileHover="hover"
                                                    whileTap="tap"
                                                >
                                                    <img src="/assets/loginPage/rightArrow.svg" alt="rightArrow" />
                                                </motion.button>
                                            </div>
                                        </motion.div>
                                    </motion.div>
                                </motion.div>
                            </AnimatePresence>

                        </div>
                    </div>
                </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default LoginPage    