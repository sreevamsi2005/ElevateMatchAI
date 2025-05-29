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
import { Search, Star, Mail, Calendar, Tag } from 'lucide-react';

const TalentPool = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [skillFilter, setSkillFilter] = useState("all");

  // Mock data - replace with actual data from your backend
  const candidates = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@example.com",
      skills: ["React", "TypeScript", "Node.js"],
      experience: "5 years",
      availability: "Immediate",
      matchScore: 92,
      tags: ["Frontend", "Full Stack"],
      lastActive: "2 days ago",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      skills: ["Python", "Machine Learning", "Data Science"],
      experience: "7 years",
      availability: "2 weeks notice",
      matchScore: 88,
      tags: ["AI/ML", "Data"],
      lastActive: "1 day ago",
    },
    {
      id: 3,
      name: "Michael Chen",
      email: "michael.c@example.com",
      skills: ["Java", "Spring Boot", "AWS"],
      experience: "4 years",
      availability: "1 month notice",
      matchScore: 85,
      tags: ["Backend", "Cloud"],
      lastActive: "3 days ago",
    },
  ];

  const skills = ["All", "React", "Python", "Java", "Node.js", "Machine Learning"];

  return (
    <DashboardLayout userType="company" navItems={companyNavItems}>
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Talent Pool</h1>
          <Button>Add to Talent Pool</Button>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search candidates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={skillFilter} onValueChange={setSkillFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by skill" />
            </SelectTrigger>
            <SelectContent>
              {skills.map((skill) => (
                <SelectItem key={skill.toLowerCase()} value={skill.toLowerCase()}>
                  {skill}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Candidates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {candidates.map((candidate) => (
            <Card key={candidate.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{candidate.name}</CardTitle>
                    <p className="text-sm text-gray-500">{candidate.email}</p>
                  </div>
                  <Badge variant="secondary">{candidate.matchScore}% Match</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium mb-2">Skills</div>
                    <div className="flex flex-wrap gap-2">
                      {candidate.skills.map((skill) => (
                        <Badge key={skill} variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm font-medium mb-1">Experience</div>
                      <div className="text-sm text-gray-500">{candidate.experience}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium mb-1">Availability</div>
                      <div className="text-sm text-gray-500">{candidate.availability}</div>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium mb-2">Tags</div>
                    <div className="flex flex-wrap gap-2">
                      {candidate.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <div className="text-sm text-gray-500">
                      <Calendar className="inline-block h-4 w-4 mr-1" />
                      Last active: {candidate.lastActive}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Mail className="h-4 w-4 mr-1" />
                        Contact
                      </Button>
                      <Button variant="outline" size="sm">
                        <Star className="h-4 w-4 mr-1" />
                        Save
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

export default TalentPool; 