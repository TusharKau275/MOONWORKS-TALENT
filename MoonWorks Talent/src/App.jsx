import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useLenis } from './hooks/useLenis.js';
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import Breadcrumbs from './components/Breadcrumbs/Breadcrumbs.jsx';
import HomePage from './features/home/HomePage.jsx';
import AboutPage from './features/about/AboutPage.jsx';
import HowItWorksPage from './features/how-it-works/HowItWorksPage.jsx';
import ContactPage from './features/contact/ContactPage.jsx';
import OpportunitiesPage from './features/opportunities/OpportunitiesPage.jsx';
import NotFoundPage from './features/not-found/NotFoundPage.jsx';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  useLenis();

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Breadcrumbs />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/opportunities" element={<OpportunitiesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
