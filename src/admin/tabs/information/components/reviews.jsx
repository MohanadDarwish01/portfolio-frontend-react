import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDomain, useReviewsModal } from '../../../../store';
import style from './information.module.css'
import { MdEdit } from 'react-icons/md';
import { FaMinusCircle } from "react-icons/fa";
import Swal from 'sweetalert2';
import { IoPerson } from 'react-icons/io5';
import ReviewsModal from './reviewsModal';

export default function Reviews() {
    const { domain } = useDomain();

    


    const { reviewsModalIndex, openReviewsModal, setActiveReviewsToUpdate } = useReviewsModal();
    // const navigate = useNavigate();
    const [reviews, setReviews] = useState([]);

    const getData = () => {
        

        let endPoint = "/api/reviews?sort=createdAt:desc";
        let url = domain + endPoint;
        // openLoader();
        setTimeout(() => {
            axios.get(url, {
                params: {
                    populate: "*",
                }

            }).then((res) => {
                setReviews(res.data.data);
                // closeLoader();
            })
        }, 500)
    }

    useEffect(() => {
        getData();
    }, [reviewsModalIndex]);

    const handleDelete = (id, index) => {

        Swal.fire({
            icon: "question",
            text: "Are you sure you want to delete this Review ??",
            confirmButtonText: "Delete",
            cancelButtonText: "No",
            showCancelButton: true,
            showCloseButton: true

        }).then((res) => {
            if (res.isConfirmed) {
                let endPoint = `/api/reviews/${id}`;
                let url = domain + endPoint;
                axios.delete(url)
                let copy = [...reviews];
                copy.splice(index, 1);
                setReviews(copy);
            }
        })
    }

    const handleUpdate = (id, index) => {
        openReviewsModal()
        let item = reviews?.find((el) => (el.documentId === id));
        console.log(item)
        setActiveReviewsToUpdate(item)
    }

    return (
        <div id={style.clients} className={` col-12  p-3 `}>
            {reviewsModalIndex && <ReviewsModal />}
            <h1>Reviews</h1>
            <div className={style.buttons}>
                <button onClick={openReviewsModal}>Add New Review</button>
            </div>

            <div className={style.tableContainer}>
                <table >
                    <thead>
                        <tr className=' text-center'>
                            <th>-</th>
                            <th>Name</th>
                            <th>Review</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            reviews?.map((el, index) => (
                                <tr key={el.documentId}>
                                    <td className=' text-center align-middle'>{index + 1}</td>
                                    <td className='align-middle'>
                                        <div className=' d-flex align-items-center gap-2'>
                                            <div className={style.img}>
                                                {
                                                    el.reviewer_image ? <img src={domain + el.reviewer_image.url} alt="" />
                                                        :
                                                        <IoPerson className={style.avatar} />
                                                }
                                            </div>

                                            <p className=' m-0'>{el.reviewer_name}</p>
                                        </div>
                                    </td>
                    
                                    <td className=' text-center align-middle'> {el.review.slice(0, 50) + "....."} </td>

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