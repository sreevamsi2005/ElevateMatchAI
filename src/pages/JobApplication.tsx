
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";

interface JobPosting {
  id: string;
  title: string;
  description: string;
  primary_role: string;
  skills: string[];
  duration: string | null;
}

export default function JobApplication() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [job, setJob] = useState<JobPosting | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    coverLetter: "",
  });

  useEffect(() => {
    if (!user) {
      toast.error("Please sign in to apply for jobs");
      navigate("/login", { state: { from: `/job-application/${jobId}` } });
      return;
    }

    async function fetchJob() {
      if (!jobId) return;

      try {
        const { data, error } = await supabase
          .from('job_postings')
          .select('*')
          .eq('id', jobId)
          .single();

        if (error) {
          throw error;
        }

        if (!data) {
          toast.error("Job posting not found");
          navigate("/careers");
          return;
        }

        setJob(data);
      } catch (error) {
        console.error('Error fetching job:', error);
        toast.error("Failed to load job details");
        navigate("/careers");
      } finally {
        setIsLoading(false);
      }
    }

    fetchJob();
  }, [jobId, navigate, user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !jobId || !job) {
      toast.error("Missing required information");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('job_applications')
        .insert({
          job_id: jobId,
          user_id: user.id,
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone || null,
          cover_letter: formData.coverLetter || null,
        });

      if (error) {
        throw error;
      }

      toast.success("Application submitted successfully!");
      navigate("/student-dashboard");
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error("Failed to submit application");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex justify-center items-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!job) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Apply: {job.title} - ElevateMatchAI</title>
      </Helmet>
      <Navbar />

      <main className="flex-grow py-12">
        <div className="container max-w-3xl">
          <div className="mb-8">
            <Button 
              variant="ghost" 
              size="sm" 
              className="mb-4"
              onClick={() => navigate("/careers")}
            >
              ← Back to Careers
            </Button>
            <h1 className="text-3xl font-bold mb-2">Apply for: {job.title}</h1>
            <p className="text-muted-foreground">{job.primary_role} • {job.duration || 'Full-time'}</p>
          </div>

          <div className="bg-card border rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Job Description</h2>
            <p className="whitespace-pre-line mb-6">{job.description}</p>

            <div className="mb-4">
              <h3 className="font-medium mb-2">Required Skills:</h3>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, index) => (
                  <div key={index} className="bg-muted px-3 py-1 rounded-full text-sm">
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Your Application</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number (Optional)</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="coverLetter">Cover Letter (Optional)</Label>
                <Textarea
                  id="coverLetter"
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleChange}
                  placeholder="Tell us why you're interested in this position and what makes you a great fit"
                  rows={6}
                />
              </div>

              <div className="pt-4">
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
