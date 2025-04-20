import style from './index.module.css'
import { useEffect, useState } from "react";
import { useRoutes } from "../../store";
import { useLocation, useNavigate } from "react-router-dom";
import { scroller } from "react-scroll";
import Nav from "../../components/navBar";
import HeroSection from "../../components/heroSection";
import AboutSec from "../../components/about";
import Services from "../../components/services";
import Skills from "../../components/skills";
import Reviews from "../../components/reviews";
import PerformanceStates from "../../components/performanceStates";
import ContactSec from "../../components/contact";
import Footer from "../../components/footer";
import Clients from "../../components/clients";
import Resume from "../../components/Resume";
import Portfolio from '../../components/portfolio';
import { useScrollToChangeURL } from '../../store/useScroll';
import SocialMediaDesignForm from '../../components/forms/SocialMediaDesignForm';



export default function HomePage() {

    const { acceptedrRoutes } = useRoutes();
    const location = useLocation();
    const section = location.pathname.replace("/", ""); // Get section name

    

    useEffect(() => {



        if (acceptedrRoutes.includes("/" + section)) {
            // console.log(`Scrolling to: ${section}`);

            if (section != "") {
                setTimeout(() => {
                    scroller.scrollTo(section, {
                        smooth: true,
                        duration: 20,
                        offset: -40, // Adjust for navbar height
                    });
                    console.log()
                }, 200);
            }
        }



    }, []);

    useScrollToChangeURL(["home", "about", "services", "portfolio", "contact"]);
    return (



        <div id={style.bg}>
            

            <Nav />
            <HeroSection />
            <AboutSec />
            <Clients />
            <Skills />
            <Resume />
            <Services />
            <Portfolio />
            <Reviews />
            <PerformanceStates />
            <ContactSec />
            <Footer />
        </div>

    )
}