import { useEffect, useState } from 'react';
import { useDomain, useExperianceModal } from '../../../../store';
import style from './information.module.css'
import { MdEdit } from 'react-icons/md';
import { FaMinusCircle } from "react-icons/fa";
import Swal from 'sweetalert2';
import axios from 'axios';
import EducationModal from './educationModal';
import ExperienceModal from './experienceModal';

export default function Experience() {
    const { domain } = useDomain();
    const { experianceModalIndex, openExperianceModal, setActiveExperianceToUpdate } = useExperianceModal();
    // const navigate = useNavigate();
    const [experiance, setExperiance] = useState([]);

    const getData = () => {
        let endPoint = "/api/experiences?sort=createdAt:desc";
        let url = domain + endPoint;
        // openLoader();
        setTimeout(() => {
            axios.get(url).then((res) => {
                setExperiance(res.data.data);
                // closeLoader();
            })
        }, 500)
    }

    

    useEffect(() => {
        getData();
    }, [experianceModalIndex]);  

    const formatDate = (date) => {
        const reversedDate = date?.split("-").reverse().join("/");
        return reversedDate;
    }

    const handleDelete = (id, index) => {

        Swal.fire({
            icon: "question",
            text: "Are you sure you want to delete this Education ??",
            confirmButtonText: "Delete",
            cancelButtonText: "No",
            showCancelButton: true,
            showCloseButton: true

        }).then((res) => {
            if (res.isConfirmed) {
                let endPoint = `/api/experiences/${id}`;
                let url = domain + endPoint;
                axios.delete(url)
                let copy = [...experiance];
                copy.splice(index, 1);
                setExperiance(copy);
            }
        })
    }

    const handleUpdate = (id, index) => {
        openExperianceModal()
        let item = experiance?.find((el) => (el.documentId === id));
        console.log(item)
        setActiveExperianceToUpdate(item)
    }

    return (
        <div id={style.clients} className={` col-12  p-3 `}>
            {experianceModalIndex && <ExperienceModal />}
            <h1>Experience</h1>
            <div className={style.buttons}>
                <button onClick={openExperianceModal}>Add New Experience</button>
            </div>

            <div className={style.tableContainer}>
                <table >
                    <thead>
                        <tr className=' text-center'>
                            <th>-</th>
                            <th>Position</th>
                            <th>Company</th>
                            <th>Start date</th>
                            <th>End date</th>
                            <th>Actions</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {
                            experiance?.map((el, index) => (
                                <tr key={el.documentId}>
                                    <td className=' text-center align-middle'>{index + 1}</td>
                                    <td className=' text-center align-middle'>{el.position}</td>
                                    <td className=' text-center align-middle'>{el.company}</td>
                                    <td className=' text-center align-middle'>{formatDate(el.start_date)}</td>
                                    <td className=' text-center align-middle'>{formatDate(el.end_date)}</td>


                                    <td>
                                        <div className={style.actions}>
                                            <MdEdit onClick={() => { handleUpdate(el.documentId, index) }} />
                                            <FaMinusCircle onClick={() => { handleDelete(el.documentId, index) }} />
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