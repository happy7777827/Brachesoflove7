import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function WeincNotFoundPage() {
  return (
    <div className="cosmic page-top-offset">
      <Navbar />
      <main className="section">
        <div className="section-head">
          <h1 className="section-title">Page Not Found</h1>
          <p className="section-sub">The page you are looking for does not exist or has moved.</p>
          <Link to="/" className="cta-primary liquid-glass-strong" style={{ marginTop: "1rem" }}>
            Return Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
