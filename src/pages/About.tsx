import Navbar from "../components/Navbar";
import About from "../components/About";
import Stats from "../components/Stats";
import Testimonials from "../components/Testimonials";
import Booking from "../components/Booking";
import Footer from "../components/Footer";

export default function AboutPage() {
  return (
    <div className="cosmic page-top-offset">
      <Navbar />
      <main>
        <About />
        <Stats />
        <Testimonials />
        <Booking />
      </main>
      <Footer />
    </div>
  );
}
