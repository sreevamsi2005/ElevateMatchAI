
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <div className="relative overflow-hidden pt-20 pb-16 md:pb-20 lg:pb-24">
      {/* Background effects */}
      <div className="hero-gradient pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true"></div>
      
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="space-y-2">
            <h1 className="animate-in text-4xl font-bold tracking-tight text-balance md:text-5xl lg:text-6xl">
              Elevate Your Career with{" "}
              <span className="gradient-text font-extrabold">AI-Powered</span>
              {" "}Talent Matching
            </h1>
            <p className="mx-auto max-w-[700px] text-balance text-muted-foreground md:text-lg">
              Connecting talented students with forward-thinking companies through 
              advanced AI matching, skill verification, and career preparation tools.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="btn-gradient h-12 px-6 font-medium">
              <Link to="/signup">Get Started Free</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-6 font-medium">
              <Link to="/careers">
                View Careers
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <div className="flex items-center">
              <CheckCircle2 className="mr-1.5 h-4 w-4 text-primary" />
              AI-Powered Resume Builder
            </div>
            <div className="flex items-center">
              <CheckCircle2 className="mr-1.5 h-4 w-4 text-primary" />
              Mock Interview Simulation
            </div>
            <div className="flex items-center">
              <CheckCircle2 className="mr-1.5 h-4 w-4 text-primary" />
              Blockchain Verified Skills
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="mx-auto mt-10 max-w-5xl rounded-lg border bg-white/50 p-2 shadow-lg dark:bg-gray-900/50 backdrop-blur-sm">
          <div className="aspect-[16/9] overflow-hidden rounded bg-muted/50">
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5">
              <div className="flex flex-col items-center justify-center p-6 text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-3">
                  <div className="h-14 w-14 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                    <span className="text-3xl font-bold text-white">E</span>
                  </div>
                </div>
                <p className="text-balance text-lg font-medium">Platform Preview</p>
                <p className="text-sm text-muted-foreground">Interactive demo coming soon</p>
              </div>
            </div>
          </div>
        </div>

        {/* Logos section */}
        <div className="mx-auto mt-12 max-w-5xl">
          <p className="mb-6 text-center text-sm font-medium text-muted-foreground">
            TRUSTED BY LEADING COMPANIES & UNIVERSITIES
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-8 opacity-80">
            {[1, 2, 3, 4, 5].map((logo) => (
              <div key={logo} className="h-7 w-auto opacity-70 grayscale transition-all hover:opacity-100 hover:grayscale-0">
                <div className="h-full w-20 rounded bg-muted"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
