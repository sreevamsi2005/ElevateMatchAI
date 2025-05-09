
import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Testimonials } from "@/components/landing/Testimonials";
import { Pricing } from "@/components/landing/Pricing";
import { CTA } from "@/components/landing/CTA";
import { ThemeProvider } from "@/components/ui/theme-provider";

const Index = () => {
  const [isDarkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check if user has already set a preference
    const storedTheme = localStorage.getItem("theme");
    
    if (storedTheme) {
      setDarkMode(storedTheme === "dark");
      document.documentElement.classList.toggle("dark", storedTheme === "dark");
    } else {
      // Check system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setDarkMode(prefersDark);
      document.documentElement.classList.toggle("dark", prefersDark);
    }
  }, []);

  return (
    <ThemeProvider>
      <div className="flex min-h-screen flex-col">
        <Navbar isDarkMode={isDarkMode} setDarkMode={setDarkMode} />
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
    </ThemeProvider>
  );
};

export default Index;
