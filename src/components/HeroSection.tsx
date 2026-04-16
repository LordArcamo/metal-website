import { useEffect, useState } from "react";
import { ArrowRight, MapPin, Phone, ChevronDown } from "lucide-react";

const words = ["STEEL", "ALUMINUM", "COPPER", "TITANIUM", "BRASS", "STAINLESS"];

export default function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % words.length);
        setIsAnimating(false);
      }, 350);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-section" aria-label="Hero">
      {/* Real background photo */}
      <div className="hero-photo" aria-hidden="true" />
      {/* Dark overlay */}
      <div className="hero-overlay" aria-hidden="true" />
      {/* Blue gradient from bottom */}
      <div className="hero-gradient" aria-hidden="true" />

      {/* Grid pattern on top */}
      <div className="hero-grid" aria-hidden="true" />

      {/* Floating grade chips */}
      <div className="hero-chips" aria-hidden="true">
        {["316 SS", "6061-T6", "C110", "Ti-6Al-4V", "C36000", "A36"].map((g, i) => (
          <div key={g} className={`hero-chip hero-chip--${i + 1}`}>{g}</div>
        ))}
      </div>

      <div className="hero-container">
        {/* Label */}
        <div className="hero-label">
          <span className="hero-label-dot" />
          The World's Largest Small-Quantity Metal Supplier
        </div>

        {/* Main Headline */}
        <h1 className="hero-heading">
          <span className="hero-line hero-line--1">ANY</span>
          <span className="hero-line hero-line--metal">
            <span className={`hero-word ${isAnimating ? "hero-word--exit" : "hero-word--enter"}`}>
              {words[wordIndex]}
            </span>
          </span>
          <span className="hero-line hero-line--3">
            ANY SIZE.&nbsp;
            <span className="hero-line-silver">READY FAST.</span>
          </span>
        </h1>

        <p className="hero-sub">
          130+ stores across the US, Canada &amp; UK. Over 8,000 types, grades,
          and shapes — cut-to-size with no minimum orders.
        </p>

        <div className="hero-ctas">
          <a href="/quote" className="btn btn-primary hero-cta-primary">
            Get a Free Quote
            <ArrowRight size={18} />
          </a>
          <a href="/locations" className="btn btn-outline hero-cta-secondary">
            <MapPin size={16} />
            Find a Store
          </a>
        </div>

        {/* Stats */}
        <div className="hero-stats">
          {[
            { value: "130+", label: "Locations" },
            { value: "8,000+", label: "Metal Types" },
            { value: "3", label: "Countries" },
            { value: "40+", label: "Years" },
          ].map(({ value, label }) => (
            <div key={label} className="hero-stat">
              <span className="hero-stat-value">{value}</span>
              <span className="hero-stat-label">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Phone bar */}
      <div className="hero-phone-bar">
        <div className="hero-phone-inner">
          <span className="hero-phone-text">
            <Phone size={13} style={{ display: "inline", marginRight: "8px", verticalAlign: "middle" }} />
            Talk to a metal expert now:
          </span>
          <a href="tel:1-888-317-9980" className="hero-phone-number">
            1-888-317-9980
          </a>
          <span className="hero-phone-tagline">
            "The Convenience Stores for Metal™"
          </span>
        </div>
      </div>

      {/* Scroll cue */}
      <a href="#metals-showcase" className="hero-scroll" aria-label="Scroll down">
        <ChevronDown size={20} />
      </a>

      {/* Marquee */}
      <div className="hero-marquee" aria-hidden="true">
        <div className="hero-marquee-track">
          {[0, 1].map((k) => (
            <span key={k} className="hero-marquee-content">
              {["Steel", "Aluminum", "Copper", "Brass", "Bronze", "Titanium",
                "Inconel", "Stainless", "Tool Steel", "Carbon Steel", "Alloy Steel", "Hastelloy"
              ].map((m) => (
                <span key={m} className="hero-marquee-item">
                  <span className="hero-marquee-dot">▲</span> {m}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        .hero-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          overflow: hidden;
          padding-top: 72px;
        }

        /* Real photo background */
        .hero-photo {
          position: absolute;
          inset: 0;
          background: url('/images/hero-steel.jpg') center center / cover no-repeat;
          transform: scale(1.05);
          transition: transform 8s ease-out;
        }
        .hero-section:hover .hero-photo { transform: scale(1); }

        /* Dark overlay */
        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(10,10,12,0.88) 0%,
            rgba(10,10,12,0.72) 50%,
            rgba(13,71,161,0.3) 100%
          );
        }

        /* Blue glow from bottom-right */
        .hero-gradient {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse 60% 50% at 80% 80%,
            rgba(21,101,192,0.18) 0%,
            transparent 70%
          );
        }

        /* Grid overlay */
        .hero-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(21,101,192,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(21,101,192,0.08) 1px, transparent 1px);
          background-size: 80px 80px;
          mask-image: radial-gradient(ellipse 80% 80% at 30% 40%, black 20%, transparent 80%);
        }

        /* Grade chips */
        .hero-chips {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .hero-chip {
          position: absolute;
          font-family: var(--font-display);
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.15em;
          color: rgba(192,192,192,0.7);
          border: 1px solid rgba(21,101,192,0.3);
          padding: 5px 10px;
          background: rgba(10,10,12,0.6);
          backdrop-filter: blur(8px);
          animation: float 4s ease-in-out infinite;
        }
        .hero-chip--1 { top: 22%; right: 16%; animation-delay: 0s; }
        .hero-chip--2 { top: 38%; right: 8%; animation-delay: 0.8s; }
        .hero-chip--3 { top: 56%; right: 20%; animation-delay: 1.6s; }
        .hero-chip--4 { top: 28%; right: 32%; animation-delay: 0.4s; }
        .hero-chip--5 { top: 66%; right: 11%; animation-delay: 1.2s; }
        .hero-chip--6 { top: 47%; right: 38%; animation-delay: 2s; }

        @media (max-width: 768px) {
          .hero-chips { display: none; }
        }

        /* Container */
        .hero-container {
          position: relative;
          z-index: 2;
          max-width: var(--container);
          margin: 0 auto;
          padding: 0 clamp(20px, 4vw, 60px);
          padding-top: 80px;
          padding-bottom: 80px;
        }

        /* Label */
        .hero-label {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-display);
          font-size: 12px; font-weight: 600;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: rgba(192,192,192,0.7);
          margin-bottom: 28px;
          animation: fadeInUp 0.8s var(--ease-out) 0.2s both;
        }
        .hero-label-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--blue-light);
          animation: pulse-blue 2s ease-in-out infinite;
        }

        /* Heading */
        .hero-heading {
          display: flex;
          flex-direction: column;
          gap: 0;
          margin-bottom: 24px;
        }
        .hero-line {
          font-family: var(--font-display);
          font-weight: 900;
          font-size: clamp(72px, 11vw, 160px);
          line-height: 0.9;
          letter-spacing: -0.02em;
          text-transform: uppercase;
          color: var(--text-primary);
          text-shadow: 0 2px 20px rgba(0,0,0,0.5);
        }
        .hero-line--1 { animation: slideInLeft 0.9s var(--ease-out) 0.4s both; }
        .hero-line--metal {
          animation: slideInLeft 0.9s var(--ease-out) 0.55s both;
          display: block;
          min-height: 1em;
        }
        .hero-word {
          color: var(--blue-light);
          display: block;
          transition: opacity 0.3s, transform 0.3s;
          text-shadow: 0 0 60px rgba(33,150,243,0.4);
        }
        .hero-word--exit { opacity: 0; transform: translateY(-20px); }
        .hero-word--enter { opacity: 1; transform: translateY(0); }

        .hero-line--3 {
          animation: slideInLeft 0.9s var(--ease-out) 0.7s both;
          display: flex;
          flex-wrap: wrap;
        }
        .hero-line-silver { color: var(--silver-dark); }

        /* Sub */
        .hero-sub {
          font-family: var(--font-light);
          font-size: clamp(15px, 1.6vw, 18px);
          color: rgba(192,192,192,0.85);
          max-width: 520px;
          line-height: 1.7;
          margin-bottom: 36px;
          animation: fadeInUp 0.9s var(--ease-out) 0.85s both;
        }

        /* CTAs */
        .hero-ctas {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          margin-bottom: 56px;
          animation: fadeInUp 0.9s var(--ease-out) 1s both;
        }
        .hero-cta-primary { font-size: 14px; padding: 16px 36px; }
        .hero-cta-secondary { font-size: 14px; padding: 16px 28px; }

        /* Stats */
        .hero-stats {
          display: flex;
          gap: clamp(24px, 4vw, 56px);
          animation: fadeInUp 0.9s var(--ease-out) 1.1s both;
          flex-wrap: wrap;
        }
        .hero-stat {
          display: flex;
          flex-direction: column;
          gap: 3px;
          position: relative;
          padding-left: 16px;
        }
        .hero-stat::before {
          content: '';
          position: absolute;
          left: 0; top: 6px;
          width: 2px; height: 32px;
          background: var(--blue);
          opacity: 0.5;
        }
        .hero-stat-value {
          font-family: var(--font-display);
          font-weight: 900;
          font-size: clamp(28px, 3vw, 40px);
          line-height: 1;
          color: var(--text-primary);
        }
        .hero-stat-label {
          font-family: var(--font-display);
          font-size: 11px; font-weight: 600;
          letter-spacing: 0.15em; text-transform: uppercase;
          color: rgba(192,192,192,0.5);
        }

        /* Phone bar */
        .hero-phone-bar {
          position: relative;
          z-index: 2;
          background: rgba(17,17,22,0.95);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          padding: 14px 0;
          backdrop-filter: blur(10px);
        }
        .hero-phone-inner {
          max-width: var(--container);
          margin: 0 auto;
          padding: 0 clamp(20px, 4vw, 60px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }
        .hero-phone-text {
          font-family: var(--font-display);
          font-size: 13px;
          color: var(--text-secondary);
          letter-spacing: 0.05em;
        }
        .hero-phone-number {
          font-family: var(--font-display);
          font-weight: 900;
          font-size: 20px;
          color: var(--blue-light);
          letter-spacing: 0.05em;
          transition: color 0.2s;
        }
        .hero-phone-number:hover { color: white; }
        .hero-phone-tagline {
          font-family: var(--font-light);
          font-size: 12px;
          font-style: italic;
          color: var(--text-muted);
        }

        /* Scroll cue */
        .hero-scroll {
          position: absolute;
          bottom: 100px; right: 60px;
          z-index: 3;
          width: 44px; height: 44px;
          border: 1px solid var(--border-light);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          transition: all 0.2s;
          animation: float 3s ease-in-out infinite;
        }
        .hero-scroll:hover { border-color: var(--blue); color: var(--blue-light); }
        @media (max-width: 768px) { .hero-scroll { display: none; } }

        /* Marquee */
        .hero-marquee {
          position: relative;
          z-index: 2;
          overflow: hidden;
          background: var(--blue-dark);
          border-top: 1px solid rgba(21,101,192,0.3);
          padding: 10px 0;
        }
        .hero-marquee-track {
          display: flex;
          white-space: nowrap;
          animation: marquee 28s linear infinite;
        }
        .hero-marquee-content { display: flex; flex-shrink: 0; }
        .hero-marquee-item {
          font-family: var(--font-display);
          font-size: 12px; font-weight: 600;
          letter-spacing: 0.15em; text-transform: uppercase;
          color: rgba(192,192,255,0.7);
          padding: 0 24px;
          display: flex; align-items: center; gap: 10px;
        }
        .hero-marquee-dot {
          font-size: 6px;
          color: var(--blue-light);
          opacity: 0.7;
        }
      `}</style>
    </section>
  );
}
