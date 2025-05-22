
import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Testimonials } from "@/components/landing/Testimonials";
import { Pricing } from "@/components/landing/Pricing";
import { CTA } from "@/components/landing/CTA";
import { useTheme } from "@/components/ui/theme-provider";

const Index = () => {
  const { isDarkMode, setTheme } = useTheme();

  useEffect(() => {
    // Check if user has already set a preference
    const storedTheme = localStorage.getItem("theme");
    
    if (storedTheme) {
      document.documentElement.classList.toggle("dark", storedTheme === "dark");
    } else {
      // Check system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.classList.toggle("dark", prefersDark);
    }
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar isDarkMode={isDarkMode} setDarkMode={(value) => setTheme(value ? "dark" : "light")} />
      <main className="flex-1">
        <Hero />
        <Features />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
