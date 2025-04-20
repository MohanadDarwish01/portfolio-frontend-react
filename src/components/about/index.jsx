import style from './index.module.css';
import honda from '../../assets/honda5.png';
import { Element } from 'react-scroll';
import Aos from 'aos';
import { useEffect } from 'react';
import cv from '../../assets/cv/Mohanad-Darwish.pdf'
import { useDomain, useInformation } from '../../store';
import { FaEye } from 'react-icons/fa6';

// import honda2 from '../../assets/honda2.png';
export default function AboutSec() {
  const { information } = useInformation();
  const { domain } = useDomain();
  useEffect(() => {
    Aos.init({
      duration: 1200, // You can also set a default easing in all animations
      easing: 'ease-in-out',
      once: true,
    });

    console.log(information)
  }, []);



  const handleDownload = () => {
    window.open((domain + (information?.resume?.url || '')), "_blank");
  };

  const formatDate = () => {
    const originalDate = information?.birth_date;
    const reversedDate = originalDate?.split("-").reverse().join("/");
    return reversedDate;
  }

  return (

    <Element name='about' id='about' >


      <div id={style.AboutSec} className=' w-100 overflow-hidden' >
        <div id={style.title} className=' container'>
          <h4 data-aos="fade-down" >About Me</h4>
          <h2 >About Me</h2>
        </div>



        <div id={style.content} className=' container'>
          <div className='d-flex flex-column flex-lg-row align-items-center justify-content-between'>
            <div id={style.img} data-aos="zoom-in" data-aos-duration="1400" >
              <img src={domain + (information?.about_image?.url || '')} alt="" />
            </div>
            <div id={style.aboutContent} className=' col-12 col-lg-7 ' >
              <div>

                <div data-aos="zoom-in-left">
                  <h2>Hi There! I'm <span>{information?.admin_name}</span></h2>
                  <h4>
                    {
                      information?.job_titles?.map((el, index) => (
                        `${el + ((index != information.job_titles.length - 1) ? " | " : "")}`
                      ))
                    }
                  </h4>

                  {
                    information?.long_description?.map((el, index) => (
                      <p key={index}>{el}<br /></p>
                    ))
                  }

                  <ul>
                    <li>
                      <span id={style.label} >Birthday</span>
                      <span>:</span>
                      <span id={style.info} >{formatDate()}</span>
                    </li>

                    <li>
                      <span id={style.label} >Phone</span>
                      <span>:</span>
                      <span id={style.info} >+ {information?.phone}</span>
                    </li>

                    <li className={` d-flex  ${style.gmail} `} >
                      <span id={style.label} >Email</span>
                      <span>:</span>
                      <span id={style.info}  >{information?.email}</span>
                    </li>

                    <li>
                      <span id={style.label} >From</span>
                      <span>:</span>
                      <span id={style.info} >{information?.country}</span>
                    </li>

                    <li>
                      <span id={style.label} >Freelance</span>
                      <span>:</span>
                      <span id={style.info} >{information?.freelance_state}</span>
                    </li>
                  </ul>


                </div>

                <div className=' d-flex d-sm-block align-items-center ' data-aos="zoom-in" >
                  <button className={`${style.button} d-flex`} type="button " onClick={handleDownload}>
                    <span className={`${style.button__text}`}>Resume</span>
                    <span className={`${style.button__icon}`}>
                      <FaEye />
                    </span>
                  </button>
                </div>



              </div>
            </div>
          </div>
        </div>

      </div>
    </Element>
  )
}

