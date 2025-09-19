import { ArrowLeft, Home01, SearchLg } from "@untitledui/icons";
import { useNavigate } from "react-router";
import { Button } from "@/components/base/buttons/button";
import { useState, useEffect } from "react";

export function NotFound() {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleGoBack = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate('/dashboard');
        }
    };

    const handleGoHome = () => {
        navigate('/dashboard');
    };

    return (
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary to-brand-primary py-16 md:py-24">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Floating circles */}
                <div className="absolute -top-40 -left-40 h-80 w-80 animate-pulse rounded-full bg-brand-200 opacity-20 blur-3xl"></div>
                <div className="absolute -bottom-40 -right-40 h-96 w-96 animate-pulse rounded-full bg-brand-300 opacity-20 blur-3xl animation-delay-1000"></div>
                <div className="absolute top-1/2 left-1/4 h-64 w-64 animate-pulse rounded-full bg-brand-100 opacity-30 blur-2xl animation-delay-2000"></div>
                
                {/* Floating geometric shapes */}
                <div className="absolute top-20 right-20 h-4 w-4 animate-bounce rounded-full bg-brand-500 opacity-60 animation-delay-500"></div>
                <div className="absolute top-40 right-40 h-6 w-6 animate-bounce rounded-full bg-brand-400 opacity-40 animation-delay-1000"></div>
                <div className="absolute bottom-20 left-20 h-3 w-3 animate-bounce rounded-full bg-brand-600 opacity-50 animation-delay-1500"></div>
                <div className="absolute bottom-40 left-40 h-5 w-5 animate-bounce rounded-full bg-brand-300 opacity-30 animation-delay-2000"></div>
            </div>

            <div className="relative z-10 mx-auto max-w-container grow px-4 md:px-8">
                <div className={`flex w-full max-w-4xl flex-col items-center text-center transition-all duration-1000 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}>
                    {/* 404 Number with Animation */}
                    <div className="mb-8">
                        <div className="relative">
                            <h1 className="text-9xl font-bold text-brand-500 md:text-[12rem] lg:text-[16rem] animate-pulse">
                                404
                            </h1>
                            <div className="absolute inset-0 text-9xl font-bold text-brand-600 md:text-[12rem] lg:text-[16rem] animate-ping opacity-20">
                                404
                            </div>
                        </div>
                    </div>

                    {/* Error Message */}
                    <div className="mb-12 space-y-6">
                        <div className="space-y-4">
                            <span className="inline-block rounded-full bg-brand-100 px-4 py-2 text-sm font-semibold text-brand-700 animate-fade-in">
                                Oops! Page not found
                            </span>
                            <h2 className="text-4xl font-bold text-primary md:text-5xl lg:text-6xl animate-slide-up">
                                Lost in the digital void?
                            </h2>
                        </div>
                        <p className="mx-auto max-w-2xl text-lg text-tertiary md:text-xl animate-slide-up animation-delay-200">
                            Don't worry, even the best explorers sometimes take a wrong turn. 
                            The page you're looking for might have been moved, deleted, or never existed in the first place.
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:gap-6 animate-slide-up animation-delay-400">
                        <Button 
                            color="secondary" 
                            size="xl" 
                            iconLeading={ArrowLeft} 
                            onClick={handleGoBack}
                            className="group hover:scale-105 transition-transform duration-200"
                        >
                            <span className="group-hover:translate-x-1 transition-transform duration-200">
                                Go back
                            </span>
                        </Button>
                        <Button 
                            size="xl" 
                            iconLeading={Home01}
                            onClick={handleGoHome}
                            className="group hover:scale-105 transition-transform duration-200"
                        >
                            <span className="group-hover:translate-x-1 transition-transform duration-200">
                                Take me home
                            </span>
                        </Button>
                       
                    </div>
                </div>
            </div>

            {/* Custom CSS for animations */}
            <style jsx>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes slide-up {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                .animate-fade-in {
                    animation: fade-in 0.8s ease-out forwards;
                }
                
                .animate-slide-up {
                    animation: slide-up 0.8s ease-out forwards;
                }
                
                .animation-delay-200 { animation-delay: 200ms; }
                .animation-delay-400 { animation-delay: 400ms; }
                .animation-delay-500 { animation-delay: 500ms; }
                .animation-delay-600 { animation-delay: 600ms; }
                .animation-delay-1000 { animation-delay: 1000ms; }
                .animation-delay-1500 { animation-delay: 1500ms; }
                .animation-delay-2000 { animation-delay: 2000ms; }
            `}</style>
        </section>
    );
}
