import React, { useState } from 'react';
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { companyNavItems } from "@/utils/navItems";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, MoreVertical, Download } from 'lucide-react';

const Applications = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock data - replace with actual data from your backend
  const applications = [
    {
      id: 1,
      candidateName: "John Doe",
      position: "Senior Frontend Developer",
      appliedDate: "2024-03-15",
      status: "Under Review",
      matchScore: 92,
      experience: "5 years",
      skills: ["React", "TypeScript", "Node.js"],
    },
    {
      id: 2,
      candidateName: "Jane Smith",
      position: "UX Designer",
      appliedDate: "2024-03-14",
      status: "Interview Scheduled",
      matchScore: 88,
      experience: "3 years",
      skills: ["Figma", "UI/UX", "Prototyping"],
    },
    {
      id: 3,
      candidateName: "Mike Johnson",
      position: "Backend Developer",
      appliedDate: "2024-03-13",
      status: "Rejected",
      matchScore: 75,
      experience: "7 years",
      skills: ["Java", "Spring", "Kubernetes"],
    },
  ];

  return (
    <DashboardLayout userType="company" navItems={companyNavItems}>
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Applications</h1>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Data
          </Button>
        </div>

        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search applications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="under_review">Under Review</SelectItem>
              <SelectItem value="interview">Interview Scheduled</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="hired">Hired</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-4">
          {applications.map((application) => (
            <Card key={application.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{application.candidateName}</h3>
                    <p className="text-sm text-gray-500 mb-2">{application.position}</p>
                    <div className="flex gap-2 mb-2">
                      {application.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-4 text-sm text-gray-500">
                      <p>Experience: {application.experience}</p>
                      <p>Applied: {new Date(application.appliedDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Match Score</p>
                      <p className="text-lg font-semibold">{application.matchScore}%</p>
                    </div>
                    <Badge
                      variant={
                        application.status === "Under Review"
                          ? "secondary"
                          : application.status === "Interview Scheduled"
                          ? "default"
                          : "destructive"
                      }
                    >
                      {application.status}
                    </Badge>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Applications; 