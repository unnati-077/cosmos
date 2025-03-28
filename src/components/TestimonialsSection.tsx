
import { useRef, useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface TestimonialProps {
  quote: string;
  name: string;
  title: string;
  avatar: string;
  index: number;
  isVisible: boolean;
}

const Testimonial = ({ quote, name, title, avatar, index, isVisible }: TestimonialProps) => {
  const delay = 100 + (index * 200);
  
  return (
    <Card 
      className={`overflow-hidden border-0 transition-all duration-300 hover:shadow-lg opacity-0 ${
        isVisible ? `animate-fade-in animation-delay-${delay}` : ''
      }`}
    >
      <CardContent className="p-6">
        <div className="flex flex-col space-y-4">
          <div className="flex-1">
            <p className="text-gray-700 dark:text-gray-300 italic">"{quote}"</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={avatar} alt={name} />
              <AvatarFallback>{name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">{name}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const TestimonialsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const testimonialsRef = useRef<HTMLDivElement>(null);

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

    if (testimonialsRef.current) {
      observer.observe(testimonialsRef.current);
    }

    return () => {
      if (testimonialsRef.current) {
        observer.unobserve(testimonialsRef.current);
      }
    };
  }, []);

  const testimonials = [
    {
      quote: "The animation library transformed our app's user experience. Our engagement metrics have improved by 40% since implementation.",
      name: "Sarah Johnson",
      title: "Product Manager at TechCorp",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
    },
    {
      quote: "The simplicity of implementing complex animations was a game-changer for our dev team. We shipped our updated UI in half the expected time.",
      name: "Michael Chen",
      title: "Senior Developer at StartupX",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
    },
    {
      quote: "Our design team loves how easy it is to prototype animations that developers can implement without any loss in fidelity.",
      name: "Emma Rodriguez",
      title: "UI/UX Lead at DesignHub",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
    }
  ];

  return (
    <section id="testimonials" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 opacity-0 ${isVisible ? 'animate-fade-in' : ''}`}>
            What Our <span className="text-gradient">Clients Say</span>
          </h2>
          <p className={`text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto opacity-0 ${isVisible ? 'animate-fade-in animation-delay-200' : ''}`}>
            Don't just take our word for it. Here's what developers and designers are saying about our animation library.
          </p>
        </div>
        
        <div 
          ref={testimonialsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              quote={testimonial.quote}
              name={testimonial.name}
              title={testimonial.title}
              avatar={testimonial.avatar}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
