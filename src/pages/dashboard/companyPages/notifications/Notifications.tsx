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
import { Search, Bell, Settings, Check, Trash2, Clock } from 'lucide-react';

const Notifications = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  // Mock data - replace with actual data from your backend
  const notifications = [
    {
      id: 1,
      type: "Application",
      title: "New Application Received",
      message: "John Smith has applied for the Senior Frontend Developer position",
      timestamp: "2 hours ago",
      read: false,
      priority: "high",
    },
    {
      id: 2,
      type: "Interview",
      title: "Interview Scheduled",
      message: "Interview with Sarah Johnson for Data Scientist position is scheduled for tomorrow at 2 PM",
      timestamp: "5 hours ago",
      read: true,
      priority: "medium",
    },
    {
      id: 3,
      type: "System",
      title: "Profile Update Required",
      message: "Please complete your company profile to improve candidate matching",
      timestamp: "1 day ago",
      read: false,
      priority: "low",
    },
  ];

  const notificationTypes = ["All", "Application", "Interview", "System", "Alert"];

  return (
    <DashboardLayout userType="company" navItems={companyNavItems}>
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Notifications</h1>
          <Button variant="outline" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Notification Settings
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search notifications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              {notificationTypes.map((type) => (
                <SelectItem key={type.toLowerCase()} value={type.toLowerCase()}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {notifications.map((notification) => (
            <Card key={notification.id} className={notification.read ? "opacity-75" : ""}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-full ${
                      notification.type === "Application" ? "bg-blue-100" :
                      notification.type === "Interview" ? "bg-green-100" :
                      notification.type === "System" ? "bg-purple-100" :
                      "bg-orange-100"
                    }`}>
                      <Bell className={`h-5 w-5 ${
                        notification.type === "Application" ? "text-blue-600" :
                        notification.type === "Interview" ? "text-green-600" :
                        notification.type === "System" ? "text-purple-600" :
                        "text-orange-600"
                      }`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{notification.title}</h3>
                        <Badge
                          variant={
                            notification.priority === "high" ? "destructive" :
                            notification.priority === "medium" ? "default" :
                            "secondary"
                          }
                        >
                          {notification.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{notification.message}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {notification.timestamp}
                        </span>
                        <Badge variant="outline">{notification.type}</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {!notification.read && (
                      <Button variant="ghost" size="sm" className="flex items-center gap-1">
                        <Check className="h-4 w-4" />
                        Mark as Read
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" className="flex items-center gap-1 text-red-600 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                      Delete
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

export default Notifications; 