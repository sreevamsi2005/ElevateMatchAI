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
import { Search, Filter, MoreVertical, Calendar, Clock, Video, MessageSquare } from 'lucide-react';

const Interviews = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock data - replace with actual data from your backend
  const interviews = [
    {
      id: 1,
      candidateName: "John Doe",
      position: "Senior Frontend Developer",
      date: "2024-03-20",
      time: "10:00 AM",
      type: "Technical",
      status: "Scheduled",
      interviewers: ["Sarah Johnson", "Mike Brown"],
      platform: "Zoom",
    },
    {
      id: 2,
      candidateName: "Jane Smith",
      position: "UX Designer",
      date: "2024-03-21",
      time: "2:30 PM",
      type: "Portfolio Review",
      status: "Scheduled",
      interviewers: ["Alex Chen"],
      platform: "Google Meet",
    },
    {
      id: 3,
      candidateName: "Mike Johnson",
      position: "Backend Developer",
      date: "2024-03-19",
      time: "11:00 AM",
      type: "Technical",
      status: "Completed",
      interviewers: ["David Wilson"],
      platform: "Microsoft Teams",
    },
  ];

  return (
    <DashboardLayout userType="company" navItems={companyNavItems}>
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Interviews</h1>
          <Button className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Schedule Interview
          </Button>
        </div>

        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search interviews..."
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
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-4">
          {interviews.map((interview) => (
            <Card key={interview.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{interview.candidateName}</h3>
                    <p className="text-sm text-gray-500 mb-2">{interview.position}</p>
                    <div className="flex gap-2 mb-2">
                      <Badge variant="outline">
                        <Clock className="h-3 w-3 mr-1" />
                        {interview.time}
                      </Badge>
                      <Badge variant="outline">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(interview.date).toLocaleDateString()}
                      </Badge>
                      <Badge variant="outline">
                        {interview.type}
                      </Badge>
                    </div>
                    <div className="flex gap-4 text-sm text-gray-500">
                      <p>Interviewers: {interview.interviewers.join(", ")}</p>
                      <p>Platform: {interview.platform}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge
                      variant={
                        interview.status === "Scheduled"
                          ? "default"
                          : interview.status === "Completed"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {interview.status}
                    </Badge>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <Video className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
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

export default Interviews; 