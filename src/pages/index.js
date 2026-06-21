import * as React from "react"
import { Link } from "gatsby"
import * as pageStyles from "./index.module.css"

const resumeData = {
  name: "Alexander Zirilli",
  title: "Software Engineering Student | GIS & Full-Stack Developer",
  location: "Long Island, NY",
  email: "aazmax123@gmail.com",
  github: "https://github.com/AlexWrld28",
  linkedin: "https://www.linkedin.com/in/alexander-zirilli-1bba7b231/",
  summary:
    "Motivated software engineering student with experience in Java, Python, C, SQL, GIS, and full-stack development. Strong background in spatial data, backend systems, and project-based software design. Passionate about building practical applications that solve real-world problems.",

  skills: [
    "Java",
    "Python",
    "C",
    "SQL",
    "React",
    "Firebase",
    "Git/GitHub",
    "ArcGIS Pro",
    "JavaFX",
    "REST APIs",
  ],

  projects: [
    {
      name: "GitLove",
      description:
        "A developer-focused dating app that matches people through tech stacks, code challenges, profile signals, and playful engineering culture.",
      tech: "Next.js, TypeScript, Supabase, Tailwind",
      path: "/projects/gitlove/",
    },
    {
      name: "GLADYS GIS DSL",
      description:
        "A custom domain-specific language with a lexer, parser, token stream, and AST output designed around GIS-inspired concepts.",
      tech: "C, Compiler Design, CLI Tools",
      path: "/projects/gladys-gis-dsl/",
    },
    {
      name: "Sports Data Prediction Project",
      description:
        "A project concept using sports APIs, SQL, and machine learning to predict basic quarterback statistics.",
      tech: "Python, SQL, APIs, Machine Learning",
      path: "/projects/sports-data-prediction-project/",
    },
  ],

  experience: [
    {
      role: "GIS Intern",
      company: "County of Nassau",
      date: "Summer 2025",
      description:
        "Collected field measurements, created spatial datasets, and supported GIS mapping workflows using ESRI tools.",
    },
    {
      role: "Delivery Logistics",
      company: "Mario's Pizzeria / Burrito Mariachi",
      date: "Current",
      description:
        "Managed fast-paced delivery operations, customer communication, routing, and time-sensitive logistics.",
    },
  ],

  education: [
    {
      school: "Farmingdale State College",
      degree: "Computer Science",
      date: "Expected Graduation: Fall 2027",
    },
    {
      school: "Binghamton University",
      degree: "B.A. Geography - GIS & Computer Applications",
      date: "Graduated May 2024",
    },
  ],
}

const IndexPage = () => {
  return (
    <main className={pageStyles.page}>
      <div className={pageStyles.scene}>
        <section className={pageStyles.hero}>
          <div className={pageStyles.heroCopy}>
            <p className={pageStyles.eyebrow}>Personal Resume Site</p>
            <h1 className={pageStyles.name}>{resumeData.name}</h1>
            <h2 className={pageStyles.title}>{resumeData.title}</h2>
            <p className={pageStyles.summary}>{resumeData.summary}</p>

            <div className={pageStyles.buttonRow}>
              <a
                href={`mailto:${resumeData.email}`}
                className={pageStyles.primaryButton}
              >
                Contact Me
              </a>
              <a
                href={resumeData.github}
                target="_blank"
                rel="noreferrer"
                className={pageStyles.secondaryButton}
              >
                GitHub
              </a>
            </div>
          </div>

          <aside className={pageStyles.profilePanel}>
            <div className={pageStyles.portraitFrame}>
              <img
                src="/profile-photo.jpg"
                alt="Alexander Zirilli"
                className={pageStyles.avatar}
              />
            </div>
            <div className={pageStyles.contactPlate}>
              <p className={pageStyles.cardLabel}>Location</p>
              <p className={pageStyles.cardText}>{resumeData.location}</p>
              <p className={pageStyles.cardLabel}>Email</p>
              <p className={pageStyles.cardText}>{resumeData.email}</p>
            </div>
          </aside>
        </section>

        <section className={pageStyles.section}>
          <div className={pageStyles.sectionHeader}>
            <h2 className={pageStyles.sectionTitle}>Skills</h2>
            <span className={pageStyles.sectionMarker} aria-hidden="true" />
          </div>
          <div className={pageStyles.skillsGrid}>
            {resumeData.skills.map(skill => (
              <span key={skill} className={pageStyles.skillPill}>
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section className={pageStyles.section}>
          <div className={pageStyles.sectionHeader}>
            <h2 className={pageStyles.sectionTitle}>Projects</h2>
            <span className={pageStyles.sectionMarker} aria-hidden="true" />
          </div>
          <div className={pageStyles.cardGrid}>
            {resumeData.projects.map(project => (
              <article key={project.name} className={pageStyles.contentCard}>
                <h3 className={pageStyles.cardTitle}>{project.name}</h3>
                <p className={pageStyles.cardDescription}>
                  {project.description}
                </p>
                <Link to={project.path} className={pageStyles.tech}>
                  {project.tech} - View project
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className={pageStyles.section}>
          <div className={pageStyles.sectionHeader}>
            <h2 className={pageStyles.sectionTitle}>Experience</h2>
            <span className={pageStyles.sectionMarker} aria-hidden="true" />
          </div>
          <div className={pageStyles.timeline}>
            {resumeData.experience.map(job => (
              <article key={job.role} className={pageStyles.timelineItem}>
                <div>
                  <h3 className={pageStyles.cardTitle}>{job.role}</h3>
                  <p className={pageStyles.subText}>
                    {job.company} - {job.date}
                  </p>
                </div>
                <p className={pageStyles.cardDescription}>{job.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={pageStyles.section}>
          <div className={pageStyles.sectionHeader}>
            <h2 className={pageStyles.sectionTitle}>Education</h2>
            <span className={pageStyles.sectionMarker} aria-hidden="true" />
          </div>
          <div className={pageStyles.cardGrid}>
            {resumeData.education.map(item => (
              <article key={item.school} className={pageStyles.contentCard}>
                <h3 className={pageStyles.cardTitle}>{item.school}</h3>
                <p className={pageStyles.cardDescription}>{item.degree}</p>
                <p className={pageStyles.techText}>{item.date}</p>
              </article>
            ))}
          </div>
        </section>

        <footer className={pageStyles.footer}>
          <p>
            Built with React -{" "}
            <a href={resumeData.linkedin} className={pageStyles.footerLink}>
              LinkedIn
            </a>{" "}
            -{" "}
            <a href={resumeData.github} className={pageStyles.footerLink}>
              GitHub
            </a>
          </p>
        </footer>
      </div>
    </main>
  )
}

export const Head = () => <title>{resumeData.name}</title>

export default IndexPage
