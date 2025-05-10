

import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const useScrollToChangeURL = (sections) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentSectionRef = useRef("");
  const visibleMapRef = useRef({});
  const timeoutRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: Array.from({ length: 101 }, (_, i) => i / 100),
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.id;
        if (entry.isIntersecting) {
          visibleMapRef.current[id] = entry.intersectionRatio;
        } else {
          delete visibleMapRef.current[id];
        }
      });

      // Debounce path updates
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        const sorted = Object.entries(visibleMapRef.current).sort(
          (a, b) => b[1] - a[1]
        );

        if (sorted.length > 0) {
          const [topId] = sorted[0];
          const newPath = `/${topId}`;

          if (
            topId !== currentSectionRef.current &&
            location.pathname !== newPath
          ) {
            currentSectionRef.current = topId;
            navigate(newPath, { replace: true });
          }
        }
      }, 100); // Adjust delay if needed
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      clearTimeout(timeoutRef.current);
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, [sections, navigate, location.pathname]);
};
