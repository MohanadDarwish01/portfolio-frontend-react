import style from './index.module.css';
import Aos from 'aos';
import { useEffect, useState } from 'react';
import RateSkill from './rate';
import { useDomain } from '../../store';
import axios from 'axios';
export default function Skills() {

    const { domain } = useDomain();
    const [skills, setSkills] = useState();
    useEffect(() => {
        let endPoint = "/api/skills";
        let url = domain + endPoint;
        axios.get(url).then((res) => {
            setSkills(res.data.data)
        })

        Aos.init({
            duration: 1200, // You can also set a default easing in all animations
            easing: 'ease-in-out',
            once: true,
        });
    }, []);
    return (
        <div id={style.SkillsSec} className=' w-100  overflow-hidden' >

            <div id={style.title} className=' container'>
                <h4 data-aos="fade-down" >My Skills</h4>
                <h2>My Skills</h2>
            </div>



            <div id={style.content} className=' container' data-aos="fade-down">
                <div id={style.rate}>

                    {
                        skills && skills.map((el ) => (                           
                            <RateSkill key={el.documentId} percentage={el.skill_rate} label={el.skill_name} />
                        ))
                    }

                </div>

            </div>

        </div>
    )
}
