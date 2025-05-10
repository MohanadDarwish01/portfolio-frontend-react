// import React, { useState, useEffect, useRef } from 'react';
import 'aos/dist/aos.css';
import style from './index.module.css'
import { useInformation } from '../../store';
function StatisticsSection() {
  // const [years, setYears] = useState(0);
  // const [projects, setProjects] = useState(0);
  // const [clients, setClients] = useState(0);
  // const sectionRef = useRef(null); // Reference to the section
  const { information } = useInformation();

  
  // useEffect(() => {

  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach((entry) => {
  //         if (entry.isIntersecting) {
  //           startCounters(); // Start counters when section is visible

  //         }
  //       });
  //     },
  //     { threshold: 0 } // Trigger when 50% of the section is visible
  //   );

  //   if (sectionRef.current) {
  //     observer.observe(sectionRef.current);

  //   }

  //   return () => {
  //     if (sectionRef.current) {
  //       observer.unobserve(sectionRef.current);

  //     }
  //   };
  // }, []);

  // const startCounters = () => {

  //   const yearsTarget = information?.experience_years || 12;
  //   const projectsTarget = information?.projects_no || 80;
  //   const clientsTarget = information?.clients_no || 99;

  //   let yearsCurrent = 0;
  //   let projectsCurrent = 0;
  //   let clientsCurrent = 0;

  //   const increment = 1;
  //   const interval = 50; // Adjust for speed

  //   const yearsInterval = setInterval(() => {
  //     if (yearsCurrent >= yearsTarget) {
  //       clearInterval(yearsInterval);
  //     } else {
  //       yearsCurrent += increment;
  //       setYears(yearsCurrent);
  //     }
  //   }, interval);

  //   const projectsInterval = setInterval(() => {
  //     if (projectsCurrent >= projectsTarget) {
  //       clearInterval(projectsInterval);
  //     } else {
  //       projectsCurrent += increment;
  //       setProjects(projectsCurrent);
  //     }
  //   }, interval);

  //   const clientsInterval = setInterval(() => {
  //     if (clientsCurrent >= clientsTarget) {
  //       clearInterval(clientsInterval);
  //     } else {
  //       clientsCurrent += increment;
  //       setClients(clientsCurrent);
  //     }
  //   }, interval);
  // };

  const years = information?.experience_years || 12;
  const projects = information?.projects_no || 80;
  const clients = information?.clients_no || 99;

  return (
    <section>
      <div className=' container position-relative d-flex justify-content-center'>
        <div id={style.statistics_container}   >
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