import style from './index.module.css';
import Aos from 'aos';
import { useEffect } from 'react';
export default function Skills() {

    useEffect(() => {

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

                <div className=' d-flex flex-wrap flex-lg-nowrap  my-5'>
                    <div id={style.skill} className=' col-12 col-md-6  px-0 px-md-2'>
                        <p className={style.psTitle}>Photoshop</p>
                        <span className={style.psRate}></span>
                    </div>
                    <div id={style.skill} className=' col-12 col-md-6  px-0 px-md-2 '>
                        <p className={style.aiTitle}>Illustrator</p>
                        <span className={style.aiRate}></span>
                    </div>
                </div>


                <div className=' d-flex flex-wrap flex-lg-nowrap my-5'>
                    <div id={style.skill} className=' col-12 col-md-6  px-0 px-md-2'>
                        <p className={style.htmlTitle}>HTML</p>
                        <span className={style.htmlRate}></span>
                    </div>
                    <div id={style.skill} className=' col-12 col-md-6  px-0 px-md-2 '>
                        <p className={style.cssTitle}>CSS</p>
                        <span className={style.cssRate}></span>
                    </div>
                </div>


                <div className=' d-flex flex-wrap flex-lg-nowrap my-5'>
                    <div id={style.skill} className=' col-12 col-md-6  px-0 px-md-2'>
                        <p className={style.jsTitle}>Java Script</p>
                        <span className={style.jsRate}></span>
                    </div>
                    <div id={style.skill} className=' col-12 col-md-6  px-0 px-md-2 '>
                        <p className={style.reactTitle}>React</p>
                        <span className={style.reactRate}></span>
                    </div>
                </div>

                <div className=' d-flex flex-wrap flex-lg-nowrap my-5'>
                    <div id={style.skill} className=' col-12 col-md-6  px-0 px-md-2'>
                        <p className={style.xdTitle}>XD</p>
                        <span className={style.xdRate}></span>
                    </div>
                    <div id={style.skill} className=' col-12 col-md-6  px-0 px-md-2 '>
                        <p className={style.figmaTitle}>Figma</p>
                        <span className={style.figmaRate}></span>
                    </div>
                </div>




            </div>

        </div>
    )
}
