import style from './services.module.css'
import { IoIosCloseCircle } from "react-icons/io";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import React, { useState, useEffect } from 'react';
import { Navigation, Thumbs, FreeMode } from 'swiper/modules';
import { useDomain, useProjectsAdmin, useServicesAdmin } from '../../../../store';

export default function IframeModal({ data }) {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const { domain } = useDomain();
    const { closeIframeModal } = useServicesAdmin();


    const getData = () => {
        const logosUrls = data.logos.map(element => domain + element.url);
        const allAssets = [...logosUrls]

        return allAssets;

    }
    useEffect(() => {
        getData()
    });




    return (

        <div className="overlay " onClick={closeIframeModal} >


            <div onClick={(e) => { e.stopPropagation() }} id={style.createClient} className='col-10 col-md-6  d-flex flex-column gap-1 items-center shadow animate__animated animate__fadeInDown h-100 '>
                <IoIosCloseCircle onClick={closeIframeModal} className={style.closeIcon} />


                <h2 className=' w-full max-w-7/10 text-center'>Refrences</h2>



                <div className="fixed inset-0 top-[100px] flex justify-center items-end px-4 pb-4 pt-0">
                    <div className="relative w-full max-w-6xl rounded-xl overflow-hidden bg-[var(--darker)]  height[calc(100% - 120px)]">



                        <Swiper
                            className="mySwiper2 cursor-pointer "
                            style={{
                                '--swiper-navigation-color': '#fff',
                                '--swiper-pagination-color': '#fff',
                            }}
                            spaceBetween={10}
                            navigation={true}
                            thumbs={{ swiper: thumbsSwiper }}
                            modules={[FreeMode, Navigation, Thumbs]}

                        >


                            {getData().map((url, index) => {
                                const isImage = /\.(png|jpe?g|svg|gif|webp)$/i.test(url);
                                const isPDF = /\.pdf$/i.test(url);

                                return (
                                    <SwiperSlide key={`base-${index}`}>
                                        <div className="flex justify-center items-center h-[50vh] w-full text-white p-4 rounded-lg">
                                            {
                                                isImage ? (
                                                    <img src={url} alt={`media-${index}`} className="max-h-full max-w-full object-contain" />
                                                ) : isPDF && (
                                                    <iframe
                                                        src={url}
                                                        className="w-full h-full"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen

                                                    ></iframe>
                                                )
                                            }
                                        </div>
                                    </SwiperSlide>
                                );
                            })}

                        </Swiper>

                        <div className="p-4 cursor-pointer ">
                            <Swiper
                                onSwiper={setThumbsSwiper}
                                spaceBetween={12}
                                slidesPerView={5}
                                freeMode={true}
                                watchSlidesProgress={true}
                                modules={[FreeMode, Navigation, Thumbs]}
                                className="mySwiper"
                            >
                                {getData().map((el, index) => {

                                    const Image = /\.(png|jpe?g|svg|gif|webp)$/i.test(el);
                                    const PDF = /\.pdf$/i.test(el);

                                    return (
                                        <SwiperSlide key={`media${index}`}>
                                            {
                                                Image ? (
                                                    <img src={el} alt={`media-${index}`} className="h-20 w-full object-cover rounded-md border-2 border-transparent hover:border-white cursor-pointer" />
                                                ) : PDF && (
                                                    <iframe
                                                        src={el}
                                                        className="h-20 w-full object-cover rounded-md border-2 border-transparent hover:border-white pointer-events-none"

                                                    ></iframe>
                                                )
                                            }

                                        </SwiperSlide>
                                    );
                                })}



                            </Swiper>
                        </div>
                    </div>
                </div >
            </div >
        </div >
    );

};



