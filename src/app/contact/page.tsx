import type { Metadata } from "next";
import { ReaderHead, Prose } from "@/components/reader-shell";
import { SITE, TechFrame } from "@/components/blog-views";

const description = "About Chaowalit Greepoke (Book): a tech generalist and solopreneur in Bangkok working across software engineering, data, AI and digital growth.";

export const metadata: Metadata = {
  title: "About",
  description,
  keywords: ["Chaowalit Greepoke", "Book Chaowalit", "full-stack developer", "Bangkok developer", "Thai developer"],
  openGraph: { title: "About Chaowalit Greepoke (Book) | Chaowalit Greepoke (Book) Tech Blog", description, type: "profile" },
  twitter: { card: "summary", title: "About Chaowalit Greepoke (Book) | Chaowalit Greepoke (Book) Tech Blog", description },
  alternates: { canonical: "/contact" },
};

const SKILLS: [string, string[]][] = [
  ["Frontend development", ["Next.js and React", "TypeScript", "Tailwind CSS", "Shopify Liquid"]],
  ["Backend and APIs", ["FastAPI", "Database design", "Facebook Graph API", "Data pipelines"]],
  ["AI and data", ["RAG systems", "LangChain and LlamaIndex", "Multi-agent systems", "Data analysis"]],
  ["Digital marketing", ["SEO", "Google Analytics", "Social media analytics", "A/B testing"]],
];

const EXPERIENCE: [string, string, string][] = [
  ["2024–present", "Freelance", "Full-stack developer focusing on AI integration and modern web solutions."],
  ["2024–2025", "Turfmapp", "Full-stack developer: AI/RAG systems, Next.js, FastAPI, e-commerce."],
  ["2022–2024", "SEO specialist and data analyst", "SEO, social media analytics and data-driven marketing."],
  ["2021–2022", "Data center technician", "Infrastructure, server operations and network maintenance."],
];

export default function ContactPage() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Chaowalit Greepoke",
    alternateName: "Book Chaowalit",
    jobTitle: ["Tech Generalist", "Full-stack Developer", "Solopreneur"],
    description,
    url: SITE,
    sameAs: ["https://linkedin.com/in/chaowalit-greepoke", "https://github.com/bookchaowalit"],
    knowsAbout: ["Next.js", "React", "TypeScript", "FastAPI", "AI Integration", "RAG Systems", "Full-stack Development", "SEO", "Data Analysis"],
    workLocation: { "@type": "Place", name: "Bangkok, Thailand" },
    email: "mailto:bookchaowalit@gmail.com",
  };
  return (
    <TechFrame current="about">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <ReaderHead eyebrow="About" title="Chaowalit Greepoke (Book)" lede="Tech generalist and solopreneur in the Bangkok metropolitan area.">
        <a className="rs-button" href="mailto:bookchaowalit@gmail.com">Email</a>
        <a className="rs-plain" href="https://linkedin.com/in/chaowalit-greepoke" rel="noopener noreferrer">LinkedIn</a>
        <a className="rs-plain" href="https://github.com/bookchaowalit" rel="noopener noreferrer">GitHub</a>
      </ReaderHead>
      <Prose>
        <p>Hello, I&apos;m Book: a tech generalist and solopreneur who enjoys solving problems and building things end to end.</p>
        <p>I work across software engineering, data, AI and digital growth, connecting different tools and technologies to create solutions that are practical and scalable. My background ranges from developing web platforms to designing data workflows, analysing information, and applying AI to support better decisions.</p>
        <p>As a solopreneur I wear many hats (developer, engineer, analyst and strategist), which keeps me flexible when a problem changes shape.</p>
        <h2>Skills</h2>
        {SKILLS.map(([group, items]) => (
          <section key={group} aria-label={group}>
            <h3>{group}</h3>
            <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>
        ))}
        <h2>Experience</h2>
        <table>
          <thead><tr><th scope="col">Years</th><th scope="col">Role</th><th scope="col">Work</th></tr></thead>
          <tbody>{EXPERIENCE.map(([years, role, work]) => <tr key={role}><td>{years}</td><td>{role}</td><td>{work}</td></tr>)}</tbody>
        </table>
        <h2>Current focus</h2>
        <ul><li>Freelance projects</li><li>AI integration</li><li>Full-stack development</li></ul>
      </Prose>
    </TechFrame>
  );
}
