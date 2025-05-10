import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useClientModal, useDomain } from '../../../../store';
import style from './information.module.css'
import { MdEdit } from 'react-icons/md';
import { FaMinusCircle } from "react-icons/fa";
import ClientsModal from './clientsModal';
import { RiTeamFill } from 'react-icons/ri';
import Swal from 'sweetalert2';

export default function Clients() {
    const { domain } = useDomain();
    const { clientModalIndex, openClientModal, setActiveClientToUpdate, activeToUpdate } = useClientModal();
    // const navigate = useNavigate();
    const [clients, setClients] = useState([]);

    const getData = () => {
        let endPoint = "/api/clients?sort=createdAt:desc";
        let url = domain + endPoint;
        // openLoader();
        setTimeout(() => {
            axios.get(url, {
                params: {
                    populate: "*",
                }
            }).then((res) => {
                setClients(res.data.data);
                // closeLoader();
            })
        }, 500)
    }

    const formatDate = (date) => {
        const reversedDate = date?.split("-").reverse().join("/");
        return reversedDate;
    }

    useEffect(() => {
        getData();
    }, [clientModalIndex]);

    const handleDelete = (id, index) => {

        Swal.fire({
            icon: "question",
            text: "Are you sure you want to delete this Client ??",
            confirmButtonText: "Delete",
            cancelButtonText: "No",
            showCancelButton: true,
            showCloseButton: true

        }).then((res) => {
            if (res.isConfirmed) {
                let endPoint = `/api/clients/${id}`;
                let url = domain + endPoint;
                axios.delete(url)
                let copy = [...clients];
                copy.splice(index, 1);
                setClients(copy);
            }
        })
    }

    const handleUpdate = (id, index) => {
        openClientModal()
        let item = clients?.find((el) => (el.documentId === id));
        console.log(item)
        setActiveClientToUpdate(item)
    }

    return (
        <div id={style.clients} className={` col-12  p-3 `}>
            {clientModalIndex && <ClientsModal />}
            <h1>Clients</h1>
            <div className={style.buttons}>
                <button onClick={openClientModal}>Add New Client</button>
            </div>

            <div className={style.tableContainer}>
                <table >
                    <thead>
                        <tr className=' text-center'>
                            <th>-</th>
                            <th>Name</th>
                            <th>Roles</th>
                            <th>Start date</th>
                            <th>End date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            clients?.map((el, index) => (
                                <tr key={el.documentId}>
                                    <td className=' text-center align-middle'>{index + 1}</td>
                                    <td className='align-middle'>
                                        <div className=' d-flex align-items-center gap-2'>
                                            <div className={style.img}>
                                                {
                                                    el.client_image ? <img src={domain + el.client_image.url} alt="" />
                                                        :
                                                        <RiTeamFill className={style.avatar} />
                                                }
                                            </div>

                                            <p className=' m-0'>{el.client_name}</p>
                                        </div>
                                    </td>
                                    <td className=' align-middle'>
                                        <ul>
                                            {
                                                el.client_roles?.map((role, index) => (
                                                    <li key={index}>{role}</li>
                                                ))
                                            }
                                        </ul>
                                    </td>
                                    <td className=' text-center align-middle'> {formatDate(el.start_date)} </td>
                                    <td className=' text-center align-middle'> {formatDate(el.end_date)} </td>

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