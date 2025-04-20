import style from './index.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';


import { useEffect, useRef, useState } from 'react';
import rev1 from '../../assets/reviews/ibrahim saad.jpg';
import qautesIcon from '../../assets/reviews/qautes.png';
import Aos from 'aos';



export default function Reviews() {
    useEffect(() => {
        Aos.init({
            duration: 1200, // You can also set a default easing in all animations
            easing: 'ease-in-out',
            once: true,
        });
    }, []);


    const [rewiews, setReviews] = useState([

        {
            img: rev1,
            name: 'Ibrahim Saad',
            rev: `"One of the best designers I have dealt with, creative, talented and flexible.I recommend him to others."`,
            email: '',
        },

        {
            img: rev1,
            name: 'Ibrahim Saad',
            rev: `"One of the best designers I have dealt with, creative, talented and flexible.I recommend him to others."`,
            email: '',
        },

        {
            img: rev1,
            name: 'Ibrahim Saad',
            rev: `"One of the best designers I have dealt with, creative, talented and flexible.I recommend him to others."`,
            email: '',
        },

        {
            img: rev1,
            name: 'Ibrahim Saad',
            rev: `"One of the best designers I have dealt with, creative, talented and flexible.I recommend him to others."`,
            email: '',
        },

        {
            img: rev1,
            name: 'Ibrahim Saad',
            rev: `"One of the best designers I have dealt with, creative, talented and flexible.I recommend him to others."`,
            email: '',
        },

        {
            img: rev1,
            name: 'Ibrahim Saad',
            rev: `"One of the best designers I have dealt with, creative, talented and flexible.I recommend him to others."`,
            email: '',
        },

        {
            img: rev1,
            name: 'Ibrahim Saad',
            rev: `"One of the best designers I have dealt with, creative, talented and flexible.I recommend him to others."`,
            email: '',
        },

        {
            img: rev1,
            name: 'Ibrahim Saad',
            rev: `"One of the best designers I have dealt with, creative, talented and flexible.I recommend him to others."`,
            email: '',
        },
    ]);



    return (
        <div id={style.ServicesSec} >

            <div id={style.title} >
                <h4 data-aos="fade-down" >REVIEWS</h4>
                <h2>REVIEWS</h2>
            </div>



            <div id={style.content} className=' container overflow-hidden'>








                <Swiper spaceBetween={20} centeredSlides={false} data-aos="zoom-in" 
                    breakpoints={{
                        425: { slidesPerView: 1 }, // Mobile
                        677: { slidesPerView: 2 }, // Mobile
                        991: { slidesPerView: 2 }, // Tablet
                        1199: { slidesPerView: 3 }, // Desktop

                    }}
                    autoplay={{
                        delay: 3500,
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
                        rewiews.map((el, index) => {

                            if (index < 10) {
                                return (
                                    <SwiperSlide id={style.collectin} key={index} >
                                        <div>
                                            <div id={style.card} >
                                                <div id={style.message}>
                                                    <p> {el.rev} </p>
                                                    <div>
                                                        <img src={qautesIcon} alt="" />
                                                    </div>
                                                </div>
                                                <div id={style.reviewer} className=' d-flex flex-column align-items-center'>
                                                    <div>
                                                        <img src={el.img} alt="" />

                                                    </div>
                                                    <h4>{el.name}</h4>
                                                </div>
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
    )
}
