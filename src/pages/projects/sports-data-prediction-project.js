import * as React from "react"
import { Link } from "gatsby"

const statCategories = ["passing", "rushing", "receiving", "defensive"]

const architectureCards = [
  {
    name: "CollegeFootballClient",
    detail: "Owns CFBD player search and weekly stat lookup, using CFBD_API_KEY from the environment.",
  },
  {
    name: "CsvTeamRepository",
    detail: "Loads stadium and logo CSV files, then resolves team profiles without tying data parsing to the UI.",
  },
  {
    name: "ImageService",
    detail: "Finds player images, validates image dimensions, and prepares team logos for display.",
  },
  {
    name: "MapRenderer",
    detail: "Builds default and team-specific Folium maps with stadium popups.",
  },
  {
    name: "PlayerSearchApp",
    detail: "Owns the PyQt widgets, user actions, and screen updates.",
  },
]

const demoPlayers = [
  {
    name: "Jordan Travis",
    team: "Florida State",
    position: "QB",
    color: "#782f40",
    accent: "#ceb888",
    stadium: "Doak Campbell Stadium",
    location: "Tallahassee, FL",
    capacity: "79,560",
    statLine: "Passing: 275 yards • 3 TD",
    week: 4,
    year: 2023,
    mascot: "Seminoles",
    conference: "ACC",
    division: "FBS",
    note:
      "A sample quarterback lookup showing how BAAL combines player data, team identity, and stadium context.",
    latitude: 30.43754758,
    longitude: -84.30453398,
    built: "1950",
    expanded: "2003",
  },
  {
    name: "Marvin Harrison Jr.",
    team: "Ohio State",
    position: "WR",
    color: "#bb0000",
    accent: "#a7b1b7",
    stadium: "Ohio Stadium",
    location: "Columbus, OH",
    capacity: "102,780",
    statLine: "Receiving: 126 yards • 2 TD",
    week: 8,
    year: 2023,
    mascot: "Buckeyes",
    conference: "Big Ten",
    division: "FBS",
    note:
      "The original desktop app supports different stat categories, player lookup results, and team color styling.",
    latitude: 40.00168569,
    longitude: -83.01972806,
    built: "1922",
    expanded: "2014",
  },
  {
    name: "Blake Corum",
    team: "Michigan",
    position: "RB",
    color: "#00274c",
    accent: "#ffcb05",
    stadium: "Michigan Stadium",
    location: "Ann Arbor, MI",
    capacity: "107,601",
    statLine: "Rushing: 145 yards • 2 TD",
    week: 11,
    year: 2023,
    mascot: "Wolverines",
    conference: "Big Ten",
    division: "FBS",
    note:
      "This web version uses sample data to recreate the feel of the PyQt/Folium workflow safely in the browser.",
    latitude: 42.26586873,
    longitude: -83.74872565,
    built: "1927",
    expanded: "2015",
  },
]

