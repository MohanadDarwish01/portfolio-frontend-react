import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useCategoriesData, useDomain, useProjectsAdmin } from '../../../../store';
import style from './portfolio.module.css'
import { MdEdit } from 'react-icons/md';
import { FaEye, FaMinusCircle } from "react-icons/fa";
import Swal from 'sweetalert2';
import { IoPerson } from 'react-icons/io5';
import ProjectsModal from './projectsModal';
import ProjectImageModal from './projectViewModal';

export default function Projects() {
    const { domain } = useDomain();
    const { data } = useCategoriesData();



    const { projectModalIndex, openProjectModal, setActiveProjectToUpdate, setTap, tap, setActiveProjectToView, viewModalIndex, openViewModal } = useProjectsAdmin();
    const [projects, setProjects] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");

    const handleRadioChange = (e) => {


        setSelectedCategory(e.target.value);
        setTap(e.target.value);
        let endPoint = "/api/projects?sort=createdAt:desc";
        let url = domain + endPoint;

        if (e.target.value === "All") {
            axios.get(url, {
                params: {
                    'populate': '*',
                    'sort': ['project_images.name:asc']  // Array format

                }
            }).then((res) => {
                setProjects(res.data.data)
            })
        } else if (e.target.value === "Non") {
            axios.get(url, {
                params: {
                    'populate': '*',
                    'filters[category][$null]': true,
                    'sort': ['project_images.name:asc']  // Array format
                }
            }).then((res) => {
                setProjects(res.data.data)
            })
        } else {
            axios.get(url, {
                params: {

                    'populate': '*',
                    'filters[category][category_name][$eq]': e.target.value,
                    'sort': ['project_images.name:asc']  // Array format
                }
            }).then((res) => {
                setProjects(res.data.data)
            })
        }

    };


    // const sortedArray = [...(activeToView?.project_images)].sort((a, b) => {
    //     const getNum = name => parseInt(name.match(/\d+/)?.[0] || 0);
    //     return getNum(a.name) - getNum(b.name);
    //   })


    useEffect(() => {

        let taps = {
            target: {
                value: tap,
            }
        }

        handleRadioChange(taps)

    }, [projectModalIndex, viewModalIndex]);


    const handleDelete = (id, index) => {

        Swal.fire({
            icon: "question",
            text: "Are you sure you want to delete this Project ??",
            confirmButtonText: "Delete",
            cancelButtonText: "No",
            showCancelButton: true,
            showCloseButton: true

        }).then((res) => {
            if (res.isConfirmed) {
                let endPoint = `/api/projects/${id}`;
                let url = domain + endPoint;
                axios.delete(url)
                let copy = [...projects];
                copy.splice(index, 1);
                setProjects(copy);
            }
        })
    }
    const handleUpdate = (id, index) => {
        openProjectModal()
        let item = projects?.find((el) => (el.documentId === id));
        setActiveProjectToUpdate(item)
    }

    const handleView = (id, index) => {
        openViewModal()
        let item = projects?.find((el) => (el.documentId === id));
        setActiveProjectToView(item)
    }



    return (
        <div id={style.clients} className={` col-12  p-3 `}>
            {projectModalIndex && <ProjectsModal />}
            {viewModalIndex && <ProjectImageModal />}
            <h1>Projects</h1>
            <div className={style.buttons}>
                <button onClick={openProjectModal}>Add New Project</button>
            </div>

            <div className={style.tableContainer}>


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
                    {data && data.map((el, index) => (

                        <div key={el.documentId} className={style.radio_button}>
                            <input
                                type="radio"
                                name="filter"
                                value={el.category_name}
                                id={`radio-${index}`}
                                onChange={handleRadioChange}
                                checked={selectedCategory === el.category_name}
                                className={style.radio_button__input}
                            />
                            <label htmlFor={`radio-${index}`} className={style.radio_button__label}>
                                <span className={style.radio_button__custom}></span>
                                {el.category_name?.trim().split(' ')[0]}
                            </label>
                        </div>

                    ))}

                    <div className={style.radio_button}>
                        <input
                            type="radio"
                            name="filter"
                            value={"Non"}
                            id={`radioNon`}
                            onChange={handleRadioChange}
                            checked={selectedCategory === "Non"}
                            className={style.radio_button__input}
                        />
                        <label htmlFor={`radioNon`} className={style.radio_button__label}>
                            <span className={style.radio_button__custom}></span>
                            With no category
                        </label>
                    </div>

                </div>




                <table >

                    <thead>
                        <tr className=' text-center'>
                            <th>-</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>images</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            projects?.map((el, index) => (
                                <tr key={el.documentId}>
                                    <td className=' text-center align-middle'>{index + 1}</td>
                                    <td className='align-middle'>
                                        <div className=' d-flex align-items-center gap-2'>
                                            <div className={style.img}>
                                                {
                                                    el?.project_cover ? <img src={domain + el.project_cover.formats?.thumbnail?.url} alt="" />
                                                        :
                                                        <IoPerson className={style.avatar} />
                                                }
                                            </div>

                                            <p className=' m-0'>{el.project_name}</p>
                                        </div>
                                    </td>

                                    <td className=' text-center align-middle'> {el.category?.category_name} </td>
                                    <td className=' d-flex align-items-center justify-content-center text-center'>
                                        {
                                            el?.project_images
                                                ?.sort((a, b) => {
                                                    const getNum = name => parseInt(name.match(/\d+/)?.[0] || 0);
                                                    return getNum(a.name) - getNum(b.name);
                                                })
                                                .map((img, index) => (

                                                    index < 4 &&


                                                    <div key={img.documentId} className={style.imges}>
                                                        {
                                                            el?.project_images && <img src={domain + img?.formats?.thumbnail?.url} alt="" />

                                                        }

                                                    </div>


                                                    // <td key={img.documentId} className=' text-center align-middle'> {domain + img.url } </td>
                                                ))


                                        }
                                        <p className=' text-center align-middle m-0'>...</p>
                                    </td>
                                    <td>
                                        <div className={`${style.actions} px-3`}>
                                            <FaEye onClick={() => { handleView(el.documentId, index) }} />
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