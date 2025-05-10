import style from './services.module.css';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDomain, useServicesAdmin } from '../../../../store';
export default function ServicesTap() {
    const { domain } = useDomain();
    const { setTap, tap } = useServicesAdmin();
    // const navigate = useNavigate();
    const [services, setServices] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");

    // const [active , setActive] = useState([])
    


    const handleRadioChange = (e) => {
        setSelectedCategory(e.target.value)
        setTap(e.target.value);
        let endPoint = "/api/services?sort=createdAt:desc"
        let url = domain + endPoint;


        if (e.target.value === "All") {
            axios.get(url, {
                params:
                {
                    populate: "*",

                }
            }).then((res) => {
                setServices(res.data.data);
            })
        } else if (e.target.value === "Active") {
            axios.get(url, {
                params:
                {
                    populate: "*",
                    'filters[active][$eq]': true,
                }
            }).then((res) => {
                setServices(res.data.data);
            })
        } else if (e.target.value === "Not") {
            axios.get(url, {
                params:
                {
                    populate: "*",
                    'filters[active][$eq]': false,
                }
            }).then((res) => {
                setServices(res.data.data);
            })
        }

    };

    useEffect(() => {

        // let endPoint = "/api/services?sort=createdAt:desc"
        // let url = domain + endPoint;
        // axios.get(url, {
        //     params:
        //     {
        //         populate: "*"
        //     }
        // }).then((res) => {
        //     setServices(res.data.data);
        // })

        let taps = {
            target: {
                value: tap,
            }
        }

        handleRadioChange(taps)

    }, [services]);

    const handleselect = (id, index) => {

        let endPoint = `/api/services/${id}`
        let url = domain + endPoint;
        const activeService = services?.find((el) => (el.documentId === id))
        let data = {
            active: activeService?.active === true ? false : true,
        }


        axios.put(url, { data: data })
        

    }

    return (


        <div id={style.clients} className={` col-12  p-3 `}>

            <h1 className=' mb-4'>Select sercices that match your skills</h1>
            
            {/* <h6>Select sercices that match your skills</h6> */}


            <div className={`${style.tableContainer} mt-0`} >

                <div id={style.filter}>

                    <div className={style.radio_button}>
                        <input
                            type="radio"
                            name="filter"
                            value={"All"}
                            id={`radioall`}
                            onChange={handleRadioChange}
                            checked={selectedCategory === "All"}
                            className={style.radio_button__input}
                        />
                        <label htmlFor={`radioall`} className={style.radio_button__label}>
                            <span className={style.radio_button__custom}></span>
                            All
                        </label>
                    </div>


                    <div className={style.radio_button}>
                        <input
                            type="radio"
                            name="filter"
                            value={"Active"}
                            id={`active`}
                            onChange={handleRadioChange}
                            checked={selectedCategory === "Active"}
                            className={style.radio_button__input}
                        />
                        <label htmlFor={`active`} className={style.radio_button__label}>
                            <span className={style.radio_button__custom}></span>
                            Active
                        </label>
                    </div>



                    <div className={style.radio_button}>
                        <input
                            type="radio"
                            name="filter"
                            value={"Not"}
                            id={`notActive`}
                            onChange={handleRadioChange}
                            checked={selectedCategory === "Not"}
                            className={style.radio_button__input}
                        />
                        <label htmlFor={`notActive`} className={style.radio_button__label}>
                            <span className={style.radio_button__custom}></span>
                            Not Active
                        </label>
                    </div>

                </div>
                <div id={style.content} >

                    {
                        services?.map((el, index) => (
                            <div key={el.documentId} className={`${style.collection} `} onClick={() => { handleselect(el.documentId, index) }} >
                                <div id={el.active == true ? style.activeService : style.card} >
                                    <div id={style.icon}>
                                        <img src={domain + el.service_icon.url} alt="" />
                                    </div>
                                    <h2>{el.service_name}</h2>
                                    <p>
                                        {el.service_description.slice(0, 100) + "....."}
                                    </p>
                                </div>
                            </div>
                        ))
                    }


                </div>
            </div>
        </div>




    )
}
