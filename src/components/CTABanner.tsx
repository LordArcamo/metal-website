import { ArrowRight, MapPin, Phone } from "lucide-react";

interface CTABannerProps {
  variant?: "quote" | "locations";
}

export default function CTABanner({ variant = "quote" }: CTABannerProps) {
  return (
    <section className="cta-section">
      <div className="cta-bg" aria-hidden="true">
        <div className="cta-bg-grid" />
        <div className="cta-bg-glow" />
      </div>

      <div className="container">
        <div className="cta-inner reveal">
          {/* Label */}
          <span className="cta-label section-label">
            Ready to Order?
          </span>

          {/* Heading */}
          <h2 className="display-lg cta-heading">
            Get Your Metal<br />
            <span className="cta-heading-accent">Cut & Ready Fast</span>
          </h2>

          <p className="cta-sub">
            Tell us what you need and we'll cut it, package it, and have it ready.
            Instant quotes available. No minimum orders.
          </p>

          {/* CTA Buttons */}
          <div className="cta-buttons">
            <a href="/quote" className="btn btn-primary cta-btn-primary">
              Request a Free Quote
              <ArrowRight size={18} />
            </a>
            <a href="/locations" className="btn btn-outline cta-btn-outline">
              <MapPin size={16} />
              Find Your Nearest Store
            </a>
          </div>

          {/* Contact Options */}
          <div className="cta-contact">
            <a href="tel:1-888-317-9980" className="cta-contact-item">
              <Phone size={16} />
              <div>
                <div className="cta-contact-label">Call Us Now</div>
                <div className="cta-contact-value">1-888-317-9980</div>
              </div>
            </a>
            <div className="cta-contact-divider" />
            <div className="cta-contact-item">
              <MapPin size={16} />
              <div>
                <div className="cta-contact-label">Walk-In Welcome</div>
                <div className="cta-contact-value">130+ Locations</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .cta-section {
          position: relative;
          padding: var(--section-pad) 0;
          background: var(--surface-1);
          overflow: hidden;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }

        .cta-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .cta-bg-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(var(--border) 1px, transparent 1px),
            linear-gradient(90deg, var(--border) 1px, transparent 1px);
          background-size: 40px 40px;
          opacity: 0.4;
        }

        .cta-bg-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 600px;
          height: 400px;
          background: radial-gradient(ellipse, rgba(21,101,192,0.12) 0%, transparent 70%);
        }

        .cta-inner {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          max-width: 680px;
          margin: 0 auto;
        }

        .cta-label {
          margin-bottom: 12px;
        }

        .cta-heading {
          margin-bottom: 20px;
          text-align: center;
        }

        .cta-heading-accent { color: var(--blue); }

        .cta-sub {
          font-family: var(--font-light);
          font-size: 17px;
          color: var(--text-secondary);
          line-height: 1.7;
          max-width: 520px;
          margin-bottom: 40px;
        }

        .cta-buttons {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          justify-content: center;
          margin-bottom: 40px;
        }

        .cta-btn-primary {
          padding: 18px 40px;
          font-size: 14px;
        }

        .cta-btn-outline {
          padding: 18px 32px;
          font-size: 14px;
        }

        .cta-contact {
          display: flex;
          align-items: center;
          gap: 32px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .cta-contact-item {
          display: flex;
          align-items: center;
          gap: 12px;
          color: var(--text-secondary);
          transition: color 0.2s;
        }

        .cta-contact-item:hover { color: var(--text-primary); }

        .cta-contact-item svg {
          color: var(--blue);
          flex-shrink: 0;
        }

        .cta-contact-label {
          font-family: var(--font-display);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--text-muted);
        }

        .cta-contact-value {
          font-family: var(--font-display);
          font-size: 16px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .cta-contact-divider {
          width: 1px;
          height: 40px;
          background: var(--border-light);
        }

        @media (max-width: 640px) {
          .cta-contact-divider { display: none; }
        }
      `}</style>
    </section>
  );
}
