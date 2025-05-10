import style from './information.module.css'
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from 'axios';
import { useEffect } from 'react';
import { useDomain, useLoader, useEducationModal } from '../../../../store';
import Swal from 'sweetalert2';
import { IoIosCloseCircle } from "react-icons/io";


const validationSchema = Yup.object({
    degree: Yup.string().required("Required"),
    startYear: Yup.string()
        .matches(/^\d{4}$/, 'Enter a valid 4-digit year')
        .required('Year is required'),

    endYear: Yup.string()
        .matches(/^\d{4}$/, 'Enter a valid 4-digit year')
        .required('Year is required'),
    faculty: Yup.string().required("Required"),
    university: Yup.string().required("Required"),
    description: Yup.string().required("Required"),

});
export default function EducationModal() {

    const { domain } = useDomain();
    const { closeEducationModal, activeToUpdate, resetActiveEducation } = useEducationModal();

    const initialValues = {

        degree: activeToUpdate?.degree || "",
        startYear: activeToUpdate?.start_year || "",
        endYear: activeToUpdate?.end_year || "",
        faculty: activeToUpdate?.faculty || "",
        university: activeToUpdate?.university || "",
        description: activeToUpdate?.description || "",

    }

    useEffect(() => {
        return () => {
            resetActiveEducation();
        };
    }, [activeToUpdate])



    return (
        <div className="overlay " onClick={closeEducationModal}>
            <div onClick={(e) => { e.stopPropagation() }} id={style.createClient} className='col-10 col-md-6  d-flex flex-column gap-3 shadow animate__animated animate__fadeInDown  '>
                <IoIosCloseCircle onClick={closeEducationModal} className={style.closeIcon} />

                {!activeToUpdate.degree ?
                    <h2>Add Education</h2>
                    :
                    <h2>Edit Education</h2>
                }

                <Formik
                    enableReinitialize={true}
                    initialValues={initialValues}
                    validationSchema={validationSchema}


                    onSubmit={async (values, { setSubmitting }) => {
                        setSubmitting(true);
                        if (!activeToUpdate.degree) {

                            let data = {
                                degree: values.degree,
                                start_year: values.startYear,
                                end_year: values.endYear,
                                faculty: values.faculty,
                                university: values.university,
                                description: values.description,
                            }
                            let endPoint = "/api/educations/";
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
                                title: "Your education saved",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            closeEducationModal()

                        } else {
                            // ============================================ update form ===================================

                            let data = {
                                degree: values.degree,
                                start_year: values.startYear,
                                end_year: values.endYear,
                                faculty: values.faculty,
                                university: values.university,
                                description: values.description,
                            }
                            let endPoint = "/api/educations/";
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
                                title: "Your education updated",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            closeEducationModal()
                        }
                    }}

                >
                    {({ dirty, isValid }) => (
                        <Form className=' p-3 d-flex flex-column justify-content-between h-100' >
                            <div>
                                <div>


                                    <div className={style.textInputWrapper}>
                                        <Field type="text" name="degree" id="degree" className={style.textInput} placeholder="" />
                                        <label className={style.textLabel} htmlFor="degree">Degree <span className=" text-warning">*</span></label>
                                        <ErrorMessage name="degree" component="div" className={style.textError} />
                                    </div>

                                    <div className={style.textInputWrapper}>
                                        <Field type="number" name="startYear" id="startYear" className={style.textInput} placeholder="" />
                                        <label htmlFor="startYear" className={style.textLabel} >Start year <span className=" text-warning">*</span></label>
                                        <ErrorMessage name="startYear" component="div" className={style.textError} />
                                    </div>

                                    <div className={style.textInputWrapper}>
                                        <Field type="number" name="endYear" id="endYear" className={style.textInput} placeholder="" />
                                        <label htmlFor="endYear" className={style.textLabel} >End year <span className=" text-warning">*</span></label>
                                        <ErrorMessage name="endYear" component="div" className={style.textError} />
                                    </div>

                                    <div className={style.textInputWrapper}>
                                        <Field type="text" name="faculty" id="faculty" className={style.textInput} placeholder="" />
                                        <label className={style.textLabel} htmlFor="faculty">Faculty <span className=" text-warning">*</span></label>
                                        <ErrorMessage name="faculty" component="div" className={style.textError} />
                                    </div>

                                    <div className={style.textInputWrapper}>
                                        <Field type="text" name="university" id="university" className={style.textInput} placeholder="" />
                                        <label className={style.textLabel} htmlFor="university">University <span className=" text-warning">*</span></label>
                                        <ErrorMessage name="university" component="div" className={style.textError} />
                                    </div>

                                    <div className={style.areaInputWrapper}>
                                        <Field
                                            name="description"
                                            id="description"
                                            as="textarea"
                                            className={style.textInput}
                                            placeholder=""
                                        />
                                        <label htmlFor="userName" className={style.textLabel}>
                                            Description <span className="text-warning">*</span>
                                        </label>
                                        <ErrorMessage name="description" component="div" className={style.textError} />
                                    </div>


                                </div>

                            </div>
                            <div className=' w-100 d-flex flex-row-reverse gap-3'>
                                {!activeToUpdate.degree ?
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
