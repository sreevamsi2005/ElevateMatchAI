
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingTier {
  name: string;
  description: string;
  price: {
    monthly: string;
    yearly: string;
  };
  features: PricingFeature[];
  popular?: boolean;
  type: "student" | "company";
}

const pricingTiers: PricingTier[] = [
  // Student Plans
  {
    name: "Free",
    description: "Essential tools to start your career journey",
    price: {
      monthly: "$0",
      yearly: "$0",
    },
    features: [
      { text: "Basic Resume Builder", included: true },
      { text: "3 Mock Interviews/month", included: true },
      { text: "Limited Job Board Access", included: true },
      { text: "Basic Skills Tests", included: true },
      { text: "AI Resume Review", included: false },
      { text: "Priority Job Matching", included: false },
      { text: "Video Interview Practice", included: false },
      { text: "Verified Skills Badges", included: false },
    ],
    type: "student",
  },
  {
    name: "Pro",
    description: "Advanced tools for serious career seekers",
    price: {
      monthly: "$9.99",
      yearly: "$7.99",
    },
    features: [
      { text: "Advanced Resume Builder", included: true },
      { text: "Unlimited Mock Interviews", included: true },
      { text: "Full Job Board Access", included: true },
      { text: "Advanced Skills Tests", included: true },
      { text: "AI Resume Review", included: true },
      { text: "Priority Job Matching", included: true },
      { text: "Video Interview Practice", included: true },
      { text: "3 Verified Skills Badges", included: true },
    ],
    popular: true,
    type: "student",
  },
  {
    name: "Premium",
    description: "The ultimate career acceleration toolkit",
    price: {
      monthly: "$19.99",
      yearly: "$16.99",
    },
    features: [
      { text: "Premium Resume Builder", included: true },
      { text: "Unlimited Mock Interviews", included: true },
      { text: "Priority Job Board Access", included: true },
      { text: "All Skills Tests + Custom", included: true },
      { text: "Advanced AI Resume Review", included: true },
      { text: "VIP Job Matching", included: true },
      { text: "Video Interview With Analysis", included: true },
      { text: "Unlimited Verified Skills Badges", included: true },
    ],
    type: "student",
  },
  // Company Plans
  {
    name: "Starter",
    description: "Basic tools for small businesses",
    price: {
      monthly: "$99",
      yearly: "$79",
    },
    features: [
      { text: "5 Job Postings", included: true },
      { text: "Basic AI Matching", included: true },
      { text: "Standard Assessments", included: true },
      { text: "Basic Analytics", included: true },
      { text: "AI Interview Screening", included: false },
      { text: "Custom Assessments", included: false },
      { text: "Verified Credential Checks", included: false },
      { text: "Advanced Analytics", included: false },
    ],
    type: "company",
  },
  {
    name: "Business",
    description: "Comprehensive tools for growing teams",
    price: {
      monthly: "$299",
      yearly: "$249",
    },
    features: [
      { text: "25 Job Postings", included: true },
      { text: "Advanced AI Matching", included: true },
      { text: "Premium Assessments", included: true },
      { text: "Full Analytics Suite", included: true },
      { text: "AI Interview Screening", included: true },
      { text: "Custom Assessments", included: true },
      { text: "Verified Credential Checks", included: true },
      { text: "Hiring Pipeline Management", included: true },
    ],
    popular: true,
    type: "company",
  },
  {
    name: "Enterprise",
    description: "Custom solutions for large organizations",
    price: {
      monthly: "Custom",
      yearly: "Custom",
    },
    features: [
      { text: "Unlimited Job Postings", included: true },
      { text: "Enterprise AI Matching", included: true },
      { text: "Custom Assessment System", included: true },
      { text: "Advanced Analytics & Reporting", included: true },
      { text: "Advanced AI Screening", included: true },
      { text: "White-labeled Platform", included: true },
      { text: "API Access", included: true },
      { text: "Dedicated Account Manager", included: true },
    ],
    type: "company",
  },
];

