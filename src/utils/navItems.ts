
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
} from "lucide-react";

export const navItems = [
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
