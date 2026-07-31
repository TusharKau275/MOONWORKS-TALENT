import { useEffect } from 'react';

const ScrollToTop = () => {
  const { pathname } = { pathname: typeof window !== 'undefined' ? window.location.pathname : '/' };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
