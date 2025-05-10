import style from './portfolio.module.css'
import { IoIosCloseCircle } from "react-icons/io";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import React, { useState, useEffect } from 'react';
import { Navigation, Thumbs, FreeMode } from 'swiper/modules';
import { useDomain, useProjectsAdmin } from '../../../../store';

export default function ProjectImageModal() {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const { domain } = useDomain();
    const { closeViewModal, activeToView, resetActiveProjectView } = useProjectsAdmin();


    useEffect(() => {

        console.log(activeToView)
        return () => {
            resetActiveProjectView();
        };
    }, [activeToView])


    const sortedArray = [...(activeToView?.project_images)]
    .sort((a, b) => {
        const getNum = name => parseInt(name.match(/\d+/)?.[0] || 0);
        return getNum(a.name) - getNum(b.name);
      });

    return (

        <div className="overlay " onClick={closeViewModal} >


            <div onClick={(e) => { e.stopPropagation() }} id={style.createClient} className='col-10 col-md-6  d-flex flex-column gap-1 items-center shadow animate__animated animate__fadeInDown h-100 '>


                <IoIosCloseCircle onClick={closeViewModal} className={style.closeIcon} />
                {activeToView?.project_name &&
                    <h2 className=' w-full max-w-7/10 text-center'>{activeToView.project_name}</h2>
                }

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
                            {sortedArray?.map((el) => (
                                <SwiperSlide key={el.documentId}>
                                    <div className="flex justify-center  items-center h-[50vh]  ">
                                        <img
                                            src={domain + el.url}
                                            className="max-h-full object-contain  transition-transform duration-300 hover:scale-105"
                                            alt=""
                                        />
                                    </div>
                                </SwiperSlide>
                            ))}
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
                                {sortedArray?.map((el) => (
                                    <SwiperSlide key={el.documentId}>
                                        <img
                                            src={domain + el.url}
                                            className="h-20 w-full object-cover rounded-md border-2 border-transparent hover:border-white cursor-pointer"
                                            alt=""
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

};


