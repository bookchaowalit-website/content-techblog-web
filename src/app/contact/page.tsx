import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Chaowalit Greepoke (Book) - Tech Generalist, Full-stack Developer, and Solopreneur based in Bangkok, Thailand. Available for freelance projects, AI integration, and web development consulting.",
  keywords: ["contact", "Chaowalit Greepoke", "Book Chaowalit", "freelance developer", "full-stack developer", "tech consultant", "AI integration", "Bangkok developer", "Thai developer", "web development services"],
  openGraph: {
    title: "Contact Chaowalit Greepoke (Book) | Chaowalit Greepoke (Book) Tech Blog",
    description: "Get in touch with Chaowalit Greepoke (Book) - Tech Generalist and Full-stack Developer based in Bangkok, Thailand. Available for freelance projects and consulting.",
    type: "profile",
    images: [
      {
        url: "/og-contact.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Chaowalit Greepoke (Book) - Tech Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Chaowalit Greepoke (Book) | Chaowalit Greepoke (Book) Tech Blog",
    description: "Get in touch with Chaowalit Greepoke (Book) - Tech Generalist and Full-stack Developer based in Bangkok, Thailand. Available for freelance projects and consulting.",
    images: ["/og-contact.jpg"],
  },
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Chaowalit Greepoke",
    "alternateName": "Book Chaowalit",
    "jobTitle": ["Tech Generalist", "Full-stack Developer", "Solopreneur"],
    "description": "Tech Generalist and Solopreneur who enjoys solving problems and building things end-to-end. Works across software engineering, data, AI, and digital growth.",
    "url": "https://techblog.bookchaowalit.com",
    "image": "https://techblog.bookchaowalit.com/profile-image.jpg",
    "sameAs": [
      "https://linkedin.com/in/chaowalit-greepoke"
    ],
    "knowsAbout": [
      "Next.js", "React", "TypeScript", "FastAPI", "AI Integration", 
      "RAG Systems", "Full-stack Development", "SEO", "Data Analysis"
    ],
    "workLocation": {
      "@type": "Place",
      "name": "Bangkok, Thailand"
    },
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Freelance Developer",
      "occupationLocation": {
        "@type": "Place",
        "name": "Bangkok, Thailand"
      },
      "skills": [
        "Web Development", "AI Integration", "Data Analysis", 
        "SEO Optimization", "Full-stack Development"
      ]
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "professional",
      "email": "chaowalit.greepoke@example.com",
      "url": "https://linkedin.com/in/chaowalit-greepoke"
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="mb-12">
          <nav className="mb-6 flex gap-3 flex-wrap">
            <Button variant="outline" asChild className="font-mono">
              <Link href="/">
                cd ~/
              </Link>
            </Button>
            <Button variant="outline" asChild className="font-mono">
              <Link href="/blog">
                cd blog/
              </Link>
            </Button>
          </nav>
          
          <div className="ascii-title text-primary text-lg mb-4">
{`┌─┐┌─┐┌┐┌┌┬┐┌─┐┌─┐┌┬┐
│  │ ││││ │ ├─┤│   │ 
└─┘└─┘┘└┘ ┴ ┴ ┴└─┘ ┴`}
          </div>
          
          <div className="flex items-center gap-2 text-muted-foreground mb-6">
            <span className="text-primary">$</span>
            <span>whoami && cat profile.json</span>
            <span className="blink">_</span>
          </div>
        </header>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Profile Card */}
          <div className="lg:col-span-2">
            <Card className="terminal-border mb-8">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 bg-primary/10 border border-primary rounded-lg flex items-center justify-center font-mono text-primary font-bold text-xl">
                    BG
                  </div>
                  <div>
                    <CardTitle className="font-mono text-xl text-primary">
                      Chaowalit Greepoke
                    </CardTitle>
                    <p className="text-muted-foreground font-mono">
                      aka &ldquo;Book&rdquo; • Tech Generalist & Solopreneur
                    </p>
                    <p className="text-sm text-muted-foreground font-mono">
                      📍 Bangkok Metropolitan Area
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="font-mono text-sm mb-6">
                  <div className="text-primary mb-2">user@book:~$ cat about.md</div>
                  <div className="bg-muted p-4 rounded border text-muted-foreground leading-relaxed">
                    Hello, I&apos;m Book — a <span className="text-primary">Tech Generalist</span> and <span className="text-primary">Solopreneur</span> who enjoys 
                    solving problems and building things end-to-end.
                    <br/><br/>
                    I work across the spectrum of <span className="text-primary">software engineering</span>, <span className="text-primary">data</span>, 
                    <span className="text-primary"> AI</span>, and <span className="text-primary">digital growth</span>, connecting different tools and 
                    technologies to create solutions that are practical and scalable.
                    <br/><br/>
                    My background ranges from developing web platforms to designing data workflows, analyzing 
                    information, and applying AI to support smarter decision-making.
                    <br/><br/>
                    As a solopreneur, I wear many hats — <span className="text-primary">developer</span>, 
                    <span className="text-primary"> engineer</span>, <span className="text-primary">analyst</span>, 
                    and <span className="text-primary">strategist</span> — which allows me to stay flexible and 
                    adapt quickly to any challenge.
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skills Section */}
            <Card className="terminal-border mb-8">
              <CardHeader>
                <CardTitle className="font-mono text-lg">
                  <span className="text-primary">$</span> ls -la skills/
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6 font-mono text-sm">
                  <div>
                    <div className="text-primary mb-2">Frontend Development</div>
                    <div className="space-y-1 text-muted-foreground ml-4">
                      <div>• Next.js & React</div>
                      <div>• TypeScript</div>
                      <div>• Tailwind CSS</div>
                      <div>• Shopify Liquid</div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-primary mb-2">Backend & APIs</div>
                    <div className="space-y-1 text-muted-foreground ml-4">
                      <div>• FastAPI</div>
                      <div>• Database Design</div>
                      <div>• Facebook Graph API</div>
                      <div>• Data Pipelines</div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-primary mb-2">AI & Data</div>
                    <div className="space-y-1 text-muted-foreground ml-4">
                      <div>• RAG Systems</div>
                      <div>• LangChain & LlamaIndex</div>
                      <div>• Multi-Agent Systems</div>
                      <div>• Data Analysis</div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-primary mb-2">Digital Marketing</div>
                    <div className="space-y-1 text-muted-foreground ml-4">
                      <div>• SEO Optimization</div>
                      <div>• Google Analytics</div>
                      <div>• Social Media Analytics</div>
                      <div>• A/B Testing</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info Sidebar */}
          <div className="space-y-6">
            <Card className="terminal-border">
              <CardHeader>
                <CardTitle className="font-mono text-lg">
                  <span className="text-primary">$</span> contact --info
                </CardTitle>
              </CardHeader>
              <CardContent className="font-mono text-sm">
                <div className="space-y-4">
                  <div>
                    <div className="text-primary mb-1">Location:</div>
                    <div className="text-muted-foreground">Bangkok, Thailand</div>
                  </div>
                  
                  <div>
                    <div className="text-primary mb-1">Work Status:</div>
                    <div className="text-muted-foreground">
                      <span className="text-green-500">●</span> Available for projects
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-primary mb-1">Connections:</div>
                    <div className="text-muted-foreground">147+ on LinkedIn</div>
                  </div>
                  
                  <div className="pt-4 border-t border-border">
                    <div className="text-primary mb-2">Current Focus:</div>
                    <div className="text-muted-foreground space-y-1">
                      <div>• Freelance Projects</div>
                      <div>• AI Integration</div>
                      <div>• Full-stack Development</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="terminal-border">
              <CardHeader>
                <CardTitle className="font-mono text-lg">
                  <span className="text-primary">$</span> ./connect.sh
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button 
                    asChild 
                    className="w-full font-mono" 
                    variant="outline"
                  >
                    <a 
                      href="https://linkedin.com/in/chaowalit-greepoke" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      📧 LinkedIn
                    </a>
                  </Button>
                  
                  <Button 
                    asChild 
                    className="w-full font-mono" 
                    variant="outline"
                  >
                    <a href="mailto:chaowalit.greepoke@example.com">
                      💼 Email
                    </a>
                  </Button>
                  
                  <div className="text-center text-xs text-muted-foreground font-mono mt-4">
                    Response time: &lt; 24 hours
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Experience Timeline */}
        <Card className="terminal-border mt-8">
          <CardHeader>
            <CardTitle className="font-mono text-lg">
              <span className="text-primary">$</span> git log --oneline experience/
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-mono text-sm space-y-6">
              <div className="border-l-2 border-primary pl-4">
                <div className="text-primary font-bold">2024-Present • Freelance</div>
                <div className="text-muted-foreground mt-1">
                  Full-stack Developer focusing on AI integration and modern web solutions
                </div>
              </div>
              
              <div className="border-l-2 border-muted pl-4">
                <div className="text-primary font-bold">2024-2025 • Turfmapp</div>
                <div className="text-muted-foreground mt-1">
                  Full-stack Developer - AI/RAG systems, Next.js, FastAPI, e-commerce
                </div>
              </div>
              
              <div className="border-l-2 border-muted pl-4">
                <div className="text-primary font-bold">2022-2024 • SEO Specialist & Data Analyst</div>
                <div className="text-muted-foreground mt-1">
                  SEO optimization, social media analytics, data-driven marketing strategies
                </div>
              </div>
              
              <div className="border-l-2 border-muted pl-4">
                <div className="text-primary font-bold">2021-2022 • Data Center Technician</div>
                <div className="text-muted-foreground mt-1">
                  Infrastructure management, server operations, network maintenance
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <footer className="mt-12 text-center">
          <div className="ascii-art text-muted-foreground text-xs">
{`╭─────────────────────────────────────╮
│     Thanks for visiting my profile  │
│        Let&apos;s build something!       │
╰─────────────────────────────────────╯`}
          </div>
        </footer>
      </div>
    </div>
  );
}