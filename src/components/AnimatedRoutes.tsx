import { ReactNode, useEffect, useState } from "react";
import { Routes, useLocation } from "react-router-dom";

/**
 * A wrapper that fades pages in and out when the route changes.
 *
 * It keeps the previous location mounted until the fade-out transition
 * completes, then switches to the new location. The transition is handled
 * entirely with Tailwind utility classes so there's no extra dependency.
 *
 * Usage: <AnimatedRoutes>{/* your <Route> definitions *#/}</AnimatedRoutes>
 */
interface AnimatedRoutesProps {
  children: ReactNode;
}

const AnimatedRoutes = ({ children }: AnimatedRoutesProps) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState<"fadeIn" | "fadeOut">("fadeIn");

  useEffect(() => {
    // use `key` because it changes any time react-router produces a new
    // entry (including query strings or hashes). `pathname` alone would
    // ignore search/hash updates.
    if (location.key !== displayLocation.key) {
      setTransitionStage("fadeOut");
    }
  }, [location, displayLocation]);

  const handleTransitionEnd = () => {
    if (transitionStage === "fadeOut") {
      // after fade-out, swap location and fade back in
      setDisplayLocation(location);
      setTransitionStage("fadeIn");
    }
  };

  // key the wrapper by the location key (fallback to pathname) so the
  // element gets remounted when the active route truly changes.
  const wrapperKey = displayLocation.key || displayLocation.pathname;

  return (
    <div
      key={wrapperKey}
      className={
        "transition-opacity duration-300 ease-in-out " +
        (transitionStage === "fadeIn" ? "opacity-100" : "opacity-0")
      }
      onTransitionEnd={handleTransitionEnd}
    >
      <Routes location={displayLocation}>{children}</Routes>
    </div>
  );
};

export default AnimatedRoutes;
