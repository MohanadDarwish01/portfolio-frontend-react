import style from './index.module.css';
import uiImg from '../../assets/categories/ui-ux.jpg'
import icon from '../../assets/categories/share.png'
import { Element } from 'react-scroll';
import { useCategoriesData, useDomain } from '../../store';
import { useNavigate } from 'react-router-dom';
import Aos from 'aos';
import { useEffect } from 'react';
export default function Portfolio() {
    const { data , setActiveId , active_cat_id } = useCategoriesData();
    const { domain } = useDomain();
    const navigate = useNavigate();

    const openCategory = (categoryPath,id) => {
        navigate("/portfolio/" + categoryPath);
        setActiveId(id);
        console.log(active_cat_id)
        

    }

    useEffect(() => {
        Aos.init({
          duration: 1200, // You can also set a default easing in all animations
          easing: 'ease-in-out',
          once: true,
        });
      }, []);

    return (
        <Element name='portfolio' id='portfolio' >

            <div id={style.ServicesSec} className=' w-100 overflow-hidden ' >

                <div id={style.title} className=' container'>
                    <h4 data-aos="fade-down" >Portfolio</h4>
                    <h2>Portfolio</h2>
                </div>



                <div id={style.content} className=' container '>


                    {
                        data && data.map((el ) => (
                            
                            <div key={el.documentId} id={style.card} className=' d-flex flex-column'  onClick={() => { openCategory(el.category_path,el.documentId) }} data-aos="flip-down" data-aos-delay="300"  >
                                <div id={style.frame}>
                                    <img id={style.icon} src={icon} alt="" />
                                
                                    <img id={style.catBG} src={domain + el.category_image.url} />

                                </div>
                                <div id={style.info} >
                                    <h2>{el.category_name}</h2>
                                    <p>
                                        {el.category_description.slice(0, 100) + "....."}
                                    </p>
                                </div>
                            </div>
                            
                        ))
                    }






                </div>

            </div>
        </Element>
    )
}
