import { Link } from "react-router-dom";

// A made-up address shows this instead of the home page.
export default function WeincNotFoundPage() {
  return (
    <main
      data-weinc-not-found
      style={{ minHeight: "70vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, padding: "120px 24px 64px", textAlign: "center" }}
    >
      <p style={{ margin: 0, fontSize: 14, letterSpacing: "0.12em", opacity: 0.6 }}>404</p>
      <h1 style={{ margin: 0, fontSize: "clamp(28px, 5vw, 44px)", lineHeight: 1.1 }}>Page not found</h1>
      <p style={{ margin: 0, maxWidth: 420, opacity: 0.75 }}>This page does not exist. It may have moved, or the address may be mistyped.</p>
      <Link to="/" style={{ marginTop: 8, textDecoration: "underline", textUnderlineOffset: 4 }}>
        Back to the home page
      </Link>
    </main>
  );
}
