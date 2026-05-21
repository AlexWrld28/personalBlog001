import * as React from "react"
import { Link } from "gatsby"

const GladysGisDslPage = () => (
  <main style={styles.page}>
    <article style={styles.card}>
      <Link to="/" style={styles.backLink}>
        Back to resume
      </Link>
      <p style={styles.eyebrow}>Project Details</p>
      <h1 style={styles.title}>GLADYS GIS DSL</h1>
      <p style={styles.tech}>C, Compiler Design, CLI Tools</p>
      <p style={styles.description}>
        A custom domain-specific language with a lexer, parser, token stream,
        and AST output designed around GIS-inspired concepts.
      </p>

      <section>
        <h2 style={styles.sectionTitle}>Highlights</h2>
        <ul style={styles.list}>
          <li>Implements compiler fundamentals including lexing and parsing.</li>
          <li>Produces structured token stream and AST output.</li>
          <li>Explores GIS concepts through a custom language design.</li>
        </ul>
      </section>
    </article>
  </main>
)

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #0f172a 0%, #111827 45%, #1e293b 100%)",
    color: "#e5e7eb",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif",
    padding: "48px 24px",
  },
  card: {
    maxWidth: "860px",
    margin: "0 auto",
    background: "rgba(15, 23, 42, 0.72)",
    border: "1px solid rgba(148, 163, 184, 0.22)",
    borderRadius: "22px",
    padding: "32px",
  },
  backLink: {
    color: "#38bdf8",
    display: "inline-block",
    fontWeight: "700",
    marginBottom: "28px",
    textDecoration: "none",
  },
  eyebrow: {
    color: "#38bdf8",
    fontSize: "14px",
    fontWeight: "700",
    letterSpacing: "1.5px",
    marginBottom: "12px",
    textTransform: "uppercase",
  },
  title: {
    color: "#ffffff",
    fontSize: "clamp(38px, 7vw, 64px)",
    lineHeight: "1",
    margin: "0 0 14px",
  },
  tech: {
    color: "#38bdf8",
    fontWeight: "700",
  },
  description: {
    color: "#cbd5e1",
    fontSize: "18px",
    lineHeight: "1.7",
    marginBottom: "32px",
  },
  sectionTitle: {
    color: "#ffffff",
    fontSize: "26px",
  },
  list: {
    color: "#cbd5e1",
    lineHeight: "1.7",
  },
}

export const Head = () => <title>GLADYS GIS DSL | Alexander Zirilli</title>

export default GladysGisDslPage
