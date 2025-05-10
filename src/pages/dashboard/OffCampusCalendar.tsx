
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
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ExternalLink, Building } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function OffCampusCalendar() {
  const { userDetails } = useAuth();
  // Cast userType to the expected literal type
  const userType = (userDetails?.user_type || "student") as "student" | "company" | "admin";
  
  // Company data with names, logos, and links
  const companies = [
    {
      name: "TCS",
      description: "Tata Consultancy Services - CodeVita",
      links: [
        { url: "https://prepinsta.com/tcs-codevita/registration-process/", text: "Registration Process" }
      ],
      logo: "https://placehold.co/100/teal/white?text=TCS"
    },
    {
      name: "Infosys",
      description: "InfyTQ and HackWithInfy",
      links: [
        { url: "https://prepinsta.com/what-is-infytq/", text: "About InfyTQ" },
        { url: "https://www.infosys.com/careers/hackwithinfy.html", text: "HackWithInfy" }
      ],
      logo: "https://placehold.co/100/blue/white?text=Infosys"
    },
    {
      name: "Myntra",
      description: "HackerRamp WeForShe 2024",
      links: [
        { url: "https://unstop.com/hackathons/myntra-hackerramp-weforshe-2024-myntra-1025692", text: "HackerRamp 2024" },
        { url: "https://medium.com/myntra-engineering/myntra-hacker-ramp-journey-c610dd3733c5", text: "Journey Blog" }
      ],
      logo: "https://placehold.co/100/purple/white?text=Myntra"
    },
    {
      name: "Optum",
      description: "Optum Stratethon Season 4",
      links: [
        { url: "https://unstop.com/competitions/optum-stratethon-e-track-optum-stratethon-season-4-optum-409946", text: "Stratethon Details" }
      ],
      logo: "https://placehold.co/100/orange/white?text=Optum"
    },
    {
      name: "Flipkart",
      description: "Flipkart GRID 6.0 Software Development Track",
      links: [
        { url: "https://unstop.com/hackathons/flipkart-grid-60-software-development-track-flipkart-grid-60-flipkart-1024247", text: "GRID 6.0" }
      ],
      logo: "https://placehold.co/100/yellow/black?text=Flipkart"
    },
    {
      name: "Goldman Sachs",
      description: "Programs and Internships",
      links: [
        { url: "https://www.goldmansachs.com/careers/students/programs-and-internships", text: "Student Programs" }
      ],
      logo: "https://placehold.co/100/blue/white?text=GS"
    },
    {
      name: "JP Morgan",
      description: "Code for Good Hackathon",
      links: [
        { url: "https://chetasshree.medium.com/code-for-good-hackathon-how-i-won-and-got-placed-in-jp-morgan-chase-co-86ca5748ebf0", text: "Hackathon Guide" }
      ],
      logo: "https://placehold.co/100/navy/white?text=JPM"
    },
    {
      name: "Google",
      description: "Careers and Applications",
      links: [
        { url: "https://www.google.com/about/careers/applications/", text: "Apply Here" }
      ],
      logo: "https://placehold.co/100/red/white?text=G"
    },
    {
      name: "Uber",
      description: "Uber HackTag 2.0",
      links: [
        { url: "https://unstop.com/hackathons/uber-hacktag-20-uber-technologies-inc-260528", text: "HackTag Details" }
      ],
      logo: "https://placehold.co/100/black/white?text=Uber"
    },
    {
      name: "Amazon",
      description: "Women of the World Career Program",
      links: [
        { url: "https://amazon.jobs/content/en/career-programs/university/women-of-the-world", text: "WOW Program" }
      ],
      logo: "https://placehold.co/100/orange/black?text=Amazon"
    },
    {
      name: "Microsoft",
      description: "Global Career Opportunities",
      links: [
        { url: "https://careers.microsoft.com/v2/global/en/home.html", text: "Careers Portal" }
      ],
      logo: "https://placehold.co/100/cyan/white?text=MS"
    }
  ];

  // Motivational quotes for the footer
  const quotes = [
    "Believe you can and you're halfway there. — Theodore Roosevelt",
    "The future belongs to those who believe in the beauty of their dreams. — Eleanor Roosevelt",
    "Success is not final, failure is not fatal: It is the courage to continue that counts. — Winston Churchill",
    "The only way to do great work is to love what you do. — Steve Jobs",
    "Your time is limited, don't waste it living someone else's life. — Steve Jobs"
  ];
  
  // Randomly select one quote
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <DashboardLayout userType={userType} navItems={navItems}>
      <div className="space-y-8">
        <div>
          <h1 className="font-heading text-3xl md:text-4xl font-bold">Off-campus Placement Calendar</h1>
          <p className="text-muted-foreground mt-2">Discover opportunities outside your college placement drives</p>
        </div>

        <Card>
          <CardHeader className="bg-primary/10">
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">⚡</span> Off Campus Placement Drive Details
            </CardTitle>
            <CardDescription className="text-base mt-2">
              Most companies hire throughout the year but it's restricted to the top 5% of the talent either through referrals or direct walk-ins. 
              But what about the rest of the 95%?
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="mb-6">
              Some of the famous and high paying companies conduct placement drives during specific times with specific selection processes. 
              Below are the details for the same. All the Best ⚡️
            </p>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[180px]">Company</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Links</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {companies.map((company, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 overflow-hidden rounded-md">
                            <img 
                              src={company.logo} 
                              alt={`${company.name} logo`} 
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <span>{company.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{company.description}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex flex-wrap justify-end gap-2">
                          {company.links.map((link, linkIndex) => (
                            <Button 
                              key={linkIndex} 
                              variant="outline" 
                              size="sm" 
                              asChild
                              className="whitespace-nowrap"
                            >
                              <a 
                                href={link.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center gap-1"
                              >
                                {link.text}
                                <ExternalLink className="h-3 w-3 ml-1" />
                              </a>
                            </Button>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-primary/10">
                  Resource
                </Badge>
                <a 
                  href="https://takeuforward.org/interviews/sde-off-campus-placement-calendar-freshers/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline inline-flex items-center"
                >
                  More about these Off-campus Placements
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
              
              <div className="rounded-md bg-muted/30 p-6 text-center">
                <p className="text-lg font-medium italic">"{randomQuote}"</p>
                <p className="mt-6 text-sm text-muted-foreground">Stay tuned for more updates!</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
