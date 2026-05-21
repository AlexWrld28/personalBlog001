import * as React from "react"
import { Link } from "gatsby"
import * as styles from "../resume.module.css"

const ProjectOnePage = () => (
  <main className={styles.page}>
    <article className={styles.resume}>
      <Link className={styles.backLink} to="/">
        Back to resume
      </Link>

      <header className={styles.projectHeader}>
        <p className={styles.sectionTitle}>Project Details</p>
        <h1 className={styles.name}>Project One</h1>
        <p className={styles.role}>React, Node.js, PostgreSQL, Azure</p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Overview</h2>
        <p>
          Built a full-stack web app with user authentication, dashboard
          analytics, and cloud deployment.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Highlights</h2>
        <ul className={styles.entryList}>
          <li>Designed protected user flows for sign in and account access.</li>
          <li>Created dashboard views for tracking and comparing key metrics.</li>
          <li>Deployed the application to Azure with a production-ready setup.</li>
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
    <title>Project One | Your Name</title>
    <meta name="description" content="More information about Project One." />
  </>
)

export default ProjectOnePage
