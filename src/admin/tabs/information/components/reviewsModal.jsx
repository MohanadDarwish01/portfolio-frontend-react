import style from './information.module.css'
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from 'axios';
import { GrUploadOption } from "react-icons/gr";
import { useEffect, useRef, useState } from 'react';
import { MdOutlineAddPhotoAlternate } from 'react-icons/md';
import { useDomain, useLoader, useReviewsModal } from '../../../../store';
import Swal from 'sweetalert2';
import { IoIosCloseCircle } from "react-icons/io";


const validationSchema = Yup.object({
    reviewerImg: Yup.mixed()
        .nullable() // allows null
        .notRequired() // not required for submission
        .test(
            "fileSize",
            "File too large. Max size is 2MB",
            value => !value || value.size <= 2 * 1024 * 1024
        )
        .test(
            "fileFormat",
            "Unsupported Format",
            value => !value || ['image/jpg', 'image/jpeg', 'image/png'].includes(value.type)
        ),


    reviewerName: Yup.string().required("Required"),
    review: Yup.string().required("Required"),

});
export default function ReviewsModal() {


    const { domain } = useDomain();
    const { closeReviewseModal, activeToUpdate, resetActiveReviews } = useReviewsModal();
    const [imageInfo, setImageInfo] = useState(null);
    const imageRef = useRef();

    const getImage = (image) => {
        if (image) {
            const endPoint = `/api/upload/files/${image}`;
            const url = domain + endPoint;
            axios.get(url, { responseType: 'blob' }).then((res) => {
                return res.data.data
            })
        }
    };

    const initialValues = {


        reviewerImg: getImage(activeToUpdate?.reviewer_image?.id) || null,
        reviewerName: activeToUpdate?.reviewer_name || "",
        review: activeToUpdate?.review || "",
    }

    useEffect(() => {
        return () => {
            resetActiveReviews();
        };
    }, [activeToUpdate])


    return (
        <div className="overlay " onClick={closeReviewseModal}>
            <div onClick={(e) => { e.stopPropagation() }} id={style.createClient} className='col-10 col-md-6  d-flex flex-column gap-3 shadow animate__animated animate__fadeInDown  '>
                <IoIosCloseCircle onClick={closeReviewseModal} className={style.closeIcon} />
        

                {!activeToUpdate.reviewer_name ?
                    <h2>Add Review</h2>
                    :
                    <h2>Edit Review</h2>
                }

                <Formik
                    enableReinitialize={true}
                    initialValues={initialValues}
                    validationSchema={validationSchema}





                    onSubmit={async (values, { setSubmitting }) => {
                        setSubmitting(true);
                        if (!activeToUpdate.reviewer_name) {

                            let uploaded;
                            if (values.reviewerImg) {
                                const formData = new FormData();
                                formData.append('files', values.reviewerImg);
                                try {
                                    const response = await fetch(domain + '/api/upload', {
                                        method: 'POST',
                                        body: formData,
                                    });
                                    const result = await response.json();
                                    console.log('Uploaded file:', result);
                                    uploaded = result;
                                } catch (err) {
                                    console.error('Upload error:', err);
                                }
                            }

                            let data = {
                                reviewer_image: uploaded ? uploaded[0].id : null,
                                reviewer_name: values.reviewerName,
                                review: values.review,

                            }
                            let endPoint = "/api/reviews/";
                            let url = domain + endPoint;

                            axios.post(url, {
                                data: data,
                            })
                                .then((res) => {
                                    console.log('Updated record:', res.data);
                                })
                                .catch((err) => {
                                    console.error('Error updating record:', err);
                                })

                            setSubmitting(false);
                            Swal.fire({
                                icon: "success",
                                title: "Your review saved",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            closeReviewseModal()

                        } else {
                            // ============================================ update form ===================================

                            let uploaded;
                            console.log(values)
                            if (values.reviewerImg) {
                                const formData = new FormData();
                                formData.append('files', values.reviewerImg);
                                try {
                                    const response = await fetch(domain + '/api/upload', {
                                        method: 'POST',
                                        body: formData,
                                    });
                                    const result = await response.json();
                                    console.log('Uploaded file:', result);
                                    uploaded = result;
                                } catch (err) {
                                    console.error('Upload error:', err);
                                }
                            }

                            let data = {
                                reviewer_image: uploaded ? uploaded[0].id : activeToUpdate?.reviewer_image ? activeToUpdate.reviewer_image.id : null,
                                reviewer_name: values.reviewerName,
                                review: values.review,
                            }
                            let endPoint = "/api/reviews/";
                            let url = domain + endPoint + activeToUpdate.documentId;
                            console.log(url)
                            axios.put(url, {
                                data: data,
                            })
                                .then((res) => {
                                    console.log('Updated record:', res.data);
                                })
                                .catch((err) => {
                                    console.error('Error updating record:', err);
                                })

                            setSubmitting(false);
                            Swal.fire({

                                icon: "success",
                                title: "Your review updated",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            closeReviewseModal()
                        }
                    }}

                >
                    {({ setFieldValue, errors, dirty, isValid, touched }) => (
                        <Form className=' p-3 d-flex flex-column justify-content-between h-100' >

                            <div>
                                <div id={style.imgsForm} className=' d-block'>
                                    <div className=' position-relative d-flex flex-column h-100'>
                                        <p className=' text-white'>Reviewer image {`( jpg / jpeg / png )`}</p>
                                        <div className={style.uploadField}>
                                            <div>
                                                {
                                                    imageInfo ? (
                                                        <img src={URL.createObjectURL(imageInfo)} alt="" />
                                                    ) : activeToUpdate.reviewer_image ? (
                                                        <img src={domain + activeToUpdate.reviewer_image.url} alt="" />
                                                    ) : (
                                                        <MdOutlineAddPhotoAlternate className={style.addIcon} />
                                                    )
                                                }
                                            </div>
                                            <label htmlFor="reviewerImg"><GrUploadOption className={style.uploadIcon} />
                                                <input
                                                    id="reviewerImg"

                                                    name='reviewerImg'
                                                    type="file"
                                                    accept="image/*"
                                                    ref={imageRef}
                                                    onChange={(event) => {
                                                        const file = event.currentTarget.files[0];
                                                        setImageInfo(file);
                                                        setFieldValue("reviewerImg", file)


                                                    }}
                                                />

                                            </label>
                                        </div>
                                        {errors.reviewerImg && touched.reviewerImg &&
                                            <div className={style.error} >{errors.reviewerImg}</div>

                                        }
                                    </div>
                                </div>

                                <div className={style.textInputWrapper}>
                                    <Field type="text" name="reviewerName" id="reviewerName" className={style.textInput} placeholder="" />
                                    <label className={style.textLabel} htmlFor="reviewerName">Reviewer name <span className=" text-warning">*</span></label>
                                    <ErrorMessage name="reviewerName" component="div" className={style.textError} />
                                </div>

                                <div className={style.areaInputWrapper}>
                                    <Field
                                        name="review"
                                        id="review"
                                        as="textarea"
                                        className={style.textInput}
                                        placeholder=""
                                    />
                                    <label htmlFor="review" className={style.textLabel}>
                                        Review <span className="text-warning">*</span>
                                    </label>
                                    <ErrorMessage name="review" component="div" className={style.textError} />
                                </div>

                            </div>


                            <div className=' w-100 d-flex flex-row-reverse gap-3'>
                                {!activeToUpdate.reviewer_name ?
                                    <button type="submit" className={` ${!dirty || !isValid ? style.addClientDisable : style.addClient}`} disabled={!dirty || !isValid}  >
                                        Save
                                    </button> :
                                    <button type="submit" className={` ${!dirty || !isValid ? style.addClientDisable : style.addClient}`} disabled={!dirty || !isValid} >
                                        Update
                                    </button>
                                }
                            </div>


                        </Form>
                    )
                    }
                </Formik >
            </div>

        </div >
    )
}
