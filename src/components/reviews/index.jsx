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
import axios from 'axios';
import { useDomain } from '../../store';
import { MdOutlineAddPhotoAlternate } from 'react-icons/md';
import { IoPerson } from 'react-icons/io5';



export default function Reviews() {
    const { domain } = useDomain();

    const [rewiews, setReviews] = useState([

        // {
        //     img: rev1,
        //     name: 'Ibrahim Saad',
        //     rev: `"One of the best designers I have dealt with, creative, talented and flexible.I recommend him to others."`,
        //     email: '',
        // },

       
    ]);
    useEffect(() => {

        let endPoint = "/api/reviews";
        let url = domain + endPoint ;
        axios.get(url , {
            params: { populate: "*" }
        }).then((res)=>{
            setReviews(res.data.data)
        })

        Aos.init({
            duration: 1200, // You can also set a default easing in all animations
            easing: 'ease-in-out',
            once: true,
        });
    }, []);


    



    return (
        <div id={style.ServicesSec} >

            <div id={style.title} >
                <h4 data-aos="fade-down" >REVIEWS</h4>
                <h2>REVIEWS</h2>
            </div>



            <div id={style.content} className=' container overflow-hidden' data-aos="zoom-in">








                <Swiper spaceBetween={20} centeredSlides={false}  
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

                    loop={rewiews.length > 3 ? true : false}
                    navigation={false}
                    modules={[Autoplay, Pagination]}
                    className={` ${style.mySwiper}  position-relative overflow-visible `}
                >


                    {
                        rewiews && rewiews.map((el, index) => {

                            if (index < 10) {
                                return (
                                    <SwiperSlide id={style.collectin} key={el.documentId} >
                                        <div>
                                            <div id={style.card} >
                                                <div id={style.message}>
                                                    <p> {` " ${el.review} " `} </p>
                                                    <div>
                                                        <img src={qautesIcon} alt="" />
                                                    </div>
                                                </div>
                                                <div id={style.reviewer} className=' d-flex flex-column align-items-center'>
                                                    <div>
                                                        {
                                                            el.reviewer_image ?
                                                            <img src={domain + el.reviewer_image.url} alt="" />
                                                            :
                                                            <IoPerson className={style.avatar} />
                                                        }
                                                        

                                                    </div>
                                                    <h4>{el.reviewer_name}</h4>
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
