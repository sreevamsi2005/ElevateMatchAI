
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Create Your Profile",
      description:
        "Sign up and build your profile as a student or company. Students can add education, skills, and career goals, while companies can create their organization profile and hiring needs.",
      action: "Get Started",
      link: "/signup",
    },
    {
      number: "02",
      title: "Enhance Your Skills",
      description:
        "Students use AI tools to build resumes, practice interviews, and verify skills. Companies can create job postings and assessment criteria for ideal candidates.",
      action: "Explore Tools",
      link: "/features",
    },
    {
      number: "03",
      title: "Connect & Match",
      description:
        "Our AI matching algorithm connects students with companies based on compatibility. Companies discover pre-vetted talent, while students find opportunities aligned with their skills.",
      action: "See How Matching Works",
      link: "/matching",
    },
  ];

  return (
    <section className="container py-16 md:py-20" id="how-it-works">
      <div className="grid gap-12 lg:grid-cols-2">
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold leading-tight text-balance md:text-4xl lg:text-5xl">
            How ElevateMatchAI{" "}
            <span className="gradient-text">Works</span>
          </h2>
          <p className="mt-4 text-balance text-muted-foreground md:text-lg">
            Our platform uses advanced AI to bridge the gap between talented students and forward-thinking companies through a simple, effective process.
          </p>
          <div className="mt-8 hidden md:flex">
            <Button className="btn-gradient" asChild>
              <a href="/signup">
                Join Today
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>

        <div className="space-y-8">
          {steps.map((step, i) => (
            <Card key={i} className="overflow-hidden glass-card transition-all hover:-translate-y-1 hover:shadow-lg">
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row">
                  <div className="flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 p-6 text-center sm:w-24">
                    <span className="text-3xl font-bold text-primary">
                      {step.number}
                    </span>
                  </div>
                  <div className="flex-1 space-y-3 p-6">
                    <h3 className="text-xl font-bold">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                    <div className="pt-2">
                      <Button variant="link" className="p-0" asChild>
                        <a href={step.link}>
                          {step.action}
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="md:hidden">
          <Button className="btn-gradient w-full" asChild>
            <a href="/signup">
              Join Today
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
