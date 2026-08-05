import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import Breadcrumbs from './components/Breadcrumbs/Breadcrumbs.jsx';

// Lazy-loaded pages — each becomes a separate JS chunk
const HomePage = lazy(() => import('./features/home/HomePage.jsx'));
const AboutPage = lazy(() => import('./features/about/AboutPage.jsx'));
const HowItWorksPage = lazy(() => import('./features/how-it-works/HowItWorksPage.jsx'));
const ContactPage = lazy(() => import('./features/contact/ContactPage.jsx'));
const OpportunitiesPage = lazy(() => import('./features/opportunities/OpportunitiesPage.jsx'));
const NotFoundPage = lazy(() => import('./features/not-found/NotFoundPage.jsx'));
const AdminPage = lazy(() => import('./features/admin/AdminPage.jsx'));

// Minimal loading fallback — keeps layout stable while chunks load
const PageLoader = () => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh',
    color: 'var(--text-muted)',
    fontSize: '0.9rem',
    fontFamily: 'var(--font-body)',
  }}>
    Loading…
  </div>
);

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const { pathname } = useLocation();
  const isAdminPage = pathname === '/moonworks-admin-panel';

  return (
    <>
      <ScrollToTop />
      {!isAdminPage && <Navbar />}
      {!isAdminPage && <Breadcrumbs />}
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/opportunities" element={<OpportunitiesPage />} />
          <Route path="/moonworks-admin-panel" element={<AdminPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      {!isAdminPage && <Footer />}
    </>
  );
}

export default App;
