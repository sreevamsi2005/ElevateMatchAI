
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ProfileUpdateForm } from "@/components/forms/ProfileUpdateForm";
import { navItems } from "@/utils/navItems";
import { User, FileEdit } from "lucide-react";

export default function UpdateProfile() {
  return (
    <DashboardLayout userType="student" navItems={navItems}>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <FileEdit className="h-5 w-5 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">Update Your Profile</h1>
        </div>
        <p className="text-muted-foreground">
          Keep your profile information up to date to get the most out of ElevateMatchAI.
        </p>

        <Card className="glass-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  This information will be displayed on your profile and used for matching with opportunities.
                </CardDescription>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ProfileUpdateForm />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
