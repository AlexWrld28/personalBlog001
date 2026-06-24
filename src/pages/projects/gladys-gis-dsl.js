import * as React from "react"
import { Link } from "gatsby"

const defaultProgram = `let origin = point(0.0, 0.0);
let nyc = point(-73.9857, 40.7484);
let proximity = distance(origin, nyc);

print(nyc);
print(proximity);`

const formatPoint = point => `point(${point.x}, ${point.y})`

const runGladysDemo = source => {
  const variables = {}
  const output = []
  const lines = source
    .split("\n")
    .map(line => line.trim())
    .filter(Boolean)

  const evaluateExpression = expression => {
    const cleanExpression = expression.replace(/;$/, "").trim()
    const pointMatch = cleanExpression.match(
      /^point\((-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)\)$/
    )

    if (pointMatch) {
      return {
        type: "point",
        x: Number(pointMatch[1]),
        y: Number(pointMatch[2]),
      }
    }

    const distanceMatch = cleanExpression.match(/^distance\((.+),\s*(.+)\)$/)

    if (distanceMatch) {
      const left = evaluateExpression(distanceMatch[1])
      const right = evaluateExpression(distanceMatch[2])

      if (left.type !== "point" || right.type !== "point") {
        throw new Error("distance() expects two points")
      }

      return {
        type: "number",
        value: Math.hypot(right.x - left.x, right.y - left.y),
      }
    }

    if (variables[cleanExpression]) {
      return variables[cleanExpression]
    }

    if (/^-?\d+(?:\.\d+)?$/.test(cleanExpression)) {
      return { type: "number", value: Number(cleanExpression) }
    }

    throw new Error(`Unknown expression: ${cleanExpression}`)
  }

  for (const line of lines) {
    const declarationMatch = line.match(/^let\s+(\w+)\s*=\s*(.+);$/)
    const printMatch = line.match(/^print\(?(.+?)\)?;$/)

    if (declarationMatch) {
      const [, name, expression] = declarationMatch
      variables[name] = evaluateExpression(expression)
    } else if (printMatch) {
      const value = evaluateExpression(printMatch[1])
      output.push(
        value.type === "point" ? formatPoint(value) : value.value.toFixed(4)
      )
    } else {
      throw new Error(`Could not parse line: ${line}`)
    }
  }

  return output.join("\n") || "Program ran without printed output."
}

