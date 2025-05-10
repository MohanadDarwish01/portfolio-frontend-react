import style from './index.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination } from 'swiper/modules';
import { RiTeamFill } from 'react-icons/ri';
import { useEffect, useState } from 'react';
import Aos from 'aos';
import { useDomain } from '../../store';
import axios from 'axios';
export default function Clients() {
    const { domain } = useDomain();
    const [cards, setCards] = useState([]);
    const getClients = () => {

        let endPoint = "/api/clients";
        let url = domain + endPoint;
        axios.get(url, {
            params: { populate: "*" }
        }).then((res) => {
            setCards(res.data.data)
        })
    }
    useEffect(() => {

        getClients()

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

                        loop={cards.length > 3 ? true : false}
                        navigation={false}
                        modules={[Autoplay, Pagination]}
                        className={` ${style.mySwiper}  position-relative overflow-visible `}
                    >








                        {
                            cards && cards.map((el, index) => {

                                if (index < 10) {
                                    return (
                                        <SwiperSlide key={el.documentId} className=' overflow-visible ' >
                                            <div>
                                                <div id={style.card} >
                                                    <span></span>
                                                    <div id={style.icon}>
                                                        {
                                                            el.client_image ? <img src={domain + el.client_image.url} alt="" />
                                                                :
                                                                <RiTeamFill  />
                                                        }
                                                    </div>
                                                    <h2>{el.name}</h2>
                                                    <ul>
                                                        {

                                                            (el.client_roles).map((e, i) => {
                                                                return (
                                                                    <li key={i}>{e}</li>
                                                                )

                                                            })
                                                        }

                                                    </ul>

                                                    <span id={style.spanTitle} className=' text-center'> {formatDate(el.client_name)}  </span>
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
