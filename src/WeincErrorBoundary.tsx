import { Component, type ErrorInfo, type ReactNode } from "react";

// Added by WeInc: a crash shows this message instead of a blank page, and is
// reported so it can be fixed. Safe to restyle; keep the report call.
type Reporter = (kind: string, message: string, stack?: string) => void;

export default class WeincErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    try {
      const report = (window as unknown as { __weincReportError?: Reporter }).__weincReportError;
      if (typeof report === "function") {
        report("boundary", String(error?.message || error), [error?.stack, info?.componentStack].filter(Boolean).join("\n"));
      }
    } catch {
      /* reporting must never break the fallback */
    }
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <main
        data-weinc-error
        style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, padding: 24, textAlign: "center", fontFamily: "system-ui, sans-serif" }}
      >
        <h1 style={{ margin: 0, fontSize: 28 }}>Something went wrong</h1>
        <p style={{ margin: 0, maxWidth: 420, opacity: 0.75 }}>This page hit a problem while loading. Please try again.</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          style={{ padding: "10px 20px", borderRadius: 8, border: "1px solid currentColor", background: "transparent", color: "inherit", cursor: "pointer", fontSize: 16 }}
        >
          Reload the page
        </button>
      </main>
    );
  }
}
