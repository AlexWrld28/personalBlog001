import * as React from "react"
import { Link } from "gatsby"
import * as styles from "./resume.module.css"

const contactLinks = [
  {
    label: "Email",
    href: "mailto:your.email@example.com",
    text: "your.email@example.com",
  },
  { label: "Phone", href: "tel:+15555555555", text: "(555) 555-5555" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/your-handle",
    text: "linkedin.com/in/your-handle",
  },
  {
    label: "GitHub",
    href: "https://github.com/your-handle",
    text: "github.com/your-handle",
  },
]

const experience = [
  {
    role: "Software Engineer",
    company: "Company Name",
    location: "City, State",
    period: "2023 - Present",
    bullets: [
      "Led delivery of a customer-facing feature that reduced support tickets by 25%.",
      "Built reusable React components and improved page performance by 30% through code splitting and image optimization.",
      "Partnered with product and design to prioritize roadmap items and ship in weekly releases.",
    ],
  },
  {
    role: "Junior Developer",
    company: "Previous Company",
    location: "City, State",
    period: "2021 - 2023",
    bullets: [
      "Implemented API integrations and internal dashboards used by 50+ team members.",
      "Wrote unit and integration tests to improve release confidence and reduce regressions.",
      "Documented development workflows and onboarding guides for new engineers.",
    ],
  },
]

const projects = [
  {
    name: "Project One",
    description:
      "Built a full-stack web app with user authentication, dashboard analytics, and cloud deployment.",
    stack: "React, Node.js, PostgreSQL, Azure",
    path: "/projects/project-one/",
  },
  {
    name: "Project Two",
    description:
      "Created a personal finance tracker with budget alerts, categorized transactions, and responsive UI.",
    stack: "TypeScript, Next.js, Prisma, Tailwind CSS",
    path: "/projects/project-two/",
  },
]

const skills = [
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "HTML/CSS",
  "REST APIs",
  "SQL",
  "Git",
  "Azure",
  "Jest",
]

const IndexPage = () => (
  <main className={styles.page}>
    <article className={styles.resume}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.name}>Your Name</h1>
          <p className={styles.role}>Software Engineer</p>
        </div>
        <ul className={styles.contactList}>
          {contactLinks.map(link => (
            <li key={link.label}>
              <a href={link.href}>{link.text}</a>
            </li>
          ))}
        </ul>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Summary</h2>
        <p>
          Results-oriented engineer with experience building responsive web
          applications, integrating APIs, and shipping reliable features in fast
          paced teams. Strong in frontend development with practical backend and
          cloud deployment experience.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Experience</h2>
        {experience.map(item => (
          <article className={styles.entry} key={`${item.company}-${item.role}`}>
            <div className={styles.entryHeader}>
              <h3>{item.role}</h3>
              <span>{item.period}</span>
            </div>
            <p className={styles.entryMeta}>
              {item.company} | {item.location}
            </p>
            <ul className={styles.entryList}>
              {item.bullets.map(bullet => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Projects</h2>
        {projects.map(project => (
          <article className={styles.entry} key={project.name}>
            <div className={styles.entryHeader}>
              <h3>{project.name}</h3>
              <span>{project.stack}</span>
            </div>
            <p>{project.description}</p>
            <Link className={styles.projectLink} to={project.path}>
              View more about {project.name}
            </Link>
          </article>
        ))}
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Skills</h2>
        <ul className={styles.skillList}>
          {skills.map(skill => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Education</h2>
        <article className={styles.entry}>
          <div className={styles.entryHeader}>
            <h3>B.S. in Computer Science</h3>
            <span>2021</span>
          </div>
          <p>University Name, City, State</p>
        </article>
      </section>
    </article>
  </main>
)

export const Head = () => (
  <>
    <title>Your Name | Resume</title>
    <meta name="description" content="Professional resume for Your Name." />
  </>
)

export default IndexPage
