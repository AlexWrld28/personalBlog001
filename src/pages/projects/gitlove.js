import * as React from "react"
import { Link } from "gatsby"

const demoProfiles = [
  {
    name: "Sabrina",
    age: 25,
    role: "Frontend Engineer",
    tags: ["React", "TypeScript", "Coffee Dates"],
    matchScore: 98,
    color: "#8b5cf6",
    codePrompt: "Fix the React key warning before you swipe.",
    codeAnswer: "Use a stable id for each rendered list item.",
  },
  {
    name: "Sydney",
    age: 24,
    role: "UI/UX Designer",
    tags: ["Figma", "CSS", "Art"],
    matchScore: 96,
    color: "#ec4899",
    codePrompt: "Center a card without hardcoded margins.",
    codeAnswer: "Use flexbox or grid with place-items: center.",
  },
  {
    name: "Ana",
    age: 28,
    role: "Backend Architect",
    tags: ["Rust", "PostgreSQL", "Dogs"],
    matchScore: 91,
    color: "#38bdf8",
    codePrompt: "Choose the safer query pattern.",
    codeAnswer: "Use parameterized queries instead of string interpolation.",
  },
]

const GitLoveDemo = () => {
  const [activeIndex, setActiveIndex] = React.useState(0)
  const [challengeSolved, setChallengeSolved] = React.useState(false)
  const activeProfile = demoProfiles[activeIndex]

  const nextProfile = () => {
    setActiveIndex(index => (index + 1) % demoProfiles.length)
    setChallengeSolved(false)
  }

  return (
    <section style={styles.demoPanel}>
      <div>
        <h2 style={styles.sectionTitle}>GitLove demo: solve to swipe</h2>
        <p style={styles.demoText}>
          GitLove turns developer culture into a dating product: profiles are
          matched by tech stack, personality, and small coding prompts that make
          interaction feel native to software people.
        </p>
      </div>

      <div style={styles.demoGrid}>
        <div style={styles.phoneFrame}>
          <div style={styles.phoneHeader}>
            <span style={styles.logoDot}>♥</span>
            <strong>GitLove</strong>
          </div>

          <div
            style={{
              ...styles.profileCard,
              boxShadow: `0 24px 80px ${activeProfile.color}55`,
            }}
          >
            <div
              style={{
                ...styles.profileImage,
                background: `linear-gradient(135deg, ${activeProfile.color}, #020617)`,
              }}
            >
              {activeProfile.name.charAt(0)}
            </div>
            <div style={styles.matchBadge}>{activeProfile.matchScore}% Match</div>
            <h3 style={styles.profileName}>
              {activeProfile.name}, {activeProfile.age}
            </h3>
            <p style={styles.playerMeta}>{activeProfile.role}</p>
            <div style={styles.tagRow}>
              {activeProfile.tags.map(tag => (
                <span key={tag} style={styles.tagPill}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div style={styles.actionRow}>
            <button onClick={nextProfile} style={styles.rejectButton}>
              ×
            </button>
            <button
              onClick={() => setChallengeSolved(true)}
              style={styles.codeButton}
            >
              {'</>'}
            </button>
            <button
              onClick={nextProfile}
              disabled={!challengeSolved}
              style={{
                ...styles.likeButton,
                opacity: challengeSolved ? 1 : 0.45,
                cursor: challengeSolved ? "pointer" : "not-allowed",
              }}
            >
              ♥
            </button>
          </div>
        </div>

        <div style={styles.challengePanel}>
          <p style={styles.demoLabel}>Daily gate</p>
          <h3 style={styles.challengeTitle}>{activeProfile.codePrompt}</h3>
          <pre style={styles.codeBlock}>{`function canSwipe(user) {
  return user.challengePassed && user.profileComplete
}`}</pre>
          <button onClick={() => setChallengeSolved(true)} style={styles.demoButton}>
            Mark challenge solved
          </button>
          <div style={styles.resultBox}>
            {challengeSolved ? (
              <>
                <strong>Swipe unlocked.</strong>
                <p>{activeProfile.codeAnswer}</p>
              </>
            ) : (
              <>
                <strong>Swipe locked.</strong>
                <p>GitLove asks users to prove a little developer fluency first.</p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

const GitLovePage = () => (
  <main style={styles.page}>
    <article style={styles.card}>
      <Link to="/" style={styles.backLink}>
        Back to resume
      </Link>
      <p style={styles.eyebrow}>Project Details</p>
      <h1 style={styles.title}>GitLove</h1>
      <p style={styles.tech}>Next.js, TypeScript, Supabase, Tailwind, React Query</p>
      <p style={styles.description}>
        GitLove is a developer-focused dating app that matches people through
        code, tech stacks, profile signals, and playful engineering culture. The
        app frames romantic compatibility around things developers already care
        about: code style, tools, debugging energy, and shared technical taste.
      </p>

      <div style={styles.linkRow}>
        <a
          href="https://github.com/uriel128/GitLove"
          target="_blank"
          rel="noreferrer"
          style={styles.repoLink}
        >
          View GitLove on GitHub →
        </a>
        <a
          href="https://gitlove.dev"
          target="_blank"
          rel="noreferrer"
          style={styles.secondaryLink}
        >
          Visit live site →
        </a>
      </div>

      <GitLoveDemo />

      <section>
        <h2 style={styles.sectionTitle}>Highlights</h2>
        <ul style={styles.list}>
          <li>
            Built as a Next.js workspace with a dedicated frontend package and
            TypeScript type checking.
          </li>
          <li>
            Uses Supabase and React Query patterns for app data, auth-aware
            flows, and interactive user states.
          </li>
          <li>
            Presents dating mechanics through developer-native features like
            stack matching, code challenges, GitHub-style language, and profile
            cards.
          </li>
          <li>
            Includes polished landing-page storytelling: animated profiles,
            success stories, reviews, theme support, and strong conversion CTAs.
          </li>
        </ul>
      </section>
    </article>
  </main>
)

const buttonBase = {
  alignItems: "center",
  background: "rgba(255, 255, 255, 0.07)",
  border: "1px solid rgba(255, 255, 255, 0.12)",
  borderRadius: "50%",
  cursor: "pointer",
  display: "flex",
  fontSize: "28px",
  fontWeight: "900",
  height: "58px",
  justifyContent: "center",
  width: "58px",
}

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
    maxWidth: "980px",
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
    fontSize: "clamp(42px, 7vw, 76px)",
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
    marginBottom: "20px",
  },
  linkRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    marginBottom: "32px",
  },
  repoLink: {
    color: "#020617",
    background: "#38bdf8",
    borderRadius: "999px",
    display: "inline-block",
    fontWeight: "700",
    padding: "12px 18px",
    textDecoration: "none",
  },
  secondaryLink: {
    color: "#e5e7eb",
    border: "1px solid rgba(148, 163, 184, 0.4)",
    borderRadius: "999px",
    display: "inline-block",
    fontWeight: "700",
    padding: "12px 18px",
    textDecoration: "none",
  },
  demoPanel: {
    background: "rgba(2, 6, 23, 0.52)",
    border: "1px solid rgba(236, 72, 153, 0.28)",
    borderRadius: "20px",
    marginBottom: "34px",
    padding: "24px",
  },
  demoText: {
    color: "#cbd5e1",
    lineHeight: "1.6",
  },
  demoGrid: {
    display: "grid",
    gap: "20px",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  },
  phoneFrame: {
    background: "linear-gradient(180deg, #1a102d, #0a0518)",
    border: "1px solid rgba(255, 255, 255, 0.12)",
    borderRadius: "32px",
    boxShadow: "0 30px 100px rgba(0, 0, 0, 0.35)",
    padding: "18px",
  },
  phoneHeader: {
    alignItems: "center",
    borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
    display: "flex",
    gap: "10px",
    marginBottom: "16px",
    paddingBottom: "14px",
  },
  logoDot: {
    alignItems: "center",
    background: "linear-gradient(135deg, #38bdf8, #ec4899)",
    borderRadius: "50%",
    color: "#020617",
    display: "flex",
    fontWeight: "900",
    height: "28px",
    justifyContent: "center",
    width: "28px",
  },
  profileCard: {
    background: "rgba(15, 23, 42, 0.86)",
    border: "1px solid rgba(255, 255, 255, 0.12)",
    borderRadius: "28px",
    overflow: "hidden",
    paddingBottom: "18px",
    position: "relative",
  },
  profileImage: {
    alignItems: "center",
    color: "#ffffff",
    display: "flex",
    fontSize: "86px",
    fontWeight: "900",
    height: "260px",
    justifyContent: "center",
  },
  matchBadge: {
    background: "rgba(2, 6, 23, 0.74)",
    border: "1px solid rgba(255, 255, 255, 0.16)",
    borderRadius: "999px",
    color: "#86efac",
    fontSize: "13px",
    fontWeight: "800",
    padding: "8px 12px",
    position: "absolute",
    right: "16px",
    top: "16px",
  },
  profileName: {
    color: "#ffffff",
    fontSize: "26px",
    margin: "18px 18px 4px",
  },
  playerMeta: {
    color: "#cbd5e1",
    lineHeight: "1.5",
    margin: "0 18px 14px",
  },
  tagRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    margin: "0 18px",
  },
  tagPill: {
    background: "rgba(255, 255, 255, 0.07)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "999px",
    color: "#e5e7eb",
    fontSize: "12px",
    fontWeight: "700",
    padding: "7px 10px",
  },
  actionRow: {
    display: "flex",
    gap: "16px",
    justifyContent: "center",
    paddingTop: "18px",
  },
  rejectButton: {
    ...buttonBase,
    color: "#f87171",
  },
  codeButton: {
    ...buttonBase,
    color: "#a78bfa",
  },
  likeButton: {
    ...buttonBase,
    background: "linear-gradient(135deg, #38bdf8, #ec4899)",
    color: "#ffffff",
  },
  challengePanel: {
    background: "rgba(15, 23, 42, 0.78)",
    border: "1px solid rgba(148, 163, 184, 0.22)",
    borderRadius: "18px",
    padding: "20px",
  },
  demoLabel: {
    color: "#93c5fd",
    display: "block",
    fontSize: "13px",
    fontWeight: "700",
    letterSpacing: "1px",
    marginBottom: "10px",
    textTransform: "uppercase",
  },
  challengeTitle: {
    color: "#ffffff",
    fontSize: "24px",
    marginTop: "0",
  },
  codeBlock: {
    background: "#020617",
    border: "1px solid rgba(148, 163, 184, 0.28)",
    borderRadius: "14px",
    color: "#bae6fd",
    fontFamily: "SFMono-Regular, Consolas, 'Liberation Mono', monospace",
    padding: "16px",
    whiteSpace: "pre-wrap",
  },
  demoButton: {
    background: "#38bdf8",
    border: "none",
    borderRadius: "999px",
    color: "#020617",
    cursor: "pointer",
    fontWeight: "800",
    marginTop: "8px",
    padding: "12px 18px",
  },
  resultBox: {
    background: "rgba(2, 6, 23, 0.64)",
    border: "1px solid rgba(148, 163, 184, 0.22)",
    borderRadius: "14px",
    color: "#cbd5e1",
    marginTop: "18px",
    padding: "16px",
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

export const Head = () => <title>GitLove | Alexander Zirilli</title>

export default GitLovePage
