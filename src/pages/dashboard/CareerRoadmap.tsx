import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { navItems } from "@/utils/navItems";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  BookOpen, 
  Briefcase, 
  Code, 
  Database, 
  GraduationCap, 
  Layers, 
  Network, 
  Server, 
  Shield,
  Computer,
  Smartphone,
  Gamepad,
  Brain,
  Globe
} from "lucide-react";
import { useState } from "react";

export default function CareerRoadmap() {
  const { userDetails } = useAuth();
  // Cast userType to the expected literal type
  const userType = (userDetails?.user_type || "student") as "student" | "company" | "admin";
  const [activeCategory, setActiveCategory] = useState("software-engineering");

  const careerPaths = [
    {
      id: "software-engineering",
      title: "Software Development / Engineering",
      icon: Code,
      color: "bg-blue-50 dark:bg-blue-900/20",
      borderColor: "border-blue-200 dark:border-blue-800",
      quote: "First, solve the problem. Then, write the code. – John Johnson",
      levels: [
        {
          level: "Beginner",
          steps: [
            "Learn programming languages (Python, Java, C++, etc.)",
            "Understand data structures & algorithms",
            "Version control (Git, GitHub)",
            "Object-Oriented Programming (OOP)"
          ]
        },
        {
          level: "Intermediate",
          steps: [
            "Build real-world projects",
            "Learn software development methodologies (Agile, Scrum)",
            "Unit testing, debugging techniques",
            "Design patterns and SOLID principles"
          ]
        },
        {
          level: "Advanced",
          steps: [
            "System design and architecture",
            "DevOps & CI/CD integration",
            "Performance optimization",
            "Scalable backend architecture (Microservices, REST, GraphQL)"
          ]
        }
      ],
      resources: [
        { name: "The Odin Project", url: "https://www.theodinproject.com/" },
        { name: "FreeCodeCamp", url: "https://www.freecodecamp.org/" },
        { name: "LeetCode", url: "https://leetcode.com/" }
      ]
    },
    {
      id: "web-development",
      title: "Web Development",
      icon: Code,
      color: "bg-purple-50 dark:bg-purple-900/20",
      borderColor: "border-purple-200 dark:border-purple-800",
      quote: "The web is like a canvas, and code is your paint. Create your masterpiece. — Anonymous",
      levels: [
        {
          level: "Frontend",
          steps: [
            "HTML, CSS, JavaScript",
            "Modern frameworks: React, Vue, Angular",
            "Responsive design, accessibility",
            "Tools: Webpack, Vite, Babel"
          ]
        },
        {
          level: "Backend",
          steps: [
            "Languages: Node.js, Python (Django/Flask), Java (Spring), PHP",
            "Databases: SQL (MySQL, PostgreSQL), NoSQL (MongoDB)",
            "Authentication, APIs (REST/GraphQL)",
            "Server management and security"
          ]
        },
        {
          level: "Fullstack",
          steps: [
            "Combine frontend and backend knowledge",
            "Use of frameworks like Next.js, MERN/MEAN stack",
            "Deployment on platforms (Vercel, Netlify, AWS)",
            "Performance optimization and SEO"
          ]
        }
      ],
      resources: [
        { name: "Frontend Masters", url: "https://frontendmasters.com" },
        { name: "MDN Web Docs", url: "https://developer.mozilla.org" },
        { name: "Full Stack Open", url: "https://fullstackopen.com/en/" }
      ]
    },
    {
      id: "ai-ml",
      title: "Artificial Intelligence / Machine Learning",
      icon: Layers,
      color: "bg-green-50 dark:bg-green-900/20", 
      borderColor: "border-green-200 dark:border-green-800",
      quote: "Machines take me by surprise with great frequency. — Alan Turing",
      levels: [
        {
          level: "Beginner",
          steps: [
            "Learn Python, NumPy, Pandas, Matplotlib",
            "Understand ML concepts: Supervised, Unsupervised learning",
            "Algorithms: Linear Regression, k-NN, Decision Trees",
            "Basic statistics and probability"
          ]
        },
        {
          level: "Intermediate",
          steps: [
            "Scikit-learn, TensorFlow, PyTorch",
            "Model evaluation (Precision, Recall, F1)",
            "NLP, Computer Vision basics",
            "Feature engineering and selection"
          ]
        },
        {
          level: "Advanced",
          steps: [
            "Deep Learning: CNNs, RNNs, Transformers",
            "MLOps: Model deployment, monitoring",
            "Research papers, Kaggle competitions, LLMs",
            "Specialized domains (healthcare, finance)"
          ]
        }
      ],
      resources: [
        { name: "Fast.ai", url: "https://fast.ai" },
        { name: "Coursera ML Specialization", url: "https://www.coursera.org/specializations/machine-learning-introduction" },
        { name: "Kaggle", url: "https://www.kaggle.com/" }
      ]
    },
    {
      id: "data-science",
      title: "Data Science & Analytics",
      icon: Database,
      color: "bg-indigo-50 dark:bg-indigo-900/20",
      borderColor: "border-indigo-200 dark:border-indigo-800",
      quote: "In God we trust, all others must bring data. — W. Edwards Deming",
      levels: [
        {
          level: "Beginner",
          steps: [
            "Python/R, data wrangling with Pandas",
            "Statistics, probability, visualization (Seaborn, Matplotlib)",
            "Basic SQL queries and database concepts",
            "Data cleaning and preprocessing"
          ]
        },
        {
          level: "Intermediate",
          steps: [
            "SQL, Excel, Power BI/Tableau",
            "Exploratory Data Analysis (EDA), hypothesis testing",
            "Feature engineering, basic ML",
            "Statistical modeling and inference"
          ]
        },
        {
          level: "Advanced",
          steps: [
            "Time-series analysis",
            "Big data tools: Spark, Hadoop",
            "Real-time dashboards, A/B testing, data pipelines (Airflow)",
            "Causal inference and experimental design"
          ]
        }
      ],
      resources: [
        { name: "DataCamp", url: "https://datacamp.com" },
        { name: "DataQuest", url: "https://www.dataquest.io/" },
        { name: "365 Data Science", url: "https://365datascience.com/" }
      ]
    },
    {
      id: "cybersecurity",
      title: "Cybersecurity",
      icon: Shield,
      color: "bg-red-50 dark:bg-red-900/20",
      borderColor: "border-red-200 dark:border-red-800",
      quote: "Security is always excessive until it's not enough. — Robbie Sinclair",
      levels: [
        {
          level: "Beginner",
          steps: [
            "Networking basics, OSI model",
            "Linux fundamentals, bash scripting",
            "Types of cyber attacks (DoS, Phishing, Malware)",
            "Basic security practices and principles"
          ]
        },
        {
          level: "Intermediate",
          steps: [
            "Web security (OWASP Top 10)",
            "Tools: Wireshark, Burp Suite, Metasploit",
            "Cryptography basics",
            "Security policies and compliance"
          ]
        },
        {
          level: "Advanced",
          steps: [
            "Penetration Testing, Ethical Hacking",
            "Red Team vs Blue Team",
            "Security Operations Center (SOC), Incident Response",
            "Advanced threat hunting and forensics"
          ]
        }
      ],
      resources: [
        { name: "TryHackMe", url: "https://tryhackme.com" },
        { name: "HackTheBox", url: "https://hackthebox.com" },
        { name: "Cybrary", url: "https://www.cybrary.it/" }
      ]
    },
    {
      id: "cloud-computing",
      title: "Cloud Computing",
      icon: Server,
      color: "bg-sky-50 dark:bg-sky-900/20",
      borderColor: "border-sky-200 dark:border-sky-800",
      quote: "The cloud is for everyone. The cloud is a democracy. — Marc Benioff",
      levels: [
        {
          level: "Beginner",
          steps: [
            "Learn about cloud service models (IaaS, PaaS, SaaS)",
            "Basics of AWS, Azure, GCP",
            "Cloud storage and compute fundamentals",
            "Basic networking in the cloud"
          ]
        },
        {
          level: "Intermediate",
          steps: [
            "Core services: EC2, S3, Lambda, IAM (AWS)",
            "Cloud architecture, cost management",
            "Infrastructure as Code (Terraform, CloudFormation)",
            "Containerization with Docker"
          ]
        },
        {
          level: "Advanced",
          steps: [
            "Kubernetes, advanced Docker",
            "Cloud Security best practices",
            "Multi-cloud deployment, DevSecOps",
            "Cloud-native application architecture"
          ]
        }
      ],
      resources: [
        { name: "AWS Training", url: "https://aws.amazon.com/training/" },
        { name: "Microsoft Learn", url: "https://learn.microsoft.com/en-us/training/" },
        { name: "Google Cloud Training", url: "https://cloud.google.com/training" }
      ]
    },
    {
      id: "devops",
      title: "DevOps & SRE",
      icon: Server,
      color: "bg-orange-50 dark:bg-orange-900/20",
      borderColor: "border-orange-200 dark:border-orange-800",
      quote: "Continuous delivery is like a factory for deploying software. — Jez Humble",
      levels: [
        {
          level: "Beginner",
          steps: [
            "Linux, shell scripting",
            "Git, GitHub, Jenkins basics",
            "Basic networking and system administration",
            "Virtualization concepts"
          ]
        },
        {
          level: "Intermediate",
          steps: [
            "Docker, Kubernetes",
            "CI/CD Pipelines (Jenkins, GitLab CI)",
            "Monitoring: Prometheus, Grafana",
            "Infrastructure automation"
          ]
        },
        {
          level: "Advanced",
          steps: [
            "IaC: Ansible, Terraform",
            "Cloud-native DevOps",
            "SRE principles, SLAs/SLOs/SLIs",
            "Advanced observability and reliability engineering"
          ]
        }
      ],
      resources: [
        { name: "DevOps Roadmap", url: "https://roadmap.sh/devops" },
        { name: "Linux Academy", url: "https://linuxacademy.com" },
        { name: "SRE Books", url: "https://sre.google/books/" }
      ]
    },
    {
      id: "mobile-development",
      title: "Mobile App Development",
      icon: Mobile,
      color: "bg-emerald-50 dark:bg-emerald-900/20",
      borderColor: "border-emerald-200 dark:border-emerald-800",
      quote: "The best apps feel like magic. — Anonymous",
      levels: [
        {
          level: "Beginner",
          steps: [
            "Java/Kotlin (Android), Swift (iOS), or Dart (Flutter)",
            "App lifecycle, UI design principles",
            "Mobile user experience fundamentals",
            "Basic app development concepts"
          ]
        },
        {
          level: "Intermediate",
          steps: [
            "APIs, local storage, Firebase",
            "Architecture: MVVM, MVC",
            "Push notifications and background processing",
            "Testing and debugging mobile apps"
          ]
        },
        {
          level: "Advanced",
          steps: [
            "Performance tuning, animations",
            "App monetization, security",
            "CI/CD for mobile apps",
            "Cross-platform development mastery"
          ]
        }
      ],
      resources: [
        { name: "Flutter Dev", url: "https://flutter.dev" },
        { name: "Android Developers", url: "https://developer.android.com" },
        { name: "iOS Dev Center", url: "https://developer.apple.com/develop/" }
      ]
    },
    {
      id: "game-development",
      title: "Game Development",
      icon: Gamepad,
      color: "bg-yellow-50 dark:bg-yellow-900/20",
      borderColor: "border-yellow-200 dark:border-yellow-800",
      quote: "A game is a series of interesting decisions. — Sid Meier",
      levels: [
        {
          level: "Beginner",
          steps: [
            "Learn game engines: Unity (C#), Unreal Engine (C++)",
            "Game design principles",
            "2D graphics and animation basics",
            "Game mechanics and player psychology"
          ]
        },
        {
          level: "Intermediate",
          steps: [
            "Physics engines, animation systems",
            "2D/3D asset integration",
            "Audio implementation",
            "Game UI/UX design"
          ]
        },
        {
          level: "Advanced",
          steps: [
            "Multiplayer, optimization",
            "Monetization, publishing on platforms",
            "Advanced AI for games",
            "Shader programming and VFX"
          ]
        }
      ],
      resources: [
        { name: "Unity Learn", url: "https://learn.unity.com/" },
        { name: "Unreal Engine", url: "https://www.unrealengine.com/learn" },
        { name: "Game Dev.net", url: "https://www.gamedev.net/" }
      ]
    }
  ];

  return (
    <DashboardLayout userType={userType} navItems={navItems}>
      <div className="space-y-6">
        <div>
          <h1 className="font-heading text-3xl md:text-4xl font-bold">Career Roadmap</h1>
          <p className="text-muted-foreground mt-2">
            Choose your path to mastery and follow a structured roadmap to achieve your career goals.
          </p>
        </div>

        {/* Category selector */}
        <div className="bg-background/80 backdrop-blur-sm sticky top-0 z-10 py-3 -mx-4 px-4">
          <div className="flex flex-wrap gap-2">
            {careerPaths.map((path) => (
              <Button
                key={path.id}
                variant={activeCategory === path.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(path.id)}
                className="rounded-full"
              >
                <path.icon className="h-4 w-4 mr-2" />
                {path.title}
              </Button>
            ))}
          </div>
        </div>

        {/* Content for selected career path */}
        <div className="space-y-8">
          {careerPaths.map((path) => (
            <div key={path.id} className={activeCategory === path.id ? "block" : "hidden"}>
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
                  {path.levels.map((level, idx) => (
                    <div key={idx} className="mb-8">
                      <h3 className="text-lg font-semibold mb-4 flex items-center">
                        {level.level === "Beginner" && <GraduationCap className="h-5 w-5 mr-2" />}
                        {level.level === "Intermediate" && <Computer className="h-5 w-5 mr-2" />}
                        {level.level === "Advanced" && <Briefcase className="h-5 w-5 mr-2" />}
                        {level.level === "Frontend" && <Code className="h-5 w-5 mr-2" />}
                        {level.level === "Backend" && <Server className="h-5 w-5 mr-2" />}
                        {level.level === "Fullstack" && <Layers className="h-5 w-5 mr-2" />}
                        {level.level}
                      </h3>
                      <ol className="space-y-4 ml-2">
                        {level.steps.map((step, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs font-bold shrink-0 mt-0.5">
                              {index + 1}
                            </div>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  ))}
                  
                  {path.resources && path.resources.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Recommended Resources</h3>
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
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
