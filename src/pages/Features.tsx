
import { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import FooterSection from '@/components/FooterSection';
import BackToTop from '@/components/BackToTop';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check, Code, Palette, Zap, LayoutGrid, Sparkles, Globe } from 'lucide-react';

type FeatureCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
};

const FeatureCard = ({ title, description, icon, index }: FeatureCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
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

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);
  
  const delay = 100 + (index * 100);
  
  return (
    <div 
      ref={elementRef}
      className={`glassmorphism rounded-xl p-8 transition-all duration-500 hover:-translate-y-2 opacity-0 ${
        isVisible ? 'animate-fade-in' : ''
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-foreground/70">{description}</p>
    </div>
  );
};

const Features = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  const features = [
    {
      title: "Responsive Design",
      description: "Seamlessly adapts to any screen size, providing an optimal experience on desktops, tablets, and mobile devices.",
      icon: <LayoutGrid className="text-white h-6 w-6" />,
      category: "design"
    },
    {
      title: "Smooth Animations",
      description: "Fluid transitions and micro-interactions that enhance user engagement and create a delightful experience.",
      icon: <Sparkles className="text-white h-6 w-6" />,
      category: "animation"
    },
    {
      title: "3D Elements",
      description: "Interactive three-dimensional components that add depth and immersion to your digital space.",
      icon: <Globe className="text-white h-6 w-6" />,
      category: "3d"
    },
    {
      title: "Glassmorphism UI",
      description: "Modern, frosted glass aesthetic that creates a sense of depth while maintaining clarity and focus.",
      icon: <Palette className="text-white h-6 w-6" />,
      category: "design"
    },
    {
      title: "Parallax Effects",
      description: "Multi-layered scrolling effects that create a sense of depth and perspective as users navigate your content.",
      icon: <Zap className="text-white h-6 w-6" />,
      category: "animation"
    },
    {
      title: "Clean Code Architecture",
      description: "Well-structured, maintainable codebase built with modern best practices and performance optimization.",
      icon: <Code className="text-white h-6 w-6" />,
      category: "development"
    }
  ];
  
  const filteredFeatures = activeTab === 'all' 
    ? features 
    : features.filter(feature => feature.category === activeTab);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header Section */}
      <section className="pt-28 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="absolute top-[20%] left-[10%] w-[60%] h-[60%] bg-primary/20 rounded-full blur-[120px] animate-pulse-slow"></div>
            <div className="absolute bottom-[10%] right-[10%] w-[50%] h-[50%] bg-accent/20 rounded-full blur-[100px] animate-pulse-slow animation-delay-300"></div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
              <span className="text-gradient">Features</span> & Capabilities
            </h1>
            <p className="text-lg text-foreground/70 animate-fade-in animation-delay-200">
              Discover the powerful tools and technologies that make our platform stand out
            </p>
          </div>
        </div>
      </section>
      
      {/* Features Filter */}
      <section className="py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {['all', 'design', 'animation', '3d', 'development'].map((tab) => (
              <Button
                key={tab}
                variant={activeTab === tab ? "default" : "outline"}
                onClick={() => setActiveTab(tab)}
                className={`capitalize ${
                  activeTab === tab 
                    ? 'bg-gradient-to-r from-primary to-accent' 
                    : 'hover:border-primary/50'
                }`}
              >
                {tab}
              </Button>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFeatures.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Feature Showcase */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6">
                Advanced <span className="text-gradient">Animation</span> System
              </h2>
              <p className="text-foreground/70 mb-8">
                Our platform leverages cutting-edge animation technologies to create fluid, 
                responsive interfaces that delight users and enhance engagement.
              </p>
              
              <div className="space-y-4">
                {[
                  "Smooth page transitions for seamless navigation",
                  "Micro-interactions that provide visual feedback",
                  "Scroll-based animations that reveal content naturally",
                  "Performance-optimized for smooth operation on all devices"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="mt-1 bg-gradient-to-r from-primary to-accent p-0.5 rounded-full">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <p className="text-foreground/80">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:w-1/2">
              <div className="relative h-[400px] w-full rounded-2xl overflow-hidden glassmorphism border border-primary/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-primary/80 rounded-lg animate-float"></div>
                  <div className="w-16 h-16 bg-accent/80 rounded-full animate-float animation-delay-300 absolute top-1/4 right-1/4"></div>
                  <div className="w-24 h-24 border-4 border-secondary/80 rounded-xl animate-float-slow animation-delay-700 absolute bottom-1/4 left-1/4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <FooterSection />
      <BackToTop />
    </div>
  );
};

export default Features;