const buildLeafletMapHtml = player => {
  const abbr = player.team.slice(0, 2).toUpperCase()

  return [
    "<!doctype html>",
    "<html>",
    "<head>",
    "<meta charset='utf-8' />",
    "<meta name='viewport' content='width=device-width, initial-scale=1' />",
    "<link rel='stylesheet' href='https://unpkg.com/leaflet@1.9.4/dist/leaflet.css' />",
    "<script src='https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'></script>",
    "<style>",
    "html, body, #map { height: 100%; margin: 0; } body { background: #020617; }",
    `.badge { align-items: center; background: ${player.color}; border: 3px solid ${player.accent}; border-radius: 999px; color: ${player.accent}; display: flex; font: 900 16px system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; height: 42px; justify-content: center; width: 42px; box-shadow: 0 12px 30px rgba(2, 6, 23, 0.45); }`,
    ".leaflet-popup-content-wrapper { background: #0f172a; color: #e5e7eb; border: 1px solid rgba(148, 163, 184, 0.35); border-radius: 14px; }",
    ".leaflet-popup-tip { background: #0f172a; } .popup-title { color: #fff; font-weight: 800; margin-bottom: 6px; } .popup-meta { color: #cbd5e1; line-height: 1.45; }",
    "</style>",
    "</head>",
    "<body>",
    "<div id='map'></div>",
    "<script>",
    `const map = L.map('map', { zoomControl: true }).setView([${player.latitude}, ${player.longitude}], 16);`,
    "L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '&copy; OpenStreetMap contributors' }).addTo(map);",
    `const icon = L.divIcon({ className: '', html: '<div class=\"badge\">${abbr}</div>', iconSize: [48, 48], iconAnchor: [24, 24] });`,
    `const popup = '<div class=\"popup-title\">${player.team}</div><div class=\"popup-meta\"><strong>${player.stadium}</strong><br />${player.location}<br />Capacity: ${player.capacity}<br />Built: ${player.built}<br />Last expanded: ${player.expanded}</div>';`,
    `L.marker([${player.latitude}, ${player.longitude}], { icon }).addTo(map).bindPopup(popup).openPopup();`,
    `L.circle([${player.latitude}, ${player.longitude}], { radius: 220, color: '${player.accent}', fillColor: '${player.color}', fillOpacity: 0.16, weight: 2 }).addTo(map);`,
    "</script>",
    "</body>",
    "</html>",
  ].join("\n")
}

