import { Search, Ruler, Receipt, Truck, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Browse & Select",
    desc: "Search 8,000+ metals by type, grade, or shape. Filter by your exact application.",
  },
  {
    number: "02",
    icon: Ruler,
    title: "Specify Your Size",
    desc: 'Tell us your exact dimensions. Our team cuts to your specs with ±0.015" tolerance.',
  },
  {
    number: "03",
    icon: Receipt,
    title: "Get an Instant Quote",
    desc: "Transparent pricing, no hidden fees. Quotes in minutes online, by phone, or in-store.",
  },
  {
    number: "04",
    icon: Truck,
    title: "Pick Up or Delivery",
    desc: "Walk in same day, or choose next-day delivery. 130+ locations across US, Canada & UK.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="hiw-section" id="how-it-works">
      <div className="hiw-bg-grid" aria-hidden="true" />

      <div className="container">
        {/* Header */}
        <div className="hiw-header reveal">
          <span className="section-label">The Process</span>
          <div className="divider" />
          <h2 className="display-lg hiw-title">
            Order in Minutes.<br />
            <span className="hiw-title-accent">Ready Same Day.</span>
          </h2>
          <p className="hiw-sub">
            From browsing our inventory to holding your cut-to-size metal —
            it's fast, simple, and transparent.
          </p>
        </div>

        {/* Steps */}
        <div className="hiw-steps">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="hiw-step-wrapper">
                <div className={`hiw-step reveal delay-${i + 1}`}>
                  {/* Background number */}
                  <span className="hiw-step-number" aria-hidden="true">
                    {step.number}
                  </span>

                  {/* Icon */}
                  <div className="hiw-step-icon">
                    <Icon size={24} strokeWidth={1.5} />
                  </div>

                  {/* Text */}
                  <h3 className="hiw-step-title">{step.title}</h3>
                  <p className="hiw-step-desc">{step.desc}</p>
                </div>

                {/* Connector arrow between steps */}
                {i < steps.length - 1 && (
                  <div className="hiw-connector" aria-hidden="true">→</div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="hiw-cta reveal">
          <a href="/quote" className="btn btn-primary">
            Start Your Order Now
            <ArrowRight size={18} />
          </a>
        </div>
      </div>

      <style>{`
        .hiw-section {
          position: relative;
          padding: var(--section-pad) 0;
          background: var(--bg);
          overflow: hidden;
        }

        .hiw-bg-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(21,101,192,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(21,101,192,0.05) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }

        .hiw-section::before {
          content: '';
          position: absolute;
          top: -1px; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(to right, transparent, var(--border), transparent);
        }

        .hiw-section::after {
          content: '';
          position: absolute;
          bottom: -1px; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(to right, transparent, var(--border), transparent);
        }

        .hiw-header {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin-bottom: 56px;
        }

        .hiw-title {
          text-align: center;
          margin-bottom: 16px;
          line-height: 1;
        }

        .hiw-title-accent {
          color: var(--blue-light);
        }

        .hiw-sub {
          font-family: var(--font-light);
          font-size: 16px;
          color: var(--text-secondary);
          line-height: 1.7;
          max-width: 500px;
          text-align: center;
        }

        /* Steps row */
        .hiw-steps {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: stretch;
          gap: 0;
          margin-bottom: 48px;
        }

        @media (max-width: 1024px) {
          .hiw-steps {
            flex-wrap: wrap;
          }
        }

        .hiw-step-wrapper {
          display: flex;
          align-items: center;
          flex: 1;
          min-width: 0;
        }

        @media (max-width: 1024px) {
          .hiw-step-wrapper {
            flex-basis: calc(50% - 1px);
          }
        }

        @media (max-width: 640px) {
          .hiw-step-wrapper {
            flex-basis: 100%;
          }
        }

        /* The step card */
        .hiw-step {
          flex: 1;
          position: relative;
          padding: 36px 28px 32px;
          background: var(--surface-1);
          border: 1px solid var(--border);
          overflow: hidden;
          transition: border-color 0.25s var(--ease), background 0.25s;
          cursor: default;
        }

        .hiw-step:hover {
          border-color: var(--blue);
          background: var(--surface-2);
        }

        /* Background step number */
        .hiw-step-number {
          position: absolute;
          top: 8px;
          left: 16px;
          font-family: var(--font-display);
          font-weight: 900;
          font-size: 72px;
          line-height: 1;
          color: rgba(21,101,192,0.12);
          pointer-events: none;
          letter-spacing: -0.02em;
          transition: color 0.25s;
        }

        .hiw-step:hover .hiw-step-number {
          color: rgba(21,101,192,0.18);
        }

        /* Icon box */
        .hiw-step-icon {
          position: relative;
          z-index: 1;
          width: 52px;
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--border);
          color: var(--blue);
          background: rgba(21,101,192,0.06);
          margin-bottom: 20px;
          transition: all 0.25s;
        }

        .hiw-step:hover .hiw-step-icon {
          background: rgba(21,101,192,0.12);
          border-color: var(--blue);
        }

        .hiw-step-title {
          position: relative;
          z-index: 1;
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 17px;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--text-primary);
          margin-bottom: 10px;
        }

        .hiw-step-desc {
          position: relative;
          z-index: 1;
          font-family: var(--font-light);
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.65;
        }

        /* Connector arrow */
        .hiw-connector {
          flex-shrink: 0;
          width: 28px;
          text-align: center;
          font-size: 18px;
          color: var(--border-light);
          pointer-events: none;
          user-select: none;
          padding: 0 2px;
        }

        @media (max-width: 1024px) {
          .hiw-connector {
            display: none;
          }
        }

        /* CTA */
        .hiw-cta {
          position: relative;
          z-index: 2;
          display: flex;
          justify-content: center;
        }
      `}</style>
    </section>
  );
}
