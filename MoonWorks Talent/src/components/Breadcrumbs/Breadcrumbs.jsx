import { Link, useLocation } from 'react-router-dom';
import './Breadcrumbs.css';

const routeLabels = {
  '/': 'Home',
  '/about': 'About Us',
  '/opportunities': 'Explore Programmes',
  '/how-it-works': 'How It Works',
  '/contact': 'Contact',
};

const Breadcrumbs = () => {
  const { pathname } = useLocation();

  // Don't show breadcrumbs on homepage
  if (pathname === '/') return null;

  const label = routeLabels[pathname] || 'Page';

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol className="breadcrumbs__list" itemScope itemType="https://schema.org/BreadcrumbList">
        <li
          className="breadcrumbs__item"
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
        >
          <Link to="/" className="breadcrumbs__link" itemProp="item">
            <span itemProp="name">Home</span>
          </Link>
          <meta itemProp="position" content="1" />
        </li>
        <li
          className="breadcrumbs__item breadcrumbs__item--current"
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
          aria-current="page"
        >
          <span itemProp="name">{label}</span>
          <meta itemProp="position" content="2" />
        </li>
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
