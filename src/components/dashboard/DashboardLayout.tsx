
import { ReactNode, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Menu, 
  Search, 
  Bell, 
  Moon, 
  Sun, 
  Settings, 
  LogOut,
  X,
  UserRoundCog,
  Users,
} from "lucide-react";
import { useTheme } from "@/components/ui/theme-provider";
import { useAuth } from "@/context/AuthContext";

interface DashboardLayoutProps {
  children: ReactNode;
  userType: "student" | "company" | "admin";
  navItems: {
    title: string;
    href: string;
    icon: React.ElementType;
  }[];
}

export function DashboardLayout({ 
  children, 
  userType,
  navItems 
}: DashboardLayoutProps) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const isDarkMode = theme === "dark";
  const location = useLocation();
  const navigate = useNavigate();
  const { userDetails, signOut } = useAuth();
  
  const toggleDarkMode = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const getUserTitle = () => {
    switch (userType) {
      case "student":
        return "Student Dashboard";
      case "company":
        return "Company Dashboard";
      case "admin":
        return "Admin Dashboard";
      default:
        return "Dashboard";
    }
  };

  const getUserName = () => {
    if (userDetails) {
      if (userDetails.first_name && userDetails.last_name) {
        return `${userDetails.first_name} ${userDetails.last_name}`;
      } else if (userDetails.first_name) {
        return userDetails.first_name;
      }
    }
    return userType === "student" ? "Student User" : userType === "company" ? "Company User" : "Admin User";
  };

  const getUserRole = () => {
    if (userType === "student") {
      return userDetails?.specialization ? 
        userDetails.specialization.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) + " Student" : 
        "Student";
    } else if (userType === "company") {
      return "Company";
    }
    return "Administrator";
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (userDetails?.first_name) {
      const firstInitial = userDetails.first_name.charAt(0).toUpperCase();
      const lastInitial = userDetails.last_name ? userDetails.last_name.charAt(0).toUpperCase() : "";
      return firstInitial + lastInitial;
    }
    return userType === "student" ? "ST" : userType === "company" ? "CO" : "AD";
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navigation */}
      <header className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-30">
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-3 lg:space-x-6">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            <Link to="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                <span className="text-sm font-bold text-white">E</span>
              </div>
              <span className="font-bold text-lg hidden md:inline-block font-heading">ElevateMatchAI</span>
            </Link>
            
            <div className="hidden sm:flex items-center space-x-2 rounded-md border px-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="h-8 w-[150px] lg:w-[250px] border-0 bg-transparent focus:outline-none focus:ring-0"
              />
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Community Button */}
            <Button 
              variant="outline" 
              size="sm"
              className="hidden md:flex items-center gap-1"
              onClick={() => navigate("/community")}
            >
              <Users className="h-4 w-4 mr-1" />
              Community
            </Button>
            
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary"></span>
            </Button>
            
            <Button onClick={toggleDarkMode} variant="ghost" size="icon">
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="/avatar.png" alt="User" />
                    <AvatarFallback>{getUserInitials()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="glass-card">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-0.5">
                    <p className="text-sm font-medium">{getUserName()}</p>
                    <p className="text-xs text-muted-foreground">{getUserRole()}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/student-dashboard/update-profile" className="cursor-pointer">
                    <UserRoundCog className="mr-2 h-4 w-4" />
                    Update Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/student-dashboard/settings" className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="cursor-pointer text-destructive focus:text-destructive"
                  onClick={handleSignOut}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Mobile navigation - Overlay */}
      {isMobileNavOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileNavOpen(false)}
        />
      )}

      <div className="flex flex-1">
        {/* Sidebar - mobile */}
        <div
          className={cn(
            "fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 ease-in-out lg:hidden",
            isMobileNavOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex h-full flex-col overflow-y-auto bg-muted/30 dark:bg-muted/10 border-r border-border shadow-xl">
            <div className="flex h-16 items-center border-b border-border px-4">
              <div className="flex items-center justify-between w-full">
                <h2 className="text-lg font-semibold">{getUserTitle()}</h2>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setIsMobileNavOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <nav className="space-y-1 p-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsMobileNavOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    location.pathname === item.href
                      ? "bg-primary/10 text-primary"
                      : "text-foreground/70 hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Sidebar - desktop */}
        <aside className="hidden lg:flex lg:w-72 flex-col border-r border-border bg-muted/30 dark:bg-muted/10">
          <div className="flex flex-col gap-2 p-4">
            <div className="flex items-center h-10 mb-4">
              <h2 className="text-lg font-semibold">{getUserTitle()}</h2>
            </div>
            <nav className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    location.pathname === item.href
                      ? "bg-primary/10 text-primary"
                      : "text-foreground/70 hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1">
          <div className="px-4 py-6 md:px-6 md:py-8 lg:px-8 lg:py-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
