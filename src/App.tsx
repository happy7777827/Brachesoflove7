import "./index.css";
import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Experiences from "./components/Experiences";
import About from "./components/About";
import Destinations from "./components/Destinations";
import Journey from "./components/Journey";
import Stats from "./components/Stats";
import Testimonials from "./components/Testimonials";
import Booking from "./components/Booking";
import Footer from "./components/Footer";
import AboutPage from "./pages/About";
import ContactPage from "./pages/Contact";
import BlogIndexPage from "./pages/BlogIndex";
import BlogPostPage from "./pages/BlogPost";
import PrivacyPage from "./pages/Privacy";
import TermsPage from "./pages/Terms";
import LegalBar from "./components/LegalBar";
import WeincNotFoundPage from "./pages/WeincNotFound";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Experiences />
      <About />
      <Destinations />
      <Journey />
      <Stats />
      <Testimonials />
      <Booking />
      <Footer />
    </>
  );
}

function FloatingChatButton() {
  const location = useLocation();
  const [onHeroLanding, setOnHeroLanding] = useState(location.pathname === "/");

  useEffect(() => {
    const checkScroll = () => {
      if (location.pathname !== "/") {
        setOnHeroLanding(false);
        return;
      }
      const heroEl = document.querySelector(".hero");
      const threshold = heroEl
        ? heroEl.getBoundingClientRect().height * 0.75
        : window.innerHeight * 0.75;
      setOnHeroLanding(window.scrollY < threshold);
    };

    checkScroll();
    window.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [location.pathname]);

  return (
    <a
      href="https://wa.me/919137498192"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className={`floating-wa-btn${onHeroLanding ? " on-hero-landing" : ""}`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z" />
      </svg>
    </a>
  );
}

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/blog" element={<BlogIndexPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="*" element={<WeincNotFoundPage />} />
      </Routes>
      <LegalBar />
      <FloatingChatButton />
    </>
  );
}
