import style from './services.module.css'
import { useEffect, useRef, useState } from 'react';
import { useCategoriesData, useDomain, useServicesAdmin } from '../../../../store';
import { IoIosCloseCircle } from "react-icons/io";
import moment from 'moment';
import { FaEye } from 'react-icons/fa';
import { PiLinkSimpleBold } from "react-icons/pi";
import IframeModal from './iframeModal';



export default function RequestModal() {


    const { domain } = useDomain();

    const { closeViewModal, activeToView, resetActiveServiceView , iframeModalIndex , openIframeModal } = useServicesAdmin();




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

            const diffInMs = endDate - startDate;
            return Math.floor(diffInMs / (1000 * 60 * 60 * 24));
        } catch (error) {
            console.error("Error calculating date difference:", error.message);
            return null;
        }
    }







    useEffect(() => {
        return () => {
            resetActiveServiceView();
        };
    }, [activeToView])

    const handleView = () => {
        openIframeModal()
    }

   

    return (
        <div className="overlay " onClick={closeViewModal}>
            {iframeModalIndex && <IframeModal data={activeToView} />}
            <div onClick={(e) => { e.stopPropagation() }} id={style.createClient} className='col-10 col-md-8  d-flex flex-column gap-3 shadow animate__animated animate__fadeInDown  '>
                <IoIosCloseCircle onClick={closeViewModal} className={style.closeIcon} />


                <div>
                    <h2>{activeToView?.client_name}</h2>
                    <h6>{activeToView?.budget_range[0]} $ - {activeToView?.budget_range[1]} $ </h6>
                    <h6>Connect with him via {`( 
                    ${activeToView?.communications?.join(" , ")}
                    
                    )`} </h6>



                    <div id={style.clients} className={` col-12  p-3 `}>
                        <h1 className=' mb-4'>Client information</h1>
                        <div className={`${style.tableContainer} mt-0`} >

                            <table >
                                <thead>
                                    <tr className=' text-center'>
                                        <th>Name</th>
                                        <th>Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className=' text-center align-middle'>{activeToView?.client_name}</td>
                                        <td className=' text-center align-middle'> {activeToView?.client_email} </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div id={style.clients} className={` col-12  p-3 `}>
                        <h1 className=' mb-4'>Brand information</h1>
                        <div className={`${style.tableContainer} mt-0`} >

                            <table >
                                <thead>
                                    <tr className=' text-center'>
                                        
                                        <th>Name</th>
                                        <th>Industry</th>
                                        <th>Target Audience</th>
                                        <th>Platforms</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        
                                        <td className=' text-center align-middle'>{activeToView?.brand_name}</td>
                                        <td className=' text-center align-middle'> {activeToView?.industry_type} </td>
                                        <td className=' text-center align-middle'> {activeToView?.target_audience} </td>
                                        <td className=' align-middle'>
                                            <ul className=' m-0'>
                                                {
                                                    activeToView?.platforms?.map((el, index) => (
                                                        <li key={`platforms ${index}`}>{el}</li>
                                                    ))
                                                }
                                            </ul>
                                        </td>

                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div id={style.clients} className={` col-12  p-3 `}>
                        <h1 className=' mb-4'>Request information</h1>
                        <div className={`${style.tableContainer} mt-0`} >

                            <table >
                                <thead>
                                    <tr className=' text-center'>
                                       
                                        <th>Designs purpose</th>
                                        <th>Post types</th>
                                        <th>Designs No</th>
                                        <th>Typography style</th>
                                        <th>Deadline</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        
                                        <td className=' text-center align-middle'>{activeToView?.designs_purpose}</td>
                                        <td className=' align-middle'>
                                            <ul className=' m-0'>
                                                {
                                                    activeToView?.post_types?.map((el, index) => (
                                                        <li key={`post_type${index}`}>{el}</li>
                                                    ))
                                                }
                                            </ul>
                                        </td>
                                        <td className=' text-center align-middle'> {activeToView?.designs_number} </td>
                                        <td className=' align-middle'>
                                            <ul className=' m-0'>
                                                {
                                                    activeToView?.typography_style?.map((el, index) => (
                                                        <li key={`typography_style${index}`}>{el}</li>
                                                    ))
                                                }
                                            </ul>
                                        </td>
                                        <td className=' text-center align-middle'> {(calculateDaysBetweenDates(getDate(), activeToView?.designs_number.deadline)) > 0 ? (calculateDaysBetweenDates(getDate(), activeToView?.designs_number.deadline)) + ` Day/s` : `Ended`}  </td>


                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>


                    <div id={style.clients} className={` col-12  p-3 `}>
                        <h1 className=' mb-4'>Assets</h1>
                        <div className={`${style.tableContainer} mt-0`} >

                            <table >
                                <thead>
                                    <tr className=' text-center'>
                                        
                                        <th>Files</th>
                                        <th>colors</th>
                                        <th>Fonts</th>
                                        <th>Refrences</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                      
                                        <td className=' d-flex align-items-center justify-content-center text-center'>
                                            {
                                                activeToView?.logos.map((file, index) => (

                                                    index < 4 &&


                                                    <div key={file.documentId} className={style.imges}>
                                                        {
                                                            <img src={domain + file?.url} alt="" />

                                                        }

                                                    </div>


                                                ))


                                            }
                                            <p className=' text-center align-middle m-0'>...</p>
                                        </td>
                                        <td className=' align-middle'>
                                            <ul className=' m-0'>
                                                {
                                                    activeToView?.colors?.map((el, index) => (
                                                        <li key={`color${index}`}>{el}</li>
                                                    ))
                                                }
                                            </ul>
                                        </td>
                                        <td className=' align-middle'>
                                            <ul className=' m-0'>
                                                {
                                                    activeToView?.brand_fonts?.map((el, index) => (
                                                        <li key={`brand_font${index}`}>{el}</li>
                                                    ))
                                                }
                                            </ul>
                                        </td>
                                        <td className='align-middle d-flex flex-wrap justify-content-center gap-3'>

                                            {
                                                activeToView?.links?.map((el, index) => (
                                                    <a className={style.refrences} target='_blank' key={`link${index}`} href={el}> <PiLinkSimpleBold /> </a>

                                                ))
                                            }

                                        </td>

                                        <td>
                                            <div className={`${style.actions} px-3`}>
                                                <FaEye onClick={handleView}/> 

                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>


                    <div id={style.clients} className={` col-12  p-3 `}>
                        <h1 className=' mb-4'>Brand information</h1>
                        <div className={`${style.tableContainer} mt-0`} >

                            <table >
                                <thead>
                                    <tr className=' text-center'>
                                       
                                        <th>Special view</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        
                                        <td className=' text-center align-middle'>

                                            {
                                                activeToView?.requests?.map((el, index) => (
                                                    <div key={`request${index}`}>
                                                        <p>{el}</p>
                                                        <hr />
                                                    </div>

                                                ))
                                            }

                                        </td>

                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>



            </div>

        </div >
    )
}
