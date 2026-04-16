import { useState } from "react";
import { ArrowRight } from "lucide-react";

const metals = [
  {
    id: "carbon-steel",
    name: "Carbon Steel",
    category: "Steel",
    grades: "A36, 1018, 1045, 4140",
    count: "250+ grades",
    shapes: ["Bar", "Sheet", "Plate", "Tube", "Pipe", "Angle"],
    description: "The most widely used structural metal. Excellent weldability and machinability.",
    color: "#2A2A2A",
    accent: "#555",
    shimmer: "linear-gradient(135deg, #1a1a1a 0%, #2e2e2e 50%, #1a1a1a 100%)",
  },
  {
    id: "stainless-steel",
    name: "Stainless Steel",
    category: "Steel",
    grades: "304, 316, 316L, 410, 430",
    count: "180+ grades",
    shapes: ["Sheet", "Plate", "Bar", "Tube", "Pipe"],
    description: "Corrosion-resistant and hygienic. Ideal for food, medical, and marine applications.",
    color: "#1E2A35",
    accent: "#4A7C9E",
    shimmer: "linear-gradient(135deg, #1a2530 0%, #253545 50%, #1a2530 100%)",
  },
  {
    id: "aluminum",
    name: "Aluminum",
    category: "Aluminum",
    grades: "6061, 6063, 7075, 7050, 2024",
    count: "120+ grades",
    shapes: ["Sheet", "Plate", "Bar", "Tube", "Extrusions"],
    description: "Lightweight yet strong. Excellent corrosion resistance and machinability.",
    color: "#252520",
    accent: "#8C8C7A",
    shimmer: "linear-gradient(135deg, #202020 0%, #303028 50%, #202020 100%)",
  },
  {
    id: "copper",
    name: "Copper",
    category: "Non-Ferrous",
    grades: "C110, C101, C102",
    count: "40+ grades",
    shapes: ["Sheet", "Plate", "Bar", "Tube", "Wire"],
    description: "Exceptional electrical and thermal conductivity. Used in electrical & HVAC systems.",
    color: "#2A1A10",
    accent: "#B87333",
    shimmer: "linear-gradient(135deg, #241508 0%, #3a2010 50%, #241508 100%)",
  },
  {
    id: "brass",
    name: "Brass",
    category: "Non-Ferrous",
    grades: "C36000, C26000, C46400",
    count: "60+ grades",
    shapes: ["Bar", "Sheet", "Tube", "Rod"],
    description: "Excellent machinability and attractive gold-like appearance. Great for decorative use.",
    color: "#251E0A",
    accent: "#B5A642",
    shimmer: "linear-gradient(135deg, #201805 0%, #332808 50%, #201805 100%)",
  },
  {
    id: "bronze",
    name: "Bronze",
    category: "Non-Ferrous",
    grades: "C93200, C95400, C51000",
    count: "35+ grades",
    shapes: ["Bar", "Sheet", "Plate", "Bushing"],
    description: "Superior bearing properties and seawater corrosion resistance.",
    color: "#1E1A10",
    accent: "#8B6914",
    shimmer: "linear-gradient(135deg, #1a1508 0%, #2a2010 50%, #1a1508 100%)",
  },
  {
    id: "titanium",
    name: "Titanium",
    category: "Specialty",
    grades: "Grade 2, Grade 5, Ti-6Al-4V",
    count: "25+ grades",
    shapes: ["Sheet", "Plate", "Bar", "Tube"],
    description: "Exceptional strength-to-weight ratio. Used in aerospace, medical, and military applications.",
    color: "#1A1A22",
    accent: "#6666AA",
    shimmer: "linear-gradient(135deg, #15151e 0%, #222230 50%, #15151e 100%)",
  },
  {
    id: "tool-steel",
    name: "Tool Steel",
    category: "Steel",
    grades: "D2, A2, O1, M2, H13",
    count: "80+ grades",
    shapes: ["Bar", "Flat", "Rod", "Plate"],
    description: "Hardened steel for cutting tools, dies, and molds. Extreme hardness and wear resistance.",
    color: "#1C1C18",
    accent: "#6B6B55",
    shimmer: "linear-gradient(135deg, #181810 0%, #252518 50%, #181810 100%)",
  },
];

const categories = ["All", "Steel", "Aluminum", "Non-Ferrous", "Specialty"];

