import { Link } from 'react-router-dom';
import SEO from '../../components/SEO/SEO.jsx';
import { getOrganizationSchema, getWebSiteSchema } from '../../components/SEO/schemas.js';
import SectionHeader from '../../components/SectionHeader/SectionHeader.jsx';
import { sectors } from '../../data/tracks.js';
import { technologies, categories } from '../../data/technologies.js';
import { steps } from '../../data/steps.js';
import './HomePage.css';

/* Inline SVG icons for deliverables — no emojis */
const IconCertificate = () => (
  <svg className="deliverable-card__svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="14" rx="2" />
    <path d="M8 21h8M12 17v4" />
    <path d="M8 8h8M8 11h5" />
  </svg>
);

const IconDocument = () => (
  <svg className="deliverable-card__svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const IconAward = () => (
  <svg className="deliverable-card__svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="6" />
    <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
  </svg>
);

const HomePage = () => {
  // Combine Organization + WebSite schemas
  const structuredData = [getOrganizationSchema(), getWebSiteSchema()];

  return (
    <main>
      <SEO
        title="Moonworks Talent — Gain Real Work Experience as an Intern"
        description="Join our team and work on real projects. 7+ roles across Web Dev, HR, Marketing, Design & more. Gain hands-on experience, earn certificates & experience letters. MSME registered. Apply now!"
        path="/"
        structuredData={structuredData}
      />

      {/* ========== HERO ========== */}
      <section className="hero section" id="hero">
        <div className="container">
          <div className="hero__content">

            <h1 className="hero__title animate-fade-in-up delay-1">
              Gain Real Work Experience.<br />
              <span className="hero__highlight">Join Our Team</span>.
            </h1>

            <p className="hero__subtitle animate-fade-in-up delay-2">
              We bring interns on board to work alongside us on real projects.
              No dummy tasks. Real work. Real experience.
            </p>

            <div className="hero__actions animate-fade-in-up delay-3">
              <Link to="/contact" className="hero__btn hero__btn--primary" id="hero-get-started">
                Join Our Team
                <span className="hero__btn-arrow">→</span>
              </Link>
              <Link to="/opportunities" className="hero__btn hero__btn--secondary" id="hero-explore">
                Explore Programmes
              </Link>
            </div>

            <div className="hero__stats animate-fade-in-up delay-4">
              <div className="hero__stat">
                <span className="hero__stat-number">7+</span>
                <span className="hero__stat-label">Open Roles</span>
              </div>
              <div className="hero__stat-divider"></div>
              <div className="hero__stat">
                <span className="hero__stat-number">Real</span>
                <span className="hero__stat-label">Projects</span>
              </div>
              <div className="hero__stat-divider"></div>
              <div className="hero__stat">
                <span className="hero__stat-number">Real</span>
                <span className="hero__stat-label">Team Experience</span>
              </div>
            </div>
          </div>

          {/* Hero logo — clean, no orbit decoration */}
          <div className="hero__logo-block animate-fade-in delay-2" aria-hidden="true">
            <picture>
              <source
                type="image/webp"
                srcSet="/moon-logo-125w.webp 125w, /moon-logo-280w.webp 280w, /moon-logo-432w.webp 432w"
                sizes="(max-width: 480px) 125px, (max-width: 900px) 160px, 432px"
              />
              <img
                src="/moon-logo-transparent.png"
                alt="Moonworks Talent logo"
                className="hero__logo-img"
                width="432"
                height="432"
                fetchPriority="high"
                loading="eager"
              />
            </picture>
          </div>
        </div>
      </section>

      {/* ========== EXPLORE OPPORTUNITIES ========== */}
      <section className="opportunities section section--alt" id="opportunities">
        <div className="container">
          <SectionHeader
            eyebrow="Internship Programmes"
            title="Find Your Perfect Track"
            subtitle="7+ internship tracks across 5 domains. Each one designed to give you real, job-ready skills with verified credentials."
          />

          <div className="opportunities__grid">
            {sectors.map((sector, i) => (
              <div className={`opportunity-card animate-fade-in-up delay-${(i % 4) + 1}`} key={sector.id} style={{ '--card-color': sector.color }}>
                <div className="opportunity-card__sector-bar"></div>
                <h3 className="opportunity-card__title">{sector.name}</h3>
                <p className="opportunity-card__desc">{sector.description}</p>
                <div className="opportunity-card__tracks">
                  {sector.tracks.map((track) => (
                    <span className="opportunity-card__track" key={track.id}>
                      {track.title}
                    </span>
                  ))}
                </div>
                <Link to="/opportunities" className="opportunity-card__link">
                  View details →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== TECHNOLOGIES ========== */}
      <section className="technologies section" id="technologies">
        <div className="container">
          <SectionHeader
            eyebrow="Skills & Tools"
            title="Industry-Standard Technologies"
            subtitle="Learn the tools and technologies that top companies actually use. Our tracks are built around real-world practice."
            tealEyebrow
          />

          <div className="tech-grid">
            {technologies.map((tech) => {
              const cat = categories.find((c) => c.id === tech.category);
              return (
                <div
                  className="tech-card"
                  key={tech.id}
                  style={{ '--tech-color': cat?.color || 'var(--blue)' }}
                >
                  <span className="tech-card__dot"></span>
                  <span className="tech-card__name">{tech.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== HOW IT WORKS ========== */}
      <section className="how-it-works section section--dark" id="how-it-works">
        <div className="container">
          <SectionHeader
            eyebrow="The Process"
            title="4 Steps to Get Started"
            subtitle="From application to certification — your complete journey with Moonworks Talent."
            dark
          />

          <div className="steps">
            {steps.map((step, i) => (
              <div className="step" key={step.id}>
                <div className="step__number">{step.id}</div>
                <h3 className="step__title">{step.title}</h3>
                <p className="step__desc">{step.shortDesc}</p>
                {i < steps.length - 1 && (
                  <div className="step__connector" aria-hidden="true"></div>
                )}
              </div>
            ))}
          </div>

          <p className="how-it-works__cta-text" style={{ textAlign: 'center', marginTop: 'var(--space-xl)', color: 'var(--slate-light)' }}>
            Want the full breakdown? <Link to="/how-it-works" style={{ color: 'var(--blue-light)', textDecoration: 'underline' }}>See how it works in detail →</Link>
          </p>
        </div>
      </section>

      {/* ========== DELIVERABLES ========== */}
      <section className="deliverables section" id="deliverables">
        <div className="container">
          <SectionHeader
            eyebrow="What You Receive"
            title="Verified Credentials That Matter"
            subtitle="Every intern receives professionally verified documents upon successful completion."
          />

          <div className="deliverables__grid">
            <div className="deliverable-card">
              <div className="deliverable-card__icon-wrap">
                <IconCertificate />
              </div>
              <h4 className="deliverable-card__title">Certificate of Completion</h4>
              <p className="deliverable-card__desc">
                A verified certificate confirming your internship track, duration, and skills acquired. Ready to add to your LinkedIn profile and resume.
              </p>
            </div>
            <div className="deliverable-card">
              <div className="deliverable-card__icon-wrap">
                <IconDocument />
              </div>
              <h4 className="deliverable-card__title">Experience Letter</h4>
              <p className="deliverable-card__desc">
                An official experience letter detailing your role, responsibilities, and contributions during the internship period.
              </p>
            </div>
            <div className="deliverable-card deliverable-card--highlight">
              <div className="deliverable-card__badge">Top Performers</div>
              <div className="deliverable-card__icon-wrap deliverable-card__icon-wrap--light">
                <IconAward />
              </div>
              <h4 className="deliverable-card__title">Letter of Recommendation</h4>
              <p className="deliverable-card__desc">
                A personal LOR from the founder for interns who demonstrate exceptional performance, initiative, and consistency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FINAL CTA ========== */}
      <section className="cta-section section section--dark" id="final-cta">
        <div className="container text-center">
          <span className="eyebrow" style={{ color: 'var(--blue-light)' }}>Ready to Begin?</span>
          <h2 className="cta-section__title">
            We're Hiring Interns. Want In?
          </h2>
          <p className="cta-section__subtitle">
            Join our team, work on real projects, and walk away with experience, certificates & a letter that actually means something.
          </p>
          <div className="cta-section__actions">
            <Link to="/contact" className="hero__btn hero__btn--primary" id="cta-apply">
              Apply to Join
              <span className="hero__btn-arrow">→</span>
            </Link>
            <Link to="/how-it-works" className="hero__btn hero__btn--secondary hero__btn--on-dark" id="cta-learn-more">
              Learn How It Works
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
