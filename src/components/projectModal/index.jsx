
import React, { use, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import style from './index.module.css'
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/mousewheel";
import { Mousewheel, Pagination } from "swiper/modules";
import { useDomain, useLoader, useProjectModal } from "../../store";
import { IoClose } from "react-icons/io5";
import Loader from "../loader";
import { useLocation, useNavigate } from "react-router-dom";

export default function ProjectModal({ images }) {
    const { close_loader, loader_index, open_loader } = useLoader();
    const { domain } = useDomain();
    const navegate = useNavigate();
    const location = useLocation()
    const {closeProjectModal} = useProjectModal();

    const sortArrayOfObjectsByCommonValue = (arr, valueKey) => {
        if(arr){
            return arr.sort((a, b) => {
                if (a[valueKey] < b[valueKey]) return -1;
                if (a[valueKey] > b[valueKey]) return 1;
                return 0;
            });
        }
        
    }
    const sortedArray = sortArrayOfObjectsByCommonValue(images, 'name');
    const handleLoader = () => {
        open_loader();
        setTimeout(() => {
            close_loader();
        }, 1200);

    }

    useEffect(() => {
        handleLoader()
    }, [])


    const closeProject = () => {
        navegate( "/" + location.pathname.split('/')[1] + "/" + location.pathname.split('/')[2]);
        closeProjectModal();
    }

    return (
        <div id={style.modal} onClick={() => { closeProject() }}>

            <div className=" d-flex flex-column align-items-center  w-100 gap-3 position-relative">
                <div className=" w-100 " onClick={(e) => { e.stopPropagation() }} >

                    <div id={style.swiperPro} className=" position-relative">
                        {
                        
                        loader_index ? <Loader className=" position-absolute" /> :
                        sortedArray && sortedArray.map((el) => (

                            <div key={el.documentId} className={style.slideStyle}>
                                <img src={domain + el.url} />
                            </div>
                        ))
                        
                        }

                       

                    </div>
                    <button onClick={() => { closeProject() }} id={style.closeBtn} ><IoClose className={style.close} />
                    </button>
                </div>

            </div>


        </div>

    );
}
