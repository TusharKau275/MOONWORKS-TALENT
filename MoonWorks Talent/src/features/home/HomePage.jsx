import { Link } from 'react-router-dom';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import { sectors } from '../../data/tracks';
import { technologies } from '../../data/technologies';
import { steps } from '../../data/steps';
import './HomePage.css';

const HomePage = () => {
  return (
    <main>
      {/* ========== HERO ========== */}
      <section className="hero section" id="hero">
        <div className="container">
          <div className="hero__content">
            <div className="hero__badge animate-fade-in-up">
              <span className="hero__badge-icon">🏛️</span>
              <span>MSME Registered & Udyam Certified</span>
            </div>

            <h1 className="hero__title animate-fade-in-up delay-1">
              Unlock Your <span className="hero__highlight">Potential</span>.
              <br />
              Build Your <span className="hero__highlight-teal">Future</span>.
            </h1>

            <p className="hero__subtitle animate-fade-in-up delay-2">
              100% free, remote internships for students and freshers across India.
              Get real experience, mentorship, and verified certificates — no hidden charges, ever.
            </p>

            <div className="hero__actions animate-fade-in-up delay-3">
              <Link to="/contact" className="hero__btn hero__btn--primary" id="hero-get-started">
                Get Started — It's Free
                <span className="hero__btn-arrow">→</span>
              </Link>
              <Link to="/opportunities" className="hero__btn hero__btn--secondary" id="hero-explore">
                Explore Opportunities
              </Link>
            </div>

            <div className="hero__stats animate-fade-in-up delay-4">
              <div className="hero__stat">
                <span className="hero__stat-number">7</span>
                <span className="hero__stat-label">Internship Tracks</span>
              </div>
              <div className="hero__stat-divider"></div>
              <div className="hero__stat">
                <span className="hero__stat-number">100%</span>
                <span className="hero__stat-label">Work From Home</span>
              </div>
              <div className="hero__stat-divider"></div>
              <div className="hero__stat">
                <span className="hero__stat-number">₹0</span>
                <span className="hero__stat-label">Zero Fees</span>
              </div>
            </div>
          </div>

          {/* Orbit decoration */}
          <div className="hero__orbit animate-fade-in delay-3" aria-hidden="true">
            <div className="hero__orbit-ring hero__orbit-ring--1"></div>
            <div className="hero__orbit-ring hero__orbit-ring--2"></div>
            <div className="hero__orbit-ring hero__orbit-ring--3"></div>
            <div className="hero__orbit-dot hero__orbit-dot--1">💻</div>
            <div className="hero__orbit-dot hero__orbit-dot--2">🎨</div>
            <div className="hero__orbit-dot hero__orbit-dot--3">📈</div>
            <div className="hero__orbit-dot hero__orbit-dot--4">🤝</div>
            <div className="hero__orbit-dot hero__orbit-dot--5">⚙️</div>
            <div className="hero__orbit-center">🌙</div>
          </div>
        </div>
      </section>

      {/* ========== EXPLORE OPPORTUNITIES ========== */}
      <section className="opportunities section section--alt" id="opportunities">
        <div className="container">
          <SectionHeader
            eyebrow="Explore Opportunities"
            title="Find Your Perfect Track"
            subtitle="Choose from 7 internship tracks across 5 sectors. Each one is designed to give you real, job-ready skills."
          />

          <div className="opportunities__grid">
            {sectors.map((sector, i) => (
              <div className={`opportunity-card animate-fade-in-up delay-${i + 1}`} key={sector.id} style={{ '--card-color': sector.color }}>
                <div className="opportunity-card__icon">{sector.icon}</div>
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
                  Learn more →
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
            eyebrow="Technologies You'll Master"
            title="Industry-Standard Tools & Tech"
            subtitle="Learn the technologies that companies actually use. Our tracks are built around real-world tools."
            tealEyebrow
          />

          <div className="tech-grid">
            {technologies.map((tech, i) => (
              <div className="tech-card" key={tech.id} style={{ animationDelay: `${i * 0.05}s` }}>
                <span className="tech-card__icon">{tech.icon}</span>
                <span className="tech-card__name">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== HOW IT WORKS ========== */}
      <section className="how-it-works section section--dark" id="how-it-works">
        <div className="container">
          <SectionHeader
            eyebrow="How It Works"
            title="4 Simple Steps to Get Started"
            subtitle="From application to certification — here's your journey with Moonworks Talent."
            dark
          />

          <div className="steps">
            {steps.map((step, i) => (
              <div className="step" key={step.id}>
                <div className="step__number">{step.id}</div>
                <div className="step__icon">{step.icon}</div>
                <h3 className="step__title">{step.title}</h3>
                <p className="step__desc">{step.shortDesc}</p>
                {i < steps.length - 1 && (
                  <div className="step__connector" aria-hidden="true"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== DELIVERABLES ========== */}
      <section className="deliverables section" id="deliverables">
        <div className="container">
          <SectionHeader
            eyebrow="What You Get"
            title="Verified Credentials That Matter"
            subtitle="Every intern receives professionally verified documents upon completion."
          />

          <div className="deliverables__grid">
            <div className="deliverable-card">
              <div className="deliverable-card__icon">📜</div>
              <h4 className="deliverable-card__title">Certificate of Completion</h4>
              <p className="deliverable-card__desc">
                A verified certificate confirming your internship track, duration, and skills gained. Add it to your LinkedIn and resume.
              </p>
            </div>
            <div className="deliverable-card">
              <div className="deliverable-card__icon">📋</div>
              <h4 className="deliverable-card__title">Experience Letter</h4>
              <p className="deliverable-card__desc">
                An official experience letter detailing your role, responsibilities, and contributions during the internship.
              </p>
            </div>
            <div className="deliverable-card deliverable-card--highlight">
              <div className="deliverable-card__badge">⭐ Top Performers</div>
              <div className="deliverable-card__icon">🏆</div>
              <h4 className="deliverable-card__title">Letter of Recommendation</h4>
              <p className="deliverable-card__desc">
                An LOR from the founder for interns who demonstrate exceptional performance, initiative, and consistency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FINAL CTA ========== */}
      <section className="cta-section section section--dark" id="final-cta">
        <div className="container text-center">
          <span className="eyebrow" style={{ color: 'var(--amber-light)' }}>Ready to Begin?</span>
          <h2 className="cta-section__title">
            Your Future Starts With One Step
          </h2>
          <p className="cta-section__subtitle">
            Join hundreds of students building real skills through free, mentored internships. No fees. No catch. Just growth.
          </p>
          <div className="cta-section__actions">
            <Link to="/contact" className="hero__btn hero__btn--primary" id="cta-apply">
              Apply Now — It's Free
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
