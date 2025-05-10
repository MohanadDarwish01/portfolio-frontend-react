import style from './information.module.css'
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from 'axios';
import { useEffect } from 'react';
import { useDomain, useLoader, useExperianceModal } from '../../../../store';
import Swal from 'sweetalert2';
import { IoIosCloseCircle } from "react-icons/io";
import moment from 'moment';


const validationSchema = Yup.object({
    position: Yup.string().required("Required"),
    startDate: Yup.date().required("Required"),
    endDate: Yup.date().required("Required"),
    company: Yup.string().required("Required"),
    location: Yup.string(),
    description: Yup.string().required("Required"),

});
export default function ExperienceModal() {

    const { domain } = useDomain();
    const { closeExperianceModal, activeToUpdate, resetActiveExperiance } = useExperianceModal();

    const initialValues = {

        position: activeToUpdate?.position || "",
        startDate: activeToUpdate?.start_date || "",
        endDate: activeToUpdate?.end_date || "",
        company: activeToUpdate?.company || "",
        location: activeToUpdate?.location || "",
        description: activeToUpdate?.description || "",

    }


    const getDate = () => {
        const nowDate = moment().format("L");
        let splitsDate = nowDate.split("/");
        const newDate = splitsDate[2] + "-" + splitsDate[0] + "-" + splitsDate[1];
        return newDate;
    }


    useEffect(() => {
        return () => {
            resetActiveExperiance();
        };
    }, [activeToUpdate])



    return (
        <div className="overlay " onClick={closeExperianceModal}>
            <div onClick={(e) => { e.stopPropagation() }} id={style.createClient} className='col-10 col-md-6  d-flex flex-column gap-3 shadow animate__animated animate__fadeInDown  '>
                <IoIosCloseCircle onClick={closeExperianceModal} className={style.closeIcon} />
                
                {!activeToUpdate.position ?
                    <h2>Add Experience</h2>
                    :
                    <h2>Edit Experience</h2>
                }
                <Formik
                    enableReinitialize={true}
                    initialValues={initialValues}
                    validationSchema={validationSchema}





                    onSubmit={async (values, { setSubmitting }) => {
                        setSubmitting(true);
                        if (!activeToUpdate.position) {

                            let data = {
                                position: values.position,
                                start_date: values.startDate,
                                end_date: values.endDate,
                                company: values.company,
                                location: values.location,
                                description: values.description,
                            }
                            let endPoint = "/api/experiences/";
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
                                title: "Your experience saved",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            closeExperianceModal()

                        } else {
                            // ============================================ update form ===================================

                            let data = {
                                position: values.position,
                                start_date: values.startDate,
                                end_date: values.endDate,
                                company: values.company,
                                location: values.location,
                                description: values.description,
                            }
                            let endPoint = "/api/experiences/";
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
                                title: "Your experience updated",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            closeExperianceModal()
                        }
                    }}

                >
                    {({ dirty, isValid }) => (
                        <Form className=' p-3 d-flex flex-column justify-content-between h-100' >
                            <div>
                                <div>


                                    <div className={style.textInputWrapper}>
                                        <Field type="text" name="position" id="position" className={style.textInput} placeholder="" />
                                        <label className={style.textLabel} htmlFor="position">Position <span className=" text-warning">*</span></label>
                                        <ErrorMessage name="position" component="div" className={style.textError} />
                                    </div>

                                    <div className={style.textInputWrapper}>
                                        <Field type="date" name="startDate" id="startDate" className={style.textInput} placeholder="" max={getDate()} />
                                        <label htmlFor="startDate" className={style.textLabel} >Start date <span className=" text-warning">*</span></label>
                                        <ErrorMessage name="startDate" component="div" className={style.textError} />
                                    </div>

                                    <div className={style.textInputWrapper}>
                                        <Field type="date" name="endDate" id="endDate" className={style.textInput} placeholder="" max={getDate()} />
                                        <label htmlFor="endDate" className={style.textLabel} >End date <span className=" text-warning">*</span></label>
                                        <ErrorMessage name="endDate" component="div" className={style.textError} />
                                    </div>

                                    <div className={style.textInputWrapper}>
                                        <Field type="text" name="company" id="company" className={style.textInput} placeholder="" />
                                        <label className={style.textLabel} htmlFor="company">Company <span className=" text-warning">*</span></label>
                                        <ErrorMessage name="company" component="div" className={style.textError} />
                                    </div>

                                    <div className={style.textInputWrapper}>
                                        <Field type="text" name="location" id="location" className={style.textInput} placeholder="" />
                                        <label className={style.textLabel} htmlFor="location">Location </label>
                                        <ErrorMessage name="location" component="div" className={style.textError} />
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
                                {!activeToUpdate.position ?
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
