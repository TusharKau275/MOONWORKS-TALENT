import { Link } from 'react-router-dom';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import { sectors } from '../../data/tracks';
import './OpportunitiesPage.css';

const facts = [
  { label: '100% Free',          detail: 'Zero fees, always' },
  { label: 'Work From Home',     detail: 'Fully remote' },
  { label: '2, 4, or 6 Months', detail: 'Your choice of duration' },
  { label: 'Certificate + Letter', detail: 'Verified credentials' },
];

const OpportunitiesPage = () => {
  return (
    <main className="opp-page animate-fade-in-up delay-1">
      {/* Hero */}
      <section className="opp-hero section" id="opp-hero">
        <div className="container text-center">
          <span className="eyebrow animate-fade-in-up delay-1">Explore Programmes</span>
          <h1 className="opp-hero__title animate-fade-in-up delay-2">
            Find Your <span className="hero__highlight">Perfect</span> Internship
          </h1>
          <p className="opp-hero__subtitle animate-fade-in-up delay-3">
            7 internship tracks across 5 domains. All 100% free, remote, and mentor-guided. Choose the one that matches your goals.
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
            <div className={`sector-block animate-fade-in-up delay-${(si % 4) + 1}`} key={sector.id}>
              <div className="sector-block__header">
                <div className="sector-block__bar" style={{ background: sector.color }}></div>
                <div>
                  <h2 className="sector-block__title">{sector.name}</h2>
                  <p className="sector-block__desc">{sector.description}</p>
                </div>
              </div>

              <div className="sector-block__tracks">
                {sector.tracks.map((track, ti) => (
                  <div className={`track-card animate-fade-in-up delay-${(ti % 4) + 1}`} key={track.id} style={{ '--track-color': sector.color }}>
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
