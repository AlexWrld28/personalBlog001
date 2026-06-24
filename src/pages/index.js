import * as React from "react"
import { Link } from "gatsby"
import BouncyBallsBackdrop from "../components/bouncy-balls-scene"

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
      date: "Summer 2024",
      description:
        "Collected field measurements, created spatial datasets, and supported GIS mapping workflows using ESRI tools.",
      samples: [
        {
          src: "/nassau-shapefile-samples/nassau-pavement-markings-2020.png",
          alt: "Nassau County pavement markings shapefile sample map",
        },
        {
          src: "/nassau-shapefile-samples/nassau-pavement-management-viewer.png",
          alt: "Nassau County pavement management viewer shapefile sample map",
        },
      ],
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
  const [activeSample, setActiveSample] = React.useState(null)

  React.useEffect(() => {
    if (!activeSample || typeof document === "undefined") {
      return undefined
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const handleKeyDown = event => {
      if (event.key === "Escape") {
        setActiveSample(null)
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [activeSample])

  return (
    <main style={styles.page}>
      <section style={styles.hero}>
        <BouncyBallsBackdrop />

        <div style={styles.heroGrid}>
          <div>
            <p style={styles.eyebrow}>Personal Resume Site</p>
            <h1 style={styles.name}>{resumeData.name}</h1>
            <h2 style={styles.title}>{resumeData.title}</h2>
            <p style={styles.summary}>{resumeData.summary}</p>

            <div style={styles.buttonRow}>
              <a href={`mailto:${resumeData.email}`} style={styles.primaryButton}>
                Contact Me
              </a>
              <a
                href={resumeData.github}
                target="_blank"
                rel="noreferrer"
                style={styles.secondaryButton}
              >
                GitHub
              </a>
            </div>
          </div>

          <div style={styles.profileCard}>
            <img
              src="/profile-photo.jpg"
              alt="Alexander Zirilli"
              style={styles.avatar}
            />
            <p style={styles.cardLabel}>Location</p>
            <p style={styles.cardText}>{resumeData.location}</p>
            <p style={styles.cardLabel}>Email</p>
            <p style={styles.cardText}>{resumeData.email}</p>
          </div>
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Skills</h2>
        <div style={styles.skillsGrid}>
          {resumeData.skills.map(skill => (
            <span key={skill} style={styles.skillPill}>
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Projects</h2>
        <div style={styles.cardGrid}>
          {resumeData.projects.map(project => (
            <article key={project.name} style={styles.contentCard}>
              <h3 style={styles.cardTitle}>{project.name}</h3>
              <p style={styles.cardDescription}>{project.description}</p>
              <Link to={project.path} style={styles.tech}>
                {project.tech}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Experience</h2>
        <div style={styles.timeline}>
          {resumeData.experience.map(job => (
            <article key={job.role} style={styles.timelineItem}>
              <div>
                <h3 style={styles.cardTitle}>{job.role}</h3>
                <p style={styles.subText}>
                  {job.company} - {job.date}
                </p>
              </div>
              <p style={styles.cardDescription}>{job.description}</p>
              {job.samples ? (
                <div style={styles.sampleSection}>
                  <p style={styles.sampleLabel}>Shapefile samples</p>
                  <div style={styles.sampleGrid}>
                    {job.samples.map(sample => (
                      <button
                        key={sample.src}
                        type="button"
                        onClick={() => setActiveSample(sample)}
                        style={styles.sampleButton}
                        aria-label={`Open ${sample.alt} full screen`}
                      >
                        <img
                          src={sample.src}
                          alt={sample.alt}
                          style={styles.sampleImage}
                          loading="lazy"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Education</h2>
        <div style={styles.cardGrid}>
          {resumeData.education.map(item => (
            <article key={item.school} style={styles.contentCard}>
              <h3 style={styles.cardTitle}>{item.school}</h3>
              <p style={styles.cardDescription}>{item.degree}</p>
              <p style={styles.techText}>{item.date}</p>
            </article>
          ))}
        </div>
      </section>

      <footer style={styles.footer}>
        <p>
          Built with React -{" "}
          <a href={resumeData.linkedin} style={styles.footerLink}>
            LinkedIn
          </a>{" "}
          -{" "}
          <a href={resumeData.github} style={styles.footerLink}>
            GitHub
          </a>
        </p>
      </footer>

      {activeSample ? (
        <div
          style={styles.lightboxBackdrop}
          role="presentation"
          onClick={() => setActiveSample(null)}
        >
          <button
            type="button"
            onClick={() => setActiveSample(null)}
            style={styles.lightboxClose}
            aria-label="Close image preview"
          >
            ×
          </button>
          <div
            style={styles.lightboxFrame}
            role="dialog"
            aria-modal="true"
            aria-label={activeSample.alt}
            onClick={event => event.stopPropagation()}
          >
            <img
              src={activeSample.src}
              alt={activeSample.alt}
              style={styles.lightboxImage}
            />
            <p style={styles.lightboxCaption}>{activeSample.alt}</p>
          </div>
        </div>
      ) : null}
    </main>
  )
}

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #07111d 0%, #111827 45%, #10262a 100%)",
    color: "#e5e7eb",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif",
    padding: "40px 24px",
  },

  hero: {
    maxWidth: "1100px",
    margin: "0 auto",
    position: "relative",
    isolation: "isolate",
    overflow: "hidden",
    padding: "60px 0",
  },

  heroGrid: {
    position: "relative",
    zIndex: 1,
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "32px",
    alignItems: "center",
  },

  eyebrow: {
    color: "#38bdf8",
    fontSize: "14px",
    fontWeight: "700",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    marginBottom: "12px",
  },

  name: {
    fontSize: "clamp(42px, 8vw, 76px)",
    lineHeight: "1",
    margin: "0 0 14px",
    color: "#ffffff",
  },

  title: {
    fontSize: "clamp(20px, 3vw, 30px)",
    fontWeight: "500",
    color: "#cbd5e1",
    marginBottom: "24px",
  },

  summary: {
    fontSize: "18px",
    lineHeight: "1.7",
    color: "#cbd5e1",
    maxWidth: "720px",
  },

  buttonRow: {
    display: "flex",
    gap: "14px",
    marginTop: "30px",
    flexWrap: "wrap",
  },

  primaryButton: {
    background: "#38bdf8",
    color: "#020617",
    padding: "12px 20px",
    borderRadius: "999px",
    textDecoration: "none",
    fontWeight: "700",
  },

  secondaryButton: {
    border: "1px solid #475569",
    color: "#e5e7eb",
    padding: "12px 20px",
    borderRadius: "999px",
    textDecoration: "none",
    fontWeight: "700",
  },

  profileCard: {
    background: "rgba(15, 23, 42, 0.75)",
    border: "1px solid rgba(148, 163, 184, 0.25)",
    borderRadius: "28px",
    padding: "28px",
    boxShadow: "0 25px 80px rgba(0, 0, 0, 0.25)",
  },

  avatar: {
    width: "90px",
    height: "90px",
    borderRadius: "50%",
    objectFit: "cover",
    display: "block",
    marginBottom: "24px",
  },

  cardLabel: {
    color: "#94a3b8",
    fontSize: "13px",
    marginBottom: "4px",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },

  cardText: {
    marginTop: "0",
    marginBottom: "18px",
    color: "#f8fafc",
  },

  section: {
    maxWidth: "1100px",
    margin: "0 auto 56px",
  },

  sectionTitle: {
    fontSize: "30px",
    color: "#ffffff",
    marginBottom: "22px",
  },

  skillsGrid: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },

  skillPill: {
    background: "rgba(56, 189, 248, 0.12)",
    border: "1px solid rgba(56, 189, 248, 0.35)",
    color: "#bae6fd",
    padding: "10px 14px",
    borderRadius: "999px",
    fontWeight: "600",
  },

  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "20px",
  },

  contentCard: {
    background: "rgba(15, 23, 42, 0.72)",
    border: "1px solid rgba(148, 163, 184, 0.22)",
    borderRadius: "22px",
    padding: "24px",
    transition: "transform 0.2s ease, border-color 0.2s ease",
  },

  cardTitle: {
    fontSize: "21px",
    color: "#ffffff",
    marginTop: "0",
    marginBottom: "8px",
  },

  cardDescription: {
    color: "#cbd5e1",
    lineHeight: "1.6",
  },

  tech: {
    color: "#38bdf8",
    display: "inline-block",
    fontWeight: "700",
    marginTop: "16px",
    textDecoration: "none",
  },

  techText: {
    color: "#38bdf8",
    fontWeight: "700",
    marginTop: "16px",
  },

  timeline: {
    display: "grid",
    gap: "18px",
  },

  timelineItem: {
    background: "rgba(15, 23, 42, 0.72)",
    borderLeft: "4px solid #38bdf8",
    borderRadius: "18px",
    padding: "22px",
  },

  sampleSection: {
    marginTop: "18px",
  },

  sampleLabel: {
    color: "#94a3b8",
    fontSize: "13px",
    fontWeight: "700",
    letterSpacing: "1px",
    textTransform: "uppercase",
    marginBottom: "10px",
  },

  sampleGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "12px",
  },

  sampleButton: {
    appearance: "none",
    background: "none",
    border: "none",
    cursor: "zoom-in",
    display: "block",
    margin: "0",
    padding: "0",
    width: "100%",
    textAlign: "left",
  },

  sampleFigure: {
    margin: "0",
    borderRadius: "14px",
    overflow: "hidden",
    border: "1px solid rgba(148, 163, 184, 0.18)",
    background: "rgba(15, 23, 42, 0.9)",
  },

  sampleImage: {
    width: "100%",
    height: "auto",
    display: "block",
    aspectRatio: "4 / 3",
    objectFit: "cover",
    objectPosition: "center",
  },

  lightboxBackdrop: {
    position: "fixed",
    inset: "0",
    zIndex: "9999",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    background: "rgba(2, 6, 23, 0.94)",
    backdropFilter: "blur(10px)",
  },

  lightboxFrame: {
    position: "relative",
    width: "min(96vw, 1400px)",
    maxHeight: "92vh",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    alignItems: "center",
    justifyContent: "center",
  },

  lightboxImage: {
    maxWidth: "100%",
    maxHeight: "84vh",
    width: "auto",
    height: "auto",
    display: "block",
    objectFit: "contain",
    boxShadow: "0 24px 80px rgba(0, 0, 0, 0.45)",
    borderRadius: "16px",
    border: "1px solid rgba(148, 163, 184, 0.22)",
    background: "#0f172a",
  },

  lightboxCaption: {
    color: "#e5e7eb",
    fontSize: "14px",
    lineHeight: "1.5",
    margin: "0",
    textAlign: "center",
    maxWidth: "72ch",
  },

  lightboxClose: {
    position: "absolute",
    top: "18px",
    right: "18px",
    zIndex: "10000",
    width: "44px",
    height: "44px",
    borderRadius: "999px",
    border: "1px solid rgba(148, 163, 184, 0.28)",
    background: "rgba(15, 23, 42, 0.9)",
    color: "#ffffff",
    fontSize: "28px",
    lineHeight: "1",
    cursor: "pointer",
  },

  subText: {
    color: "#94a3b8",
    marginTop: "0",
  },

  footer: {
    maxWidth: "1100px",
    margin: "40px auto 0",
    paddingTop: "28px",
    borderTop: "1px solid rgba(148, 163, 184, 0.2)",
    color: "#94a3b8",
    textAlign: "center",
  },

  footerLink: {
    color: "#38bdf8",
    textDecoration: "none",
    fontWeight: "700",
  },
}

export const Head = () => <title>{resumeData.name}</title>

export default IndexPage
