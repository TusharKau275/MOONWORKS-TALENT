import { Link } from 'react-router-dom';
import SEO from '../../components/SEO/SEO.jsx';
import './NotFoundPage.css';

const NotFoundPage = () => {
  return (
    <main className="not-found-page">
      <SEO
        title="Page Not Found"
        description="The page you're looking for doesn't exist. Return to Moonworks Talent to explore career-building internships for students and freshers."
        path="/404"
      />
      <section className="not-found section">
        <div className="container text-center">
          <div className="not-found__code">404</div>
          <h1 className="not-found__title">Page Not Found</h1>
          <p className="not-found__desc">
            The page you're looking for doesn't exist or has been moved.
            Let's get you back on track.
          </p>
          <div className="not-found__actions">
            <Link to="/" className="hero__btn hero__btn--primary">
              Go to Homepage <span className="hero__btn-arrow">→</span>
            </Link>
            <Link to="/opportunities" className="hero__btn hero__btn--secondary">
              Explore Internships
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default NotFoundPage;
