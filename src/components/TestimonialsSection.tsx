const testimonials = [
  {
    quote:
      "We've been relying on Metal Supermarkets for over a decade. Same-day cut-to-size service has saved us on countless tight-deadline jobs.",
    author: "Mike R.",
    role: "Fabrication Shop Owner",
  },
  {
    quote:
      "Best place to get small quantities of exotic alloys. Had Ti-6Al-4V in stock when no one else did. Staff actually knows their metallurgy.",
    author: "Sarah K.",
    role: "Aerospace Engineer",
  },
  {
    quote:
      "Ordered 6061 aluminum plate at 8am, picked it up cut to spec by 10am. Can't beat that turnaround anywhere.",
    author: "Carlos M.",
    role: "Machine Shop Manager",
  },
  {
    quote:
      "No minimums is a game-changer for prototype work. I can order exactly two pieces of 316 stainless and they treat me like a major account.",
    author: "Jen T.",
    role: "Product Designer",
  },
  {
    quote:
      "The Hollywood film industry runs on Metal Supermarkets. Props, set builds, rigging — they always have what we need, cut the way we need it.",
    author: "Dave L.",
    role: "Set Construction Lead",
  },
  {
    quote:
      "We source all our special alloys here. The consistency and availability of stock is unmatched. Our production line hasn't stopped in 3 years because of them.",
    author: "Priya S.",
    role: "Manufacturing Director",
  },
];

const trustStats = [
  "2,000+ Five-Star Reviews",
  "40+ Years in Business",
  "Trusted by Fortune 500",
];

export default function TestimonialsSection() {
  return (
    <section className="testimonials-section">
      <div className="container">
        {/* Header */}
        <div className="testimonials-header reveal">
          <span className="section-label">Customer Stories</span>
          <div className="divider" />
          <h2 className="display-lg testimonials-title">
            Trusted by Makers,<br />
            Builders &amp; Engineers
          </h2>
        </div>

        {/* Grid */}
        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <blockquote
              key={t.author}
              className={`testimonial-card reveal delay-${Math.min(i + 1, 6)}`}
            >
              {/* Stars */}
              <div className="testimonial-stars" aria-label="5 out of 5 stars">
                {"★★★★★"}
              </div>

              {/* Quote */}
              <p className="testimonial-quote">"{t.quote}"</p>

              {/* Author */}
              <footer className="testimonial-footer">
                <span className="testimonial-author">{t.author}</span>
                <span className="testimonial-role">{t.role}</span>
              </footer>
            </blockquote>
          ))}
        </div>

        {/* Trust bar */}
        <div className="testimonials-trust reveal">
          {trustStats.map((stat, i) => (
            <span key={stat} className="testimonials-trust-row">
              <span className="trust-stat">{stat}</span>
              {i < trustStats.length - 1 && (
                <span className="trust-divider" aria-hidden="true">|</span>
              )}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        .testimonials-section {
          padding: var(--section-pad) 0;
          background: var(--surface-1);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          position: relative;
          overflow: hidden;
        }

        .testimonials-section::before {
          content: '';
          position: absolute;
          top: -1px; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(to right, transparent, var(--blue), transparent);
        }

        .testimonials-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin-bottom: 48px;
        }

        .testimonials-title {
          text-align: center;
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
          margin-bottom: 48px;
        }

        @media (max-width: 1024px) {
          .testimonials-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 640px) {
          .testimonials-grid { grid-template-columns: 1fr; }
        }

        .testimonial-card {
          background: var(--surface-2);
          border: 1px solid var(--border);
          border-left: 2px solid transparent;
          padding: 32px;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0;
          transition: border-left-color 0.25s var(--ease), transform 0.25s var(--ease), background 0.25s;
          cursor: default;
        }

        .testimonial-card:hover {
          border-left-color: var(--blue);
          transform: translateX(4px);
          background: var(--surface-3);
        }

        .testimonial-stars {
          font-size: 14px;
          letter-spacing: 2px;
          color: var(--blue-light);
          margin-bottom: 0;
        }

        .testimonial-quote {
          font-family: var(--font-light);
          font-size: 14px;
          font-style: italic;
          color: var(--text-secondary);
          line-height: 1.7;
          margin: 16px 0;
          flex: 1;
        }

        .testimonial-footer {
          display: flex;
          flex-direction: column;
          gap: 3px;
          padding-top: 16px;
          border-top: 1px solid var(--border);
        }

        .testimonial-author {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 13px;
          color: var(--text-primary);
          letter-spacing: 0.05em;
        }

        .testimonial-role {
          font-family: var(--font-display);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-muted);
        }

        /* Trust bar */
        .testimonials-trust {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 0;
          padding: 24px 0 0;
          border-top: 1px solid var(--border);
        }

        .testimonials-trust-row {
          display: flex;
          align-items: center;
        }

        .trust-stat {
          font-family: var(--font-display);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--text-muted);
          padding: 0 20px;
          transition: color 0.2s;
        }

        .trust-stat:hover {
          color: var(--text-secondary);
        }

        .trust-divider {
          font-family: var(--font-display);
          font-size: 16px;
          color: var(--border-light);
          user-select: none;
        }

        @media (max-width: 640px) {
          .trust-divider { display: none; }
          .trust-stat { padding: 8px 12px; }
        }
      `}</style>
    </section>
  );
}
