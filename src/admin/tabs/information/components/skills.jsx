import { useEffect, useState } from 'react';
import { useDomain, useSkillsModal } from '../../../../store';
import style from './information.module.css'
import { MdEdit } from 'react-icons/md';
import { FaMinusCircle } from "react-icons/fa";
import Swal from 'sweetalert2';
import axios from 'axios';
import SkillsModal from './skillsModal';

export default function Skills() {
    const { domain } = useDomain();
    const { skillsModalIndex, openSkillsModal, setActiveSkillsToUpdate } = useSkillsModal();
    // const navigate = useNavigate();
    const [skills, setSkills] = useState([]);

    const getData = () => {
        let endPoint = "/api/skills?sort=createdAt:desc";
        let url = domain + endPoint;
        // openLoader();
        setTimeout(() => {
            axios.get(url).then((res) => {
                setSkills(res.data.data);
                // closeLoader();
            })
        }, 500)
    }

    useEffect(() => {
        getData();
    }, [skillsModalIndex]);  

    const handleDelete = (id, index) => {

        Swal.fire({
            icon: "question",
            text: "Are you sure you want to delete this Skill ??",
            confirmButtonText: "Delete",
            cancelButtonText: "No",
            showCancelButton: true,
            showCloseButton: true

        }).then((res) => {
            if (res.isConfirmed) {
                let endPoint = `/api/skills/${id}`;
                let url = domain + endPoint;
                axios.delete(url)
                let copy = [...skills];
                copy.splice(index, 1);
                setSkills(copy);
            }
        })
    }

    const handleUpdate = (id, index) => {
        openSkillsModal()
        let item = skills?.find((el) => (el.documentId === id));
        console.log(item)
        setActiveSkillsToUpdate(item)
    }

    return (
        <div id={style.clients} className={` col-12  p-3 `}>
            {skillsModalIndex && <SkillsModal />}
            <h1>Skills</h1>
            <div className={style.buttons}>
                <button onClick={openSkillsModal}>Add New Skill</button>
            </div>

            <div className={style.tableContainer}>
                <table >
                    <thead>
                        <tr className=' text-center'>
                            <th>-</th>
                            <th>Name</th>
                            <th>Rate</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            skills?.map((el, index) => (
                                <tr key={el.documentId}>
                                    <td className=' text-center align-middle'>{index + 1}</td>
                                    <td className=' text-center align-middle'>{el.skill_name}</td>
                                    <td className=' text-center align-middle'>{el.skill_rate}</td>


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