import { FaGraduationCap } from 'react-icons/fa6';
import style from './index.module.css';
import experienceIcon from '../../assets/experience/job_icon.png'
import Aos from 'aos';
import { useEffect } from 'react';


export default function Resume() {


    useEffect(() => {
        Aos.init({
            duration: 1200, // You can also set a default easing in all animations
            easing: 'ease-in-out',
            once: true,
        });
    }, []);
    
    return (
        <div id={style.ServicesSec} className=' w-100 overflow-hidden ' >

            <div id={style.title} className=' container'>
                <h4 data-aos="fade-down" >Resume</h4>
                <h2>Resume</h2>
            </div>


            <div className=' container d-flex flex-column flex-lg-row'>
                <div className=' pe-0 pe-lg-5' data-aos="fade-right">
                    <div id={style.resume} className=' ps-3 ps-lg-0'>
                        <FaGraduationCap id={style.resumeIcon} />
                        <h2>Education</h2>
                    </div>

                    <div id={style.allEdu} >

                        <div id={style.diploma}>
                            <h3>Bachelor of Computer Science</h3>
                            <h6>2019 - 2023</h6>
                            <h4>Computers and artificial intelligence <p>Helwan University</p> </h4>
                            <p>
                                Led UI design, developing wireframes, prototypes,
                                and a cohesive visual identity to enhance user experience.
                                Ensured consistency, accessibility, and seamless
                                collaboration with developers.
                            </p>
                        </div>

                        <div id={style.diploma}>
                            <h3>Diploma in Visual Design</h3>
                            <h6>2023 - 2024</h6>
                            <h4>Computers and artificial intelligence <p>Helwan University</p> </h4>
                            <p>
                                Led UI design, developing wireframes, prototypes,
                                and a cohesive visual identity to enhance user experience.
                                Ensured consistency, accessibility, and seamless
                                collaboration with developers.
                            </p>
                        </div>

                        <div id={style.diploma}>
                            <h3>Diploma in Front-end Development</h3>
                            <h6>2024 - 2025</h6>
                            <h4>Computers and artificial intelligence <p>Helwan University</p> </h4>
                            <p>
                                Led UI design, developing wireframes, prototypes,
                                and a cohesive visual identity to enhance user experience.
                                Ensured consistency, accessibility, and seamless
                                collaboration with developers.
                            </p>
                        </div>
                    </div>


                </div>

                <div data-aos="fade-left">
                    <div id={style.resume} className=' ps-3 ps-lg-0'>
                        <img width={30} src={experienceIcon} alt="" />
                        <h2>Experience</h2>
                    </div>

                    <div id={style.allEdu} >

                        <div id={style.diploma}>
                            <h3>Bachelor of Computer Science</h3>
                            <h6>2019 - 2023</h6>
                            <h4>Computers and artificial intelligence <p>Helwan University</p> </h4>
                            <p>
                                Led UI design, developing wireframes, prototypes,
                                and a cohesive visual identity to enhance user experience.
                                Ensured consistency, accessibility, and seamless
                                collaboration with developers.
                            </p>
                        </div>

                        <div id={style.diploma}>
                            <h3>Diploma in Visual Design</h3>
                            <h6>2023 - 2024</h6>
                            <h4>Computers and artificial intelligence <p>Helwan University</p> </h4>
                            <p>
                                Led UI design, developing wireframes, prototypes,
                                and a cohesive visual identity to enhance user experience.
                                Ensured consistency, accessibility, and seamless
                                collaboration with developers.
                            </p>
                        </div>

                        <div id={style.diploma}>
                            <h3>Diploma in Front-end Development</h3>
                            <h6>2024 - 2025</h6>
                            <h4>Computers and artificial intelligence <p>Helwan University</p> </h4>
                            <p>
                                Led UI design, developing wireframes, prototypes,
                                and a cohesive visual identity to enhance user experience.
                                Ensured consistency, accessibility, and seamless
                                collaboration with developers.
                            </p>
                        </div>
                    </div>


                </div>
            </div>




        </div >
    )
}
