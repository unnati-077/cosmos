
import { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  index: number;
  isVisible: boolean;
}

const PricingCard = ({ title, price, description, features, isPopular = false, index, isVisible }: PricingCardProps) => {
  const delay = index * 200;
  
  return (
    <div 
      className={`flex flex-col p-6 rounded-2xl transition-all duration-300 ${
        isPopular 
          ? 'bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/50 transform-gpu hover:-translate-y-2' 
          : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transform-gpu hover:-translate-y-1'
      } opacity-0 ${
        isVisible ? `animate-fade-in animation-delay-${delay}` : ''
      }`}
    >
      {isPopular && (
        <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
          <div className="bg-gradient-to-r from-primary to-accent text-white text-xs font-semibold px-3 py-1 rounded-full">
            Most Popular
          </div>
        </div>
      )}
      
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <div className="mb-4">
        <span className="text-4xl font-bold">{price}</span>
        {price !== 'Free' && <span className="text-gray-600 dark:text-gray-300">/month</span>}
      </div>
      <p className="text-gray-600 dark:text-gray-300 mb-6">{description}</p>
      
      <div className="space-y-3 mb-8">
        {features.map((feature, i) => (
          <div key={i} className="flex items-center">
            <Check size={18} className="text-primary mr-2 flex-shrink-0" />
            <span className="text-gray-700 dark:text-gray-300 text-sm">{feature}</span>
          </div>
        ))}
      </div>
      
      <Button 
        className={`mt-auto ${
          isPopular
            ? 'bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white'
            : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100'
        }`}
      >
        Get Started
      </Button>
    </div>
  );
};

const PricingSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const pricingRef = useRef<HTMLDivElement>(null);

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

    if (pricingRef.current) {
      observer.observe(pricingRef.current);
    }

    return () => {
      if (pricingRef.current) {
        observer.unobserve(pricingRef.current);
      }
    };
  }, []);

  const plans = [
    {
      title: "Basic",
      price: "Free",
      description: "Perfect for personal projects and learning.",
      features: [
        "10 animation components",
        "Basic transitions",
        "Community support",
        "Documentation access"
      ]
    },
    {
      title: "Premium",
      price: "$49",
      description: "Ideal for professionals and small teams.",
      features: [
        "50+ animation components",
        "Advanced transitions",
        "Email support",
        "Source code access",
        "Project templates"
      ],
      isPopular: true
    },
    {
      title: "Enterprise",
      price: "$99",
      description: "For large teams and complex projects.",
      features: [
        "100+ animation components",
        "Custom animations",
        "Priority support",
        "Full source code access",
        "Custom integrations",
        "Team training sessions"
      ]
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 opacity-0 ${isVisible ? 'animate-fade-in' : ''}`}>
            Simple, Transparent <span className="text-gradient">Pricing</span>
          </h2>
          <p className={`text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto opacity-0 ${isVisible ? 'animate-fade-in animation-delay-200' : ''}`}>
            Choose the plan that works best for your project and team size.
          </p>
        </div>
        
        <div 
          ref={pricingRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {plans.map((plan, index) => (
            <PricingCard
              key={index}
              title={plan.title}
              price={plan.price}
              description={plan.description}
              features={plan.features}
              isPopular={plan.isPopular}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
