import { Link } from 'react-router-dom';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import { steps } from '../../data/steps';
import './HowItWorksPage.css';

const faqs = [
  {
    q: 'Is this internship really free?',
    a: 'Yes, 100% free. There are no fees, no hidden charges, no deposits. Moonworks Talent is an MSME-registered company and we never charge interns anything.',
  },
  {
    q: 'What are the duration options?',
    a: 'You can choose from 2, 4, or 6 months. If you\'re interested, you can extend beyond 6 months as well.',
  },
  {
    q: 'Is this a work-from-home internship?',
    a: 'Yes, all internships are 100% remote. You can work from anywhere in India.',
  },
  {
    q: 'Do I need prior experience to apply?',
    a: 'No! We welcome students and freshers at all skill levels. Our internships are designed to teach you from the ground up with mentor guidance.',
  },
  {
    q: 'What documents will I receive?',
    a: 'Every intern who successfully completes the program receives a Certificate of Completion and an Experience Letter. Top performers also receive a Letter of Recommendation (LOR).',
  },
  {
    q: 'How do weekly tasks work?',
    a: 'Each week, your mentor assigns you practical tasks related to your track. You submit your work, receive feedback, and continuously improve. These are real-world tasks, not busywork.',
  },
  {
    q: 'How do I qualify for an LOR?',
    a: 'LORs are awarded to interns who demonstrate exceptional performance, consistency, initiative, and quality work throughout their internship.',
    // TODO(content): Confirm exact LOR criteria with client (Indu) before publishing
  },
  {
    q: 'Is this internship paid?',
    a: 'This is an unpaid internship focused on skill development and career building. You gain real experience, mentorship, and verified credentials — all for free.',
  },
];

const HowItWorksPage = () => {
  return (
    <main className="hiw-page">
      {/* Hero */}
      <section className="hiw-hero section" id="hiw-hero">
        <div className="container text-center">
          <span className="eyebrow">How It Works</span>
          <h1 className="hiw-hero__title">
            From Application to <span className="hero__highlight">Certification</span>
          </h1>
          <p className="hiw-hero__subtitle">
            Your journey with Moonworks Talent is simple, structured, and designed to build real skills. Here's how it works.
          </p>
        </div>
      </section>

      {/* Detailed Steps */}
      <section className="hiw-steps section section--alt" id="hiw-steps">
        <div className="container">
          <div className="hiw-steps__timeline">
            {steps.map((step, i) => (
              <div className="hiw-step" key={step.id}>
                <div className="hiw-step__marker">
                  <div className="hiw-step__number">{step.id}</div>
                  {i < steps.length - 1 && <div className="hiw-step__line"></div>}
                </div>
                <div className="hiw-step__content">
                  <div className="hiw-step__icon">{step.icon}</div>
                  <h3 className="hiw-step__title">{step.title}</h3>
                  <p className="hiw-step__desc">{step.longDesc}</p>
                  <span className="hiw-step__duration">⏱️ {step.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="hiw-deliverables section" id="hiw-deliverables">
        <div className="container">
          <SectionHeader
            eyebrow="Upon Completion"
            title="What Every Intern Receives"
            subtitle="Verified, professional documents you can add to your resume, LinkedIn, and job applications."
            tealEyebrow
          />

          <div className="hiw-del__grid">
            <div className="hiw-del-card">
              <div className="hiw-del-card__header">
                <span className="hiw-del-card__icon">📜</span>
                <h4>Certificate of Completion</h4>
              </div>
              <p>Verified certificate confirming your track, duration, and skills gained.</p>
              <span className="hiw-del-card__tag">All Interns</span>
            </div>
            <div className="hiw-del-card">
              <div className="hiw-del-card__header">
                <span className="hiw-del-card__icon">📋</span>
                <h4>Experience Letter</h4>
              </div>
              <p>Official letter detailing your role, responsibilities, and contributions.</p>
              <span className="hiw-del-card__tag">All Interns</span>
            </div>
            <div className="hiw-del-card hiw-del-card--special">
              <div className="hiw-del-card__header">
                <span className="hiw-del-card__icon">🏆</span>
                <h4>Letter of Recommendation</h4>
              </div>
              <p>Personal recommendation from the founder for outstanding interns.</p>
              <span className="hiw-del-card__tag hiw-del-card__tag--gold">Top Performers</span>
            </div>
          </div>
        </div>
      </section>

      {/* Duration Options */}
      <section className="hiw-duration section section--dark" id="hiw-duration">
        <div className="container text-center">
          <SectionHeader
            eyebrow="Flexible Duration"
            title="Choose Your Timeline"
            subtitle="Pick the duration that works best for your schedule and goals."
            dark
          />

          <div className="hiw-dur__grid">
            <div className="hiw-dur-card">
              <div className="hiw-dur-card__months">2</div>
              <div className="hiw-dur-card__label">months</div>
              <p className="hiw-dur-card__desc">Perfect for a quick skills boost during semester breaks.</p>
            </div>
            <div className="hiw-dur-card hiw-dur-card--popular">
              <div className="hiw-dur-card__badge">Most Popular</div>
              <div className="hiw-dur-card__months">4</div>
              <div className="hiw-dur-card__label">months</div>
              <p className="hiw-dur-card__desc">The sweet spot — enough time to build real skills and complete meaningful projects.</p>
            </div>
            <div className="hiw-dur-card">
              <div className="hiw-dur-card__months">6</div>
              <div className="hiw-dur-card__label">months</div>
              <p className="hiw-dur-card__desc">Deep dive into your track. Maximum learning and the best chance at an LOR.</p>
            </div>
          </div>

          <p className="hiw-dur__note">
            Want to continue beyond 6 months? You can extend your internship if you're interested.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="hiw-faq section" id="hiw-faq">
        <div className="container">
          <SectionHeader
            eyebrow="FAQ"
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about interning with Moonworks Talent."
          />

          <div className="faq__list">
            {faqs.map((faq, i) => (
              <details className="faq-item" key={i}>
                <summary className="faq-item__question">
                  <span>{faq.q}</span>
                  <span className="faq-item__arrow">▸</span>
                </summary>
                <p className="faq-item__answer">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="hiw-cta section section--alt" id="hiw-cta">
        <div className="container text-center">
          <h2>Ready to Take the First Step?</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '480px', margin: '16px auto 32px' }}>
            Apply now and start your internship journey with Moonworks Talent. It takes less than 2 minutes.
          </p>
          <Link to="/contact" className="hero__btn hero__btn--primary">
            Apply Now — It's Free <span className="hero__btn-arrow">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default HowItWorksPage;
