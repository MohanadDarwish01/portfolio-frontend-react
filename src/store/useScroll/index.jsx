import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const useScrollToChangeURL = (sections) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.57, // Trigger when 50% of the section is visible
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const newPath = `/${entry.target.id}`;
          if (location.pathname !== newPath) {
            navigate(newPath, { replace: true }); // Change URL without reloading
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
      
    });

    return () => {
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) observer.unobserve(element);
      });
    };
  }, [sections, navigate, location.pathname]);
};
