
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, Award, MessageSquare, BookOpen, Heart } from "lucide-react";

export default function Community() {
  const upcomingEvents = [
    {
      title: "Resume Workshop",
      date: "May 15, 2025",
      time: "2:00 PM - 3:30 PM EDT",
      speaker: "Sarah Johnson",
      role: "HR Director, TechCorp",
      attendees: 128
    },
    {
      title: "Mock Interview Session",
      date: "May 20, 2025",
      time: "1:00 PM - 4:00 PM EDT",
      speaker: "Michael Chen",
      role: "Talent Acquisition Lead, InnoSoft",
      attendees: 86
    },
    {
      title: "AI in Hiring Panel Discussion",
      date: "May 25, 2025",
      time: "11:00 AM - 12:30 PM EDT",
      speaker: "Various Experts",
      role: "Industry Leaders",
      attendees: 215
    }
  ];

  const forumTopics = [
    {
      title: "Tips for technical interviews in 2025",
      author: "Alex J.",
      avatar: "/avatar.png",
      replies: 24,
      likes: 47,
      tags: ["interviews", "technical", "tips"]
    },
    {
      title: "How to get noticed by recruiters",
      author: "Mia S.",
      avatar: "/avatar.png",
      replies: 38,
      likes: 65,
      tags: ["recruiters", "career", "advice"]
    },
    {
      title: "AI tools everyone should be using",
      author: "Noah P.",
      avatar: "/avatar.png",
      replies: 19,
      likes: 52,
      tags: ["ai", "tools", "productivity"]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero section */}
        <section className="bg-gradient-to-br from-primary/20 to-secondary/20 py-16 md:py-24">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold mb-6">Join Our Community</h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Connect with students, professionals, and companies. Share knowledge,
                attend events, and grow together in your career journey.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" className="btn-gradient">
                  <Users className="mr-2 h-4 w-4" />
                  Join Forum
                </Button>
                <Button size="lg" variant="outline">
                  <Calendar className="mr-2 h-4 w-4" />
                  Browse Events
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats section */}
        <section className="py-12 bg-muted/30">
          <div className="container px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              <div className="bg-background rounded-lg p-6 text-center shadow-sm">
                <p className="text-3xl md:text-4xl font-bold text-primary">10k+</p>
                <p className="text-sm text-muted-foreground">Active Members</p>
              </div>
              <div className="bg-background rounded-lg p-6 text-center shadow-sm">
                <p className="text-3xl md:text-4xl font-bold text-primary">500+</p>
                <p className="text-sm text-muted-foreground">Companies</p>
              </div>
              <div className="bg-background rounded-lg p-6 text-center shadow-sm">
                <p className="text-3xl md:text-4xl font-bold text-primary">250+</p>
                <p className="text-sm text-muted-foreground">Monthly Events</p>
              </div>
              <div className="bg-background rounded-lg p-6 text-center shadow-sm">
                <p className="text-3xl md:text-4xl font-bold text-primary">85%</p>
                <p className="text-sm text-muted-foreground">Success Rate</p>
              </div>
            </div>
          </div>
        </section>

        {/* Events section */}
        <section className="py-16">
          <div className="container px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">Upcoming Events</h2>
              <Button variant="outline">
                View All Events
                <Calendar className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {upcomingEvents.map((event, index) => (
                <Card key={index} className="bg-card">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle>{event.title}</CardTitle>
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                        Virtual
                      </Badge>
                    </div>
                    <CardDescription>
                      {event.date} • {event.time}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 mb-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{event.speaker.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="text-sm">
                        <p className="font-medium">{event.speaker}</p>
                        <p className="text-muted-foreground text-xs">{event.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="h-4 w-4 mr-1" />
                      <span>{event.attendees} attending</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Register Now</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Forum section */}
        <section className="py-16 bg-muted/30">
          <div className="container px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">Popular Forum Topics</h2>
              <Button variant="outline">
                Browse All Topics
                <MessageSquare className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              {forumTopics.map((topic, index) => (
                <div key={index} className="bg-card rounded-lg p-4 md:p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={topic.avatar} alt={topic.author} />
                        <AvatarFallback>{topic.author.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{topic.title}</h3>
                        <p className="text-sm text-muted-foreground">Posted by {topic.author}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        <span>{topic.replies}</span>
                      </div>
                      <div className="flex items-center">
                        <Heart className="h-4 w-4 mr-1" />
                        <span>{topic.likes}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {topic.tags.map((tag, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <Button>
                Join the Conversation
              </Button>
            </div>
          </div>
        </section>

        {/* Resources section */}
        <section className="py-16">
          <div className="container px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Free Resources</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Download templates, guides, and tools to help you in your career journey.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Resume Templates
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Professional resume templates designed for different industries.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Download</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    Interview Guide
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Comprehensive guide to ace your next job interview.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Download</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Networking Toolkit
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Tools and strategies to build your professional network.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Download</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
