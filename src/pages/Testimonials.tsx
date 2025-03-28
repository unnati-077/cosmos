
import { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import FooterSection from '@/components/FooterSection';
import BackToTop from '@/components/BackToTop';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';

type TestimonialCardProps = {
  quote: string;
  name: string;
  title: string;
  company: string;
  rating: number;
  avatar: string;
  index: number;
};

const TestimonialCard = ({ quote, name, title, company, rating, avatar, index }: TestimonialCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
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

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);
  
  const delay = 100 + (index * 150);
  
  return (
    <Card 
      ref={cardRef}
      className={`glassmorphism border-0 overflow-hidden opacity-0 transform translate-y-10 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : ''
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <CardContent className="p-8">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12 border-2 border-primary/20">
                <AvatarImage src={avatar} alt={name} />
                <AvatarFallback>{name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-semibold text-foreground">{name}</h4>
                <p className="text-sm text-foreground/60">{title}, {company}</p>
              </div>
            </div>
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < rating ? 'text-highlight' : 'text-foreground/20'
                  }`}
                  fill={i < rating ? 'currentColor' : 'none'}
                />
              ))}
            </div>
          </div>
          
          <div className="pt-4 pb-2 relative">
            <Quote className="absolute top-0 left-0 h-6 w-6 text-primary/40 -translate-x-1 -translate-y-1" />
            <p className="text-foreground/80 italic pl-5">{quote}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      quote: "Implementing Cosmos in our product dashboard completely transformed our user experience. The animations are smooth, and the 3D elements add a level of depth that our users love.",
      name: "Sarah Johnson",
      title: "Product Director",
      company: "TechNova",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
    },
    {
      quote: "The glassmorphism UI elements are not just beautiful, but they actually improve usability. Our conversion rates increased by 40% after the redesign with Cosmos.",
      name: "Michael Chen",
      title: "CEO",
      company: "StartupX",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
    },
    {
      quote: "As a designer, I appreciate the attention to detail in every animation and transition. Cosmos makes it easy to create stunning interfaces that also perform well.",
      name: "Emma Rodriguez",
      title: "Lead Designer",
      company: "DesignHub",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
    },
    {
      quote: "The 3D components are game-changers for data visualization. We're now able to present complex information in a way that's both intuitive and visually impressive.",
      name: "David Park",
      title: "Data Scientist",
      company: "AnalyticsPro",
      rating: 4,
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
    },
    {
      quote: "We integrated Cosmos into our e-commerce platform and saw immediate results. The micro-interactions and smooth transitions keep users engaged longer.",
      name: "Olivia Thompson",
      title: "CMO",
      company: "ShopWave",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
    },
    {
      quote: "The responsive design system has saved our development team countless hours. It works flawlessly across all devices without any additional configuration.",
      name: "James Wilson",
      title: "CTO",
      company: "DevForge",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header Section */}
      <section className="pt-28 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="absolute top-[20%] right-[10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px] animate-pulse-slow"></div>
            <div className="absolute bottom-[20%] left-[10%] w-[40%] h-[40%] bg-accent/20 rounded-full blur-[100px] animate-pulse-slow animation-delay-300"></div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
              <span className="text-gradient">Testimonials</span>
            </h1>
            <p className="text-lg text-foreground/70 animate-fade-in animation-delay-200">
              Hear what our clients say about their experience with Cosmos
            </p>
          </div>
        </div>
      </section>
      
      {/* Testimonials Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                quote={testimonial.quote}
                name={testimonial.name}
                title={testimonial.title}
                company={testimonial.company}
                rating={testimonial.rating}
                avatar={testimonial.avatar}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-background to-muted/30"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Client <span className="text-gradient">Satisfaction</span>
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Numbers that speak for themselves
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: "98%", label: "Client Satisfaction" },
              { value: "500+", label: "Projects Completed" },
              { value: "40%", label: "Average Conversion Boost" },
              { value: "50+", label: "Enterprise Clients" }
            ].map((stat, index) => (
              <div 
                key={index}
                className="glassmorphism rounded-xl p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
              >
                <div className="text-4xl font-bold mb-2 text-gradient">{stat.value}</div>
                <p className="text-foreground/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <FooterSection />
      <BackToTop />
    </div>
  );
};

export default Testimonials;
