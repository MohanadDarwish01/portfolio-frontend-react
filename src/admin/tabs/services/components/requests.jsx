import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDomain, useServicesAdmin } from '../../../../store';
import style from './services.module.css'
import { FaEye, FaMinusCircle } from "react-icons/fa";
import moment from 'moment';
import RequestModal from './requestModal';


export default function MyServices() {
    const { domain } = useDomain();



    const { setActiveTap, activeTap, setActiveServiceToView, viewModalIndex, openViewModal } = useServicesAdmin();
    const [services, setServices] = useState([]);
    const [requests, setRequests] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState();

   

    const handleRadioChange = (e) => {


        setSelectedCategory(e.target.value);
        setActiveTap(e.target.value);


        if (e.target.value === "UI/UX Design") {
            let endPoint = "/api/ui-ux-requests";
            let url = domain + endPoint;
            axios.get(url, {
                params:
                {
                    populate: "*",
                }
            }).then((res) => {
                setRequests(res.data.data)
            })
        } else if (e.target.value === "Social Media & Marketing Design") {
            let endPoint = "/api/social-media-requests";
            let url = domain + endPoint;
            axios.get(url, {
                params:
                {
                    populate: "*",
                }
            }).then((res) => {
                setRequests(res.data.data)
            })
        } else {
            setRequests([])
        }

    };

    const getDate = () => {
        
            const nowDate = moment().add(1, "days").format("L");
            let splitsDate = nowDate.split("/");
            const newDate = splitsDate[2] + "-" + splitsDate[0] + "-" + splitsDate[1];
            return newDate;
    }


    function calculateDaysBetweenDates(startDateStr, endDateStr) {
        try {
          const startDate = new Date(startDateStr);
          const endDate = new Date(endDateStr);
          
        //   if (isNaN(startDate) throw new Error("Invalid start date");
        //   if (isNaN(endDate)) throw new Error("Invalid end date");
          
          const diffInMs = endDate - startDate;
          return Math.floor(diffInMs / (1000 * 60 * 60 * 24));
        } catch (error) {
          console.error("Error calculating date difference:", error.message);
          return null;
        }
      }

    useEffect(() => {

        

        let endPoint = "/api/services?sort=createdAt:desc"
        let url = domain + endPoint;
        axios.get(url, {
            params:
            {
                populate: "*",
                'filters[active][$eq]': true,
            }
        }).then((res) => {
            setServices(res.data.data);
            
            setActiveTap((res.data.data)[0].service_name);
            setSelectedCategory((res.data.data)[0].service_name);
            
        })

        

    }, []);

    useEffect(() => {

        

        let taps = {
            target: {
                value: activeTap,
            }
        }

        handleRadioChange(taps)

    }, [viewModalIndex , selectedCategory]);


    const handleView = (id, index) => {
        openViewModal()
        let item = requests?.find((el) => (el.documentId === id));
        setActiveServiceToView(item)
    }



    return (
        <div id={style.clients} className={` col-12  p-3 `}>
            {viewModalIndex && <RequestModal />}
          
            <h1 className=' mb-4'>Requests</h1>
          

            <div className={`${style.tableContainer} mt-0`} >

                <div id={style.filter}>


                    {services && services.map((el, index) => (

                        <div key={el.documentId} className={style.radio_button}>
                            <input
                                type="radio"
                                name="filter"
                                value={el.service_name}
                                id={`radio-${index}`}
                                onChange={handleRadioChange}
                                checked={selectedCategory === el.service_name}
                                className={style.radio_button__input}
                            />
                            <label htmlFor={`radio-${index}`} className={style.radio_button__label}>
                                <span className={style.radio_button__custom}></span>
                                {el.service_name?.trim().split(' ')[0]}
                            </label>
                        </div>

                    ))}



                </div>




                <table >

                    <thead>
                        <tr className=' text-center'>
                            <th>-</th>
                            <th>Email</th>
                            <th>Brand</th>
                            <th>Industry</th>
                            <th>Deadline</th>
                            <th>Budget</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            requests?.map((el, index) => (
                                <tr key={el.documentId}>
                                    <td className=' text-center align-middle'>{index + 1}</td>
                                    <td className=' text-center align-middle'> {el.client_email} </td>

                                    <td className=' text-center align-middle'> {el.brand_name} </td>
                                    <td className=' text-center align-middle'> {el.industry_type} </td>
                                    <td className=' text-center align-middle'> { (calculateDaysBetweenDates( getDate() , el.deadline )) > 0 ? (calculateDaysBetweenDates( getDate() , el.deadline )) + ` Day/s` : `Ended`}  </td>  
                                    <td className=' text-center align-middle'> {el.budget_range[0]} $ - {el.budget_range[1]} $  </td>
                                    
                                    <td>
                                        <div className={`${style.actions} px-3`}>
                                            <FaEye onClick={() => { handleView(el.documentId, index) }} />
                                            
                                        </div>
                                    </td>
                                </tr>

                            ))
                        }
                    </tbody>

                </table>

            </div>
        </div>
    )
}