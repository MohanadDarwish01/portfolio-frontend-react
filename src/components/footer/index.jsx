import style from './index.module.css'
import footerPhoto from '../../assets/footerBg.jpg'
import designerPhoto from '../../assets/honda3.png'
import React from "react";
import { FaLinkedinIn, FaFacebookF, FaGithub, FaTiktok, FaInstagram, FaWhatsapp } from 'react-icons/fa6';
import { Typewriter } from 'react-simple-typewriter';
import { Element } from 'react-scroll';


export default function Footer() {
  return (

    <div id={style.footerContent} >

      <div className=' position-relative container '>
        <div className=' text-center d-flex flex-column align-items-center'>

          <div className={style.card}>
            <a className={`${style.socialContainer} ${style.containerOne}`} target='_blank' href='https://www.linkedin.com/in/mohanaddarwish01/'>
              <div className={`${style.socialSvg}`}>
                <FaLinkedinIn className={`${style.icon}`} />
              </div>
            </a>

            <a className={`${style.socialContainer} ${style.containerTwo}`} target='_blank' href='https://github.com/MohanadDarwish01'>
              <div className={`${style.socialSvg}`}>
                <FaGithub className={`${style.icon}`} />
              </div>
            </a>

            <a className={`${style.socialContainer} ${style.containerThree}`} target='_blank' href='https://www.facebook.com/profile.php?id=61552527037852'>
              <div className={`${style.socialSvg}`}>
                <FaFacebookF className={`${style.icon}`} />
              </div>
            </a>

            <a className={`${style.socialContainer} ${style.containerFour}`} target='_blank' href='https://www.tiktok.com/@mohanaddarwish60?lang=en'>
              <div className={`${style.socialSvg}`}>
                <FaTiktok className={`${style.icon}`} />
              </div>
            </a>

            <a className={`${style.socialContainer} ${style.containerFive}`} target='_blank' href='https://www.instagram.com/mohanaddarwish01/'>
              <div className={`${style.socialSvg}`}>
                <FaInstagram className={`${style.icon}`} />
              </div>
            </a>
            <a className={`${style.socialContainer} ${style.containerSix}`} target='_blank' href="https://wa.me/201117521556?text=Hello%2C%20I'm%20interested!">
              <div className={`${style.socialSvg}`}>
                <FaWhatsapp className={`${style.icon}`} />
              </div>
            </a>
          </div>



          <p>
            © 2025. Designed by Mohanad Darwish. All right reserved.
          </p>

        </div>



      </div>


    </div>

  )
}
