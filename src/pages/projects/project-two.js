import * as React from "react"
import { Link } from "gatsby"
import * as styles from "../resume.module.css"

const ProjectTwoPage = () => (
  <main className={styles.page}>
    <article className={styles.resume}>
      <Link className={styles.backLink} to="/">
        Back to resume
      </Link>

      <header className={styles.projectHeader}>
        <p className={styles.sectionTitle}>Project Details</p>
        <h1 className={styles.name}>Project Two</h1>
        <p className={styles.role}>TypeScript, Next.js, Prisma, Tailwind CSS</p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Overview</h2>
        <p>
          Created a personal finance tracker with budget alerts, categorized
          transactions, and a responsive UI.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Highlights</h2>
        <ul className={styles.entryList}>
          <li>Built budget tracking views for monthly spending goals.</li>
          <li>Added categorized transactions to make spending patterns clearer.</li>
          <li>Designed responsive layouts for desktop and mobile use.</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>More Info</h2>
        <p>
          Add screenshots, live demo links, repository links, architecture notes,
          or measurable results here.
        </p>
      </section>
    </article>
  </main>
)

export const Head = () => (
  <>
    <title>Project Two | Your Name</title>
    <meta name="description" content="More information about Project Two." />
  </>
)

export default ProjectTwoPage