export function Pricing() {
  return (
    <section className="container py-16 md:py-20" id="pricing">
      <div className="mx-auto text-center md:max-w-[58rem]">
        <h2 className="text-3xl font-bold leading-tight text-balance md:text-4xl lg:text-5xl">
          Simple, Transparent{" "}
          <span className="gradient-text">Pricing</span>
        </h2>
        <p className="mt-4 text-balance text-muted-foreground md:text-lg">
          Affordable plans for students and powerful tools for companies of all sizes.
        </p>
      </div>

      <Tabs defaultValue="student" className="mt-10">
        <div className="flex justify-center">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="student">For Students</TabsTrigger>
            <TabsTrigger value="company">For Companies</TabsTrigger>
          </TabsList>
        </div>

        <div className="mt-4 flex justify-center">
          <Tabs defaultValue="monthly" className="w-full max-w-md">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="yearly">Yearly (Save 20%)</TabsTrigger>
            </TabsList>

            <TabsContent value="monthly" className="mt-0"></TabsContent>
            <TabsContent value="yearly" className="mt-0"></TabsContent>
          </Tabs>
        </div>

        <TabsContent value="student" className="mt-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pricingTiers
              .filter((tier) => tier.type === "student")
              .map((tier, i) => (
                <Card
                  key={i}
                  className={`glass-card flex flex-col ${
                    tier.popular
                      ? "border-primary/50 shadow-lg"
                      : "border-border"
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">{tier.name}</CardTitle>
                      {tier.popular && (
                        <Badge className="bg-primary text-primary-foreground">Popular</Badge>
                      )}
                    </div>
                    <CardDescription>{tier.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="mb-4">
                      <span className="text-4xl font-bold">
                        <span className="text-3xl align-top">$</span>
                        {tier.price.monthly === "Custom"
                          ? "Custom"
                          : tier.price.monthly.replace("$", "")}
                      </span>
                      {tier.price.monthly !== "$0" && tier.price.monthly !== "Custom" && (
                        <span className="text-muted-foreground ml-2">per month</span>
                      )}
                    </div>

                    <ul className="space-y-2">
                      {tier.features.map((feature, j) => (
                        <li
                          key={j}
                          className={`flex items-start gap-2 ${
                            !feature.included && "text-muted-foreground"
                          }`}
                        >
                          <CheckCircle2
                            className={`h-5 w-5 shrink-0 ${
                              feature.included
                                ? "text-primary"
                                : "text-muted-foreground/50"
                            }`}
                          />
                          <span className="text-sm">{feature.text}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className={
                        tier.popular
                          ? "btn-gradient w-full"
                          : "w-full"
                      }
                      variant={tier.popular ? "default" : "outline"}
                    >
                      {tier.price.monthly === "$0" ? "Sign Up Free" : "Get Started"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="company" className="mt-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pricingTiers
              .filter((tier) => tier.type === "company")
              .map((tier, i) => (
                <Card
                  key={i}
                  className={`glass-card flex flex-col ${
                    tier.popular
                      ? "border-primary/50 shadow-lg"
                      : "border-border"
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">{tier.name}</CardTitle>
                      {tier.popular && (
                        <Badge className="bg-primary text-primary-foreground">Popular</Badge>
                      )}
                    </div>
                    <CardDescription>{tier.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="mb-4">
                      <span className="text-4xl font-bold">
                        {tier.price.monthly === "Custom" ? (
                          "Custom"
                        ) : (
                          <>
                            <span className="text-3xl align-top">$</span>
                            {tier.price.monthly.replace("$", "")}
                          </>
                        )}
                      </span>
                      {tier.price.monthly !== "Custom" && (
                        <span className="text-muted-foreground ml-2">per month</span>
                      )}
                    </div>

                    <ul className="space-y-2">
                      {tier.features.map((feature, j) => (
                        <li
                          key={j}
                          className={`flex items-start gap-2 ${
                            !feature.included && "text-muted-foreground"
                          }`}
                        >
                          <CheckCircle2
                            className={`h-5 w-5 shrink-0 ${
                              feature.included
                                ? "text-primary"
                                : "text-muted-foreground/50"
                            }`}
                          />
                          <span className="text-sm">{feature.text}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className={
                        tier.popular
                          ? "btn-gradient w-full"
                          : "w-full"
                      }
                      variant={tier.popular ? "default" : "outline"}
                    >
                      {tier.price.monthly === "Custom"
                        ? "Contact Sales"
                        : "Get Started"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-12 text-center">
        <h3 className="text-xl font-bold">Need a custom plan?</h3>
        <p className="mt-2 text-muted-foreground">
          Contact our sales team for a custom solution tailored to your specific needs.
        </p>
        <Button className="mt-6" variant="outline">
          Contact Sales
        </Button>
      </div>
    </section>
  );
}
