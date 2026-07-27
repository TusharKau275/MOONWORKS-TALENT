import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useLenis } from './hooks/useLenis';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import HomePage from './features/home/HomePage';
import AboutPage from './features/about/AboutPage';
import HowItWorksPage from './features/how-it-works/HowItWorksPage';
import ContactPage from './features/contact/ContactPage';
import OpportunitiesPage from './features/opportunities/OpportunitiesPage';

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
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/opportunities" element={<OpportunitiesPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
