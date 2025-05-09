
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function CTA() {
  return (
    <section className="bg-muted/30 dark:bg-muted/10 py-16 md:py-20">
      <div className="container">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold leading-tight text-balance md:text-4xl lg:text-5xl">
            Ready to <span className="gradient-text">Elevate</span> Your Career or Recruitment?
          </h2>
          <p className="mt-4 max-w-[68ch] text-balance text-muted-foreground md:text-lg">
            Join thousands of students and companies already using ElevateMatchAI to bridge the gap between education and employment. Get started for free today.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="btn-gradient h-12 px-6 font-medium">
              <Link to="/signup">Get Started Free</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-6 font-medium">
              <Link to="/demo">
                Request Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