export default function MetalsShowcase() {
  const [active, setActive] = useState("All");
  const [hovered, setHovered] = useState<string | null>(null);

  const filtered = active === "All" ? metals : metals.filter((m) => m.category === active);

  return (
    <section className="metals-section" id="metals-showcase">
      <div className="container">
        {/* Header */}
        <div className="metals-header reveal">
          <span className="section-label">Our Metals</span>
          <div className="divider" />
          <h2 className="display-lg metals-title">
            8,000+ Types, Grades<br />& Shapes In Stock
          </h2>
          <p className="metals-sub">
            From common structural steel to exotic specialty alloys — if it's metal, we have it.
            Ready to cut-to-size for your exact requirements.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="metals-filters reveal delay-2">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`tag ${active === cat ? "active" : ""}`}
              onClick={() => setActive(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="metals-grid">
          {filtered.map((metal, i) => (
            <a
              key={metal.id}
              href={`/metals#${metal.id}`}
              className={`metal-card reveal delay-${Math.min(i + 1, 6)}`}
              style={{ background: metal.shimmer }}
              onMouseEnter={() => setHovered(metal.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Accent border */}
              <div
                className="metal-card-accent"
                style={{ background: metal.accent }}
              />

              {/* Shimmer overlay */}
              <div className="metal-card-shimmer" />

              {/* Content */}
              <div className="metal-card-inner">
                <div className="metal-card-top">
                  <span className="metal-card-category">{metal.category}</span>
                  <span className="metal-card-count">{metal.count}</span>
                </div>

                <h3 className="metal-card-name">{metal.name}</h3>
                <div className="metal-card-grades">{metal.grades}</div>
                <p className="metal-card-desc">{metal.description}</p>

                {/* Shapes */}
                <div className="metal-card-shapes">
                  {metal.shapes.map((s) => (
                    <span key={s} className="metal-card-shape">{s}</span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="metal-card-cta">
                <span>View Details</span>
                <ArrowRight size={16} />
              </div>
            </a>
          ))}
        </div>

        {/* View All */}
        <div className="metals-view-all reveal">
          <a href="/metals" className="btn btn-outline">
            Browse All 8,000+ Metals
            <ArrowRight size={16} />
          </a>
        </div>
      </div>

      <style>{`
        .metals-section {
          padding: var(--section-pad) 0;
          position: relative;
        }

        .metals-section::before {
          content: '';
          position: absolute;
          left: 0; right: 0;
          top: 0;
          height: 1px;
          background: linear-gradient(to right, transparent, var(--border), transparent);
        }

        .metals-header {
          text-align: center;
          max-width: 640px;
          margin: 0 auto 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .metals-title { text-align: center; margin-bottom: 16px; }

        .metals-sub {
          font-family: var(--font-light);
          font-size: 16px;
          color: var(--text-secondary);
          text-align: center;
          line-height: 1.7;
          max-width: 520px;
        }

        .metals-filters {
          display: flex;
          gap: 8px;
          justify-content: center;
          flex-wrap: wrap;
          margin: 32px 0 48px;
        }

        .metals-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2px;
        }

        @media (max-width: 1024px) {
          .metals-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .metals-grid { grid-template-columns: 1fr; }
        }

        .metal-card {
          position: relative;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          min-height: 260px;
          cursor: pointer;
          border: 1px solid var(--border);
          transition: transform 0.3s var(--ease), box-shadow 0.3s var(--ease), border-color 0.3s;
        }

        .metal-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.5);
          border-color: var(--blue);
          z-index: 2;
        }

        .metal-card-accent {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          opacity: 0;
          transition: opacity 0.3s;
        }

        .metal-card:hover .metal-card-accent { opacity: 1; }

        .metal-card-shimmer {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            105deg,
            transparent 40%,
            rgba(255,255,255,0.05) 50%,
            transparent 60%
          );
          background-size: 200% 100%;
          background-position: 150% 0;
          transition: background-position 0.6s var(--ease);
          pointer-events: none;
        }

        .metal-card:hover .metal-card-shimmer {
          background-position: -50% 0;
        }

        .metal-card-inner {
          padding: 20px;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .metal-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .metal-card-category {
          font-family: var(--font-display);
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--text-muted);
        }

        .metal-card-count {
          font-family: var(--font-display);
          font-size: 11px;
          font-weight: 700;
          color: var(--blue);
          letter-spacing: 0.05em;
        }

        .metal-card-name {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 22px;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          color: var(--text-primary);
          line-height: 1;
        }

        .metal-card-grades {
          font-family: var(--font-display);
          font-size: 11px;
          color: var(--text-muted);
          letter-spacing: 0.08em;
        }

        .metal-card-desc {
          font-family: var(--font-light);
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.5;
          flex: 1;
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 0.3s, transform 0.3s;
        }

        .metal-card:hover .metal-card-desc {
          opacity: 1;
          transform: translateY(0);
        }

        .metal-card-shapes {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
        }

        .metal-card-shape {
          font-family: var(--font-display);
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-muted);
          border: 1px solid var(--border);
          padding: 3px 7px;
          border-radius: 2px;
          transition: border-color 0.2s, color 0.2s;
        }

        .metal-card:hover .metal-card-shape {
          border-color: var(--border-light);
          color: var(--silver-dark);
        }

        .metal-card-cta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 20px;
          border-top: 1px solid rgba(255,255,255,0.06);
          font-family: var(--font-display);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--text-muted);
          transition: all 0.2s;
        }

        .metal-card:hover .metal-card-cta {
          color: var(--blue);
          border-top-color: rgba(21,101,192,0.2);
        }

        .metals-view-all {
          display: flex;
          justify-content: center;
          margin-top: 48px;
        }
      `}</style>
    </section>
  );
}
