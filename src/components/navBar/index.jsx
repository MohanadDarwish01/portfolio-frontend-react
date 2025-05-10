import { IoMenu } from "react-icons/io5";
import style from './index.module.css'
import { useEffect, useState } from "react";
import logo from '../../assets/honda_logo.png'
import { Link } from "react-scroll";
import { useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaPenNib, FaShare } from "react-icons/fa";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { MdPersonSearch, MdWeb } from "react-icons/md";
import { BsFillPrinterFill } from "react-icons/bs";
import { useCategoriesData, useDomain, useInformation } from "../../store";
import cv from '../../assets/cv/Mohanad-Darwish.pdf'
import axios from "axios";

export default function Nav() {
    const { information } = useInformation();
    const { domain } = useDomain();
    const [showNavbar, setShowNavbar] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [services, setServices] = useState();
    const navigate = useNavigate();
    const location = useLocation();


    const { setActiveId, data } = useCategoriesData();
    // const [menu] = useState([
    //     { icon: <FaShare id={style.icon} />, tagName: 'Social media' },
    //     { icon: <MdPersonSearch id={style.icon} />, tagName: 'Brand Identity' },
    //     { icon: <MdWeb id={style.icon} />, tagName: 'Front-End' },
    //     { icon: <FaPenNib id={style.icon} />, tagName: 'Illustration' },
    //     { icon: <BsFillPrinterFill id={style.icon} />, tagName: 'Print Design' },
    //     { icon: <FaEye id={style.icon} />, tagName: 'UI-UX' },
    // ]);


    const handleDownload = () => {
        window.open((domain + (information?.resume?.url || '')), "_blank");
    };

    // const mergeObjectArrays = (array1, array2) => {

    //     return array1.map((obj1, index) => {
    //         const obj2 = array2[index];
    //         return { ...obj1, ...obj2 }; // Merge the objects using the spread syntax
    //     });
    // }


    useEffect(() => {
        let endPoint = "/api/services"
        let url = domain + endPoint;
        axios.get(url, {
            params:
            {
                populate: "*",
                'filters[active][$eq]': true,
            }
        }).then((res) => {
            // console.log(res.data.data)
            setServices(res.data.data);
        })

    }, []);

    const handleScroll = (to) => {

        navigate(`/${to}`); // Update URL
    };


    const openCategory = (categoryPath, id) => {
        navigate("/portfolio/" + categoryPath);
        setActiveId(id);


    }


    const openService = (servicePath, id) => {
        navigate("/services/" + servicePath);
        setActiveId(id);


    }

    useEffect(() => {
        const handleScrollFourse = () => {
            if (window.scrollY == 0) {
                setShowNavbar(false); // Show navbar when scrolling up or near the top
            } else if (window.scrollY > lastScrollY || window.scrollY <= 100 || window.scrollY < lastScrollY) {
                setShowNavbar(true); // Hide navbar when scrolling down
            }
            setLastScrollY(window.scrollY);

        };


        window.addEventListener("scroll", handleScrollFourse);
        return () => window.removeEventListener("scroll", handleScrollFourse);
    }, [lastScrollY]);


    return (


        <main className=" d-flex flex-column align-items-center position-relative w-100">

            <div className={`${style.nav_bar} d-flex justify-content-center z-3 ${showNavbar ? style.navDynamic : ""}`}>
                <nav className={`d-flex justify-content-between align-items-center w-100 container `} >
                    <img className=" mx-0 mx-sm-4" src={domain + (information?.logo?.url || '')} alt="" />

                    <div className={`d-none d-lg-flex justify-content-between align-items-center ${style.nav_contenet}`}>
                        <Link className={style.linkDS} onClick={() => handleScroll("home")} id={location.pathname === "/home" || location.pathname === "/" ? style.mark : ""} to="home" smooth={true} duration={20} offset={-40}>home</Link>
                        <Link className={style.linkDS} onClick={() => handleScroll("about")} id={location.pathname === "/about" ? style.mark : ""} to="about" smooth={true} duration={20} offset={-40}>about</Link>
                        <Link className={style.linkDS + " " + style.port} onClick={() => handleScroll("services")} id={location.pathname === "/services" ? style.mark : ""} to="services" smooth={true} duration={20} offset={-40}>
                            <span id={style.arr} >services<TiArrowSortedDown className=" ms-2" /></span>
                            <div id={style.menu}>
                                <div onClick={(e) => (e.stopPropagation())} className={style.input}>
                                    {
                                        services && services.map((el) => (
                                            <button key={el.documentId} onClick={() => { openService(el.service_path, el.documentId) }} className={style.value}>

                                                {/* {el.icon} */}
                                                {el.service_name}
                                            </button>
                                        ))
                                    }
                                </div>
                            </div>
                        </Link>
                        <Link className={style.linkDS + " " + style.port} onClick={() => handleScroll("portfolio")} id={location.pathname == "/portfolio" ? style.mark : ""} to="portfolio" smooth={true} duration={20} offset={-40}>
                            <span id={style.arr} >portfolio<TiArrowSortedDown className=" ms-2" /></span>
                            <div id={style.menu}>
                                <div onClick={(e) => (e.stopPropagation())} className={style.input}>
                                    {
                                        data && data.map((el) => (
                                            <button key={el.documentId} onClick={() => { openCategory(el.category_path, el.documentId) }} className={style.value}>

                                                {el.category_name}
                                            </button>
                                        ))
                                    }
                                </div>
                            </div>
                        </Link>
                        <Link className={style.linkDS} onClick={() => handleScroll("contact")} id={location.pathname === "/contact" ? style.mark : ""} to="contact" smooth={true} duration={20} offset={-40}>contact</Link>
                    </div>

                    <button className={`${style.button} d-none d-lg-flex`} type="button" onClick={handleDownload}>
                        <span className={`${style.button__text}`}>Resume</span>
                        <span className={`${style.button__icon}`}>
                            <FaEye />
                        </span>
                    </button>

                    <div className="d-flex d-lg-none" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop"><IoMenu className={`${style.menuIcon} `} /></div>


                    <div className={`${ style.sideMenu} offcanvas offcanvas-start vh-100 `}  data-bs-backdrop="static" tabIndex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel">
                        <div className="offcanvas-header bg-[var(--dark)]  ">
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className={`${style.offcanvas_body} offcanvas-body`}>
                            <div className={` ${style.nav_contenet_sm}`}>
                                <Link className={style.linkDS2} onClick={() => handleScroll("home")} id={location.pathname === "/home" || location.pathname === "/" ? style.mark2 : ""} to="home" smooth={true} duration={20} offset={-40}>home</Link>
                                <Link className={style.linkDS2} onClick={() => handleScroll("about")} id={location.pathname === "/about" ? style.mark2 : ""} to="about" smooth={true} duration={20} offset={-40}>about</Link>
                                <Link className={style.linkDS2 + " " + style.port} onClick={(e) => {e.stopPropagation && handleScroll("services")}} id={location.pathname === "/services" ? style.mark2 : ""} to="services" smooth={true} duration={20} offset={-40}>
                                    <span id={style.arr} >services<TiArrowSortedDown className=" ms-2" /></span>
                                    <div id={style.menu2}>
                                        <div onClick={(e) => (e.stopPropagation())} className={style.input2}>
                                            {
                                                services && services.map((el) => (
                                                    <button key={el.documentId} onClick={() => { openService(el.service_path, el.documentId) }} className={style.value}>

                                                        {/* {el.icon} */}
                                                        {el.service_name}
                                                    </button>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </Link>
                                <Link className={style.linkDS2 + " " + style.port} onClick={(e) => {e.stopPropagation && handleScroll("portfolio")}} id={location.pathname == "/portfolio" ? style.mark2 : ""} to="portfolio" smooth={true} duration={20} offset={-40}>
                                    <span id={style.arr} >portfolio<TiArrowSortedDown className=" ms-2" /></span>
                                    <div id={style.menu2}>
                                        <div onClick={(e) => (e.stopPropagation())} className={style.input2}>
                                            {
                                                data && data.map((el) => (
                                                    <button key={el.documentId} onClick={() => { openCategory(el.category_path, el.documentId) }} className={style.value}>

                                                        {el.category_name}
                                                    </button>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </Link>
                                <Link className={style.linkDS2} onClick={() => handleScroll("contact")} id={location.pathname === "/contact" ? style.mark2 : ""} to="contact" smooth={true} duration={20} offset={-40}>contact</Link>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>

        </main>

    )
}