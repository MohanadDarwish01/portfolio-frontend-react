import { FaGraduationCap } from 'react-icons/fa6';
import style from './index.module.css';
import experienceIcon from '../../assets/experience/job_icon.png'
import Aos from 'aos';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDomain } from '../../store';


export default function Resume() {
    const { domain } = useDomain();
    const [experience, setExperience] = useState();
    const [education, setEducation] = useState();

    useEffect(() => {

        let endPoint = "/api/experiences";
        let url = domain + endPoint;
        axios.get(url).then((res) => {
            setExperience(res.data.data)
        })


        let endPoint2 = "/api/educations";
        let url2 = domain + endPoint2;
        axios.get(url2).then((res) => {
            setEducation(res.data.data)
        })

        Aos.init({
            duration: 1200, // You can also set a default easing in all animations
            easing: 'ease-in-out',
            once: true,
        });
    }, []);


    const formatDate = (date) => {
        const reversedDate = date?.split("-").reverse().join("/");
        return reversedDate;
    }

    return (
        <div id={style.ServicesSec} className=' w-100 overflow-hidden ' >

            <div id={style.title} className=' container'>
                <h4 data-aos="fade-down" >Resume</h4>
                <h2>Resume</h2>
            </div>


            <div className=' container d-flex flex-column flex-lg-row'>
                <div className={`pe-0 pe-lg-5  ${style.block}`} data-aos="fade-right">
                    <div id={style.resume} className=' ps-3 ps-lg-0'>
                        <FaGraduationCap id={style.resumeIcon} />
                        <h2>Education</h2>
                    </div>

                    <div id={style.allEdu} >



                        {
                            education && education.map((el) => (
                                <div key={el.documentId} id={style.diploma}>
                                    <h3>{el.degree}</h3>
                                    <h6>{el.start_year} - {el.end_year}</h6>
                                    <h4>{el.faculty} <p>{el.university}</p> </h4>
                                    <p>
                                        {el.description}
                                    </p>
                                </div>

                            ))
                        }
                    </div>


                </div>

                <div className={style.block} data-aos="fade-left">
                    <div id={style.resume} className=' ps-3 ps-lg-0'>
                        <img width={30} src={experienceIcon} alt="" />
                        <h2>Experience</h2>
                    </div>

                    <div id={style.allEdu} >

                        {
                            experience && experience.map((el) => (
                                <div key={el.documentId} id={style.diploma}>
                                    <h3>{el.position}</h3>
                                    <h6>{formatDate(el.start_date)} - {formatDate(el.end_date)}</h6>
                                    <h4>{el.company} <p>{el.location}</p> </h4>
                                    <p>
                                        {el.description}
                                    </p>
                                </div>

                            ))
                        }


                    </div>


                </div>
            </div>




        </div >
    )
}