const GladysDemo = () => {
  const [program, setProgram] = React.useState(defaultProgram)
  const [result, setResult] = React.useState(() => runGladysDemo(defaultProgram))

  const runProgram = () => {
    try {
      setResult(runGladysDemo(program))
    } catch (error) {
      setResult(`Error: ${error.message}`)
    }
  }

  return (
    <section style={styles.demoPanel}>
      <div>
        <h2 style={styles.sectionTitle}>Try a tiny GLADYS program</h2>
        <p style={styles.demoText}>
          This browser demo recreates the core idea from the repo: declare
          points, calculate distance, and print spatial values.
        </p>
      </div>

      <div style={styles.demoGrid}>
        <div>
          <label style={styles.demoLabel} htmlFor="gladys-program">
            GLADYS input
          </label>
          <textarea
            id="gladys-program"
            value={program}
            onChange={event => setProgram(event.target.value)}
            style={styles.codeEditor}
          />
          <button onClick={runProgram} style={styles.demoButton}>
            Run demo
          </button>
        </div>

        <div>
          <p style={styles.demoLabel}>Output</p>
          <pre style={styles.outputBox}>{result}</pre>
        </div>
      </div>
    </section>
  )
}

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
        A geography-oriented programming language that supports point literals,
        variable declarations, print statements, and distance calculations
        between spatial coordinates. GLADYS is the language-layer counterpart to
        BAAL: it gives the spatial ideas behind stadium lookup and proximity
        logic a compact syntax.
      </p>

      <a
        href="https://github.com/AlexWrld28/GLADYS"
        target="_blank"
        rel="noreferrer"
        style={styles.repoLink}
      >
        View GLADYS on GitHub →
      </a>

      <GladysDemo />

      <section style={styles.connectionPanel}>
        <p style={styles.connectionEyebrow}>Connected system</p>
        <h2 style={styles.sectionTitle}>How GLADYS supports BAAL</h2>
        <p style={styles.demoText}>
          BAAL works with stadium coordinates, team locations, and map-based
          lookup. GLADYS expresses that same spatial reasoning as language: a
          stadium can become a <code>point(x, y)</code>, and distance or
          proximity checks can become readable commands instead of buried app
          logic.
        </p>
        <ul style={styles.list}>
          <li>GLADYS can describe stadium coordinates used by BAAL maps.</li>
          <li>Its <code>distance()</code> operation mirrors proximity checks between teams, stadiums, or user locations.</li>
          <li>The long-term idea is for BAAL-style GIS workflows to be scriptable through GLADYS commands.</li>
        </ul>
        <Link to="/projects/sports-data-prediction-project/" style={styles.inlineLink}>
          See the BAAL college football demo →
        </Link>
      </section>

      <section>
        <h2 style={styles.sectionTitle}>Highlights</h2>
        <ul style={styles.list}>
          <li>Implements compiler fundamentals including lexing and parsing.</li>
          <li>Produces structured token stream and AST output.</li>
          <li>
            Adds GIS-style language features like <code>point(x, y)</code> and
            <code> distance(left, right)</code>.
          </li>
          <li>
            Handles integer, floating-point, and negative coordinate values for
            spatial expressions.
          </li>
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
    marginBottom: "20px",
  },
  repoLink: {
    color: "#020617",
    background: "#38bdf8",
    borderRadius: "999px",
    display: "inline-block",
    fontWeight: "700",
    marginBottom: "32px",
    padding: "12px 18px",
    textDecoration: "none",
  },
  demoPanel: {
    background: "rgba(2, 6, 23, 0.52)",
    border: "1px solid rgba(56, 189, 248, 0.26)",
    borderRadius: "20px",
    marginBottom: "34px",
    padding: "24px",
  },
  connectionPanel: {
    background: "rgba(56, 189, 248, 0.08)",
    border: "1px solid rgba(56, 189, 248, 0.28)",
    borderRadius: "20px",
    marginBottom: "34px",
    padding: "24px",
  },
  connectionEyebrow: {
    color: "#38bdf8",
    fontSize: "13px",
    fontWeight: "800",
    letterSpacing: "1px",
    marginBottom: "8px",
    textTransform: "uppercase",
  },
  inlineLink: {
    color: "#38bdf8",
    display: "inline-block",
    fontWeight: "800",
    marginTop: "12px",
    textDecoration: "none",
  },
  demoText: {
    color: "#cbd5e1",
    lineHeight: "1.6",
    marginTop: "0",
  },
  demoGrid: {
    display: "grid",
    gap: "18px",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
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
  codeEditor: {
    background: "#020617",
    border: "1px solid rgba(148, 163, 184, 0.28)",
    borderRadius: "14px",
    color: "#e5e7eb",
    fontFamily: "SFMono-Regular, Consolas, 'Liberation Mono', monospace",
    fontSize: "14px",
    minHeight: "220px",
    padding: "16px",
    resize: "vertical",
    width: "100%",
  },
  demoButton: {
    background: "#38bdf8",
    border: "none",
    borderRadius: "999px",
    color: "#020617",
    cursor: "pointer",
    fontWeight: "800",
    marginTop: "14px",
    padding: "12px 18px",
  },
  outputBox: {
    background: "#020617",
    border: "1px solid rgba(148, 163, 184, 0.28)",
    borderRadius: "14px",
    color: "#bae6fd",
    fontFamily: "SFMono-Regular, Consolas, 'Liberation Mono', monospace",
    minHeight: "220px",
    margin: "0",
    padding: "16px",
    whiteSpace: "pre-wrap",
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
