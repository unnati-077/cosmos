
import { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import FooterSection from '@/components/FooterSection';
import BackToTop from '@/components/BackToTop';
import { Button } from '@/components/ui/button';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header Section */}
      <section className="pt-28 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-full h-full overflow-hidden">
            <div className="absolute top-[10%] right-[10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[100px] animate-pulse-slow"></div>
            <div className="absolute bottom-[10%] left-[10%] w-[40%] h-[40%] bg-accent/20 rounded-full blur-[80px] animate-pulse-slow animation-delay-300"></div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
              About <span className="text-gradient">Cosmos</span>
            </h1>
            <p className="text-lg text-foreground/70 animate-fade-in animation-delay-200">
              Pushing the boundaries of digital design and user experience
            </p>
          </div>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section ref={sectionRef} className="py-16 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <div className={`relative h-[400px] w-full rounded-2xl overflow-hidden opacity-0 ${
                isVisible ? 'animate-fade-in' : ''
              }`}>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 animate-morph"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="glassmorphism p-8 rounded-xl max-w-md">
                    <h3 className="text-2xl font-semibold mb-4 text-gradient">Our Vision</h3>
                    <p className="text-foreground/80">
                      To create digital experiences that blur the line between reality and imagination, 
                      pushing the boundaries of what's possible in the digital realm.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <div className={`space-y-6 opacity-0 ${
                isVisible ? 'animate-fade-in animation-delay-300' : ''
              }`}>
                <h2 className="text-3xl font-bold">
                  Our <span className="text-gradient">Story</span>
                </h2>
                <p className="text-foreground/70">
                  Founded in 2024, Cosmos emerged from a vision to revolutionize digital interfaces. 
                  We saw a future where technology and design converge to create experiences that 
                  aren't just functional, but magical.
                </p>
                <p className="text-foreground/70">
                  Our team of designers, developers, and innovators work together to push the 
                  boundaries of what's possible in digital space. We're committed to creating 
                  products that aren't just visually stunning, but intuitive and accessible.
                </p>
                <p className="text-foreground/70">
                  Today, we're proud to offer cutting-edge solutions that incorporate the latest 
                  advancements in animation, 3D visualization, and interactive design.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Our <span className="text-gradient">Team</span>
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Meet the creative minds behind Cosmos
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Alex Morgan",
                role: "Founder & CEO",
                bio: "Visionary leader with 10+ years in innovative UI/UX design",
                image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"
              },
              {
                name: "Samantha Lee",
                role: "Creative Director",
                bio: "Award-winning designer specializing in immersive experiences",
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"
              },
              {
                name: "Marcus Chen",
                role: "Lead Developer",
                bio: "Tech innovator with expertise in 3D web applications",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"
              }
            ].map((member, index) => (
              <div 
                key={index}
                className="glassmorphism rounded-xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
              >
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-2 border-primary/20">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-1 text-center">{member.name}</h3>
                <p className="text-primary mb-3 text-center">{member.role}</p>
                <p className="text-foreground/70 text-center">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Values Section */}
      <section className="py-16 relative bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Our <span className="text-gradient">Values</span>
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Innovation",
                description: "We constantly push boundaries to create new possibilities in design and technology.",
                icon: "💡"
              },
              {
                title: "Craftsmanship",
                description: "We meticulously craft every detail to ensure exceptional quality in our work.",
                icon: "✨"
              },
              {
                title: "Inclusivity",
                description: "We create experiences that are accessible and enjoyable for everyone.",
                icon: "🌈"
              },
              {
                title: "Impact",
                description: "We measure success by the positive difference we make in people's digital lives.",
                icon: "🚀"
              }
            ].map((value, index) => (
              <div 
                key={index}
                className="glassmorphism rounded-xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
              >
                <div className="text-4xl mb-4 text-center">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-center">{value.title}</h3>
                <p className="text-foreground/70 text-center">{value.description}</p>
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

export default About;
