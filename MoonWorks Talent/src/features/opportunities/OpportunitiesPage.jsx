import { Link } from 'react-router-dom';
import SEO from '../../components/SEO/SEO.jsx';
import { getBreadcrumbSchema } from '../../components/SEO/schemas.js';
import { sectors } from '../../data/tracks.js';
import './OpportunitiesPage.css';

const facts = [
  { label: 'Live Client Work',      detail: 'Not dummy projects' },
  { label: 'Work With Our Team',    detail: 'Guided by mentors' },
  { label: '2, 4, or 6 Months',    detail: 'Your choice of duration' },
  { label: 'Certificate + Letter',  detail: 'Verified credentials' },
];

const OpportunitiesPage = () => {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Explore Programmes', path: '/opportunities' },
  ]);

  return (
    <main className="opp-page animate-fade-in-up delay-1">
      <SEO
        title="Explore 7 Open Intern Roles — Web Dev, HR, Marketing, Design & More"
        description="We're hiring interns across 7 roles at Moonworks Talent: Website Development, Graphic Design, Social Media Marketing, Email Marketing, HR, Administration, Operations. Work on real client projects with our team."
        path="/opportunities"
        structuredData={breadcrumbSchema}
      />

      {/* Hero */}
      <section className="opp-hero section" id="opp-hero">
        <div className="container text-center">
          <span className="eyebrow animate-fade-in-up delay-1">Explore Programmes</span>
          <h1 className="opp-hero__title animate-fade-in-up delay-2">
            7+ Roles. Real <span className="hero__highlight">Client Work</span>.
          </h1>
          <p className="opp-hero__subtitle animate-fade-in-up delay-3">
            We're hiring interns across 7 roles. You'll join our team and work on actual client projects — not simulations.
            New to Moonworks? <Link to="/about" style={{ color: 'var(--blue)', fontWeight: 600, textDecoration: 'underline' }}>Learn about us</Link>.
          </p>
        </div>
      </section>

      {/* Key facts banner */}
      <section className="opp-facts section--alt" id="opp-facts">
        <div className="container">
          <div className="opp-facts__grid">
            {facts.map((fact, i) => (
              <div className={`opp-fact animate-fade-in-up delay-${i + 1}`} key={fact.label}>
                <span className="opp-fact__label">{fact.label}</span>
                <span className="opp-fact__detail">{fact.detail}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All sectors with tracks */}
      <section className="opp-tracks section" id="opp-tracks">
        <div className="container">
          {sectors.map((sector, si) => (
            <div className={`sector-block animate-fade-in-up delay-${(si % 4) + 1}`} key={sector.id} id={`sector-${sector.id}`}>
              <div className="sector-block__header">
                <div className="sector-block__bar" style={{ background: sector.color }}></div>
                <div>
                  <h2 className="sector-block__title">{sector.name}</h2>
                  <p className="sector-block__desc">{sector.description}</p>
                </div>
              </div>

              <div className="sector-block__tracks">
                {sector.tracks.map((track, ti) => (
                  <div className={`track-card animate-fade-in-up delay-${(ti % 4) + 1}`} key={track.id} id={`track-${track.id}`} style={{ '--track-color': sector.color }}>
                    <div className="track-card__header">
                      <h3 className="track-card__title">{track.title}</h3>
                      <span className="track-card__duration">{track.duration}</span>
                    </div>
                    <p className="track-card__desc">{track.description}</p>
                    <div className="track-card__skills">
                      <span className="track-card__skills-label">Skills you'll develop</span>
                      <div className="track-card__skill-tags">
                        {track.skills.map((skill) => (
                          <span className="track-card__skill" key={skill}>{skill}</span>
                        ))}
                      </div>
                    </div>
                    <Link to="/contact" className="track-card__apply">
                      Apply for This Track →
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="opp-cta section section--dark" id="opp-cta">
        <div className="container text-center animate-fade-in-up delay-1">
          <span className="eyebrow" style={{ color: 'var(--blue-light)' }}>Need Guidance?</span>
          <h2 style={{ color: 'var(--text-on-dark)', marginTop: 'var(--space-md)' }}>
            Not Sure Which Track to Choose?
          </h2>
          <p style={{ color: 'var(--slate-light)', maxWidth: '480px', margin: '16px auto 32px', fontSize: '1rem' }}>
            Reach out and we'll help you identify the best fit based on your background, interests, and career goals.
            See <Link to="/how-it-works" style={{ color: 'var(--blue-light)', fontWeight: 600, textDecoration: 'underline' }}>how the process works</Link> before applying.
          </p>
          <Link to="/contact" className="hero__btn hero__btn--primary">
            Talk to Us <span className="hero__btn-arrow">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default OpportunitiesPage;
