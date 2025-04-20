import style from './index.module.css';
import uiIcon from '../../assets/services/ui-ux-design.png'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';


import { useEffect, useRef, useState } from 'react';
import jobs1 from '../../assets/clients/minders.png';
import jobs2 from '../../assets/clients/tasaly flex.png';
import jobs3 from '../../assets/clients/sbs.png';
import jobs4 from '../../assets/clients/zoski.png';
import jobs5 from '../../assets/clients/pearl store.png';
import jobs6 from '../../assets/clients/google.png';
import jobs7 from '../../assets/clients/general union.png';
import jobs8 from '../../assets/clients/jobspot.png';
import jobs9 from '../../assets/clients/perfect.png';
import jobs10 from '../../assets/clients/catch code.png';
import jobs11 from '../../assets/clients/sultan al sham.png';
import jobs12 from '../../assets/clients/chocolate family.png';
import jobs13 from '../../assets/clients/florida.png';
import jobs14 from '../../assets/clients/caja store.png';
import Aos from 'aos';
export default function Clients() {

    useEffect(() => {
        Aos.init({
            duration: 1200, // You can also set a default easing in all animations
            easing: 'ease-in-out',
            once: true,
        });
    }, []);

    const [cards, setCards] = useState([

        {
            img: jobs1,
            name: 'minders',
            role: ['Graphic designer member', 'Photography & Video production Member'],
            date: '1 - 2020 TO 11 - 2022'
        },
        {
            img: jobs2,
            name: 'Tasaly Flex',
            role: ['UI-UX Designer ( freelance )'],
            date: '5 - 2022'
        },
        {
            img: jobs3,
            name: 'SBS  Student Activity',
            role: ['raphic  designer  vice  head'],
            date: '9 - 2022 TO 8 - 2023'
        },
        {
            img: jobs4,
            name: 'Zoski Furniture',
            role: ['Graphic  designer & furniture  photographer ( part time )'],
            date: '10 - 2022 TO 7 - 2024'
        },
        {
            img: jobs5,
            name: 'Pearl Store',
            role: ['Graphic  designer ( freelance )'],
            date: '10 - 2022 TO 1 - 2023'
        },
        {
            img: jobs6,
            name: 'Google Developer Student Club',
            role: ['Multimedia  head'],
            date: '11 - 2022 TO 6 - 2023'
        },
        {
            img: jobs7,
            name: 'General Union Of Youth Workers',
            role: ['Graphic designer ( competition )'],
            date: '11 - 2022'
        },
        {
            img: jobs8,
            name: 'JobSpot Application',
            role: ['Graphic designer & UI-UX Designer ( Graduation Project )'],
            date: '5 - 2023'
        },
        {
            img: jobs9,
            name: 'Perfect Company',
            role: ['Graphic  designer ( part time )'],
            date: '6 - 2023 TO 10 - 2023'
        },
        {
            img: jobs10,
            name: 'Catch Code',
            role: ['Graphic  designer ( freelance )'],
            date: '7 - 2023 TO 9 - 2023'
        },
        {
            img: jobs11,
            name: 'Sultan Al Sham',
            role: ['Graphic  designer ( freelance )'],
            date: '9 - 2023 TO 6 - 2024'
        },
        {
            img: jobs12,
            name: 'Chocolate Family',
            role: ['Graphic designer & UI-UX Designer ( freelance )'],
            date: '2 - 2024'
        },
        {
            img: jobs13,
            name: 'Florida Gelato',
            role: ['Motion designer & Ice cream photographer ( freelance ) '],
            date: '3 - 2024'
        },
        {
            img: jobs14,
            name: 'Caja Store',
            role: ['Graphic designer & Video production ( freelance )'],
            date: '3 - 2024'
        },
    ]);



    return (

        <div id={style.exPage} className=' overflow-hidden'>
            <div id={style.ServicesSec} className=' container ' >

                <div id={style.title} >
                    <h4 data-aos="fade-down">Clients</h4>
                    <h2>Clients</h2>
                </div>
                <div className=' d-flex justify-content-between flex-row-reverse w-100 position-relative '>

                    <div className={style.btn} data-aos="zoom-in" >
                        <button className={style.learn_more}>
                            <span className={style.circle} aria_hidden="true">
                                <span className={`${style.icon}  ${style.arrow}`}></span>
                            </span>
                            <span className={style.button_text}>See All</span>
                        </button>

                    </div>

                </div>


                <div id={style.content} className=' container' data-aos="zoom-in" >



                    <Swiper spaceBetween={20} centeredSlides={false}
                        breakpoints={{
                            425: { slidesPerView: 1 }, // Mobile
                            677: { slidesPerView: 2 }, // Mobile
                            991: { slidesPerView: 2 }, // Tablet
                            1199: { slidesPerView: 3 }, // Desktop

                        }}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: true,
                        }}
                        pagination={{
                            clickable: true,
                            type: 'none',
                        }}

                        loop={true}
                        navigation={false}
                        modules={[Autoplay, Pagination]}
                        className={` ${style.mySwiper}  position-relative overflow-visible `}
                    >








                        {
                            cards.map((el, index) => {

                                if (index < 10) {
                                    return (
                                        <SwiperSlide key={index} className=' overflow-visible ' >
                                            <div>
                                                <div id={style.card} >
                                                    <span></span>
                                                    <div id={style.icon}>
                                                        <img src={el.img} alt="" />
                                                    </div>
                                                    <h2>{el.name}</h2>
                                                    <ul>
                                                        {

                                                            (el.role).map((e, i) => {
                                                                return (
                                                                    <li key={i}>{e}</li>
                                                                )

                                                            })
                                                        }

                                                    </ul>

                                                    <span id={style.spanTitle} className=' text-center'> {el.date} </span>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    )
                                }
                            })
                        }






                    </Swiper>

                </div>

            </div >

        </div>

    )
}
