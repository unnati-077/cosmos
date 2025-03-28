
import { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/Navbar';
import FooterSection from '@/components/FooterSection';
import BackToTop from '@/components/BackToTop';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SpaceScene from '@/components/3D/SpaceScene';

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <div 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center pt-20 pb-16 overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="absolute -top-[50%] -left-[10%] w-[70%] h-[140%] bg-primary/20 rounded-full blur-[120px] animate-pulse-slow"></div>
            <div className="absolute -bottom-[50%] -right-[10%] w-[70%] h-[140%] bg-accent/20 rounded-full blur-[120px] animate-pulse-slow animation-delay-300"></div>
            <div className="absolute top-[30%] right-[20%] w-[40%] h-[40%] bg-secondary/20 rounded-full blur-[80px] animate-pulse-slow animation-delay-500"></div>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <h1 
                className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 opacity-0 ${
                  isVisible ? 'animate-fade-in' : ''
                }`}
              >
                Explore the <span className="text-gradient">Universe</span> of Digital Innovation
              </h1>
              
              <p 
                className={`text-lg md:text-xl text-foreground/70 dark:text-foreground/70 mb-8 max-w-xl mx-auto lg:mx-0 opacity-0 ${
                  isVisible ? 'animate-fade-in animation-delay-200' : ''
                }`}
              >
                Revolutionary design meets cutting-edge technology. Experience the future of digital interfaces with our immersive platform.
              </p>
              
              <div 
                className={`flex flex-col sm:flex-row gap-4 justify-center lg:justify-start opacity-0 ${
                  isVisible ? 'animate-fade-in animation-delay-400' : ''
                }`}
              >
                <Button 
                  onClick={() => navigate('/features')}
                  className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all duration-300 text-white px-8 py-6"
                >
                  Explore Features <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/about')}
                  className="border-foreground/20 hover:bg-foreground/5 transition-all duration-300 px-8 py-6"
                >
                  Learn More
                </Button>
              </div>
            </div>
            
            <div 
              className={`flex-1 relative opacity-0 ${
                isVisible ? 'animate-fade-in animation-delay-500' : ''
              }`}
            >
              <div className="w-full h-[400px] relative overflow-hidden rounded-2xl glassmorphism border border-primary/20">
                <SpaceScene />
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <a 
            href="#features" 
            onClick={(e) => handleScroll(e, 'features')} 
            className="text-foreground/40 hover:text-foreground/60 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </a>
        </div>
      </div>

      {/* Features Preview Section */}
      <section id="features" className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-gradient">Featured</span> Highlights
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Discover our innovative features designed to transform your digital experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Immersive Interactions",
                description: "Experience fluid animations and micro-interactions that make your interface come alive.",
                icon: "✨",
                color: "from-primary to-secondary"
              },
              {
                title: "3D Visualizations",
                description: "Explore interactive 3D elements that add depth and engagement to your application.",
                icon: "🔮",
                color: "from-accent to-highlight"
              },
              {
                title: "Futuristic Design",
                description: "Embrace the future with glassmorphism and neumorphic interface elements.",
                icon: "🎨",
                color: "from-secondary to-primary"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="glassmorphism rounded-xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
              >
                <div className={`w-12 h-12 mb-4 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center text-white`}>
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-foreground/70">{feature.description}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button 
              onClick={() => navigate('/features')}
              className="bg-gradient-to-r from-primary/80 to-accent/80 hover:from-primary hover:to-accent transition-all duration-500"
            >
              Explore All Features <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
      
      <FooterSection />
      <BackToTop />
    </div>
  );
};

export default Index;
