
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  ArrowRight 
} from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/30 dark:bg-muted/10 border-t border-border pt-16 pb-8">
      <div className="container px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                <span className="text-lg font-bold text-white">E</span>
              </div>
              <span className="text-xl font-bold font-heading">ElevateMatchAI</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Bridging the gap between education and employment through AI-powered career development and recruitment solutions.
            </p>
            <div className="flex gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Solutions</h3>
            <ul className="space-y-2">
              <li><Link to="/students" className="text-sm text-muted-foreground hover:text-foreground">For Students</Link></li>
              <li><Link to="/companies" className="text-sm text-muted-foreground hover:text-foreground">For Companies</Link></li>
              <li><Link to="/ai-resume-builder" className="text-sm text-muted-foreground hover:text-foreground">AI Resume Builder</Link></li>
              <li><Link to="/mock-interviews" className="text-sm text-muted-foreground hover:text-foreground">Mock Interviews</Link></li>
              <li><Link to="/job-board" className="text-sm text-muted-foreground hover:text-foreground">Job Board</Link></li>
              <li><Link to="/blockchain-verification" className="text-sm text-muted-foreground hover:text-foreground">Blockchain Verification</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-sm text-muted-foreground hover:text-foreground">About Us</Link></li>
              <li><Link to="/careers" className="text-sm text-muted-foreground hover:text-foreground">Careers</Link></li>
              <li><Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground">Contact</Link></li>
              <li><Link to="/blog" className="text-sm text-muted-foreground hover:text-foreground">Blog</Link></li>
              <li><Link to="/press" className="text-sm text-muted-foreground hover:text-foreground">Press</Link></li>
              <li><Link to="/community" className="text-sm text-muted-foreground hover:text-foreground">Community</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Subscribe to our Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Stay updated on new features, success stories, and career tips.
            </p>
            <form className="flex flex-col gap-3">
              <div className="flex w-full max-w-sm items-center gap-1.5">
                <Input type="email" placeholder="Your email" className="bg-background" required />
                <Button type="submit" size="icon">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            © {currentYear} ElevateMatchAI. All rights reserved.
          </div>
          <div className="flex gap-6">
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground">Terms</Link>
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground">Privacy</Link>
            <Link to="/cookies" className="text-sm text-muted-foreground hover:text-foreground">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
