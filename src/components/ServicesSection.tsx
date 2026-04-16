import { Scissors, Truck, Package, Zap, Ruler, Settings2 } from "lucide-react";

const services = [
  {
    icon: Scissors,
    title: "Precision Cutting",
    desc: "Cut-to-size service for all metals. Our experienced staff cut metal to your exact specifications — no minimum order required.",
    features: ["Plasma cutting", "Bandsaw cutting", "Shearing", "Laser cutting"],
  },
  {
    icon: Ruler,
    title: "Custom Sizing",
    desc: "Any length, any width. Provide your specs and we'll cut your metal order to precise measurements every time.",
    features: ["Tolerances to ±0.015\"", "Any quantity", "Custom shapes", "Same-day service"],
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    desc: "Need it now? We offer same-day and next-day delivery options across our service areas. Pick up in-store or have it shipped.",
    features: ["Same-day pickup", "Next-day delivery", "Nationwide shipping", "Real-time tracking"],
  },
  {
    icon: Package,
    title: "No Minimums",
    desc: "Buy exactly what you need — whether that's one piece or a thousand. Small orders are our specialty.",
    features: ["1 piece minimum", "No surcharges", "Any quantity", "All grades available"],
  },
  {
    icon: Zap,
    title: "Ready Fast",
    desc: "Walk-in friendly. Our inventory is maintained and ready to go. Most orders fulfilled within the hour.",
    features: ["Walk-in friendly", "Instant quotes", "130+ locations", "Expert staff"],
  },
  {
    icon: Settings2,
    title: "Value-Added Processing",
    desc: "Beyond cutting — we offer bending, grinding, drilling and more processing services to get your metal job-site ready.",
    features: ["Bending", "Drilling", "Grinding", "Deburring"],
  },
];

export default function ServicesSection() {
  return (
    <section className="services-section" id="services">
      <div className="container">
        {/* Left column — heading */}
        <div className="services-left reveal-left">
          <span className="section-label">Our Services</span>
          <div className="divider" />
          <h2 className="display-lg services-heading">
            More Than<br />
            <span className="services-heading-red">Metal.</span><br />
            We Do It All.
          </h2>
          <p className="services-sub">
            From precision cutting to fast delivery, Metal Supermarkets provides
            end-to-end services so you can focus on building — not sourcing.
          </p>
          <a href="/services" className="btn btn-primary services-cta">
            Explore All Services
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>

          {/* Big red stat */}
          <div className="services-stat-block">
            <div className="services-stat-number">130+</div>
            <div className="services-stat-label">Locations across<br />the US, Canada & UK</div>
          </div>
        </div>

        {/* Right column — service cards */}
        <div className="services-right">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className={`service-card reveal delay-${Math.min(i + 1, 6)}`}
              >
                <div className="service-card-icon">
                  <Icon size={22} strokeWidth={1.5} />
                </div>
                <div className="service-card-body">
                  <h3 className="service-card-title">{service.title}</h3>
                  <p className="service-card-desc">{service.desc}</p>
                  <div className="service-card-features">
                    {service.features.map((f) => (
                      <span key={f} className="service-feature">
                        <span className="service-feature-dot" />
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .services-section {
          padding: var(--section-pad) 0;
          background: var(--surface-1);
          position: relative;
          overflow: hidden;
        }

        .services-section::before {
          content: '';
          position: absolute;
          top: -1px; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(to right, transparent, var(--blue), transparent);
        }

        .services-section::after {
          content: '';
          position: absolute;
          bottom: -1px; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(to right, transparent, var(--border), transparent);
        }

        .services-section .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(40px, 6vw, 100px);
          align-items: start;
        }

        @media (max-width: 1024px) {
          .services-section .container {
            grid-template-columns: 1fr;
          }
        }

        .services-left {
          position: sticky;
          top: 120px;
        }

        @media (max-width: 1024px) {
          .services-left { position: static; }
        }

        .services-heading {
          margin-bottom: 20px;
          line-height: 0.95;
        }

        .services-heading-red { color: var(--blue); }

        .services-sub {
          font-family: var(--font-light);
          font-size: 16px;
          color: var(--text-secondary);
          line-height: 1.7;
          max-width: 380px;
          margin-bottom: 32px;
        }

        .services-cta { margin-bottom: 48px; }

        .services-stat-block {
          padding: 28px;
          border: 1px solid var(--border);
          border-left: 3px solid var(--blue);
          background: var(--surface-2);
        }

        .services-stat-number {
          font-family: var(--font-display);
          font-weight: 900;
          font-size: 64px;
          line-height: 1;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .services-stat-label {
          font-family: var(--font-display);
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-muted);
          line-height: 1.4;
        }

        .services-right {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .service-card {
          display: flex;
          gap: 20px;
          padding: 24px;
          background: var(--surface-2);
          border: 1px solid var(--border);
          border-left: 2px solid transparent;
          transition: all 0.25s var(--ease);
          cursor: default;
        }

        .service-card:hover {
          border-left-color: var(--blue);
          background: var(--surface-3);
          transform: translateX(4px);
        }

        .service-card-icon {
          width: 48px;
          height: 48px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--border);
          color: var(--blue);
          background: rgba(21,101,192,0.06);
          transition: all 0.25s;
        }

        .service-card:hover .service-card-icon {
          background: rgba(21,101,192,0.12);
          border-color: var(--blue);
        }

        .service-card-body { flex: 1; }

        .service-card-title {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 16px;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .service-card-desc {
          font-family: var(--font-light);
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 12px;
        }

        .service-card-features {
          display: flex;
          flex-wrap: wrap;
          gap: 8px 16px;
        }

        .service-feature {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-display);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-muted);
        }

        .service-feature-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--blue);
          flex-shrink: 0;
        }
      `}</style>
    </section>
  );
}
