
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import FooterSection from '@/components/FooterSection';
import BackToTop from '@/components/BackToTop';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MapPin, Phone, Send, MessageSquare, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const timeout1 = setTimeout(() => setIsFormVisible(true), 300);
    const timeout2 = setTimeout(() => setIsMapVisible(true), 500);
    
    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header Section */}
      <section className="pt-28 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="absolute top-[20%] left-[10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px] animate-pulse-slow"></div>
            <div className="absolute bottom-[20%] right-[10%] w-[40%] h-[40%] bg-accent/20 rounded-full blur-[100px] animate-pulse-slow animation-delay-300"></div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
              Get in <span className="text-gradient">Touch</span>
            </h1>
            <p className="text-lg text-foreground/70 animate-fade-in animation-delay-200">
              Have a question or want to work with us? We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>
      
      {/* Contact Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-2/3">
              <div 
                className={`glassmorphism rounded-xl p-8 transition-all duration-700 transform ${
                  isFormVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <h2 className="text-2xl font-semibold mb-6">Send us a message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-foreground/70">
                        Your Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                        className="bg-background/50 border-foreground/10 focus:border-primary"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-foreground/70">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                        className="bg-background/50 border-foreground/10 focus:border-primary"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-foreground/70">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                      required
                      className="bg-background/50 border-foreground/10 focus:border-primary"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-foreground/70">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your message here..."
                      rows={6}
                      required
                      className="bg-background/50 border-foreground/10 focus:border-primary resize-none"
                    />
                  </div>
                  
                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all duration-300 w-full sm:w-auto"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'} 
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </div>
            </div>
            
            <div className="lg:w-1/3">
              <div 
                className={`glassmorphism rounded-xl p-8 h-full transition-all duration-700 transform ${
                  isMapVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Our Location</h3>
                      <p className="text-foreground/70 mt-1">
                        123 Innovation Way<br />
                        San Francisco, CA 94107
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-accent/10 p-3 rounded-lg">
                      <Mail className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-medium">Email Us</h3>
                      <p className="text-foreground/70 mt-1">
                        info@cosmos-ui.com<br />
                        support@cosmos-ui.com
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-secondary/10 p-3 rounded-lg">
                      <Phone className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Call Us</h3>
                      <p className="text-foreground/70 mt-1">
                        +1 (555) 123-4567<br />
                        +1 (555) 987-6543
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-highlight/10 p-3 rounded-lg">
                      <Clock className="h-6 w-6 text-highlight" />
                    </div>
                    <div>
                      <h3 className="font-medium">Working Hours</h3>
                      <p className="text-foreground/70 mt-1">
                        Monday - Friday: 9AM - 6PM<br />
                        Saturday: 10AM - 2PM
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <div className="h-40 bg-foreground/5 rounded-lg flex items-center justify-center">
                    <p className="text-foreground/50">Interactive map will be displayed here</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-background to-muted/30"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              <span className="text-gradient">Frequently</span> Asked Questions
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Find answers to common questions about our services
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                question: "What technologies do you support?",
                answer: "We support a wide range of modern web technologies including React, Vue, Angular, and frameworks like Next.js and Gatsby. Our components are designed to integrate seamlessly with your existing tech stack."
              },
              {
                question: "How customizable are your designs?",
                answer: "Our designs are fully customizable to match your brand identity. We provide extensive documentation and support to help you adapt our components to your specific needs."
              },
              {
                question: "Do you offer support after purchase?",
                answer: "Yes, we offer comprehensive support for all our customers. Our team is available to help with implementation, customization, and troubleshooting."
              },
              {
                question: "Can I use your components for commercial projects?",
                answer: "Absolutely! Our licenses allow for both personal and commercial use. We offer different license tiers depending on your project scope and team size."
              }
            ].map((faq, index) => (
              <div 
                key={index}
                className="glassmorphism rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-2 rounded-lg mt-1">
                    <MessageSquare className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                    <p className="text-foreground/70">{faq.answer}</p>
                  </div>
                </div>
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

export default Contact;
