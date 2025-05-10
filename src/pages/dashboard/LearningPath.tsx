
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { navItems } from "@/utils/navItems";
import { useAuth } from "@/context/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookOpen, Code, Computer, Database, GraduationCap, Network } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LearningPath() {
  const { userDetails } = useAuth();
  // Cast userType to the expected literal type
  const userType = (userDetails?.user_type || "student") as "student" | "company" | "admin";

  const subjects = [
    {
      id: "operating-systems",
      title: "Operating Systems",
      icon: Computer,
      color: "bg-blue-50 dark:bg-blue-900/20",
      borderColor: "border-blue-200 dark:border-blue-800",
      introduction: "Operating Systems (OS) serve as the critical interface between hardware and software. They manage resources, provide security, and enable applications to run efficiently. Understanding OS concepts is fundamental for technical interviews as they test your knowledge of how computers actually work.",
      coreTopics: [
        {
          title: "Process vs Thread",
          content: "A process is an independent program with its own memory space, while threads are lightweight processes that share memory space. Processes are isolated, threads are not."
        },
        {
          title: "Process Scheduling",
          content: "Algorithms like FCFS (First Come First Served), SJF (Shortest Job First), Round Robin, and Priority Scheduling determine which processes run when CPU time is available."
        },
        {
          title: "Memory Management",
          content: "Virtual memory, paging, and segmentation are techniques that allow efficient use of physical memory resources and provide each process with its own address space."
        },
        {
          title: "File Systems",
          content: "File systems like FAT, NTFS, ext4 organize data on storage devices, handling permissions, allocation, and access to files and directories."
        },
        {
          title: "Deadlocks",
          content: "A deadlock occurs when multiple processes are waiting for resources held by each other. Prevention, avoidance, detection, and recovery are strategies for handling deadlocks."
        }
      ],
      interviews: [
        "Explain the difference between a process and a thread.",
        "How does virtual memory work? Explain paging.",
        "Describe the deadlock problem and strategies to handle it.",
        "Compare different CPU scheduling algorithms.",
        "How does an OS handle concurrent access to shared resources?"
      ],
      diagram: {
        title: "Process States Diagram",
        description: "Processes move through various states during their lifecycle: New → Ready → Running → Waiting → Ready → Running → Terminated. The OS scheduler manages these transitions based on CPU availability and I/O operations."
      },
      codeSnippet: {
        language: "c",
        code: `// Simple fork example to create a child process
#include <stdio.h>
#include <unistd.h>

int main() {
    pid_t pid = fork();
    
    if (pid < 0) {
        // Error occurred
        fprintf(stderr, "Fork failed");
        return 1;
    } else if (pid == 0) {
        // Child process
        printf("Child process, pid = %d\\n", getpid());
    } else {
        // Parent process
        printf("Parent process, child pid = %d\\n", pid);
    }
    
    return 0;
}`
      },
      proTips: [
        "Remember the process states cycle for scheduler questions.",
        "Understand the trade-offs in different scheduling algorithms.",
        "Practice drawing memory allocation diagrams for paging questions.",
        "Be able to explain deadlock conditions and prevention methods.",
        "Know how semaphores and mutexes are used for synchronization."
      ]
    },
    {
      id: "object-oriented-programming",
      title: "Object-Oriented Programming",
      icon: Code,
      color: "bg-green-50 dark:bg-green-900/20",
      borderColor: "border-green-200 dark:border-green-800",
      introduction: "Object-Oriented Programming (OOP) is a programming paradigm that organizes software design around objects, rather than functions and logic. It enables modularity, code reuse, and abstraction — core qualities for scalable software development. Understanding OOP is essential for coding interviews and software engineering roles.",
      coreTopics: [
        {
          title: "Class & Object",
          content: "A class is a blueprint for creating objects. It encapsulates data and methods to manipulate that data. An object is an instance of a class, created in memory during runtime."
        },
        {
          title: "Encapsulation",
          content: "Bundles data and methods into a single unit. Access is restricted using access specifiers (private, public, protected)."
        },
        {
          title: "Abstraction",
          content: "Hides complex details and shows only essential features. Implementation details are abstracted away from the user."
        },
        {
          title: "Inheritance",
          content: "Allows a class (child) to inherit attributes and methods from another class (parent), promoting code reuse and establishing hierarchical relationships."
        },
        {
          title: "Polymorphism",
          content: "Allows objects to take on many forms. There are two types: compile-time (method overloading) and run-time (method overriding via virtual functions)."
        }
      ],
      interviews: [
        "What is the difference between compile-time and runtime polymorphism?",
        "Explain encapsulation with an example.",
        "What is the use of a virtual function in C++?",
        "Define friend function and its use case.",
        "What are the advantages of inheritance?"
      ],
      diagram: {
        title: "OOP Relationships",
        description: "OOP relationships include: IS-A (Inheritance) where a Dog is an Animal, HAS-A (Aggregation) where a Car has an Engine, and UML class diagrams representing the structure and relationships between classes."
      },
      codeSnippet: {
        language: "cpp",
        code: `// Polymorphism example
class Base {
public:
    virtual void print() {
        cout << "Base class";
    }
};

class Derived : public Base {
public:
    void print() override {
        cout << "Derived class";
    }
};

int main() {
    Base* basePtr;
    Derived derivedObj;
    
    basePtr = &derivedObj;
    basePtr->print(); // Outputs: "Derived class"
    
    return 0;
}`
      },
      proTips: [
        "Use access modifiers wisely to enforce encapsulation.",
        "Prefer composition over inheritance when reuse is needed.",
        "Always define virtual destructors in base classes if inheritance is involved.",
        "Practice writing UML diagrams to represent your class designs.",
        "Understand SOLID principles for better OOP design."
      ]
    },
    {
      id: "computer-networks",
      title: "Computer Networks",
      icon: Network,
      color: "bg-purple-50 dark:bg-purple-900/20",
      borderColor: "border-purple-200 dark:border-purple-800",
      introduction: "Computer Networks enable communication between devices and systems worldwide. From local networks to the global internet, understanding how data moves, is secured, and managed across networks is crucial for modern computing. Network concepts frequently appear in technical interviews as they underpin most software applications today.",
      coreTopics: [
        {
          title: "OSI Model",
          content: "The seven-layer OSI model conceptualizes network communication: Physical, Data Link, Network, Transport, Session, Presentation, and Application layers. Each layer has specific responsibilities and protocols."
        },
        {
          title: "TCP/IP Protocol Suite",
          content: "The foundational protocols of the internet include TCP (connection-oriented, reliable) and UDP (connectionless, faster) at the transport layer, IP at the network layer, and application protocols like HTTP, FTP, DNS, etc."
        },
        {
          title: "IP Addressing",
          content: "IPv4 (32-bit) and IPv6 (128-bit) addressing schemes identify devices on networks. Concepts include subnetting, CIDR notation, public vs. private addresses, and NAT."
        },
        {
          title: "Routing Protocols",
          content: "Protocols like OSPF, BGP, and RIP determine how packets are forwarded between networks, based on metrics like hop count, bandwidth, and policy."
        },
        {
          title: "Network Security",
          content: "Firewalls, encryption (SSL/TLS), VPNs, and authentication mechanisms protect network communications from unauthorized access and attacks."
        }
      ],
      interviews: [
        "Explain the difference between TCP and UDP protocols.",
        "What happens when you type a URL in a browser and press Enter?",
        "How does DNS resolution work?",
        "Explain the concept of subnetting and CIDR notation.",
        "Describe how HTTPS provides security over HTTP."
      ],
      diagram: {
        title: "TCP Three-Way Handshake",
        description: "The TCP connection establishment process involves: 1) Client sends SYN packet, 2) Server responds with SYN-ACK, 3) Client sends ACK. This three-way handshake ensures reliable connection setup before data transfer begins."
      },
      codeSnippet: {
        language: "python",
        code: `# Simple socket server in Python
import socket

# Create a socket object
server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# Get local machine name and port
host = socket.gethostname()
port = 9999

# Bind to the port
server_socket.bind((host, port))

# Queue up to 5 requests
server_socket.listen(5)

while True:
    # Establish a connection
    client_socket, addr = server_socket.accept()
    print(f"Got connection from {addr}")
    
    msg = 'Thank you for connecting!'
    client_socket.send(msg.encode('utf-8'))
    client_socket.close()`
      },
      proTips: [
        "Memorize the OSI model layers and their functions for structure.",
        "Practice tracing the path of data through network layers.",
        "Understand common port numbers (HTTP: 80, HTTPS: 443, SSH: 22).",
        "Know the differences between switching, routing, and bridging.",
        "Be familiar with network troubleshooting tools (ping, traceroute, nslookup)."
      ]
    },
    {
      id: "dbms",
      title: "Database Management Systems",
      icon: Database,
      color: "bg-orange-50 dark:bg-orange-900/20",
      borderColor: "border-orange-200 dark:border-orange-800",
      introduction: "Database Management Systems (DBMS) organize, store, and manage data efficiently. They provide mechanisms for data storage, retrieval, security, and integrity. Understanding database concepts is crucial for technical interviews as most applications rely on databases for persistent storage.",
      coreTopics: [
        {
          title: "Relational Database Concepts",
          content: "Tables, rows, columns, keys (primary, foreign, candidate), and relationships (one-to-one, one-to-many, many-to-many) form the foundation of relational databases."
        },
        {
          title: "SQL",
          content: "Structured Query Language (SQL) allows interaction with relational databases. It includes DDL (Data Definition Language), DML (Data Manipulation Language), DCL (Data Control Language), and TCL (Transaction Control Language) commands."
        },
        {
          title: "Normalization",
          content: "Database normalization (1NF, 2NF, 3NF, BCNF, etc.) reduces data redundancy and improves data integrity by organizing fields and tables efficiently."
        },
        {
          title: "Transactions & ACID",
          content: "Database transactions must be Atomic, Consistent, Isolated, and Durable (ACID) to maintain integrity, especially during concurrent operations."
        },
        {
          title: "Indexing",
          content: "Database indexes improve query performance by providing faster access to rows. Types include B-tree, hash, bitmap, and clustered indexes, each with specific use cases."
        }
      ],
      interviews: [
        "Explain the ACID properties of database transactions.",
        "What is the difference between clustered and non-clustered indexes?",
        "How would you optimize a slow SQL query?",
        "Describe the different types of joins in SQL.",
        "What's the difference between DELETE, TRUNCATE, and DROP commands?"
      ],
      diagram: {
        title: "Database Normalization Process",
        description: "Normalization progresses through forms: 1NF (eliminate repeating groups), 2NF (remove partial dependencies), 3NF (remove transitive dependencies), BCNF, 4NF, and 5NF. Each form builds on the previous one to reduce redundancy and anomalies."
      },
      codeSnippet: {
        language: "sql",
        code: `-- Creating and querying a simple database
CREATE TABLE Employees (
    EmployeeID INT PRIMARY KEY,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    DepartmentID INT,
    Salary DECIMAL(10, 2),
    FOREIGN KEY (DepartmentID) REFERENCES Departments(DepartmentID)
);

CREATE TABLE Departments (
    DepartmentID INT PRIMARY KEY,
    DepartmentName VARCHAR(50)
);

-- Query to find average salary by department
SELECT d.DepartmentName, AVG(e.Salary) as AvgSalary
FROM Employees e
JOIN Departments d ON e.DepartmentID = d.DepartmentID
GROUP BY d.DepartmentName
HAVING AVG(e.Salary) > 50000
ORDER BY AvgSalary DESC;`
      },
      proTips: [
        "Practice writing complex SQL queries with multiple joins and aggregations.",
        "Understand index selection and its impact on query performance.",
        "Know when to use different normalization forms based on requirements.",
        "Be familiar with NoSQL databases and their use cases versus relational databases.",
        "Study isolation levels and concurrency control mechanisms for transaction questions."
      ]
    }
  ];

  return (
    <DashboardLayout userType={userType} navItems={navItems}>
      <div className="space-y-6">
        <div>
          <h1 className="font-heading text-3xl md:text-4xl font-bold">Learning Path</h1>
          <p className="text-muted-foreground mt-2">
            Master computer science fundamentals with these structured learning resources designed to prepare you for technical interviews.
          </p>
        </div>

        <Tabs defaultValue="operating-systems" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6">
            {subjects.map((subject) => (
              <TabsTrigger key={subject.id} value={subject.id} className="flex items-center gap-2">
                <subject.icon className="h-4 w-4" />
                <span>{subject.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {subjects.map((subject) => (
            <TabsContent key={subject.id} value={subject.id}>
              <Card className={`overflow-hidden border ${subject.borderColor}`}>
                <CardHeader className={`${subject.color}`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl flex items-center gap-2">
                        <subject.icon className="h-6 w-6" />
                        {subject.title}
                      </CardTitle>
                      <CardDescription className="mt-2 text-base">
                        Master the fundamentals of {subject.title} for technical interviews
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="p-2 rounded-full bg-gradient-to-r from-primary to-primary-300 text-white flex items-center justify-center">
                        <GraduationCap className="h-5 w-5" />
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    {/* Introduction */}
                    <section>
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <BookOpen className="h-5 w-5 mr-2 text-primary" />
                        Introduction
                      </h3>
                      <p className="text-muted-foreground">{subject.introduction}</p>
                    </section>

                    {/* Core Topics */}
                    <section>
                      <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <Code className="h-5 w-5 mr-2 text-primary" />
                        Core Concepts
                      </h3>
                      <Accordion type="multiple" className="w-full">
                        {subject.coreTopics.map((topic, index) => (
                          <AccordionItem key={index} value={`topic-${index}`}>
                            <AccordionTrigger className="text-md font-medium">
                              {topic.title}
                            </AccordionTrigger>
                            <AccordionContent>
                              <p className="text-muted-foreground">{topic.content}</p>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </section>

                    {/* Interview Highlights */}
                    <section>
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <GraduationCap className="h-5 w-5 mr-2 text-primary" />
                        Interview Highlights
                      </h3>
                      <ul className="list-disc list-inside space-y-1 pl-2">
                        {subject.interviews.map((question, index) => (
                          <li key={index} className="text-muted-foreground">
                            {question}
                          </li>
                        ))}
                      </ul>
                    </section>

                    {/* Key Diagrams */}
                    {subject.diagram && (
                      <section className="border rounded-md p-4 bg-card">
                        <h3 className="text-lg font-semibold mb-2">
                          {subject.diagram.title}
                        </h3>
                        <p className="text-muted-foreground">{subject.diagram.description}</p>
                      </section>
                    )}

                    {/* Code Snippets */}
                    {subject.codeSnippet && (
                      <section>
                        <h3 className="text-lg font-semibold mb-2 flex items-center">
                          <Code className="h-5 w-5 mr-2 text-primary" />
                          Code Example
                        </h3>
                        <div className="bg-muted rounded-md p-4 overflow-auto">
                          <pre className="text-sm">
                            <code>{subject.codeSnippet.code}</code>
                          </pre>
                        </div>
                      </section>
                    )}

                    {/* Pro Tips */}
                    <section className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                      <h3 className="text-lg font-semibold mb-2">Pro Tips</h3>
                      <ul className="list-disc list-inside space-y-1 pl-2">
                        {subject.proTips.map((tip, index) => (
                          <li key={index}>{tip}</li>
                        ))}
                      </ul>
                    </section>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
