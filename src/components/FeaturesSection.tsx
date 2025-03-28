
import { useRef, useState, useEffect } from 'react';

interface FeatureProps {
  icon: string;
  title: string;
  description: string;
  index: number;
  isVisible: boolean;
}

const Feature = ({ icon, title, description, index, isVisible }: FeatureProps) => {
  const delay = index * 200;
  
  return (
    <div 
      className={`flex flex-col p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 opacity-0 ${
        isVisible ? `animate-fade-in animation-delay-${delay}` : ''
      }`}
    >
      <div className="w-12 h-12 mb-4 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white">
        <span className="text-2xl">{icon}</span>
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
};

const FeaturesSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const featuresRef = useRef<HTMLDivElement>(null);

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

    if (featuresRef.current) {
      observer.observe(featuresRef.current);
    }

    return () => {
      if (featuresRef.current) {
        observer.unobserve(featuresRef.current);
      }
    };
  }, []);

  const features = [
    {
      icon: "✨",
      title: "Smooth Animations",
      description: "Create fluid, responsive animations that enhance user experience and add polish to your interface."
    },
    {
      icon: "🔄",
      title: "Transition Effects",
      description: "Implement beautiful transition effects between states, pages, and UI elements."
    },
    {
      icon: "📱",
      title: "Responsive Design",
      description: "All animations and transitions work perfectly across devices and screen sizes."
    },
    {
      icon: "⚡",
      title: "Performance Optimized",
      description: "Highly optimized animations that don't impact page performance or loading speed."
    },
    {
      icon: "🎨",
      title: "Customizable",
      description: "Easily customize animation timing, easing, and properties to match your brand."
    },
    {
      icon: "🧩",
      title: "Component Based",
      description: "Modular animation components that can be reused throughout your application."
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 opacity-0 ${isVisible ? 'animate-fade-in' : ''}`}>
            Amazing <span className="text-gradient">Features</span>
          </h2>
          <p className={`text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto opacity-0 ${isVisible ? 'animate-fade-in animation-delay-200' : ''}`}>
            Discover the powerful tools and features that make our animation library stand out from the rest.
          </p>
        </div>
        
        <div 
          ref={featuresRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <Feature
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
