import {
  Home,
  FileText,
  MessageSquare,
  GraduationCap,
  Sparkles,
  Briefcase,
  BookOpen,
  BarChart,
  Settings,
  FileEdit,
  Building,
  Users,
  LineChart,
  Calendar,
  Database,
  PanelLeft,
  FileSearch,
  BellRing,
  UserRoundCog,
  Shield,
  Mail,
} from "lucide-react";

export const studentNavItems = [
  {
    title: "Overview",
    href: "/student-dashboard",
    icon: Home,
  },
  {
    title: "Resume Builder",
    href: "/student-dashboard/resume",
    icon: FileText,
  },
  {
    title: "Mock Interviews",
    href: "/student-dashboard/interviews",
    icon: MessageSquare,
  },
  {
    title: "Career Roadmap",
    href: "/student-dashboard/roadmap",
    icon: GraduationCap,
  },
  {
    title: "Skill Tests",
    href: "/student-dashboard/skills",
    icon: Sparkles,
  },
  {
    title: "Job Board",
    href: "/student-dashboard/jobs",
    icon: Briefcase,
  },
  {
    title: "Learning Path",
    href: "/student-dashboard/learning",
    icon: BookOpen,
  },
  {
    title: "Off-Campus Calendar",
    href: "/student-dashboard/off-campus",
    icon: Building,
  },
  {
    title: "Analytics",
    href: "/student-dashboard/analytics",
    icon: BarChart,
  },
  {
    title: "Update Profile",
    href: "/student-dashboard/update-profile",
    icon: FileEdit,
  },
  {
    title: "Settings",
    href: "/student-dashboard/settings",
    icon: Settings,
  },
];

export const companyNavItems = [
  {
    title: "Overview",
    href: "/company-dashboard",
    icon: Home,
  },
  {
    title: "Job Postings",
    href: "/company-dashboard/jobs",
    icon: Briefcase,
  },
  {
    title: "Candidate Database",
    href: "/company-dashboard/candidates",
    icon: Database,
  },
  {
    title: "Applications",
    href: "/company-dashboard/applications",
    icon: FileSearch,
  },
  {
    title: "Interviews",
    href: "/company-dashboard/interviews",
    icon: Calendar,
  },
  {
    title: "Analytics",
    href: "/company-dashboard/analytics",
    icon: LineChart,
  },
  {
    title: "Talent Pool",
    href: "/company-dashboard/talent",
    icon: Users,
  },
  {
    title: "Notifications",
    href: "/company-dashboard/notifications",
    icon: BellRing,
  },
  {
    title: "Company Profile",
    href: "/company-dashboard/profile",
    icon: FileEdit,
  },
  {
    title: "Settings",
    href: "/company-dashboard/settings",
    icon: Settings,
  },
];

export const adminNavItems = [
  {
    title: "Overview",
    href: "/admin-dashboard",
    icon: Home,
  },
  {
    title: "User Management",
    href: "/admin-dashboard/users",
    icon: Users,
  },
  {
    title: "Company Management",
    href: "/admin-dashboard/companies",
    icon: Building,
  },
  {
    title: "Job Postings",
    href: "/admin-dashboard/jobs",
    icon: Briefcase,
  },
  {
    title: "Analytics",
    href: "/admin-dashboard/analytics",
    icon: LineChart,
  },
  {
    title: "System Settings",
    href: "/admin-dashboard/settings",
    icon: Settings,
  },
  {
    title: "Security",
    href: "/admin-dashboard/security",
    icon: Shield,
  },
  {
    title: "Notifications",
    href: "/admin-dashboard/notifications",
    icon: BellRing,
  },
  {
    title: "Support Inbox",
    href: "/admin-dashboard/support",
    icon: Mail,
  },
  {
    title: "Profile",
    href: "/admin-dashboard/profile",
    icon: UserRoundCog,
  },
];

// For backward compatibility
export const navItems = studentNavItems;
