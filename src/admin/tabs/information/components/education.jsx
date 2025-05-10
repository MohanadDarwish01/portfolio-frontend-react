import { useEffect, useState } from 'react';
import { useDomain, useEducationModal } from '../../../../store';
import style from './information.module.css'
import { MdEdit } from 'react-icons/md';
import { FaMinusCircle } from "react-icons/fa";
import Swal from 'sweetalert2';
import axios from 'axios';
import EducationModal from './educationModal';

export default function Education() {
    const { domain } = useDomain();
    const { educationModalIndex, openEducationModal, setActiveEducationToUpdate } = useEducationModal();
    // const navigate = useNavigate();
    const [education, setEducation] = useState([]);

    const getData = () => {
        let endPoint = "/api/educations?sort=createdAt:desc";
        let url = domain + endPoint;
        // openLoader();
        setTimeout(() => {
            axios.get(url).then((res) => {
                setEducation(res.data.data);
                // closeLoader();
            })
        }, 500)
    }

    useEffect(() => {
        getData();
    }, [educationModalIndex]);  

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
                let endPoint = `/api/educations/${id}`;
                let url = domain + endPoint;
                axios.delete(url)
                let copy = [...education];
                copy.splice(index, 1);
                setEducation(copy);
            }
        })
    }

    const handleUpdate = (id, index) => {
        openEducationModal()
        let item = education?.find((el) => (el.documentId === id));
        console.log(item)
        setActiveEducationToUpdate(item)
    }

    return (
        <div id={style.clients} className={` col-12  p-3 `}>
            {educationModalIndex && <EducationModal />}
            <h1>Education</h1>
            <div className={style.buttons}>
                <button onClick={openEducationModal}>Add New Education</button>
            </div>

            <div className={style.tableContainer}>
                <table >
                    <thead>
                        <tr className=' text-center'>
                            <th>-</th>
                            <th>Dgree</th>
                            <th>University</th>
                            <th>Start year</th>
                            <th>End year</th>
                            <th>Actions</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {
                            education?.map((el, index) => (
                                <tr key={el.documentId}>
                                    <td className=' text-center align-middle'>{index + 1}</td>
                                    <td className=' text-center align-middle'>{el.degree}</td>
                                    <td className=' text-center align-middle'>{el.university}</td>
                                    <td className=' text-center align-middle'>{el.start_year}</td>
                                    <td className=' text-center align-middle'>{el.end_year}</td>


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