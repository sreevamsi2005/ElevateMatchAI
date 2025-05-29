import React from 'react';
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { companyNavItems } from "@/utils/navItems";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Briefcase, 
  Users, 
  FileText, 
  Calendar, 
  BarChart, 
  UserPlus, 
  Bell, 
  Building 
} from 'lucide-react';

const Overview = () => {
  const metrics = [
    { title: "Active Job Postings", value: "12", icon: <Briefcase className="h-6 w-6" /> },
    { title: "Total Candidates", value: "245", icon: <Users className="h-6 w-6" /> },
    { title: "New Applications", value: "28", icon: <FileText className="h-6 w-6" /> },
    { title: "Upcoming Interviews", value: "8", icon: <Calendar className="h-6 w-6" /> },
  ];

  const quickAccess = [
    { title: "Post New Job", icon: <Briefcase className="h-6 w-6" />, link: "/company-dashboard/jobs/new" },
    { title: "View Candidates", icon: <Users className="h-6 w-6" />, link: "/company-dashboard/candidates" },
    { title: "Review Applications", icon: <FileText className="h-6 w-6" />, link: "/company-dashboard/applications" },
    { title: "Schedule Interview", icon: <Calendar className="h-6 w-6" />, link: "/company-dashboard/interviews" },
    { title: "View Analytics", icon: <BarChart className="h-6 w-6" />, link: "/company-dashboard/analytics" },
    { title: "Talent Pool", icon: <UserPlus className="h-6 w-6" />, link: "/company-dashboard/talent" },
    { title: "Notifications", icon: <Bell className="h-6 w-6" />, link: "/company-dashboard/notifications" },
    { title: "Company Profile", icon: <Building className="h-6 w-6" />, link: "/company-dashboard/profile" },
  ];

  return (
    <DashboardLayout userType="company" navItems={companyNavItems}>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">Company Dashboard</h1>
        
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  {metric.title}
                </CardTitle>
                {metric.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Access */}
        <h2 className="text-2xl font-semibold mb-4">Quick Access</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickAccess.map((item, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 text-primary">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <Button variant="outline" className="w-full" asChild>
                    <a href={item.link}>Access</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Overview; 