
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Menu,
  Moon,
  Sun,
  X,
  ChevronDown,
  LayoutDashboard,
  GraduationCap,
  Briefcase
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface NavbarProps {
  className?: string;
  setDarkMode?: React.Dispatch<React.SetStateAction<boolean>>;
  isDarkMode?: boolean;
}

export function Navbar({ className, setDarkMode, isDarkMode }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Listen to scroll events
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDarkMode = () => {
    if (setDarkMode) {
      setDarkMode(!isDarkMode);
      localStorage.setItem("theme", isDarkMode ? "light" : "dark");
      document.documentElement.classList.toggle("dark");
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-40 transition-all duration-200",
        isScrolled
          ? "bg-background/80 dark:bg-background/80 backdrop-blur-md border-b border-border"
          : "bg-transparent",
        className
      )}
    >
      <div className="container flex items-center justify-between h-16 md:h-20 px-4 md:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
            <span className="text-lg font-bold text-white">E</span>
          </div>
          <span className="text-xl font-bold font-heading">ElevateMatchAI</span>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          <Link to="/" className="nav-link">Home</Link>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="nav-link flex items-center gap-1">
                Solutions <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-56 glass-card">
              <DropdownMenuItem asChild>
                <Link to="/students" className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  <div>
                    <p className="font-medium">Students</p>
                    <p className="text-xs text-muted-foreground">Career preparation tools</p>
                  </div>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/companies" className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  <div>
                    <p className="font-medium">Companies</p>
                    <p className="text-xs text-muted-foreground">AI-driven hiring tools</p>
                  </div>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Link to="/pricing" className="nav-link">Pricing</Link>
          <Link to="/community" className="nav-link">Community</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </nav>
        
        <div className="hidden md:flex items-center gap-4">
          <Button onClick={toggleDarkMode} variant="ghost" size="icon" className="rounded-full">
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Link to="/login">
            <Button variant="outline">Log in</Button>
          </Link>
          <Link to="/signup">
            <Button className="btn-gradient">Sign up</Button>
          </Link>
        </div>

        {/* Mobile Nav */}
        <div className="flex md:hidden items-center gap-2">
          <Button onClick={toggleDarkMode} variant="ghost" size="icon" className="rounded-full">
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 top-16 z-30 bg-background dark:bg-background transform transition-transform duration-300 ease-in-out md:hidden",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col p-6 space-y-4">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="py-2 text-lg">Home</Link>
          <div className="py-2 border-b border-border">
            <p className="font-medium text-lg mb-2">Solutions</p>
            <Link to="/students" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 py-2">
              <GraduationCap className="h-4 w-4" />
              <span>For Students</span>
            </Link>
            <Link to="/companies" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 py-2">
              <Briefcase className="h-4 w-4" />
              <span>For Companies</span>
            </Link>
          </div>
          <Link to="/pricing" onClick={() => setIsMobileMenuOpen(false)} className="py-2 text-lg">Pricing</Link>
          <Link to="/community" onClick={() => setIsMobileMenuOpen(false)} className="py-2 text-lg">Community</Link>
          <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="py-2 text-lg">About</Link>
          <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="py-2 text-lg">Contact</Link>
          
          <div className="flex flex-col gap-2 pt-4">
            <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
              <Button variant="outline" className="w-full">Log in</Button>
            </Link>
            <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
              <Button className="w-full btn-gradient">Sign up</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
