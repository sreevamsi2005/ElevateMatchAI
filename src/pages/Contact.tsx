
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { toast } from "sonner";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    userType: "student"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUserTypeChange = (value: string) => {
    setFormData(prev => ({ ...prev, userType: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success("Your message has been sent successfully!");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        userType: "student"
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero section */}
        <section className="bg-gradient-to-br from-primary/20 to-secondary/20 py-16 md:py-24">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold mb-6">Get in Touch</h1>
              <p className="text-lg md:text-xl mb-0">
                Have questions, suggestions, or feedback? We'd love to hear from you.
              </p>
            </div>
          </div>
        </section>

        {/* Contact form section */}
        <section className="py-16">
          <div className="container px-4">
            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <div>
                <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="userType">I am a:</Label>
                    <RadioGroup 
                      value={formData.userType}
                      onValueChange={handleUserTypeChange}
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="student" id="student-contact" />
                        <Label htmlFor="student-contact">Student</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="company" id="company-contact" />
                        <Label htmlFor="company-contact">Company</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="other" id="other-contact" />
                        <Label htmlFor="other-contact">Other</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name <span className="text-destructive">*</span></Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email <span className="text-destructive">*</span></Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="How can we help you?"
                      value={formData.subject}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message <span className="text-destructive">*</span></Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Please tell us how we can assist you..."
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      required
                    />
                  </div>
                  
                  <Button type="submit" disabled={isSubmitting} className="btn-gradient w-full">
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                
                <div className="bg-card rounded-xl p-6 md:p-8 shadow-sm mb-8">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 rounded-full p-3">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Our Location</h3>
                        <address className="text-muted-foreground not-italic">
                          123 Innovation Way<br />
                          San Francisco, CA 94103<br />
                          United States
                        </address>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 rounded-full p-3">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Phone</h3>
                        <p className="text-muted-foreground">
                          <a href="tel:+14155552671" className="hover:text-primary">+1 (415) 555-2671</a>
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 rounded-full p-3">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Email</h3>
                        <p className="text-muted-foreground">
                          <a href="mailto:info@elevatematchai.com" className="hover:text-primary">info@elevatematchai.com</a>
                        </p>
                        <p className="text-muted-foreground mt-1">
                          <a href="mailto:support@elevatematchai.com" className="hover:text-primary">support@elevatematchai.com</a>
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 rounded-full p-3">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Hours</h3>
                        <p className="text-muted-foreground">Monday - Friday: 9am - 6pm</p>
                        <p className="text-muted-foreground">Saturday & Sunday: Closed</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-xl overflow-hidden h-64 shadow-sm">
                  {/* Placeholder for map - in a real implementation, you would use a map component */}
                  <div className="bg-muted h-full w-full flex items-center justify-center">
                    <p className="text-muted-foreground">Interactive Map</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ section */}
        <section className="py-16 bg-muted/30">
          <div className="container px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Frequently Asked Questions</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Find quick answers to common questions about our platform.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto divide-y divide-border">
              <div className="py-6">
                <h3 className="font-semibold text-lg mb-2">How does ElevateMatchAI ensure fairness in its algorithms?</h3>
                <p className="text-muted-foreground">
                  Our algorithms are regularly audited for bias and we employ diverse training data. We also offer transparency reports and continuously improve our systems based on feedback.
                </p>
              </div>
              
              <div className="py-6">
                <h3 className="font-semibold text-lg mb-2">Is my data secure with ElevateMatchAI?</h3>
                <p className="text-muted-foreground">
                  Absolutely. We use industry-leading encryption standards and never share your personal data with third parties without your explicit consent.
                </p>
              </div>
              
              <div className="py-6">
                <h3 className="font-semibold text-lg mb-2">Can I cancel my subscription at any time?</h3>
                <p className="text-muted-foreground">
                  Yes, you can cancel your subscription at any time from your account settings. There are no cancellation fees.
                </p>
              </div>
              
              <div className="py-6">
                <h3 className="font-semibold text-lg mb-2">Do you offer educational discounts?</h3>
                <p className="text-muted-foreground">
                  Yes, we offer special pricing for educational institutions. Contact our sales team for more information.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to action */}
        <section className="py-16">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Ready to Get Started?</h2>
              <p className="text-lg mb-8 text-muted-foreground">
                Join thousands of students and companies already using ElevateMatchAI.
              </p>
              <Button size="lg" className="btn-gradient">
                Sign Up Now
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
