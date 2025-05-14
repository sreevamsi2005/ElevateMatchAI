
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { companyNavItems } from "@/utils/navItems";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Building, MapPin, Globe, Phone, Mail, Users, Calendar } from "lucide-react";

export default function CompanyProfile() {
  const { userDetails } = useAuth();
  const userType = userDetails?.user_type || "company";

  return (
    <DashboardLayout userType="company" navItems={companyNavItems}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Company Profile</h1>
          <p className="text-muted-foreground">
            Manage your company information and public profile
          </p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
              <CardDescription>
                Update your company details visible to job seekers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input id="companyName" placeholder="Acme Corporation" defaultValue="Acme Corporation" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Input id="industry" placeholder="Technology" defaultValue="Technology" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-border bg-muted text-muted-foreground text-sm">
                      https://
                    </span>
                    <Input id="website" className="rounded-l-none" placeholder="example.com" defaultValue="acmecorp.com" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="City, Country" defaultValue="San Francisco, USA" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="size">Company Size</Label>
                  <Input id="size" placeholder="Number of employees" defaultValue="100-500" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="founded">Founded</Label>
                  <Input id="founded" placeholder="Year" defaultValue="2015" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Company Description</Label>
                <Textarea 
                  id="description" 
                  rows={5} 
                  placeholder="Tell job seekers about your company..."
                  defaultValue="Acme Corporation is a leading technology company specializing in innovative solutions for businesses. We are committed to creating cutting-edge products that solve real-world problems."
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="mission">Mission & Vision</Label>
                <Textarea 
                  id="mission" 
                  rows={3} 
                  placeholder="Your company's mission and vision..."
                  defaultValue="Our mission is to empower businesses with intelligent technology solutions. We envision a world where technology enhances human potential and creates sustainable value for all stakeholders."
                />
              </div>
              
              <div className="space-y-2">
                <Label>Company Logo</Label>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 border rounded-md flex items-center justify-center bg-muted">
                    <Building className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <Button variant="outline">Upload New Logo</Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>
                Contact details for job applicants
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input id="contactEmail" type="email" placeholder="careers@example.com" defaultValue="careers@acmecorp.com" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Contact Phone</Label>
                  <Input id="contactPhone" placeholder="+1 (555) 123-4567" defaultValue="+1 (555) 123-4567" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="Street Address" defaultValue="123 Tech Avenue" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="City" defaultValue="San Francisco" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="state">State/Province</Label>
                  <Input id="state" placeholder="State/Province" defaultValue="California" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="zipCode">Zip/Postal Code</Label>
                  <Input id="zipCode" placeholder="Zip/Postal Code" defaultValue="94105" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
