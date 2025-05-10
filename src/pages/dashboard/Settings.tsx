import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { navItems } from "@/utils/navItems";
import { useAuth } from "@/context/AuthContext";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Bell, 
  Shield, 
  Globe, 
  Paintbrush, 
  Smartphone,
  Lock,
  UserCog,
  Users,
} from "lucide-react";
import {
  Switch
} from "@/components/ui/switch";
import {
  Label
} from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Link } from "react-router-dom";

export default function Settings() {
  const { userDetails } = useAuth();
  const userType = userDetails?.user_type || "student";
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [appNotifications, setAppNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);
  const [language, setLanguage] = useState("english");
  const [timezone, setTimezone] = useState("(GMT-05:00) Eastern Time");
  const [theme, setTheme] = useState("system");

  const handleSaveNotifications = () => {
    toast.success("Notification settings saved");
  };

  const handleSaveSecurity = () => {
    toast.success("Security settings saved");
  };

  const handleSavePreferences = () => {
    toast.success("Preferences saved");
  };

  return (
    <DashboardLayout userType={userType as "student" | "company"} navItems={navItems}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        <Tabs defaultValue="notifications">
          <TabsList className="grid grid-cols-3 md:grid-cols-5 w-full md:w-auto">
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Settings
                </CardTitle>
                <CardDescription>
                  Control how and when you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Communication Channels</h3>
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-notifications">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications via email
                        </p>
                      </div>
                      <Switch 
                        id="email-notifications" 
                        checked={emailNotifications}
                        onCheckedChange={setEmailNotifications}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="sms-notifications">SMS Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications via text message
                        </p>
                      </div>
                      <Switch 
                        id="sms-notifications" 
                        checked={smsNotifications}
                        onCheckedChange={setSmsNotifications}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="app-notifications">In-App Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications within the app
                        </p>
                      </div>
                      <Switch 
                        id="app-notifications" 
                        checked={appNotifications}
                        onCheckedChange={setAppNotifications}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="marketing-emails">Marketing Emails</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive updates on new features and offers
                        </p>
                      </div>
                      <Switch 
                        id="marketing-emails" 
                        checked={marketingEmails}
                        onCheckedChange={setMarketingEmails}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={handleSaveNotifications}>Save Changes</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Settings
                </CardTitle>
                <CardDescription>
                  Manage your account security and authentication
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Switch 
                      id="two-factor" 
                      checked={twoFactor}
                      onCheckedChange={setTwoFactor}
                    />
                  </div>

                  <div className="pt-4 border-t">
                    <h3 className="font-medium mb-2">Password</h3>
                    <Button variant="outline">Change Password</Button>
                  </div>

                  <div className="pt-4 border-t">
                    <h3 className="font-medium mb-2">Login Sessions</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Manage your active sessions and sign out from other devices
                    </p>
                    <Button variant="outline">Manage Sessions</Button>
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={handleSaveSecurity}>Save Changes</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Paintbrush className="h-5 w-5" />
                  Display & Regional Preferences
                </CardTitle>
                <CardDescription>
                  Customize your experience and regional settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="theme">Theme</Label>
                    <Select value={theme} onValueChange={setTheme}>
                      <SelectTrigger id="theme">
                        <SelectValue placeholder="Select theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger id="language">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="spanish">Spanish</SelectItem>
                        <SelectItem value="french">French</SelectItem>
                        <SelectItem value="german">German</SelectItem>
                        <SelectItem value="chinese">Chinese</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timezone">Time Zone</Label>
                    <Select value={timezone} onValueChange={setTimezone}>
                      <SelectTrigger id="timezone">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="(GMT-08:00) Pacific Time">
                          (GMT-08:00) Pacific Time
                        </SelectItem>
                        <SelectItem value="(GMT-07:00) Mountain Time">
                          (GMT-07:00) Mountain Time
                        </SelectItem>
                        <SelectItem value="(GMT-06:00) Central Time">
                          (GMT-06:00) Central Time
                        </SelectItem>
                        <SelectItem value="(GMT-05:00) Eastern Time">
                          (GMT-05:00) Eastern Time
                        </SelectItem>
                        <SelectItem value="(GMT) Greenwich Mean Time">
                          (GMT) Greenwich Mean Time
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button onClick={handleSavePreferences}>Save Changes</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Privacy Settings
                </CardTitle>
                <CardDescription>
                  Control your data privacy and visibility
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Profile Visibility</h3>
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="public-profile">Public Profile</Label>
                        <p className="text-sm text-muted-foreground">
                          Make your profile visible to employers
                        </p>
                      </div>
                      <Switch id="public-profile" defaultChecked={true} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="show-resume">Show Resume</Label>
                        <p className="text-sm text-muted-foreground">
                          Allow employers to view your resume
                        </p>
                      </div>
                      <Switch id="show-resume" defaultChecked={true} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="contact-info">Show Contact Information</Label>
                        <p className="text-sm text-muted-foreground">
                          Display your contact information to employers
                        </p>
                      </div>
                      <Switch id="contact-info" defaultChecked={false} />
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h3 className="font-medium mb-2">Data Management</h3>
                    <div className="space-y-2">
                      <Button variant="outline">Download My Data</Button>
                      <p className="text-sm text-muted-foreground">
                        Request a copy of all data we have stored about you
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button>Save Changes</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Account Tab */}
          <TabsContent value="account" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCog className="h-5 w-5" />
                  Account Settings
                </CardTitle>
                <CardDescription>
                  Manage your account details and subscription
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="pt-2">
                    <h3 className="font-medium mb-2">Account Information</h3>
                    <Button variant="outline" asChild>
                      <Link to="/student-dashboard/update-profile">
                        Update Profile Information
                      </Link>
                    </Button>
                  </div>

                  <div className="pt-4 border-t">
                    <h3 className="font-medium mb-2">Subscription</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      You are currently on the <strong>Free</strong> plan
                    </p>
                    <Button>Upgrade Plan</Button>
                  </div>

                  <div className="pt-4 border-t">
                    <h3 className="font-medium mb-2">Danger Zone</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Permanently delete your account and all associated data
                    </p>
                    <Button variant="destructive">Delete Account</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
