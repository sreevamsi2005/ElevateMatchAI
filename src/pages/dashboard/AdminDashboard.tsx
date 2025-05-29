
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { adminNavItems } from "@/utils/navItems";
import { useAuth } from "@/context/AuthContext";
import { Shield, Users, Building, Briefcase, BarChart } from "lucide-react";
import { Helmet } from "react-helmet-async";

export default function AdminDashboard() {
  const { section } = useParams();
  const navigate = useNavigate();
  const { user, isAdmin, isLoading } = useAuth();
  
  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!isLoading && !user) {
      console.log("No user found, redirecting to login");
      navigate("/login");
    }
  }, [user, isLoading, navigate]);

  // Check admin status using isAdmin from context
  React.useEffect(() => {
    if (!isLoading && user && !isAdmin) {
      console.log("User is not admin, redirecting to login");
      navigate("/login");
    }
  }, [isAdmin, isLoading, navigate, user]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div>
      <Helmet>
        <title>Admin Dashboard | ElevateMatchAI</title>
      </Helmet>
      <DashboardLayout userType="admin" navItems={adminNavItems}>
        <div className="space-y-6">
          <div className="flex justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
              <p className="text-muted-foreground">
                Manage platform users, companies, and settings.
              </p>
            </div>
          </div>

          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="companies">Companies</TabsTrigger>
              <TabsTrigger value="jobs">Job Postings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Users
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">352</div>
                    <p className="text-xs text-muted-foreground">
                      +24 from last month
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Companies
                    </CardTitle>
                    <Building className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">48</div>
                    <p className="text-xs text-muted-foreground">
                      +7 from last month
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Active Jobs
                    </CardTitle>
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">129</div>
                    <p className="text-xs text-muted-foreground">
                      +19 from last month
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Applications
                    </CardTitle>
                    <BarChart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">573</div>
                    <p className="text-xs text-muted-foreground">
                      +201 from last month
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>System Status</CardTitle>
                  <CardDescription>
                    All systems are operational and running normally.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Database</p>
                        <p className="text-sm text-muted-foreground">
                          Supabase - Connected
                        </p>
                      </div>
                      <div className="flex h-2 w-2 rounded-full bg-green-500"></div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Authentication</p>
                        <p className="text-sm text-muted-foreground">
                          Supabase Auth - Operational
                        </p>
                      </div>
                      <div className="flex h-2 w-2 rounded-full bg-green-500"></div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Storage</p>
                        <p className="text-sm text-muted-foreground">
                          Supabase Storage - Operational
                        </p>
                      </div>
                      <div className="flex h-2 w-2 rounded-full bg-green-500"></div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Edge Functions</p>
                        <p className="text-sm text-muted-foreground">
                          Supabase Functions - Operational
                        </p>
                      </div>
                      <div className="flex h-2 w-2 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <p className="text-xs text-muted-foreground">
                    Last updated: {new Date().toLocaleString()}
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="users" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>
                    Manage all users registered on the platform.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>User management functionality will be implemented here.</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="companies" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Company Management</CardTitle>
                  <CardDescription>
                    Manage all companies registered on the platform.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Company management functionality will be implemented here.</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="jobs" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Job Postings Management</CardTitle>
                  <CardDescription>
                    Manage all job postings on the platform.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Job posting management functionality will be implemented here.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </div>
  );
}
