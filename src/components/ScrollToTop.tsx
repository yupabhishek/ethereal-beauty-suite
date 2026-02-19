import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop component handles two things:
 * 1. It disables the browser's automatic scroll restoration so the
 *    viewport doesn't jump back to the previous position when navigating.
 * 2. It forces a scroll to the top of the page whenever the route changes.
 *
 * Place this inside a <BrowserRouter> so that `useLocation` works correctly.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in history) {
      // make sure the browser doesn't try to restore the old scroll position
      history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    // always jump to the top on route change; mobile and desktop
    window.scrollTo({ top: 0, left: 0 });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
