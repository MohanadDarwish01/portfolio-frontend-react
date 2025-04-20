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

export default function Nav() {
    const { information } = useInformation();
    const { domain } = useDomain();
    const [showNavbar, setShowNavbar] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();


    const { setActiveId, data } = useCategoriesData();
    const [menu] = useState([
        { icon: <FaShare id={style.icon} />, tagName: 'Social media' },
        { icon: <MdPersonSearch id={style.icon} />, tagName: 'Brand Identity' },
        { icon: <MdWeb id={style.icon} />, tagName: 'Front-End' },
        { icon: <FaPenNib id={style.icon} />, tagName: 'Illustration' },
        { icon: <BsFillPrinterFill id={style.icon} />, tagName: 'Print Design' },
        { icon: <FaEye id={style.icon} />, tagName: 'UI-UX' },
    ]);


    const handleDownload = () => {
        window.open((domain + (information?.resume?.url || '')), "_blank");
    };

    const mergeObjectArrays = (array1, array2) => {

        return array1.map((obj1, index) => {
            const obj2 = array2[index];
            return { ...obj1, ...obj2 }; // Merge the objects using the spread syntax
        });
    }

    const handleScroll = (to) => {
        navigate(`/${to}`); // Update URL
    };


    const openCategory = (categoryPath, id) => {
        navigate("/portfolio/" + categoryPath);
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
                    <img className=" mx-0 mx-sm-4" width={50} src={domain + (information?.logo?.url || '')} alt="" />
                    
                    <div className={`d-none d-lg-flex justify-content-between align-items-center ${style.nav_contenet}`}>
                        <Link className={style.linkDS} onClick={() => handleScroll("home")} id={location.pathname === "/home" || location.pathname === "/" ? style.mark : ""} to="home" smooth={true} duration={20} offset={-40}>home</Link>
                        <Link className={style.linkDS} onClick={() => handleScroll("about")} id={location.pathname === "/about" ? style.mark : ""} to="about" smooth={true} duration={20} offset={-40}>about</Link>
                        {/* <Link className={style.linkDS} onClick={() => handleScroll("services")} id={location.pathname === "/services" ? style.mark : ""} to="services" smooth={true} duration={20} offset={-40}>services</Link> */}



                        <Link className={style.linkDS + " " + style.port} onClick={() => handleScroll("services")} id={location.pathname === "/services" ? style.mark : ""} to="services" smooth={true} duration={20} offset={-40}>

                            <span id={style.arr} >services<TiArrowSortedDown className=" ms-2" /></span>

                            <div id={style.menu}>

                                <div onClick={(e) => (e.stopPropagation())} className={style.input}>

                                    {
                                        mergeObjectArrays(data, menu).map((el) => (
                                            <button key={el.documentId} onClick={() => { openCategory(el.category_path, el.documentId) }} className={style.value}>

                                                {el.icon}
                                                {el.tagName}
                                            </button>
                                        ))
                                    }



                                </div>
                            </div>
                        </Link>




                        <Link className={style.linkDS + " " + style.port} onClick={() => handleScroll("portfolio")} id={location.pathname === "/portfolio" ? style.mark : ""} to="portfolio" smooth={true} duration={20} offset={-40}>

                            <span id={style.arr} >portfolio<TiArrowSortedDown className=" ms-2" /></span>

                            <div id={style.menu}>

                                <div onClick={(e) => (e.stopPropagation())} className={style.input}>

                                    {
                                        mergeObjectArrays(data, menu).map((el) => (
                                            <button key={el.documentId} onClick={() => { openCategory(el.category_path, el.documentId) }} className={style.value}>

                                                {el.icon}
                                                {el.tagName}
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


                    <div className="offcanvas offcanvas-start" data-bs-backdrop="static" tabIndex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="staticBackdropLabel">Offcanvas</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className={`${style.offcanvas_body} offcanvas-body`}>
                            <div>
                                <Link id={style.linkDS} onClick={() => handleScroll("home")} to="home" smooth={true} duration={20} offset={-40}>home</Link>
                                <Link id={style.linkDS} onClick={() => handleScroll("about")} to="about" smooth={true} duration={20} offset={-40}>about</Link>
                                <Link id={style.linkDS} onClick={() => handleScroll("services")} to="services" smooth={true} duration={20} offset={-40}>services</Link>
                                <Link id={style.linkDS} onClick={() => handleScroll("portfolio")} to="portfolio" smooth={true} duration={20} offset={-40}>portfolio</Link>
                                <Link id={style.linkDS} onClick={() => handleScroll("contact")} to="contact" smooth={true} duration={20} offset={-40}>contact</Link>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>

        </main>

    )
}