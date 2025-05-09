
import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { navItems } from "@/utils/navItems";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FileText, Download, Plus, Trash2, Sparkles, PenLine } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ResumeBuilder() {
  const [activeTab, setActiveTab] = useState("personal");
  const [templateStyle, setTemplateStyle] = useState("modern");
  
  // Education section management
  const [educationEntries, setEducationEntries] = useState([{ 
    id: "edu-1", 
    institution: "", 
    degree: "", 
    field: "", 
    startDate: "", 
    endDate: "", 
    description: "" 
  }]);

  // Work experience section management  
  const [experienceEntries, setExperienceEntries] = useState([{ 
    id: "exp-1", 
    company: "", 
    position: "", 
    location: "", 
    startDate: "", 
    endDate: "", 
    description: "" 
  }]);

  // Skills section management
  const [skills, setSkills] = useState("");

  const addEducation = () => {
    setEducationEntries([...educationEntries, { 
      id: `edu-${Date.now()}`, 
      institution: "", 
      degree: "", 
      field: "", 
      startDate: "", 
      endDate: "", 
      description: "" 
    }]);
  };

  const removeEducation = (id: string) => {
    if (educationEntries.length > 1) {
      setEducationEntries(educationEntries.filter(entry => entry.id !== id));
    }
  };

  const addExperience = () => {
    setExperienceEntries([...experienceEntries, { 
      id: `exp-${Date.now()}`, 
      company: "", 
      position: "", 
      location: "", 
      startDate: "", 
      endDate: "", 
      description: "" 
    }]);
  };

  const removeExperience = (id: string) => {
    if (experienceEntries.length > 1) {
      setExperienceEntries(experienceEntries.filter(entry => entry.id !== id));
    }
  };

  const updateEducation = (id: string, field: string, value: string) => {
    setEducationEntries(educationEntries.map(entry => 
      entry.id === id ? { ...entry, [field]: value } : entry
    ));
  };

  const updateExperience = (id: string, field: string, value: string) => {
    setExperienceEntries(experienceEntries.map(entry => 
      entry.id === id ? { ...entry, [field]: value } : entry
    ));
  };

  return (
    <DashboardLayout userType="student" navItems={navItems}>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">Resume Builder</h1>
        </div>
        <p className="text-muted-foreground">
          Create a professional resume tailored to your target roles and get AI-powered improvements.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Form */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="glass-card">
              <Tabs defaultValue="personal" value={activeTab} onValueChange={setActiveTab}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Resume Details</CardTitle>
                    <Button variant="outline" className="ml-auto">
                      <Download className="mr-2 h-4 w-4" />
                      Export PDF
                    </Button>
                  </div>
                  <TabsList className="grid grid-cols-5 mt-4">
                    <TabsTrigger value="personal">Personal</TabsTrigger>
                    <TabsTrigger value="education">Education</TabsTrigger>
                    <TabsTrigger value="experience">Experience</TabsTrigger>
                    <TabsTrigger value="skills">Skills</TabsTrigger>
                    <TabsTrigger value="template">Template</TabsTrigger>
                  </TabsList>
                </CardHeader>
                <CardContent>
                  <TabsContent value="personal" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">First Name</Label>
                        <Input id="first-name" placeholder="John" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Last Name</Label>
                        <Input id="last-name" placeholder="Doe" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="professional-title">Professional Title</Label>
                      <Input id="professional-title" placeholder="Front-end Developer" />
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="john.doe@example.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" placeholder="(123) 456-7890" />
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" placeholder="New York, NY" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="website">Website / LinkedIn</Label>
                        <Input id="website" placeholder="linkedin.com/in/johndoe" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="summary">Professional Summary</Label>
                      <Textarea id="summary" placeholder="A brief overview of your professional profile..." rows={4} />
                    </div>
                    <Button 
                      className="gap-2"
                      onClick={() => setActiveTab("education")}
                    >
                      Next: Education
                      <PenLine className="h-4 w-4" />
                    </Button>
                  </TabsContent>

                  <TabsContent value="education" className="space-y-6">
                    {educationEntries.map((entry, index) => (
                      <div key={entry.id} className="space-y-4 border rounded-md p-4 relative">
                        {index > 0 && (
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="absolute right-2 top-2 text-destructive"
                            onClick={() => removeEducation(entry.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                        <div className="space-y-2">
                          <Label>Institution</Label>
                          <Input 
                            placeholder="University or School Name"
                            value={entry.institution}
                            onChange={(e) => updateEducation(entry.id, 'institution', e.target.value)}
                          />
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <Label>Degree</Label>
                            <Input 
                              placeholder="Bachelor's, Master's, etc."
                              value={entry.degree}
                              onChange={(e) => updateEducation(entry.id, 'degree', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Field of Study</Label>
                            <Input 
                              placeholder="Computer Science, Business, etc."
                              value={entry.field}
                              onChange={(e) => updateEducation(entry.id, 'field', e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <Label>Start Date</Label>
                            <Input 
                              type="month" 
                              value={entry.startDate}
                              onChange={(e) => updateEducation(entry.id, 'startDate', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>End Date (or Expected)</Label>
                            <Input 
                              type="month" 
                              value={entry.endDate}
                              onChange={(e) => updateEducation(entry.id, 'endDate', e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Description</Label>
                          <Textarea 
                            placeholder="Relevant coursework, achievements, etc."
                            rows={3}
                            value={entry.description}
                            onChange={(e) => updateEducation(entry.id, 'description', e.target.value)}
                          />
                        </div>
                      </div>
                    ))}
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        className="gap-2"
                        onClick={addEducation}
                      >
                        <Plus className="h-4 w-4" />
                        Add Education
                      </Button>
                      <Button 
                        className="gap-2 ml-auto"
                        onClick={() => setActiveTab("experience")}
                      >
                        Next: Experience
                        <PenLine className="h-4 w-4" />
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="experience" className="space-y-6">
                    {experienceEntries.map((entry, index) => (
                      <div key={entry.id} className="space-y-4 border rounded-md p-4 relative">
                        {index > 0 && (
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="absolute right-2 top-2 text-destructive"
                            onClick={() => removeExperience(entry.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                        <div className="space-y-2">
                          <Label>Company</Label>
                          <Input 
                            placeholder="Company Name"
                            value={entry.company}
                            onChange={(e) => updateExperience(entry.id, 'company', e.target.value)}
                          />
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <Label>Position</Label>
                            <Input 
                              placeholder="Job Title"
                              value={entry.position}
                              onChange={(e) => updateExperience(entry.id, 'position', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Location</Label>
                            <Input 
                              placeholder="City, State or Remote"
                              value={entry.location}
                              onChange={(e) => updateExperience(entry.id, 'location', e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <Label>Start Date</Label>
                            <Input 
                              type="month" 
                              value={entry.startDate}
                              onChange={(e) => updateExperience(entry.id, 'startDate', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>End Date (or Current)</Label>
                            <Input 
                              type="month" 
                              value={entry.endDate}
                              onChange={(e) => updateExperience(entry.id, 'endDate', e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Description</Label>
                          <Textarea 
                            placeholder="Describe your responsibilities and achievements..."
                            rows={3}
                            value={entry.description}
                            onChange={(e) => updateExperience(entry.id, 'description', e.target.value)}
                          />
                        </div>
                      </div>
                    ))}
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        className="gap-2"
                        onClick={addExperience}
                      >
                        <Plus className="h-4 w-4" />
                        Add Experience
                      </Button>
                      <Button 
                        className="gap-2 ml-auto"
                        onClick={() => setActiveTab("skills")}
                      >
                        Next: Skills
                        <PenLine className="h-4 w-4" />
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="skills" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="skills">Technical Skills</Label>
                      <Textarea 
                        id="skills" 
                        placeholder="List your skills separated by commas (e.g., JavaScript, React, Node.js, etc.)"
                        rows={4}
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Skill Level Indicator</Label>
                      <div className="mt-2">
                        <RadioGroup defaultValue="stars" className="flex flex-col space-y-2">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="stars" id="stars" />
                            <Label htmlFor="stars">Stars (★★★☆☆)</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="bars" id="bars" />
                            <Label htmlFor="bars">Bars</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="none" id="none" />
                            <Label htmlFor="none">No indicators</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="languages">Languages</Label>
                      <Input id="languages" placeholder="English (Native), Spanish (Intermediate), etc." />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="certifications">Certifications</Label>
                      <Textarea id="certifications" placeholder="List your certifications, one per line" rows={3} />
                    </div>
                    <Button 
                      className="gap-2"
                      onClick={() => setActiveTab("template")}
                    >
                      Next: Template
                      <PenLine className="h-4 w-4" />
                    </Button>
                  </TabsContent>

                  <TabsContent value="template" className="space-y-4">
                    <div className="space-y-2">
                      <Label>Template Style</Label>
                      <RadioGroup 
                        defaultValue="modern" 
                        className="grid grid-cols-2 gap-4"
                        value={templateStyle}
                        onValueChange={setTemplateStyle}
                      >
                        <div className="border rounded-md p-2 cursor-pointer hover:bg-accent transition-colors">
                          <div className="flex gap-2 items-center">
                            <RadioGroupItem value="modern" id="modern" />
                            <Label htmlFor="modern">Modern</Label>
                          </div>
                          <div className="mt-2 h-24 bg-primary/10 rounded flex items-center justify-center">
                            <span className="text-xs text-muted-foreground">Modern Template Preview</span>
                          </div>
                        </div>
                        <div className="border rounded-md p-2 cursor-pointer hover:bg-accent transition-colors">
                          <div className="flex gap-2 items-center">
                            <RadioGroupItem value="classic" id="classic" />
                            <Label htmlFor="classic">Classic</Label>
                          </div>
                          <div className="mt-2 h-24 bg-primary/10 rounded flex items-center justify-center">
                            <span className="text-xs text-muted-foreground">Classic Template Preview</span>
                          </div>
                        </div>
                        <div className="border rounded-md p-2 cursor-pointer hover:bg-accent transition-colors">
                          <div className="flex gap-2 items-center">
                            <RadioGroupItem value="creative" id="creative" />
                            <Label htmlFor="creative">Creative</Label>
                          </div>
                          <div className="mt-2 h-24 bg-primary/10 rounded flex items-center justify-center">
                            <span className="text-xs text-muted-foreground">Creative Template Preview</span>
                          </div>
                        </div>
                        <div className="border rounded-md p-2 cursor-pointer hover:bg-accent transition-colors">
                          <div className="flex gap-2 items-center">
                            <RadioGroupItem value="minimal" id="minimal" />
                            <Label htmlFor="minimal">Minimal</Label>
                          </div>
                          <div className="mt-2 h-24 bg-primary/10 rounded flex items-center justify-center">
                            <span className="text-xs text-muted-foreground">Minimal Template Preview</span>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>
                    <div className="space-y-2">
                      <Label>Color Scheme</Label>
                      <Select defaultValue="blue">
                        <SelectTrigger>
                          <SelectValue placeholder="Select a color scheme" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="blue">Professional Blue</SelectItem>
                          <SelectItem value="teal">Teal Green</SelectItem>
                          <SelectItem value="purple">Creative Purple</SelectItem>
                          <SelectItem value="red">Bold Red</SelectItem>
                          <SelectItem value="gray">Minimal Gray</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Font Style</Label>
                      <Select defaultValue="sans">
                        <SelectTrigger>
                          <SelectValue placeholder="Select a font style" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sans">Sans-serif (Modern)</SelectItem>
                          <SelectItem value="serif">Serif (Traditional)</SelectItem>
                          <SelectItem value="mono">Monospace (Technical)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className="w-full btn-gradient gap-2 mt-4">
                      <Sparkles className="h-4 w-4" />
                      Generate Resume
                    </Button>
                  </TabsContent>
                </CardContent>
              </Tabs>
            </Card>
          </div>

          {/* Right column - Preview */}
          <div className="lg:col-span-1">
            <Card className="glass-card h-full">
              <CardHeader>
                <CardTitle>Resume Preview</CardTitle>
                <CardDescription>See how your resume will appear</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-[1/1.4] bg-white dark:bg-gray-800 rounded-md border shadow-sm flex items-center justify-center">
                  <div className="text-center p-6">
                    <FileText className="h-12 w-12 mx-auto text-primary/70" />
                    <p className="mt-4 text-muted-foreground">
                      Fill in your information to see a live preview of your resume
                    </p>
                    <Button variant="outline" className="mt-6 gap-2" onClick={() => setActiveTab("personal")}>
                      <Sparkles className="h-4 w-4" />
                      Add Your Information
                    </Button>
                  </div>
                </div>
                <Button className="w-full gap-2 mt-4">
                  <Download className="h-4 w-4" />
                  Download PDF
                </Button>
                <Button variant="outline" className="w-full gap-2 mt-2">
                  <Sparkles className="h-4 w-4" />
                  AI Suggestions
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
