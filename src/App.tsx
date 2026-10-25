import "./index.css";
import { Routes, Route } from "react-router-dom";
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
    </>
  );
}
