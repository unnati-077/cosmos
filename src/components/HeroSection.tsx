
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16"
    >
      {/* Background blobs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-700"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-300"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <h1 
              className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 opacity-0 ${
                isVisible ? 'animate-fade-in' : ''
              }`}
            >
              Beautiful <span className="text-gradient">Transitions</span> for Your Next Project
            </h1>
            
            <p 
              className={`text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0 opacity-0 ${
                isVisible ? 'animate-fade-in animation-delay-200' : ''
              }`}
            >
              Create stunning animations and smooth transitions that elevate your user interface to the next level.
            </p>
            
            <div 
              className={`flex flex-col sm:flex-row gap-4 justify-center lg:justify-start opacity-0 ${
                isVisible ? 'animate-fade-in animation-delay-400' : ''
              }`}
            >
              <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all duration-300 text-white px-8 py-6">
                Get Started
              </Button>
              <Button variant="outline" className="border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 px-8 py-6">
                Learn More
              </Button>
            </div>
          </div>
          
          <div 
            className={`flex-1 relative opacity-0 ${
              isVisible ? 'animate-fade-in animation-delay-500' : ''
            }`}
          >
            <div className="w-full h-[400px] relative overflow-hidden rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-sm"></div>
              
              {/* Animated Elements */}
              <div className="absolute top-[20%] left-[20%] w-20 h-20 bg-white/30 rounded-lg backdrop-blur-md shadow-xl animate-float"></div>
              <div className="absolute top-[50%] left-[60%] w-16 h-16 bg-white/30 rounded-full backdrop-blur-md shadow-xl animate-float animation-delay-300"></div>
              <div className="absolute top-[30%] left-[40%] w-24 h-24 bg-white/30 rounded-lg rotate-45 backdrop-blur-md shadow-xl animate-float-slow animation-delay-500"></div>
              <div className="absolute top-[60%] left-[25%] w-12 h-12 bg-white/30 rounded-lg backdrop-blur-md shadow-xl animate-float-slow animation-delay-700"></div>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-2xl font-semibold text-white text-shadow">Experience the magic</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#features" className="text-gray-500 dark:text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default HeroSection;
