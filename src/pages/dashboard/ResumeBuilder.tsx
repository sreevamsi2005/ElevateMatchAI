
import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { navItems } from "@/utils/navItems";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  FileText,
  Plus,
  Trash2,
  Download,
  Check,
  Sparkles,
  FileEdit,
  Briefcase,
  GraduationCap,
  Award,
  Terminal,
  Languages,
  Palette,
} from "lucide-react";

export default function ResumeBuilder() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("personal");
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [resumeData, setResumeData] = useState({
    personal: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      website: "",
      summary: "",
    },
    experience: [
      {
        title: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
        isPresent: false,
      },
    ],
    education: [
      {
        degree: "",
        institution: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
        isPresent: false,
      },
    ],
    skills: [],
    projects: [
      {
        name: "",
        description: "",
        techStack: "",
        link: "",
      },
    ],
  });

  const handlePersonalChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setResumeData({
      ...resumeData,
      personal: {
        ...resumeData.personal,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleExperienceChange = (index: number, field: string, value: string | boolean) => {
    const updatedExperiences = [...resumeData.experience];
    updatedExperiences[index] = {
      ...updatedExperiences[index],
      [field]: value,
    };
    
    setResumeData({
      ...resumeData,
      experience: updatedExperiences,
    });
  };

  const handleEducationChange = (index: number, field: string, value: string | boolean) => {
    const updatedEducation = [...resumeData.education];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value,
    };
    
    setResumeData({
      ...resumeData,
      education: updatedEducation,
    });
  };

  const handleProjectChange = (index: number, field: string, value: string) => {
    const updatedProjects = [...resumeData.projects];
    updatedProjects[index] = {
      ...updatedProjects[index],
      [field]: value,
    };
    
    setResumeData({
      ...resumeData,
      projects: updatedProjects,
    });
  };

  const addExperience = () => {
    setResumeData({
      ...resumeData,
      experience: [
        ...resumeData.experience,
        {
          title: "",
          company: "",
          location: "",
          startDate: "",
          endDate: "",
          description: "",
          isPresent: false,
        },
      ],
    });
  };

  const removeExperience = (index: number) => {
    const updatedExperiences = [...resumeData.experience];
    updatedExperiences.splice(index, 1);
    setResumeData({
      ...resumeData,
      experience: updatedExperiences,
    });
  };

  const addEducation = () => {
    setResumeData({
      ...resumeData,
      education: [
        ...resumeData.education,
        {
          degree: "",
          institution: "",
          location: "",
          startDate: "",
          endDate: "",
          description: "",
          isPresent: false,
        },
      ],
    });
  };

  const removeEducation = (index: number) => {
    const updatedEducation = [...resumeData.education];
    updatedEducation.splice(index, 1);
    setResumeData({
      ...resumeData,
      education: updatedEducation,
    });
  };

  const addProject = () => {
    setResumeData({
      ...resumeData,
      projects: [
        ...resumeData.projects,
        {
          name: "",
          description: "",
          techStack: "",
          link: "",
        },
      ],
    });
  };

  const removeProject = (index: number) => {
    const updatedProjects = [...resumeData.projects];
    updatedProjects.splice(index, 1);
    setResumeData({
      ...resumeData,
      projects: updatedProjects,
    });
  };

  const handleSkillAdd = (skill: string) => {
    if (skill.trim() === "") return;
    setResumeData({
      ...resumeData,
      skills: [...resumeData.skills, skill.trim()],
    });
  };

  const handleSkillRemove = (index: number) => {
    const updatedSkills = [...resumeData.skills];
    updatedSkills.splice(index, 1);
    setResumeData({
      ...resumeData,
      skills: updatedSkills,
    });
  };

  const optimizeResume = () => {
    setIsOptimizing(true);
    
    // Simulate AI optimization
    setTimeout(() => {
      setIsOptimizing(false);
      toast({
        title: "Resume Optimized",
        description: "Your resume has been optimized for ATS compatibility.",
      });
    }, 2000);
  };

  const saveResume = () => {
    toast({
      title: "Resume Saved",
      description: "Your resume has been saved successfully.",
    });
  };

  const downloadResume = () => {
    toast({
      title: "Resume Downloaded",
      description: "Your resume has been downloaded as PDF.",
    });
  };

  return (
    <DashboardLayout userType="student" navItems={navItems}>
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight flex items-center">
              <FileText className="mr-2 h-8 w-8 text-primary" /> Resume Builder
            </h1>
            <p className="text-muted-foreground">
              Create a professional resume that employers will notice
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={saveResume}>
              <Check className="mr-2 h-4 w-4" /> Save
            </Button>
            <Button variant="outline" onClick={downloadResume}>
              <Download className="mr-2 h-4 w-4" /> Download PDF
            </Button>
            <Button className="btn-gradient" onClick={optimizeResume}>
              {isOptimizing ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
                  Optimizing...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" /> AI Optimize
                </>
              )}
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6">
            <TabsTrigger value="personal" className="flex items-center gap-2">
              <FileEdit className="h-4 w-4" />
              <span className="hidden md:inline">Personal</span>
            </TabsTrigger>
            <TabsTrigger value="experience" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              <span className="hidden md:inline">Experience</span>
            </TabsTrigger>
            <TabsTrigger value="education" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              <span className="hidden md:inline">Education</span>
            </TabsTrigger>
            <TabsTrigger value="skills" className="flex items-center gap-2">
              <Terminal className="h-4 w-4" />
              <span className="hidden md:inline">Skills</span>
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              <span className="hidden md:inline">Projects</span>
            </TabsTrigger>
            <TabsTrigger value="templates" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              <span className="hidden md:inline">Templates</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Add your personal details for the resume header
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      placeholder="John Doe"
                      value={resumeData.personal.fullName}
                      onChange={handlePersonalChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      placeholder="john.doe@example.com"
                      value={resumeData.personal.email}
                      onChange={handlePersonalChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="+1 (123) 456-7890"
                      value={resumeData.personal.phone}
                      onChange={handlePersonalChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      placeholder="City, State"
                      value={resumeData.personal.location}
                      onChange={handlePersonalChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website/Portfolio (Optional)</Label>
                  <Input
                    id="website"
                    name="website"
                    placeholder="https://yourportfolio.com"
                    value={resumeData.personal.website}
                    onChange={handlePersonalChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="summary">Professional Summary</Label>
                  <Textarea
                    id="summary"
                    name="summary"
                    placeholder="A brief overview of your skills and experience"
                    rows={4}
                    value={resumeData.personal.summary}
                    onChange={handlePersonalChange}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => setActiveTab("experience")} className="ml-auto">
                  Next: Experience
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="experience">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Work Experience</CardTitle>
                  <CardDescription>
                    Add your relevant work experience
                  </CardDescription>
                </div>
                <Button onClick={addExperience} size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-1" /> Add Experience
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                {resumeData.experience.map((exp, index) => (
                  <div key={index} className="border rounded-md p-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Experience {index + 1}</h3>
                      {resumeData.experience.length > 1 && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 text-destructive"
                          onClick={() => removeExperience(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`jobTitle-${index}`}>Job Title</Label>
                        <Input
                          id={`jobTitle-${index}`}
                          value={exp.title}
                          onChange={(e) => handleExperienceChange(index, "title", e.target.value)}
                          placeholder="Software Engineer"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`company-${index}`}>Company</Label>
                        <Input
                          id={`company-${index}`}
                          value={exp.company}
                          onChange={(e) => handleExperienceChange(index, "company", e.target.value)}
                          placeholder="Company Name"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`location-${index}`}>Location</Label>
                      <Input
                        id={`location-${index}`}
                        value={exp.location}
                        onChange={(e) => handleExperienceChange(index, "location", e.target.value)}
                        placeholder="City, State or Remote"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`startDate-${index}`}>Start Date</Label>
                        <Input
                          id={`startDate-${index}`}
                          type="month"
                          value={exp.startDate}
                          onChange={(e) => handleExperienceChange(index, "startDate", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor={`endDate-${index}`}>End Date</Label>
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id={`isPresent-${index}`}
                              checked={exp.isPresent as boolean}
                              onChange={(e) => handleExperienceChange(index, "isPresent", e.target.checked)}
                              className="rounded border-gray-300"
                            />
                            <Label htmlFor={`isPresent-${index}`} className="text-sm font-normal">
                              Present
                            </Label>
                          </div>
                        </div>
                        <Input
                          id={`endDate-${index}`}
                          type="month"
                          value={exp.endDate}
                          onChange={(e) => handleExperienceChange(index, "endDate", e.target.value)}
                          disabled={exp.isPresent as boolean}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`description-${index}`}>Description</Label>
                      <Textarea
                        id={`description-${index}`}
                        rows={3}
                        value={exp.description}
                        onChange={(e) => handleExperienceChange(index, "description", e.target.value)}
                        placeholder="Describe your responsibilities and achievements"
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab("personal")}>
                  Previous: Personal
                </Button>
                <Button onClick={() => setActiveTab("education")}>
                  Next: Education
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="education">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Education</CardTitle>
                  <CardDescription>
                    Add your educational background
                  </CardDescription>
                </div>
                <Button onClick={addEducation} size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-1" /> Add Education
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                {resumeData.education.map((edu, index) => (
                  <div key={index} className="border rounded-md p-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Education {index + 1}</h3>
                      {resumeData.education.length > 1 && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 text-destructive"
                          onClick={() => removeEducation(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`degree-${index}`}>Degree</Label>
                        <Input
                          id={`degree-${index}`}
                          value={edu.degree}
                          onChange={(e) => handleEducationChange(index, "degree", e.target.value)}
                          placeholder="Bachelor of Science in Computer Science"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`institution-${index}`}>Institution</Label>
                        <Input
                          id={`institution-${index}`}
                          value={edu.institution}
                          onChange={(e) => handleEducationChange(index, "institution", e.target.value)}
                          placeholder="University Name"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`edu-location-${index}`}>Location</Label>
                      <Input
                        id={`edu-location-${index}`}
                        value={edu.location}
                        onChange={(e) => handleEducationChange(index, "location", e.target.value)}
                        placeholder="City, State"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`edu-startDate-${index}`}>Start Date</Label>
                        <Input
                          id={`edu-startDate-${index}`}
                          type="month"
                          value={edu.startDate}
                          onChange={(e) => handleEducationChange(index, "startDate", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor={`edu-endDate-${index}`}>End Date</Label>
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id={`edu-isPresent-${index}`}
                              checked={edu.isPresent as boolean}
                              onChange={(e) => handleEducationChange(index, "isPresent", e.target.checked)}
                              className="rounded border-gray-300"
                            />
                            <Label htmlFor={`edu-isPresent-${index}`} className="text-sm font-normal">
                              Present
                            </Label>
                          </div>
                        </div>
                        <Input
                          id={`edu-endDate-${index}`}
                          type="month"
                          value={edu.endDate}
                          onChange={(e) => handleEducationChange(index, "endDate", e.target.value)}
                          disabled={edu.isPresent as boolean}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`edu-description-${index}`}>Description (Optional)</Label>
                      <Textarea
                        id={`edu-description-${index}`}
                        rows={2}
                        value={edu.description}
                        onChange={(e) => handleEducationChange(index, "description", e.target.value)}
                        placeholder="Relevant courses, achievements, GPA, etc."
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab("experience")}>
                  Previous: Experience
                </Button>
                <Button onClick={() => setActiveTab("skills")}>
                  Next: Skills
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="skills">
            <Card>
              <CardHeader>
                <CardTitle>Skills</CardTitle>
                <CardDescription>
                  Add relevant skills and technologies you're proficient in
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="skills-input">Add Skills</Label>
                  <div className="flex gap-2">
                    <Input
                      id="skills-input"
                      placeholder="JavaScript, React, etc."
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          const input = e.currentTarget;
                          handleSkillAdd(input.value);
                          input.value = '';
                        }
                      }}
                    />
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        const input = document.getElementById('skills-input') as HTMLInputElement;
                        handleSkillAdd(input.value);
                        input.value = '';
                      }}
                    >
                      Add
                    </Button>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <h3 className="text-sm font-medium mb-2">Your Skills:</h3>
                  <div className="flex flex-wrap gap-2">
                    {resumeData.skills.length === 0 ? (
                      <p className="text-sm text-muted-foreground">No skills added yet.</p>
                    ) : (
                      resumeData.skills.map((skill, index) => (
                        <div 
                          key={index}
                          className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full"
                        >
                          <span>{skill}</span>
                          <button
                            onClick={() => handleSkillRemove(index)}
                            className="h-4 w-4 rounded-full hover:bg-primary/20 inline-flex items-center justify-center"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab("education")}>
                  Previous: Education
                </Button>
                <Button onClick={() => setActiveTab("projects")}>
                  Next: Projects
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="projects">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Projects</CardTitle>
                  <CardDescription>
                    Add relevant projects that showcase your skills
                  </CardDescription>
                </div>
                <Button onClick={addProject} size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-1" /> Add Project
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                {resumeData.projects.map((project, index) => (
                  <div key={index} className="border rounded-md p-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Project {index + 1}</h3>
                      {resumeData.projects.length > 1 && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 text-destructive"
                          onClick={() => removeProject(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`project-name-${index}`}>Project Name</Label>
                      <Input
                        id={`project-name-${index}`}
                        value={project.name}
                        onChange={(e) => handleProjectChange(index, "name", e.target.value)}
                        placeholder="Project Name"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`project-desc-${index}`}>Description</Label>
                      <Textarea
                        id={`project-desc-${index}`}
                        rows={2}
                        value={project.description}
                        onChange={(e) => handleProjectChange(index, "description", e.target.value)}
                        placeholder="Describe your project and your role in it"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`project-tech-${index}`}>Technologies Used</Label>
                        <Input
                          id={`project-tech-${index}`}
                          value={project.techStack}
                          onChange={(e) => handleProjectChange(index, "techStack", e.target.value)}
                          placeholder="React, Node.js, etc."
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`project-link-${index}`}>Project Link (Optional)</Label>
                        <Input
                          id={`project-link-${index}`}
                          value={project.link}
                          onChange={(e) => handleProjectChange(index, "link", e.target.value)}
                          placeholder="https://github.com/yourusername/project"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab("skills")}>
                  Previous: Skills
                </Button>
                <Button onClick={() => setActiveTab("templates")}>
                  Next: Templates
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="templates">
            <Card>
              <CardHeader>
                <CardTitle>Resume Templates</CardTitle>
                <CardDescription>
                  Choose a template for your resume
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="border rounded-md overflow-hidden">
                      <div className="aspect-[3/4] bg-muted flex items-center justify-center">
                        <FileText className="h-10 w-10 text-muted-foreground/50" />
                      </div>
                      <div className="p-3 flex justify-between items-center">
                        <p className="font-medium">Template {index + 1}</p>
                        <Button size="sm" variant="outline">Use</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" onClick={() => setActiveTab("projects")} className="mr-auto">
                  Previous: Projects
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
