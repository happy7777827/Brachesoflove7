import Navbar from "../components/Navbar";
import Booking from "../components/Booking";
import Footer from "../components/Footer";

export default function ContactPage() {
  return (
    <div className="cosmic page-top-offset">
      <Navbar />
      <main>
        <Booking />
      </main>
      <Footer />
    </div>
  );
}
