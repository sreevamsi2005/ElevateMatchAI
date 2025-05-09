
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Briefcase, Target, Globe, Heart, Shield } from "lucide-react";

export default function About() {
  const team = [
    {
      name: "Sree Vamsi",
      role: "Founder & CEO",
      avatar: "/avatar.png",
      bio: "Former HR Director , AI Researcher and former Engineering lead."
    },
    {
      name: "XXX",
      role: "Co-Founder & CTO",
      avatar: "/avatar.png",
      bio: "-- ."
    },
    {
      name: "XXX",
      role: "Head of Product",
      avatar: "/avatar.png",
      bio: "XXX."
    },
    {
      name: "XXX",
      role: "Head of AI Research",
      avatar: "/avatar.png",
      bio: "--"
    }
  ];

  const values = [
    {
      icon: Target,
      title: "Excellence",
      description: "We strive for excellence in everything we do, from our platform to our service."
    },
    {
      icon: Shield,
      title: "Integrity",
      description: "We operate with honesty, transparency, and ethics in all our practices."
    },
    {
      icon: Heart,
      title: "Empathy",
      description: "We understand the challenges of job seekers and employers, and build solutions with empathy."
    },
    {
      icon: Globe,
      title: "Inclusivity",
      description: "We promote diversity and inclusive hiring practices through our technology."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero section */}
        <section className="bg-gradient-to-br from-primary/20 to-secondary/20 py-16 md:py-24">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold mb-6">Our Mission</h1>
              <p className="text-lg md:text-xl mb-8">
                We're on a mission to transform the hiring process and career development
                through ethical AI technology that bridges the gap between education and employment.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" className="btn-gradient">
                  Join Our Team
                </Button>
                <Button size="lg" variant="outline">
                  Learn Our Story
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Story section */}
        <section className="py-16">
          <div className="container px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Our Story</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    ElevateMatchAI was founded in 2025 by Sree vamsi
                    professional who experienced firsthand the disconnect between 
                    traditional education and employment market demands.
                  </p>
                  <p>
                    Extensive background in HR, witnessed countless qualified 
                    candidates being overlooked due to automated screening tools and rigid 
                    hiring processes. Founder with his expertise in AI, recognized the 
                    potential for technology to solve this problem rather than exacerbate it.
                  </p>
                  <p>
                    Then, he built ElevateMatchAI to create a more equitable, 
                    efficient, and transparent hiring ecosystem that helps students prepare 
                    for their careers and companies find the right talent beyond traditional metrics.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-lg bg-gradient-to-br from-primary to-secondary/70 shadow-xl">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-center p-6">
                      <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <span className="text-3xl font-bold">E</span>
                        </div>
                      </div>
                      <p className="text-xl font-medium">Founded in 2025</p>
                      <p className="mt-2 text-white/80">India</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-background border border-border shadow-lg flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-xl font-bold text-primary">2025</p>
                    <p className="text-xs">Founded</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values section */}
        <section className="py-16 bg-muted/30">
          <div className="container px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Our Core Values</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                These principles guide everything we do at ElevateMatchAI.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="bg-card">
                  <CardContent className="pt-6">
                    <div className="mb-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <value.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Stats section */}
        <section className="py-16">
          <div className="container px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              <div className="rounded-lg p-6 text-center">
                <div className="mb-3 w-12 h-12 rounded-full bg-primary/10 mx-auto flex items-center justify-center">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <p className="text-3xl md:text-4xl font-bold">10k+</p>
                <p className="text-sm text-muted-foreground">Students Helped</p>
              </div>
              <div className="rounded-lg p-6 text-center">
                <div className="mb-3 w-12 h-12 rounded-full bg-primary/10 mx-auto flex items-center justify-center">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <p className="text-3xl md:text-4xl font-bold">500+</p>
                <p className="text-sm text-muted-foreground">Partner Companies</p>
              </div>
              <div className="rounded-lg p-6 text-center">
                <div className="mb-3 w-12 h-12 rounded-full bg-primary/10 mx-auto flex items-center justify-center">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <p className="text-3xl md:text-4xl font-bold">25+</p>
                <p className="text-sm text-muted-foreground">Countries Served</p>
              </div>
              <div className="rounded-lg p-6 text-center">
                <div className="mb-3 w-12 h-12 rounded-full bg-primary/10 mx-auto flex items-center justify-center">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <p className="text-3xl md:text-4xl font-bold">85%</p>
                <p className="text-sm text-muted-foreground">Success Rate</p>
              </div>
            </div>
          </div>
        </section>

        {/* Team section */}
        <section className="py-16 bg-muted/30">
          <div className="container px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Meet Our Team</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The passionate individuals behind ElevateMatchAI.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, index) => (
                <div key={index} className="bg-card rounded-lg p-6 text-center shadow-sm">
                  <Avatar className="h-24 w-24 mx-auto mb-4">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-primary mb-2">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Button size="lg">
                Join Our Team
              </Button>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="py-16 bg-gradient-to-br from-primary/20 to-secondary/20">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Transform Your Career or Hiring Process?</h2>
              <p className="text-muted-foreground mb-8">
                Join thousands of students and companies already using ElevateMatchAI.
              </p>
              <Button size="lg" className="btn-gradient">
                Get Started Today
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
