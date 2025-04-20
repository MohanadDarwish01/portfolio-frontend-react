import style from './index.module.css'
import heroPhoto from '../../assets/heroBg.jpg'
import designerPhoto from '../../assets/honda3.png'

import React, { useEffect } from "react";
import { FaLinkedinIn, FaFacebookF, FaGithub, FaTiktok, FaInstagram, FaWhatsapp } from 'react-icons/fa6';
import { Typewriter } from 'react-simple-typewriter';
import { Element } from 'react-scroll';
import { useDomain, useInformation } from '../../store';


export default function HeroSection() {
    const { information } = useInformation();
    const { domain } = useDomain();
    const platforms = [...information?.platforms || []];

    const platformMap = {
        linkedin: {
          icon: <FaLinkedinIn className={style.icon} />,
          class: style.containerOne,
        },
        github: {
          icon: <FaGithub className={style.icon} />,
          class: style.containerTwo,
        },
        facebook: {
          icon: <FaFacebookF className={style.icon} />,
          class: style.containerThree,
        },
        tiktok: {
          icon: <FaTiktok className={style.icon} />,
          class: style.containerFour,
        },
        instagram: {
          icon: <FaInstagram className={style.icon} />,
          class: style.containerFive,
        },
        whatsapp: {
          icon: <FaWhatsapp className={style.icon} />,
          class: style.containerSix,
          isWhatsApp: true,
        },
      };
    const handlePlatforms = () => {
        const activePlatforms = platforms.filter(platforms => platforms.trim() !== "");

        return activePlatforms.map((el) => {
            if (el.includes("linkedin.com")) {
                return ["linkedin", el];
            } else if (el.includes("github.com")) {
                return ["github", el];
            } else if (el.includes("facebook.com")) {
                return ["facebook", el];
            } else if (el.includes("tiktok.com")) {
                return ["tiktok", el];
            } else if (el.includes("instagram.com")) {
                return ["instagram", el];
            } else if (!el.includes(".com")) {
                return ["whatsapp", el];
            }

            return null; // or some default icon/component
        })
    }

    
    return (

        <Element name='home' id='home' className='overflow-hidden' >
            <div id={style.heroContent} >
                {/* {console.log(platforms)} */}
                <div className=' position-relative container '>
                    <div className=' text-center d-flex flex-column align-items-center '>
                        <div id={style.designerImg}>
                            <img src={domain + (information?.profile_pic?.url || '')} />
                        </div>

                        <h1 className='  animate__animated animate__zoomInDown '>Hi, I am <span> <Typewriter words={[(information?.admin_name || '...'), ...(information?.job_titles || [])

                        ]} loop={true} typeSpeed={40} cursor cursorStyle='I' /> </span></h1>

                        <p className=' col-10 col-md-8 col-lg-6 animate__animated animate__fadeInUp animate__delay-1s '>
                            {information?.short_description || ''}
                        </p>


                        <div className={` ${style.card} animate__animated animate__backInRight animate__delay-1s animate__slower `} >

                            {
                                handlePlatforms().map((el, index) => {
                                    const [platform, url] = el;
                                    const data = platformMap[platform];
                                  
                                    if (!data) return null;
                                  
                                    const href = data.isWhatsApp ? `https://wa.me/${url.replace(/\s+/g,"")}?text=Hello%2C%20I%27m%20interested!` : url;
                                  
                                    return (
                                      <a
                                        key={index}
                                        className={`${style.socialContainer} ${data.class}`}
                                        target="_blank"
                                        href={href}
                                      >
                                        <div className={style.socialSvg}>{data.icon}</div>
                                      </a>
                                    );
                                  })

                                }
                        </div>
                        <p className='animate__animated animate__fadeInUp animate__delay-1s '>
                            selected work
                            <br />
                            {information?.start_date || ''} - {information?.end_date || ''}
                        </p>

                    </div>

                </div>
                <img id={style.coverImg} src={heroPhoto} />

            </div>
        </Element>
    )
}