import React, { useState } from 'react';
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { companyNavItems } from "@/utils/navItems";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Download, TrendingUp, Users, Briefcase, Clock } from 'lucide-react';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("30d");

  // Mock data - replace with actual data from your backend
  const metrics = [
    {
      title: "Total Applications",
      value: "1,234",
      change: "+12.5%",
      trend: "up",
      icon: <Users className="h-6 w-6" />,
    },
    {
      title: "Active Job Postings",
      value: "45",
      change: "+5.2%",
      trend: "up",
      icon: <Briefcase className="h-6 w-6" />,
    },
    {
      title: "Average Time to Hire",
      value: "28 days",
      change: "-3.1%",
      trend: "down",
      icon: <Clock className="h-6 w-6" />,
    },
    {
      title: "Conversion Rate",
      value: "32%",
      change: "+2.4%",
      trend: "up",
      icon: <TrendingUp className="h-6 w-6" />,
    },
  ];

  const topSources = [
    { source: "LinkedIn", applications: 450, percentage: 36.5 },
    { source: "Company Website", applications: 320, percentage: 25.9 },
    { source: "Indeed", applications: 280, percentage: 22.7 },
    { source: "Referrals", applications: 184, percentage: 14.9 },
  ];

  return (
    <DashboardLayout userType="company" navItems={companyNavItems}>
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Analytics</h1>
          <div className="flex gap-4">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

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
                <div className="flex items-center gap-2 mt-2">
                  <Badge
                    variant={metric.trend === "up" ? "default" : "destructive"}
                    className="text-xs"
                  >
                    {metric.change}
                  </Badge>
                  <span className="text-xs text-gray-500">vs last period</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Application Sources */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Application Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topSources.map((source, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-32 text-sm font-medium">{source.source}</div>
                  <div className="flex-1">
                    <div className="h-2 bg-gray-100 rounded-full">
                      <div
                        className="h-2 bg-primary rounded-full"
                        style={{ width: `${source.percentage}%` }}
                      />
                    </div>
                  </div>
                  <div className="w-24 text-right">
                    <div className="text-sm font-medium">{source.applications}</div>
                    <div className="text-xs text-gray-500">{source.percentage}%</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Additional Analytics Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Skills in Demand</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {["React", "Python", "Java", "AWS", "Machine Learning"].map((skill, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm">{skill}</span>
                    <Badge variant="secondary">{85 - index * 10}%</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Candidate Demographics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { label: "Entry Level", value: "35%" },
                  { label: "Mid Level", value: "45%" },
                  { label: "Senior Level", value: "20%" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm">{item.label}</span>
                    <Badge variant="secondary">{item.value}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics; 