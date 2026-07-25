import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = { pathname: typeof window !== 'undefined' ? window.location.pathname : '/' };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
