
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Briefcase, Calendar, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface JobPosting {
  id: string;
  title: string;
  description: string;
  primary_role: string;
  skills: string[];
  duration: string | null;
  created_at: string | null;
}

export default function Careers() {
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchJobs() {
      try {
        const { data, error } = await supabase
          .from('job_postings')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        setJobs(data || []);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchJobs();
  }, []);

  const handleApply = (jobId: string) => {
    navigate(`/job-application/${jobId}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Careers - ElevateMatchAI</title>
      </Helmet>
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-muted/30 dark:bg-muted/10 py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-4">
                Join Our <span className="gradient-text">Team</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 mx-auto max-w-2xl">
                Build your career with us. We're looking for talented people to help us bridge the gap between education and employment through AI innovation.
              </p>
              <Button
                className="btn-gradient"
                onClick={() => document.getElementById('openings')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Open Positions
              </Button>
            </div>
          </div>
        </section>

        {/* Job Listings */}
        <section className="py-16" id="openings">
          <div className="container">
            <div className="mb-10">
              <h2 className="text-3xl font-bold mb-2">Current Openings</h2>
              <p className="text-muted-foreground">
                Find the perfect role to kickstart or advance your career
              </p>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : jobs.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground mb-4">No open positions at the moment</p>
                <p>Please check back later or contact us for opportunities</p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {jobs.map((job) => (
                  <Card key={job.id} className="h-full flex flex-col hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="outline" className="bg-primary/10">
                          {job.primary_role}
                        </Badge>
                        {job.duration && (
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="h-3 w-3 mr-1" />
                            {job.duration}
                          </div>
                        )}
                      </div>
                      <CardTitle className="text-xl">{job.title}</CardTitle>
                      <CardDescription className="line-clamp-3">
                        {job.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium mb-2">Required Skills:</p>
                          <div className="flex flex-wrap gap-2">
                            {job.skills.slice(0, 4).map((skill, index) => (
                              <Badge key={index} variant="secondary" className="font-normal">
                                {skill}
                              </Badge>
                            ))}
                            {job.skills.length > 4 && (
                              <Badge variant="secondary" className="font-normal">
                                +{job.skills.length - 4} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-2">
                      <Button 
                        className="w-full" 
                        onClick={() => handleApply(job.id)}
                      >
                        Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
