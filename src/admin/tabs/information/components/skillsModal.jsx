import style from './information.module.css'
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from 'axios';
import { useEffect } from 'react';
import { useSkillsModal, useDomain } from '../../../../store';
import Swal from 'sweetalert2';
import { IoIosCloseCircle } from "react-icons/io";


const validationSchema = Yup.object({
    skillName: Yup.string().required("Required"),
    skillRate: Yup.number().required("Required").max(100, "Rate must 100 or less").positive("Rate must be positive counter").integer(),


});
export default function SkillsModal() {

    const { domain } = useDomain();
    const { closeSkillsModal, activeToUpdate, resetActiveSkill } = useSkillsModal();

    const initialValues = {

        skillName: activeToUpdate?.skill_name || "",
        skillRate: activeToUpdate?.skill_rate || "",


    }

    useEffect(() => {
        return () => {
            resetActiveSkill();
        };
    }, [activeToUpdate])



    return (
        <div className="overlay " onClick={closeSkillsModal}>
            <div onClick={(e) => { e.stopPropagation() }} id={style.createClient} className='col-10 col-md-6  d-flex flex-column gap-3 shadow animate__animated animate__fadeInDown  '>
                <IoIosCloseCircle onClick={closeSkillsModal} className={style.closeIcon} />

                {!activeToUpdate.skill_name ?
                    <h2>Add Skill</h2>
                    :
                    <h2>Edit Skill</h2>
                }

                <Formik
                    enableReinitialize={true}
                    initialValues={initialValues}
                    validationSchema={validationSchema}





                    onSubmit={async (values, { setSubmitting }) => {
                        setSubmitting(true);
                        if (!activeToUpdate.skill_name) {

                            let data = {
                                skill_name: values.skillName,
                                skill_rate: values.skillRate,
                            }
                            let endPoint = "/api/skills/";
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
                                title: "Your skill saved",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            closeSkillsModal()

                            // navegate('/services')
                        } else {
                            // ============================================ update form ===================================

                            let data = {
                                skill_name: values.skillName,
                                skill_rate: values.skillRate,
                            }
                            let endPoint = "/api/skills/";
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
                                title: "Your skill updated",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            closeSkillsModal()
                        }
                    }}

                >
                    {({ handleChange, dirty, isValid }) => (
                        <Form className=' p-3 d-flex flex-column justify-content-between h-100' >
                            <div>
                                <div>


                                    <div className={style.textInputWrapper}>
                                        <Field type="text" name="skillName" id="skillName" className={style.textInput} placeholder="" />
                                        <label className={style.textLabel} htmlFor="skillName">Skill name <span className=" text-warning">*</span></label>
                                        <ErrorMessage name="skillName" component="div" className={style.textError} />
                                    </div>

                                    <div className={style.textInputWrapper}>
                                        <Field type="number" name="skillRate" id="skillRate" className={style.textInput} placeholder="" onChange={handleChange} />
                                        <label className={style.textLabel} htmlFor="skillRate">Skill rate <span className=" text-warning">*</span></label>
                                        <ErrorMessage name="skillRate" component="div" className={style.textError} />
                                    </div>


                                </div>

                            </div>
                            <div className=' w-100 d-flex flex-row-reverse gap-3'>
                                {!activeToUpdate.skill_name ?
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
