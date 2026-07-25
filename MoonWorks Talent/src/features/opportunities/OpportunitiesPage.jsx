import { Link } from 'react-router-dom';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import { sectors } from '../../data/tracks';
import './OpportunitiesPage.css';

const OpportunitiesPage = () => {
  return (
    <main className="opp-page">
      {/* Hero */}
      <section className="opp-hero section" id="opp-hero">
        <div className="container text-center">
          <span className="eyebrow">Explore Opportunities</span>
          <h1 className="opp-hero__title">
            Find Your <span className="hero__highlight">Perfect</span> Internship
          </h1>
          <p className="opp-hero__subtitle">
            7 internship tracks across 5 sectors. All 100% free, remote, and mentored. Choose the one that matches your interests.
          </p>
        </div>
      </section>

      {/* Key facts banner */}
      <section className="opp-facts section--alt" id="opp-facts">
        <div className="container">
          <div className="opp-facts__grid">
            <div className="opp-fact">
              <span className="opp-fact__icon">🆓</span>
              <span className="opp-fact__text">100% Free</span>
            </div>
            <div className="opp-fact">
              <span className="opp-fact__icon">🏠</span>
              <span className="opp-fact__text">Work From Home</span>
            </div>
            <div className="opp-fact">
              <span className="opp-fact__icon">📅</span>
              <span className="opp-fact__text">2, 4, or 6 Months</span>
            </div>
            <div className="opp-fact">
              <span className="opp-fact__icon">📜</span>
              <span className="opp-fact__text">Certificate + Letter</span>
            </div>
          </div>
        </div>
      </section>

      {/* All sectors with tracks */}
      <section className="opp-tracks section" id="opp-tracks">
        <div className="container">
          {sectors.map((sector, si) => (
            <div className="sector-block" key={sector.id}>
              <div className="sector-block__header">
                <span className="sector-block__icon">{sector.icon}</span>
                <div>
                  <h2 className="sector-block__title">{sector.name}</h2>
                  <p className="sector-block__desc">{sector.description}</p>
                </div>
              </div>

              <div className="sector-block__tracks">
                {sector.tracks.map((track) => (
                  <div className="track-card" key={track.id} style={{ '--track-color': sector.color }}>
                    <div className="track-card__header">
                      <h3 className="track-card__title">{track.title}</h3>
                      <span className="track-card__duration">📅 {track.duration}</span>
                    </div>
                    <p className="track-card__desc">{track.description}</p>
                    <div className="track-card__skills">
                      <span className="track-card__skills-label">Skills you'll learn:</span>
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
        <div className="container text-center">
          <h2 style={{ color: 'var(--paper-white)' }}>Not Sure Which Track to Choose?</h2>
          <p style={{ color: 'var(--slate-light)', maxWidth: '480px', margin: '16px auto 32px', fontSize: '1.05rem' }}>
            No worries — reach out to us and we'll help you figure out the best fit based on your interests and goals.
          </p>
          <Link to="/contact" className="hero__btn hero__btn--primary">
            Talk To Us <span className="hero__btn-arrow">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default OpportunitiesPage;
