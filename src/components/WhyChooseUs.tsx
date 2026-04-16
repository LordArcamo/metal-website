import { Shield, Clock, Users, Award, TrendingUp, Globe } from "lucide-react";

const reasons = [
  {
    icon: Globe,
    title: "130+ Store Locations",
    desc: "With stores across the US, Canada, and UK, there's always a Metal Supermarkets near you. Walk in and walk out with exactly what you need.",
    stat: "130+",
    statLabel: "Stores",
  },
  {
    icon: Clock,
    title: "Ready When You Are",
    desc: "Same-day service available. Our stores maintain deep inventory so most orders are fulfilled within the hour — no waiting, no backorders.",
    stat: "1hr",
    statLabel: "Avg Fulfillment",
  },
  {
    icon: Shield,
    title: "No Minimum Orders",
    desc: "Buy exactly what you need — one piece or one thousand. We serve everyone from hobbyists to Fortune 500 companies with the same care.",
    stat: "1pc",
    statLabel: "Minimum Order",
  },
  {
    icon: Award,
    title: "Expert Staff",
    desc: "Our team knows metal inside and out. Get expert advice on material selection, grades, and specifications from people who live and breathe this industry.",
    stat: "40+",
    statLabel: "Years Experience",
  },
  {
    icon: TrendingUp,
    title: "8,000+ Metals in Stock",
    desc: "The largest selection of small-quantity metals in the world. From common A36 steel to exotic Inconel 625, if it's metal, we stock it.",
    stat: "8K+",
    statLabel: "Types & Grades",
  },
  {
    icon: Users,
    title: "Trusted by Industry",
    desc: "From NASA to Hollywood productions, local fabricators to military contractors — companies worldwide rely on Metal Supermarkets for critical projects.",
    stat: "∞",
    statLabel: "Industries Served",
  },
];

const industries = [
  "Aerospace", "Automotive", "Construction", "Defense", "Electronics",
  "Film & TV", "Food & Beverage", "Marine", "Medical", "Mining",
  "Oil & Gas", "Robotics", "HVAC", "Fabrication", "Art & Sculpture",
];

export default function WhyChooseUs() {
  return (
    <section className="why-section" id="why-us">
      {/* Top banner */}
      <div className="why-banner">
        <div className="container">
          <div className="why-banner-inner">
            <div className="why-banner-text reveal-left">
              <span className="section-label">Why Metal Supermarkets</span>
              <div className="divider" />
              <h2 className="display-lg why-heading">
                The Convenience Store<br />
                <em className="why-heading-em">for Metal™</em>
              </h2>
            </div>
            <div className="why-banner-quote reveal-right">
              <blockquote className="why-quote">
                "Our Product is Metal.<br />Our Passion is Service."
              </blockquote>
              <cite className="why-cite">— Metal Supermarkets</cite>
            </div>
          </div>
        </div>
      </div>

      {/* Reasons grid */}
      <div className="container">
        <div className="why-grid">
          {reasons.map((r, i) => {
            const Icon = r.icon;
            return (
              <div key={r.title} className={`why-card reveal delay-${Math.min(i + 1, 6)}`}>
                <div className="why-card-top">
                  <div className="why-card-stat">
                    <span className="why-stat-value">{r.stat}</span>
                    <span className="why-stat-label">{r.statLabel}</span>
                  </div>
                  <div className="why-card-icon">
                    <Icon size={20} strokeWidth={1.5} />
                  </div>
                </div>
                <h3 className="why-card-title">{r.title}</h3>
                <p className="why-card-desc">{r.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Industries marquee */}
        <div className="why-industries reveal">
          <span className="section-label" style={{ marginBottom: "20px", display: "block" }}>
            Industries We Serve
          </span>
          <div className="industries-scroll">
            {[...industries, ...industries].map((ind, i) => (
              <span key={`${ind}-${i}`} className="industry-tag">{ind}</span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .why-section {
          padding: var(--section-pad) 0;
          background: var(--bg);
          position: relative;
        }

        .why-banner {
          background: var(--surface-1);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          padding: clamp(40px, 5vw, 80px) 0;
          margin-bottom: clamp(40px, 5vw, 80px);
          position: relative;
          overflow: hidden;
        }

        .why-banner::before {
          content: 'METAL';
          position: absolute;
          right: -60px;
          top: 50%;
          transform: translateY(-50%);
          font-family: var(--font-display);
          font-size: 220px;
          font-weight: 900;
          color: rgba(255,255,255,0.02);
          pointer-events: none;
          line-height: 1;
          letter-spacing: -0.05em;
          white-space: nowrap;
        }

        .why-banner-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 40px;
          flex-wrap: wrap;
        }

        .why-heading { line-height: 1; }
        .why-heading-em {
          font-style: normal;
          color: var(--blue);
        }

        .why-quote {
          font-family: var(--font-display);
          font-size: clamp(22px, 3vw, 36px);
          font-weight: 700;
          font-style: normal;
          line-height: 1.2;
          color: var(--text-primary);
          letter-spacing: 0.02em;
          border-left: 3px solid var(--blue);
          padding-left: 24px;
          max-width: 420px;
        }

        .why-cite {
          display: block;
          margin-top: 12px;
          font-family: var(--font-display);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--text-muted);
          padding-left: 24px;
        }

        .why-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
          margin-bottom: clamp(40px, 5vw, 80px);
        }

        @media (max-width: 1024px) {
          .why-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 640px) {
          .why-grid { grid-template-columns: 1fr; }
        }

        .why-card {
          padding: 32px;
          background: var(--surface-1);
          border: 1px solid var(--border);
          position: relative;
          overflow: hidden;
          transition: all 0.3s var(--ease);
        }

        .why-card::before {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 0;
          height: 2px;
          background: var(--blue);
          transition: width 0.4s var(--ease);
        }

        .why-card:hover::before { width: 100%; }
        .why-card:hover { background: var(--surface-2); }

        .why-card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .why-card-stat {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .why-stat-value {
          font-family: var(--font-display);
          font-weight: 900;
          font-size: 44px;
          line-height: 1;
          color: var(--text-primary);
        }

        .why-stat-label {
          font-family: var(--font-display);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--blue);
        }

        .why-card-icon {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--border);
          color: var(--text-muted);
          transition: all 0.25s;
        }

        .why-card:hover .why-card-icon {
          border-color: var(--blue);
          color: var(--blue);
        }

        .why-card-title {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 16px;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--text-primary);
          margin-bottom: 10px;
        }

        .why-card-desc {
          font-family: var(--font-light);
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.65;
        }

        .why-industries {
          padding: 40px 0;
          border-top: 1px solid var(--border);
        }

        .industries-scroll {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .industry-tag {
          font-family: var(--font-display);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--text-muted);
          border: 1px solid var(--border);
          padding: 7px 14px;
          border-radius: 2px;
          transition: all 0.2s;
          cursor: default;
        }

        .industry-tag:hover {
          border-color: var(--blue);
          color: var(--blue);
        }
      `}</style>
    </section>
  );
}