const BaalDemo = () => {
  const [selectedPlayerName, setSelectedPlayerName] = React.useState(
    demoPlayers[0].name
  )
  const [selectedCategory, setSelectedCategory] = React.useState("passing")
  const [selectedYear, setSelectedYear] = React.useState("2026")
  const selectedPlayer = demoPlayers.find(
    player => player.name === selectedPlayerName
  )

  return (
    <section style={styles.demoPanel}>
      <div>
        <h2 style={styles.sectionTitle}>BAAL-style interactive demo</h2>
        <p style={styles.demoText}>
          The latest BAALproject refactor separates API calls, CSV team lookup,
          image fetching, Folium map rendering, and PyQt event handling into
          dedicated classes. This browser demo mirrors that flow with sample
          data so visitors can feel how the desktop app behaves.
        </p>
      </div>

      <div style={styles.statusStrip}>
        <span style={styles.statusPill}>CFBD_API_KEY driven</span>
        <span style={styles.statusPill}>SOLID-oriented services</span>
        <span style={styles.statusPill}>requirements.txt setup</span>
      </div>

      <div style={styles.architectureGrid}>
        {architectureCards.map(card => (
          <div key={card.name} style={styles.architectureCard}>
            <strong>{card.name}</strong>
            <p>{card.detail}</p>
          </div>
        ))}
      </div>

      <div style={styles.demoShell}>
        <div style={styles.searchPanel}>
          <label style={styles.demoLabel} htmlFor="player-select">
            Player search
          </label>
          <select
            id="player-select"
            value={selectedPlayerName}
            onChange={event => setSelectedPlayerName(event.target.value)}
            style={styles.select}
          >
            {demoPlayers.map(player => (
              <option key={player.name} value={player.name}>
                {player.name}
              </option>
            ))}
          </select>

          <div style={styles.inlineControls}>
            <label style={styles.smallControl}>
              Year
              <select
                value={selectedYear}
                onChange={event => setSelectedYear(event.target.value)}
                style={styles.select}
              >
                {["2026", "2025", "2024", "2023", "2022"].map(year => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </label>
            <label style={styles.smallControl}>
              Stat type
              <select
                value={selectedCategory}
                onChange={event => setSelectedCategory(event.target.value)}
                style={styles.select}
              >
                {statCategories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div
            style={{
              ...styles.playerCard,
              borderColor: selectedPlayer.accent,
              boxShadow: `0 18px 60px ${selectedPlayer.color}55`,
            }}
          >
            <div
              style={{
                ...styles.teamBadge,
                background: selectedPlayer.color,
                color: selectedPlayer.accent,
              }}
            >
              {selectedPlayer.team.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h3 style={styles.playerName}>{selectedPlayer.name}</h3>
              <p style={styles.playerMeta}>
                {selectedPlayer.position} • {selectedPlayer.team} {selectedPlayer.mascot}
              </p>
            </div>
          </div>

          <table style={styles.dataTable}>
            <tbody>
              <tr>
                <th style={styles.tableHeader}>API mode</th>
                <td style={styles.tableCell}>
                  Reads CFBD_API_KEY from environment before live searches.
                </td>
              </tr>
              <tr>
                <th style={styles.tableHeader}>Weekly stat</th>
                <td style={styles.tableCell}>
                  {selectedCategory}: {selectedPlayer.statLine} • Week {selectedPlayer.week} • {selectedYear}
                </td>
              </tr>
              <tr>
                <th style={styles.tableHeader}>Team profile</th>
                <td style={styles.tableCell}>
                  {selectedPlayer.conference} • {selectedPlayer.division} • logo + stadium CSV lookup
                </td>
              </tr>
              <tr>
                <th style={styles.tableHeader}>Clear/reset</th>
                <td style={styles.tableCell}>
                  Resets player tables, images, colors, and the default Folium map.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={styles.mapPanel}>
          <p style={styles.demoLabel}>Folium stadium preview</p>
          <iframe
            key={selectedPlayer.name}
            srcDoc={buildLeafletMapHtml(selectedPlayer)}
            title={`${selectedPlayer.stadium} map`}
            style={styles.mapFrame}
          />
          <h3 style={styles.stadiumTitle}>{selectedPlayer.stadium}</h3>
          <p style={styles.playerMeta}>
            {selectedPlayer.location} • capacity {selectedPlayer.capacity}
          </p>
          <p style={styles.demoText}>
            This iframe uses the same export pattern as BAAL's Folium map: a
            Leaflet HTML document with an OpenStreetMap tile layer, marker,
            radius overlay, and stadium popup. {selectedPlayer.note}
          </p>
        </div>
      </div>
    </section>
  )
}

const SportsDataPredictionProjectPage = () => (
  <main style={styles.page}>
    <article style={styles.card}>
      <Link to="/" style={styles.backLink}>
        Back to resume
      </Link>
      <p style={styles.eyebrow}>Project Details</p>
      <h1 style={styles.title}>Sports Data Prediction Project</h1>
      <p style={styles.tech}>Python, PyQt5, CFBD API, Folium, GIS Mapping</p>
      <p style={styles.description}>
        BAALproject is now a refactored college-football desktop application for
        searching players, viewing team and stadium data, rendering Folium maps,
        and looking up weekly stat lines through the College Football Data API.
        It is also the applied project that gives GLADYS a real-world target: a
        sports-and-GIS workflow where locations, stadiums, and distances matter.
      </p>

      <a
        href="https://github.com/AlexWrld28/BAALproject"
        target="_blank"
        rel="noreferrer"
        style={styles.repoLink}
      >
        View BAALproject on GitHub →
      </a>

      <BaalDemo />

      <section style={styles.connectionPanel}>
        <p style={styles.connectionEyebrow}>Connected system</p>
        <h2 style={styles.sectionTitle}>How BAAL implements GLADYS ideas</h2>
        <p style={styles.demoText}>
          BAAL is the practical surface area for GLADYS-style spatial logic. The
          app already loads stadium coordinates, resolves team profiles, renders
          maps, and connects sports records to geography. GLADYS is the next
          layer: a small language that can eventually script those geospatial
          operations in a readable way.
        </p>
        <ul style={styles.list}>
          <li>BAAL's stadium CSV rows map naturally to GLADYS <code>point(x, y)</code> values.</li>
          <li>BAAL's map and team lookup workflows are examples of the spatial domain GLADYS is designed for.</li>
          <li>A future bridge could let BAAL run GLADYS scripts for distance checks, route logic, or custom stadium queries.</li>
        </ul>
        <Link to="/projects/gladys-gis-dsl/" style={styles.inlineLink}>
          See the GLADYS language demo →
        </Link>
      </section>

      <section>
        <h2 style={styles.sectionTitle}>Highlights</h2>
        <ul style={styles.list}>
          <li>
            Uses a <code>CollegeFootballClient</code> wrapper for CFBD player
            search and weekly stat lookup.
          </li>
          <li>
            Reads the API key from <code>CFBD_API_KEY</code> instead of hardcoding
            credentials in the app.
          </li>
          <li>
            Separates CSV team data, image fetching, map rendering, and PyQt UI
            behavior into dedicated classes.
          </li>
          <li>
            Adds team logos, player images, stadium popups, team-color styling,
            and a clean reset flow.
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
  },
  statusStrip: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginBottom: "18px",
  },
  statusPill: {
    background: "rgba(56, 189, 248, 0.12)",
    border: "1px solid rgba(56, 189, 248, 0.34)",
    borderRadius: "999px",
    color: "#bae6fd",
    fontSize: "13px",
    fontWeight: "700",
    padding: "8px 12px",
  },
  architectureGrid: {
    display: "grid",
    gap: "12px",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    marginBottom: "20px",
  },
  architectureCard: {
    background: "rgba(15, 23, 42, 0.72)",
    border: "1px solid rgba(148, 163, 184, 0.2)",
    borderRadius: "14px",
    color: "#cbd5e1",
    padding: "14px",
  },
  demoShell: {
    display: "grid",
    gap: "18px",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  },
  searchPanel: {
    background: "rgba(15, 23, 42, 0.78)",
    border: "1px solid rgba(148, 163, 184, 0.22)",
    borderRadius: "18px",
    padding: "18px",
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
  select: {
    background: "#020617",
    border: "1px solid rgba(148, 163, 184, 0.34)",
    borderRadius: "12px",
    color: "#e5e7eb",
    marginBottom: "16px",
    padding: "12px",
    width: "100%",
  },
  inlineControls: {
    display: "grid",
    gap: "12px",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  },
  smallControl: {
    color: "#93c5fd",
    fontSize: "13px",
    fontWeight: "700",
  },
  playerCard: {
    alignItems: "center",
    background: "rgba(2, 6, 23, 0.64)",
    border: "2px solid",
    borderRadius: "18px",
    display: "flex",
    gap: "14px",
    marginBottom: "16px",
    padding: "16px",
  },
  teamBadge: {
    alignItems: "center",
    borderRadius: "50%",
    display: "flex",
    fontSize: "22px",
    fontWeight: "900",
    height: "64px",
    justifyContent: "center",
    width: "64px",
  },
  playerName: {
    color: "#ffffff",
    margin: "0 0 4px",
  },
  playerMeta: {
    color: "#cbd5e1",
    lineHeight: "1.5",
    margin: "0",
  },
  dataTable: {
    borderCollapse: "collapse",
    width: "100%",
  },
  tableHeader: {
    color: "#93c5fd",
    padding: "10px 8px",
    textAlign: "left",
    verticalAlign: "top",
    width: "34%",
  },
  tableCell: {
    borderTop: "1px solid rgba(148, 163, 184, 0.18)",
    color: "#e5e7eb",
    padding: "10px 8px",
  },
  mapPanel: {
    background: "rgba(15, 23, 42, 0.78)",
    border: "1px solid rgba(148, 163, 184, 0.22)",
    borderRadius: "18px",
    padding: "18px",
  },
  mapFrame: {
    border: "1px solid rgba(148, 163, 184, 0.24)",
    borderRadius: "16px",
    height: "260px",
    marginBottom: "16px",
    overflow: "hidden",
    width: "100%",
  },
  stadiumTitle: {
    color: "#ffffff",
    marginBottom: "6px",
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

export const Head = () => (
  <title>Sports Data Prediction Project | Alexander Zirilli</title>
)

export default SportsDataPredictionProjectPage
