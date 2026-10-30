import { content } from "../content";
import { useReveal } from "../useReveal";

export default function Booking() {
  const { booking } = content;
  const ref = useReveal<HTMLElement>();

  return (
    <section className="booking cosmic" ref={ref} aria-label="Gathering">
      <div className="booking-inner liquid-glass-strong">
        <h2 className="reveal">{booking.heading}</h2>
        <p className="section-sub reveal">{booking.subhead}</p>
        <a
          href={booking.ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          className="cta-primary liquid-glass-strong reveal"
        >
          {booking.ctaLabel}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M7 17L17 7" />
            <path d="M7 7h10v10" />
          </svg>
        </a>
      </div>
    </section>
  );
}
