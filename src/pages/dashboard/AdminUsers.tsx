import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { adminNavItems } from "@/utils/navItems";
import { useAuth } from "@/context/AuthContext";
import { Helmet } from "react-helmet-async";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, MoreHorizontal, Search, Shield, Trash, UserRound } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";

export default function AdminUsers() {
  const navigate = useNavigate();
  const { user, isAdmin, isLoading } = useAuth();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/login");
    }
  }, [user, isLoading, navigate]);

  // Check admin status using isAdmin from context
  useEffect(() => {
    if (!isLoading && user && !isAdmin) {
      navigate("/login");
    }
  }, [isAdmin, isLoading, navigate, user]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .order("created_at", { ascending: false });
          
        if (error) {
          throw error;
        }
        
        setUsers(data || []);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to load users");
      } finally {
        setIsLoadingUsers(false);
      }
    }
    
    if (user && isAdmin) {
      fetchUsers();
    }
  }, [user, isAdmin]);

  const filteredUsers = users.filter((user) => {
    const searchValue = searchTerm.toLowerCase();
    return (
      user.first_name?.toLowerCase().includes(searchValue) ||
      user.last_name?.toLowerCase().includes(searchValue) ||
      user.user_type?.toLowerCase().includes(searchValue) ||
      user.id?.toLowerCase().includes(searchValue)
    );
  });

  if (isLoading || isLoadingUsers) {
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
    <>
      <Helmet>
        <title>User Management | Admin Dashboard | ElevateMatchAI</title>
      </Helmet>
      
      <DashboardLayout userType="admin" navItems={adminNavItems}>
        <div className="space-y-6">
          <div className="flex justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
              <p className="text-muted-foreground">
                View and manage all users registered on the platform.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center w-full max-w-sm space-x-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-9"
              />
            </div>
            <Button size="sm">
              <UserRound className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </div>

          <div className="border rounded-md">
            <Table>
              <TableCaption>List of all platform users</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>User Type</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead className="w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">
                      {user.first_name} {user.last_name}
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        user.user_type === 'admin'
                          ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                          : user.user_type === 'company'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                          : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                      }`}>
                        {user.user_type.charAt(0).toUpperCase() + user.user_type.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>
                      {new Date(user.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{user.location || "Not specified"}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Shield className="mr-2 h-4 w-4" /> Change Role
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash className="mr-2 h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredUsers.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      No users found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}
