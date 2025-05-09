
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Testimonial {
  id: number;
  content: string;
  avatar: string;
  name: string;
  title: string;
  company?: string;
  type: "student" | "company";
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    content: "The AI resume builder was a game-changer in my job search. I received 3x more callbacks after using ElevateMatchAI's tools.",
    avatar: "",
    name: "Sarah Chen",
    title: "Software Developer",
    company: "TechNova",
    type: "student",
  },
  {
    id: 2,
    content: "The mock interview system prepared me for questions I never would have anticipated. I felt confident walking into every real interview.",
    avatar: "",
    name: "Miguel Rodriguez",
    title: "Marketing Graduate",
    type: "student",
  },
  {
    id: 3,
    content: "We've reduced our hiring time by 40% using ElevateMatchAI's platform. The quality of candidates we're receiving is exceptional.",
    avatar: "",
    name: "Jennifer Park",
    title: "HR Director",
    company: "GlobalTech Solutions",
    type: "company",
  },
  {
    id: 4,
    content: "The AI-verified skill badges have made it so much easier to identify qualified candidates without lengthy technical assessments.",
    avatar: "",
    name: "Alex Johnson",
    title: "Engineering Manager",
    company: "Innovate Labs",
    type: "company",
  },
  {
    id: 5,
    content: "I secured an internship at my dream company after following the career roadmap generated for me. The platform knew exactly what I needed.",
    avatar: "",
    name: "Jordan Lee",
    title: "Computer Science Student",
    type: "student",
  },
  {
    id: 6,
    content: "Our recruitment process is now almost entirely data-driven thanks to ElevateMatchAI's analytics. Our retention rates have improved significantly.",
    avatar: "",
    name: "David Singh",
    title: "Talent Acquisition Lead",
    company: "FutureWorks",
    type: "company",
  },
];

export function Testimonials() {
  const [filter, setFilter] = useState<"all" | "student" | "company">("all");
  const [currentPage, setCurrentPage] = useState(0);

  const filteredTestimonials = testimonials.filter(
    (t) => filter === "all" || t.type === filter
  );

  const totalPages = Math.ceil(filteredTestimonials.length / 3);

  const displayedTestimonials = filteredTestimonials.slice(
    currentPage * 3,
    (currentPage + 1) * 3
  );

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <section className="container py-16 md:py-20">
      <div className="mx-auto text-center md:max-w-[58rem]">
        <h2 className="text-3xl font-bold leading-tight text-balance md:text-4xl lg:text-5xl">
          Success Stories from Our{" "}
          <span className="gradient-text">Community</span>
        </h2>
        <p className="mt-4 text-balance text-muted-foreground md:text-lg">
          Hear from students and employers who transformed their careers and recruitment processes with ElevateMatchAI.
        </p>
      </div>

      <div className="mt-10 flex justify-center">
        <div className="flex gap-2 rounded-lg border p-1">
          <Button 
            variant={filter === "all" ? "default" : "ghost"}
            onClick={() => {
              setFilter("all");
              setCurrentPage(0);
            }}
            className="text-sm"
          >
            All
          </Button>
          <Button
            variant={filter === "student" ? "default" : "ghost"}
            onClick={() => {
              setFilter("student");
              setCurrentPage(0);
            }}
            className="text-sm"
          >
            Students
          </Button>
          <Button
            variant={filter === "company" ? "default" : "ghost"}
            onClick={() => {
              setFilter("company");
              setCurrentPage(0);
            }}
            className="text-sm"
          >
            Companies
          </Button>
        </div>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {displayedTestimonials.map((testimonial) => (
          <Card key={testimonial.id} className="glass-card overflow-hidden">
            <CardContent className="p-6">
              <Quote className="h-8 w-8 text-primary/30" />
              <p className="mt-4 text-balance">{testimonial.content}</p>
              <div className="mt-6 flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={testimonial.avatar} />
                  <AvatarFallback className="bg-primary/10">
                    {testimonial.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.title}
                    {testimonial.company && ` • ${testimonial.company}`}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-8 flex justify-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={prevPage}
            disabled={totalPages <= 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <Button
                key={i}
                variant={i === currentPage ? "default" : "outline"}
                size="icon"
                className="h-8 w-8"
                onClick={() => setCurrentPage(i)}
              >
                {i + 1}
              </Button>
            ))}
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={nextPage}
            disabled={totalPages <= 1}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </section>
  );
}
