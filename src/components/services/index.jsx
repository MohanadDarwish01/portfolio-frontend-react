import style from './index.module.css';
import uiIcon from '../../assets/services/ui-ux-design.png'
import { Element } from 'react-scroll';
import { useEffect, useState } from 'react';
import Aos from 'aos';
import { useNavigate } from 'react-router-dom';
import { useDomain } from '../../store';
import axios from 'axios';
export default function Services() {
    const { domain } = useDomain();
    const navigate = useNavigate();
    const [services, setServices] = useState();
    useEffect(() => {
        Aos.init({
            duration: 1200, // You can also set a default easing in all animations
            easing: 'ease-in-out',
            once: true,
        });

        let endPoint = "/api/services"
        let url = domain + endPoint;
        axios.get(url, {
            params:
            {
                populate: "*"
            }
        }).then((res) => {
            console.log(res.data.data)
            setServices(res.data.data);
        })

    }, []);

    return (
        <Element name='services' id='services' >

            <div id={style.ServicesSec} className=' w-100 overflow-hidden ' >

                <div id={style.title} className=' container'>
                    <h4 data-aos="fade-down" >SERVICES</h4>
                    <h2>SERVICES</h2>
                </div>



                <div id={style.content} className=' container'>
                    {
                        services && services.map((el) => (
                            <div key={el.documentId} className=' col-12 col-sm-6 col-lg-4 ' data-aos="fade-right" onClick={() => { navigate(`/services/${el.service_path}`) }} >
                                <div id={style.card} >
                                    <div id={style.icon}>
                                        <img src={domain + el.service_icon.url} alt="" />
                                    </div>
                                    <h2>{el.service_name}</h2>
                                    <p>
                                        {el.service_description}
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
