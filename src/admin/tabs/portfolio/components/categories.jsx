import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCategoriesData, useDomain } from '../../../../store';
import style from './portfolio.module.css'
import { MdEdit } from 'react-icons/md';
import { FaMinusCircle } from "react-icons/fa";
import Swal from 'sweetalert2';
import { IoPerson } from 'react-icons/io5';
import CategoriesModal from './categoriesModal';

export default function Categories() {
    const { domain } = useDomain();

    


    const { categoryModalIndex, openCategoryModal, setActiveCategoryToUpdate } = useCategoriesData();
    // const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    const getData = () => {
        

        let endPoint = "/api/categories?sort=createdAt:desc"; 
        let url = domain + endPoint;
        // openLoader();
        setTimeout(() => {
            axios.get(url, {
                params: {
                    populate: "*",
                }

            }).then((res) => {
                setCategories(res.data.data);
                // closeLoader();
            })
        }, 500)
    }

    useEffect(() => {
        getData();
    }, [categoryModalIndex]);

    const handleDelete = (id, index) => {

        Swal.fire({
            icon: "question",
            text: "Are you sure you want to delete this Category ??",
            confirmButtonText: "Delete",
            cancelButtonText: "No",
            showCancelButton: true,
            showCloseButton: true

        }).then((res) => {
            if (res.isConfirmed) {
                let endPoint = `/api/categories/${id}`;
                let url = domain + endPoint;
                axios.delete(url)
                let copy = [...categories];
                copy.splice(index, 1);
                setCategories(copy);
                window.location.reload();
            }
        })
    }

    const handleUpdate = (id, index) => {
        openCategoryModal()
        let item = categories?.find((el) => (el.documentId === id));
        setActiveCategoryToUpdate(item)
    }

    return (
        <div id={style.clients} className={` col-12  p-3 `}>
            {categoryModalIndex && <CategoriesModal />}
            <h1>Categories</h1>
            <div className={style.buttons}>
                <button onClick={openCategoryModal}>Add New Category</button>
            </div>

            <div className={style.tableContainer}>
                <table >
                    <thead>
                        <tr className=' text-center'>
                            <th>-</th>
                            <th>Name</th>
                            <th>Path</th>
                            <th>Description</th>
                            <th>Projects No</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            categories?.map((el, index) => (
                                <tr key={el.documentId}>
                                    <td className=' text-center align-middle'>{index + 1}</td>
                                    <td className='align-middle'>
                                        <div className=' d-flex align-items-center gap-2'>
                                            <div className={style.img}>
                                                {
                                                    el.category_image ? <img src={domain + el.category_image.url} alt="" />
                                                        :
                                                        <IoPerson className={style.avatar} />
                                                }
                                            </div>

                                            <p className=' m-0'>{el.category_name}</p>
                                        </div>
                                    </td>
                    
                                    <td className=' text-center align-middle'> {el.category_path} </td>
                                    <td className=' text-center align-middle'> {el.category_description.slice(0, 50) + "....."} </td>
                                    <td className=' text-center align-middle'> {el.projects.length} </td>

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