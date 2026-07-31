import { Link } from 'react-router-dom';
import SEO from '../../components/SEO/SEO.jsx';
import { getBreadcrumbSchema } from '../../components/SEO/schemas.js';
import SectionHeader from '../../components/SectionHeader/SectionHeader.jsx';
import './AboutPage.css';

const AboutPage = () => {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
  ]);

  return (
    <main className="about-page animate-fade-in-up delay-1">
      <SEO
        title="About Us — MSME Registered Free Internship Company"
        description="Moonworks Talent is a government-registered MSME (Udyam certified) company offering 100% free, remote internships for students and freshers across India. Learn about our vision, mission, and founder."
        path="/about"
        structuredData={breadcrumbSchema}
      />

      {/* Hero */}
      <section className="about-hero section" id="about-hero">
        <div className="container text-center">
          <span className="eyebrow">About Us</span>
          <h1 className="about-hero__title">
            Free Internships Made <span className="hero__highlight">Accessible</span> for Every Student in India
          </h1>
          <p className="about-hero__subtitle">
            Moonworks Talent is a government-registered MSME (Udyam certified) micro enterprise based in Haryana, India —
            dedicated to making career opportunities completely free, highly accessible, and skill-based for every student and fresher.
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="vm-section section section--alt" id="vision-mission">
        <div className="container">
          <div className="vm-grid">
            <div className="vm-card">
              <div className="vm-card__icon">🔭</div>
              <h3 className="vm-card__title">Our Vision</h3>
              <p className="vm-card__text">
                To make career opportunities completely free, highly accessible, and skill-based for every student and fresher across India.
              </p>
            </div>
            <div className="vm-card">
              <div className="vm-card__icon">🎯</div>
              <h3 className="vm-card__title">Our Mission</h3>
              <p className="vm-card__text">
                Create job-ready talent through practical skill development, 1-on-1 mentorship, and exposure to real-world live projects.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="values section" id="core-values">
        <div className="container">
          <SectionHeader
            eyebrow="What Drives Us"
            title="Our Core Focus Areas"
            subtitle="Everything we do is centered around building real skills and real futures."
            tealEyebrow
          />

          <div className="values__grid">
            {[
              { icon: '📢', title: 'Digital Marketing', desc: 'Learn strategies that drive real engagement and growth across platforms.' },
              { icon: '🤝', title: 'HR & Talent Acquisition', desc: 'Develop people management and recruitment skills from day one.' },
              { icon: '💻', title: 'Web Development', desc: 'Build real web applications using modern frameworks and tools.' },
              { icon: '🎨', title: 'Graphic Design', desc: 'Create professional visuals and build a real design portfolio.' },
              { icon: '⚙️', title: 'Operations', desc: 'Learn how businesses plan, coordinate, and deliver results.' },
              { icon: '🎓', title: 'Student Mentorship', desc: '1-on-1 guidance from experienced professionals in your field.' },
              { icon: '📈', title: 'Career Growth', desc: 'Every track is designed to make you job-ready and employable.' },
            ].map((value) => (
              <div className="value-card" key={value.title}>
                <span className="value-card__icon">{value.icon}</span>
                <h4 className="value-card__title">{value.title}</h4>
                <p className="value-card__desc">{value.desc}</p>
              </div>
            ))}
          </div>

          <p className="values__link-text" style={{ textAlign: 'center', marginTop: 'var(--space-xl)', color: 'var(--text-secondary)' }}>
            Explore all <Link to="/opportunities" style={{ color: 'var(--blue)', fontWeight: 600, textDecoration: 'underline' }}>7 internship tracks →</Link> and find the one that matches your goals.
          </p>
        </div>
      </section>

      {/* Founder */}
      <section className="founder section section--dark" id="founder">
        <div className="container">
          <div className="founder__content text-center">
            <span className="eyebrow" style={{ color: 'var(--amber-light)' }}>Meet the Founder</span>
            <h2 className="founder__title">Indu</h2>
            <p className="founder__role">Founder & CEO, Moonworks Talent</p>
            <p className="founder__bio">
              Driven by the belief that every student deserves access to real career opportunities —
              regardless of their background, connections, or financial situation. Moonworks Talent
              was founded to bridge the gap between education and employment through structured,
              mentored internships that are always 100% free.
            </p>
            {/* // TODO(content): Add founder photo once provided by client */}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="trust section" id="trust-section">
        <div className="container">
          <div className="trust__grid">
            <div className="trust-card">
              <span className="trust-card__icon">🏛️</span>
              <h4 className="trust-card__title">MSME Registered</h4>
              <p className="trust-card__desc">Government registered Micro Enterprise under MSME with valid Udyam certification.</p>
            </div>
            <div className="trust-card">
              <span className="trust-card__icon">🆓</span>
              <h4 className="trust-card__title">100% Free</h4>
              <p className="trust-card__desc">No fees, no hidden charges, no deposits. Our internships are completely free. Always.</p>
            </div>
            <div className="trust-card">
              <span className="trust-card__icon">🏠</span>
              <h4 className="trust-card__title">100% Remote</h4>
              <p className="trust-card__desc">Work from anywhere in India. All internships are fully remote and work-from-home.</p>
            </div>
            <div className="trust-card">
              <span className="trust-card__icon">📜</span>
              <h4 className="trust-card__title">Verified Credentials</h4>
              <p className="trust-card__desc">Certificate of Completion + Experience Letter for all. LOR for top performers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta section section--alt" id="about-cta">
        <div className="container text-center">
          <h2>Ready to Start Your Journey?</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '480px', margin: '16px auto 32px' }}>
            Join Moonworks Talent and get access to free, mentored internships with verified certificates.
            See <Link to="/how-it-works" style={{ color: 'var(--blue)', fontWeight: 600, textDecoration: 'underline' }}>how it works</Link> or apply directly.
          </p>
          <Link to="/contact" className="hero__btn hero__btn--primary">
            Get Started — It's Free <span className="hero__btn-arrow">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
