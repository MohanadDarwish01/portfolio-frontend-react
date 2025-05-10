import style from './portfolio.module.css'
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from 'axios';
import { GrUploadOption } from "react-icons/gr";
import { useEffect, useRef, useState } from 'react';
import { MdOutlineAddPhotoAlternate } from 'react-icons/md';
import { useCategoriesData, useDomain, useLoader, useReviewsModal } from '../../../../store';
import Swal from 'sweetalert2';
import { IoIosCloseCircle } from "react-icons/io";

const restrictedPaths = []; // example forbidden words

const validationSchema = Yup.object({
    categoryImg: Yup.mixed()
        .test("fileSize", "File too large. Max size is 2MB", value => {
            if (!value) return false;
            if (typeof value === 'number') return true;
            return value.size <= 2 * 1024 * 1024;
        })
        .test('fileFormat', 'Unsupported Format', value => {
            if (!value) return false;
            if (typeof value === 'number') return true;
            return ['image/jpg', 'image/jpeg', 'image/png'].includes(value.type);
        })
        .required('A file is required'),


    categoryName: Yup.string().required("Required"),

    categoryPath: Yup.string()
        .required('Path is required')
        .test(
            'no-slash',
            'Path must not contain "/"',
            (value) => value != null && !value.includes('/')
        )
        .test(
            'no-restricted-paths',
            `Path must not duplicate with other path`,
            (value) => {
                if (!value) return false;
                
                // Remove all spaces and convert to lowercase
                const normalizedValue = value.replace(/\s+/g, '').toLowerCase();
                
                // Check against restricted paths (also normalized)
                return !restrictedPaths.some(restricted => 
                    restricted.replace(/\s+/g, '').toLowerCase() === normalizedValue
                );
            }
        ),

    description: Yup.string().required("Required"),

});
export default function CategoriesModal() {


    const { domain } = useDomain();
    const { closeCategoryeModal, activeToUpdate, resetActiveCategory, data } = useCategoriesData();
    const [imageInfo, setImageInfo] = useState(null);
    const imageRef = useRef();

    const initialValues = {


        categoryImg: activeToUpdate?.category_image?.id || null,
        categoryName: activeToUpdate?.category_name || "",
        categoryPath: activeToUpdate?.category_path || "",
        description: activeToUpdate?.category_description || "",
    }

    useEffect(() => {



        data && data.map((el) => {
            restrictedPaths.push(el.category_path)
        })


        return () => {
            resetActiveCategory();
        };
    }, [activeToUpdate])


    return (
        <div className="overlay " onClick={closeCategoryeModal}>
            <div onClick={(e) => { e.stopPropagation() }} id={style.createClient} className='col-10 col-md-6  d-flex flex-column gap-3 shadow animate__animated animate__fadeInDown  '>
                <IoIosCloseCircle onClick={closeCategoryeModal} className={style.closeIcon} />


                {!activeToUpdate.category_name ?
                    <h2>Add Category</h2>
                    :
                    <h2>Edit Category</h2>
                }

                <Formik
                    enableReinitialize={true}
                    initialValues={initialValues}
                    validationSchema={validationSchema}





                    onSubmit={async (values, { setSubmitting }) => {
                        setSubmitting(true);
                        if (!activeToUpdate.category_name) {

                            let uploaded;
                            if (values.categoryImg && values.categoryImg instanceof File) {
                                const formData = new FormData();
                                formData.append('files', values.categoryImg);
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
                                category_image: uploaded?.[0]?.id || activeToUpdate?.category_image?.id || null,
                                // uploaded ? uploaded[0].id : null,
                                category_name: values.categoryName,
                                category_path: values.categoryPath,
                                category_description: values.description,

                            }
                            let endPoint = "/api/categories/";
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
                                title: "Your category saved",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            closeCategoryeModal()
                            window.location.reload();

                        } else {
                            // ============================================ update form ===================================

                            let uploaded;
                            console.log(values)
                            if (values.categoryImg && values.categoryImg instanceof File) {
                                const formData = new FormData();
                                formData.append('files', values.categoryImg);
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
                                category_image: uploaded?.[0]?.id || activeToUpdate?.category_image?.id || null,
                                // uploaded ? uploaded[0].id : activeToUpdate?.category_image ? activeToUpdate.category_image.id : null,

                                category_name: values.categoryName,
                                category_path: values.categoryPath,
                                category_description: values.description,

                            }


                            let endPoint = "/api/categories/";
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
                                title: "Your category updated",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            closeCategoryeModal()
                            window.location.reload();
                        }
                    }}

                >
                    {({ setFieldValue, errors, dirty, isValid, touched }) => (
                        <Form className=' p-3 d-flex flex-column justify-content-between h-100' >

                            <div>
                                <div id={style.imgsForm} className=' d-block'>
                                    <div className=' position-relative d-flex flex-column h-100'>
                                        <p className=' text-white'>Category image {`( jpg / jpeg / png )`}</p>
                                        <div className={style.uploadField}>
                                            <div>
                                                {
                                                    imageInfo ? (
                                                        <img src={URL.createObjectURL(imageInfo)} alt="" />
                                                    ) : activeToUpdate.category_image ? (
                                                        <img src={domain + activeToUpdate.category_image.url} alt="" />
                                                    ) : (
                                                        <MdOutlineAddPhotoAlternate className={style.addIcon} />
                                                    )
                                                }
                                            </div>
                                            <label htmlFor="categoryImg"><GrUploadOption className={style.uploadIcon} />
                                                <input
                                                    id="categoryImg"

                                                    name='categoryImg'
                                                    type="file"
                                                    accept="image/*"
                                                    ref={imageRef}
                                                    onChange={(event) => {
                                                        const file = event.currentTarget.files[0];
                                                        setImageInfo(file);
                                                        setFieldValue("categoryImg", file)


                                                    }}
                                                />

                                            </label>
                                        </div>
                                        {errors.categoryImg && touched.categoryImg &&
                                            <div className={style.error} >{errors.categoryImg}</div>

                                        }
                                    </div>
                                </div>

                                <div className={style.textInputWrapper}>
                                    <Field type="text" name="categoryName" id="categoryName" className={style.textInput} placeholder="" />
                                    <label className={style.textLabel} htmlFor="categoryName">Category name <span className=" text-warning">*</span></label>
                                    <ErrorMessage name="categoryName" component="div" className={style.textError} />
                                </div>

                                <div className={style.textInputWrapper}>
                                    <Field type="text" name="categoryPath" id="categoryPath" className={style.textInput} placeholder="" />
                                    <label className={style.textLabel} htmlFor="categoryPath">Category path <span className=" text-warning">*</span></label>
                                    <ErrorMessage name="categoryPath" component="div" className={style.textError} />
                                </div>

                                <div className={style.areaInputWrapper}>
                                    <Field
                                        name="description"
                                        id="description"
                                        as="textarea"
                                        className={style.textInput}
                                        placeholder=""
                                    />
                                    <label htmlFor="description" className={style.textLabel}>
                                        Description <span className="text-warning">*</span>
                                    </label>
                                    <ErrorMessage name="description" component="div" className={style.textError} />
                                </div>

                            </div>


                            <div className=' w-100 d-flex flex-row-reverse gap-3'>
                                {!activeToUpdate.category_name ?
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
