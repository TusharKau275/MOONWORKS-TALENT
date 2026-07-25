import { Link } from 'react-router-dom';
import './Footer.css';

const footerLinks = [
  {
    title: 'Quick Links',
    links: [
      { to: '/', label: 'Home' },
      { to: '/opportunities', label: 'Explore Opportunities' },
      { to: '/about', label: 'About Us' },
      { to: '/how-it-works', label: 'How It Works' },
      { to: '/contact', label: 'Contact Us' },
    ],
  },
  {
    title: 'Internship Tracks',
    links: [
      { to: '/opportunities', label: 'Website Development' },
      { to: '/opportunities', label: 'Graphic Design' },
      { to: '/opportunities', label: 'Social Media Marketing' },
      { to: '/opportunities', label: 'HR' },
      { to: '/opportunities', label: 'Operations' },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="footer" id="site-footer">
      <div className="footer__inner container">
        <div className="footer__top">
          {/* Brand column */}
          <div className="footer__brand">
            <div className="footer__logo">
              <span className="footer__logo-icon">🌙</span>
              <span className="footer__logo-text">
                Moon<span className="footer__logo-accent">works</span> Talent
              </span>
            </div>
            <p className="footer__tagline">
              Unlock Potential. Build Futures.
            </p>
            <p className="footer__desc">
              100% free, remote internships for students and freshers across India. MSME registered & Udyam certified.
            </p>
            <div className="footer__badge">
              <span className="footer__badge-icon">🏛️</span>
              <div className="footer__badge-text">
                <span className="footer__badge-label">MSME Registered</span>
                <span className="footer__badge-sub">Udyam Certified Micro Enterprise</span>
              </div>
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <div className="footer__col" key={col.title}>
              <h4 className="footer__col-title">{col.title}</h4>
              <ul className="footer__col-links">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="footer__col-link">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact column */}
          <div className="footer__col">
            <h4 className="footer__col-title">Get In Touch</h4>
            <ul className="footer__col-links">
              <li>
                <a href="mailto:moonworks.talent@gmail.com" className="footer__col-link">
                  📧 moonworks.talent@gmail.com
                </a>
              </li>
              <li>
                <span className="footer__col-link footer__col-link--static">
                  📍 Haryana, India
                </span>
              </li>
              {/* // TODO(content): Add LinkedIn URL once confirmed by client */}
            </ul>
            <Link to="/contact" className="footer__cta">
              Apply Now — It's Free
            </Link>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            © {new Date().getFullYear()} Moonworks Talent. All rights reserved.
          </p>
          <p className="footer__bottom-tagline">
            Let's Grow Together 💪
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
