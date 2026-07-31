import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO/SEO.jsx';
import { getBreadcrumbSchema } from '../../components/SEO/schemas.js';
import { allTracks } from '../../data/tracks.js';
import './ContactPage.css';

const API_URL = import.meta.env.VITE_API_URL || '';

const ContactPage = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    track_interest: '',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.name.trim()) return 'Please enter your name.';
    if (!form.email.trim()) return 'Please enter your email.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Please enter a valid email address.';
    if (!form.track_interest) return 'Please select an internship track.';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      setErrorMsg(err);
      setStatus('error');
      return;
    }

    setStatus('sending');
    setErrorMsg('');

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source_page: 'contact' }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || 'Something went wrong. Please try again.');
      }

      setStatus('success');
      setForm({ name: '', email: '', track_interest: '', message: '' });
    } catch (err) {
      setErrorMsg(err.message || 'Network error. Please check your connection and try again.');
      setStatus('error');
    }
  };

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Contact & Apply', path: '/contact' },
  ]);

  return (
    <main className="contact-page animate-fade-in-up delay-1">
      <SEO
        title="Apply for Free Internship — Contact Moonworks Talent"
        description="Apply for a 100% free, remote internship at Moonworks Talent. Choose from 7 tracks including Web Dev, HR, Marketing, Design & more. Get certificates & experience letters. Apply in 2 minutes!"
        path="/contact"
        structuredData={breadcrumbSchema}
      />

      {/* Hero */}
      <section className="contact-hero section" id="contact-hero">
        <div className="container text-center ">
          <span className="eyebrow">Get In Touch</span>
          <h1 className="contact-hero__title animate-fade-in-up delay-1">
            Apply for a Free <span className="hero__highlight">Remote Internship</span>
          </h1>
          <p className="contact-hero__subtitle animate-fade-in-up delay-2">
            Ready to apply? Have a question? Fill out the form below and we'll get back to you quickly.
            Not sure which track to choose? <Link to="/opportunities" style={{ color: 'var(--blue)', fontWeight: 600, textDecoration: 'underline' }}>Explore all 7 internship tracks</Link>.
          </p>
        </div>
      </section>

      {/* Form + Info */}
      <section className="contact-main section section--alt animate-fade-in-up delay-2" id="contact-form-section">
        <div className="container">
          <div className="contact-grid">
            {/* Form */}
            <div className="contact-form-wrapper">
              <h2 className="contact-form__title">Apply For Internship & Join Us</h2>
              <p className="contact-form__subtitle">
                Fill in your details and select the track you're interested in. We'll reach out with next steps.
                Learn <Link to="/how-it-works" style={{ color: 'var(--blue)', textDecoration: 'underline' }}>how the process works</Link>.
              </p>

              {status === 'success' ? (
                <div className="contact-success" id="contact-success">
                  <div className="contact-success__icon">🎉</div>
                  <h3>Application Submitted!</h3>
                  <p>
                    Thanks for reaching out! We've received your application and will get back to you within 2-3 working days.
                  </p>
                  <button 
                    type="button"
                    className="hero__btn hero__btn--secondary"
                    onClick={() => setStatus('idle')}
                    style={{ marginTop: '24px' }}
                  >
                    Submit Another
                  </button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit} id="contact-form" noValidate>
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-input"
                      placeholder="e.g. Priya Sharma"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-input"
                      placeholder="e.g. priya@example.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="track_interest" className="form-label">Internship Track *</label>
                    <select
                      id="track_interest"
                      name="track_interest"
                      className="form-input form-select"
                      value={form.track_interest}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a track...</option>
                      {allTracks.map((track) => (
                        <option key={track.id} value={track.title}>
                          {track.sectorIcon} {track.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message" className="form-label">Message (optional)</label>
                    <textarea
                      id="message"
                      name="message"
                      className="form-input form-textarea"
                      placeholder="Tell us about yourself, your goals, or any questions you have..."
                      rows="4"
                      value={form.message}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  {status === 'error' && (
                    <div className="form-error" id="form-error" role="alert">
                      {errorMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="hero__btn hero__btn--primary form-submit"
                    disabled={status === 'sending'}
                    id="contact-submit"
                  >
                    {status === 'sending' ? 'Submitting...' : 'Submit Application'}
                    {status !== 'sending' && <span className="hero__btn-arrow">→</span>}
                  </button>
                </form>
              )}
            </div>

            {/* Info sidebar */}
            <div className="contact-info">
              <div className="contact-info-card">
                <h4 className="contact-info-card__title"> Email Us</h4>
                <address style={{ fontStyle: 'normal' }}>
                  <a href="mailto:moonworks.talent@gmail.com" className="contact-info-card__link">
                    moonworks.talent@gmail.com
                  </a>
                </address>
              </div>

              <div className="contact-info-card">
                <h4 className="contact-info-card__title"> Location</h4>
                <address style={{ fontStyle: 'normal' }}>
                  <p className="contact-info-card__text">Haryana, India</p>
                </address>
              </div>

              <div className="contact-info-card">
                <h4 className="contact-info-card__title"> Response Time</h4>
                <p className="contact-info-card__text">We typically respond within 1-2 working days.</p>
              </div>

              {/* Trust badge */}
              <div className="contact-trust">
                <div className="contact-trust__badge">
                  <span className="contact-trust__icon"></span>
                  <div>
                    <span className="contact-trust__label">MSME Registered</span>
                    <span className="contact-trust__sub">Udyam Certified Micro Enterprise</span>
                  </div>
                </div>
                <ul className="contact-trust__list">
                  <li>100% Free — No hidden charges</li>
                  <li>100% Remote — Work from home</li>
                  <li>Verified Certificates issued</li>
                  <li>Real mentored projects</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
