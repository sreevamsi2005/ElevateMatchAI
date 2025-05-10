import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { navItems } from "@/utils/navItems";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Briefcase, Code, Database, GraduationCap, Layers, Network, Rocket, Server, Shield } from "lucide-react";

export default function CareerRoadmap() {
  const { userDetails } = useAuth();
  // Cast userType to the expected literal type
  const userType = (userDetails?.user_type || "student") as "student" | "company" | "admin";

  const careerPaths = [
    {
      id: "web-development",
      title: "Web Development",
      icon: Code,
      quote: "The web is like a canvas, and code is your paint. Create your masterpiece. — Anonymous",
      color: "bg-blue-50 dark:bg-blue-900/20",
      borderColor: "border-blue-200 dark:border-blue-800",
      steps: [
        "Master HTML, CSS, and JavaScript fundamentals",
        "Learn a modern frontend framework (React, Vue, Angular)",
        "Study backend development (Node.js, Python, etc.)",
        "Build full-stack applications with databases",
        "Deploy and scale web applications",
        "Learn DevOps and CI/CD pipelines"
      ],
      resources: [
        { name: "Frontend Masters", url: "https://frontendmasters.com" },
        { name: "MDN Web Docs", url: "https://developer.mozilla.org" }
      ]
    },
    {
      id: "data-science",
      title: "Data Science",
      icon: Database,
      quote: "In God we trust, all others must bring data. — W. Edwards Deming",
      color: "bg-purple-50 dark:bg-purple-900/20",
      borderColor: "border-purple-200 dark:border-purple-800",
      steps: [
        "Learn Python and mathematics for data science",
        "Master data cleaning, manipulation and visualization",
        "Study statistical analysis and probability",
        "Learn machine learning algorithms",
        "Work on real-world datasets and competitions",
        "Build an end-to-end data science portfolio"
      ],
      resources: [
        { name: "Kaggle", url: "https://kaggle.com" },
        { name: "DataCamp", url: "https://datacamp.com" }
      ]
    },
    {
      id: "machine-learning",
      title: "Machine Learning",
      icon: Layers,
      quote: "Machines take me by surprise with great frequency. — Alan Turing",
      color: "bg-green-50 dark:bg-green-900/20", 
      borderColor: "border-green-200 dark:border-green-800",
      steps: [
        "Learn Python and mathematics for ML",
        "Master core ML algorithms (Supervised/Unsupervised)",
        "Work on real-world projects (Kaggle, personal apps)",
        "Dive into Deep Learning (TensorFlow/PyTorch)",
        "Study Model Deployment and MLOps",
        "Specialize in a domain (NLP, Computer Vision, etc.)"
      ],
      resources: [
        { name: "Fast.ai", url: "https://fast.ai" },
        { name: "Coursera Machine Learning", url: "https://coursera.org/learn/machine-learning" }
      ]
    },
    {
      id: "cybersecurity",
      title: "Cybersecurity",
      icon: Shield,
      quote: "Security is always excessive until it's not enough. — Robbie Sinclair",
      color: "bg-red-50 dark:bg-red-900/20",
      borderColor: "border-red-200 dark:border-red-800",
      steps: [
        "Learn networking and system administration basics",
        "Study security fundamentals and cryptography",
        "Master security tools and ethical hacking techniques",
        "Practice with CTFs and security challenges",
        "Learn security compliance and frameworks",
        "Specialize in a security domain (network, application, cloud)"
      ],
      resources: [
        { name: "TryHackMe", url: "https://tryhackme.com" },
        { name: "HackTheBox", url: "https://hackthebox.com" }
      ]
    },
    {
      id: "devops",
      title: "DevOps",
      icon: Server,
      quote: "Continuous delivery is like a factory for deploying software. — Jez Humble",
      color: "bg-orange-50 dark:bg-orange-900/20",
      borderColor: "border-orange-200 dark:border-orange-800",
      steps: [
        "Learn Linux administration and scripting",
        "Master containerization (Docker) and orchestration (Kubernetes)",
        "Study CI/CD pipelines and automation",
        "Learn Infrastructure as Code (Terraform, Ansible)",
        "Master cloud platforms (AWS, Azure, GCP)",
        "Study monitoring, logging, and observability"
      ],
      resources: [
        { name: "DevOps Roadmap", url: "https://roadmap.sh/devops" },
        { name: "Linux Academy", url: "https://linuxacademy.com" }
      ]
    },
    {
      id: "blockchain",
      title: "Blockchain",
      icon: Database,
      quote: "The blockchain does one thing: It replaces third-party trust with mathematical proof that something happened. — Adam Draper",
      color: "bg-yellow-50 dark:bg-yellow-900/20",
      borderColor: "border-yellow-200 dark:border-yellow-800",
      steps: [
        "Learn blockchain fundamentals and cryptography",
        "Study smart contracts and Solidity",
        "Master Ethereum and dApp development",
        "Learn about consensus mechanisms and tokenomics",
        "Build decentralized applications",
        "Study DeFi, NFTs, and emerging blockchain tech"
      ],
      resources: [
        { name: "CryptoZombies", url: "https://cryptozombies.io" },
        { name: "Ethereum.org", url: "https://ethereum.org" }
      ]
    }
  ];

  return (
    <DashboardLayout userType={userType} navItems={navItems}>
      <div className="space-y-6">
        <div>
          <h1 className="font-heading text-3xl md:text-4xl font-bold">Career Roadmap</h1>
          <p className="text-muted-foreground mt-2">Choose your path to mastery and follow a structured roadmap to achieve your career goals.</p>
        </div>

        <Tabs defaultValue="web-development" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mb-4">
            {careerPaths.map((path) => (
              <TabsTrigger key={path.id} value={path.id} className="text-sm">
                {path.title}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {careerPaths.map((path) => (
            <TabsContent key={path.id} value={path.id} className="mt-4">
              <Card className={`overflow-hidden border ${path.borderColor}`}>
                <CardHeader className={`${path.color}`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl font-bold">{path.title}</CardTitle>
                      <CardDescription className="mt-2 italic text-base">
                        {path.quote}
                      </CardDescription>
                    </div>
                    <div className="p-2 rounded-full bg-white/80 dark:bg-gray-800/80">
                      <path.icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-4">Roadmap to Mastery</h3>
                  <ol className="space-y-4 mb-8">
                    {path.steps.map((step, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs font-bold shrink-0 mt-0.5">
                          {index + 1}
                        </div>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                  
                  {path.resources && path.resources.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Recommended Resources</h3>
                      <div className="flex flex-wrap gap-2">
                        {path.resources.map((resource, index) => (
                          <Button key={index} variant="outline" size="sm" asChild>
                            <a href={resource.url} target="_blank" rel="noopener noreferrer">
                              <BookOpen className="h-4 w-4 mr-2" />
                              {resource.name}
                              <ArrowRight className="h-3 w-3 ml-1" />
                            </a>
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
