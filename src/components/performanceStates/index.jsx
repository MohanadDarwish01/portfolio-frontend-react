import React, { useState, useEffect, useRef } from 'react';
import 'aos/dist/aos.css';
import style from './index.module.css'
function StatisticsSection() {
  const [years, setYears] = useState(0);
  const [projects, setProjects] = useState(0);
  const [clients, setClients] = useState(0);
  const sectionRef = useRef(null); // Reference to the section

  useEffect(() => {

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startCounters(); // Start counters when section is visible
            
          }
        });
      },
      { threshold: 0 } // Trigger when 50% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
      
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
        
      }
    };
  }, []);

  const startCounters = () => {
    const yearsTarget = 12;
    const projectsTarget = 80;
    const clientsTarget = 99;

    let yearsCurrent = 0;
    let projectsCurrent = 0;
    let clientsCurrent = 0;

    const increment = 1;
    const interval = 50; // Adjust for speed

    const yearsInterval = setInterval(() => {
      if (yearsCurrent >= yearsTarget) {
        clearInterval(yearsInterval);
      } else {
        yearsCurrent += increment;
        setYears(yearsCurrent);
      }
    }, interval);

    const projectsInterval = setInterval(() => {
      if (projectsCurrent >= projectsTarget) {
        clearInterval(projectsInterval);
      } else {
        projectsCurrent += increment;
        setProjects(projectsCurrent);
      }
    }, interval);

    const clientsInterval = setInterval(() => {
      if (clientsCurrent >= clientsTarget) {
        clearInterval(clientsInterval);
      } else {
        clientsCurrent += increment;
        setClients(clientsCurrent);
      }
    }, interval);
  };

  return (
    <section>
      <div className=' container position-relative d-flex justify-content-center'>
        <div ref={sectionRef} id={style.statistics_container}   >
          <div className={style.statistic}>
            <span className={style.value}>{years}+</span>
            <span className={style.label}>Years of Experience</span>
          </div>
          <div className={style.statistic}>
            <span className={style.value}>{projects}+</span>
            <span className={style.label}>Projects Completed</span>
          </div>
          <div className={style.statistic}>
            <span className={style.value}>{clients}+</span>
            <span className={style.label}>Clients Worldwide</span>
          </div>

        </div>
        <div className={style.line}></div>
      </div>

    </section>

  );
}

export default StatisticsSection;