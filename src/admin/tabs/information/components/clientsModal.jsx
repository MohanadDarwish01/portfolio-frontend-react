import style from './information.module.css'
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import axios from 'axios';
import { GrUploadOption } from "react-icons/gr";
import { useEffect, useRef, useState } from 'react';
import { MdOutlineAddPhotoAlternate } from 'react-icons/md';
import { IoAddCircleSharp } from 'react-icons/io5';
import { RiResetLeftLine } from 'react-icons/ri';
import { useClientModal, useDomain, useLoader } from '../../../../store';
import Swal from 'sweetalert2';
import { IoIosCloseCircle } from "react-icons/io";
import moment from 'moment';


const validationSchema = Yup.object({
    clientImg: Yup.mixed()
        .nullable()
        .notRequired()
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

    clientName: Yup.string().required("Required"),
    roles: Yup.array().of(Yup.string().required("Required")),
    startDate: Yup.date().required("Required"),
    endDate: Yup.date().required("Required"),

});
export default function ClientsModal() {

    const { domain } = useDomain();
    const { closeClientModal, activeToUpdate, resetActiveClient } = useClientModal();
    const [imageInfo, setImageInfo] = useState(null);
    const imageRef = useRef();
    const [roles] = useState([""]);

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
        clientImg: getImage(activeToUpdate?.client_image?.id) || null,
        clientName: activeToUpdate?.client_name || "",
        roles: activeToUpdate?.client_roles || [...roles],
        startDate: activeToUpdate?.start_date || "",
        endDate: activeToUpdate?.end_date || "",

    }

    useEffect(() => {
        return () => {
            resetActiveClient();
        };
    }, [activeToUpdate])



    const getDate = () => {
        const nowDate = moment().format("L");
        let splitsDate = nowDate.split("/");
        const newDate = splitsDate[2] + "-" + splitsDate[0] + "-" + splitsDate[1];
        return newDate;
    }

    return (
        <div className="overlay " onClick={closeClientModal}>
            <div onClick={(e) => { e.stopPropagation() }} id={style.createClient} className='col-10 col-md-6  d-flex flex-column gap-3 shadow animate__animated animate__fadeInDown  '>
                <IoIosCloseCircle onClick={closeClientModal} className={style.closeIcon} />

                {!activeToUpdate.client_name ?
                    <h2>Add Client</h2>
                    :
                    <h2>Edit Client</h2>
                }

                <Formik
                    enableReinitialize={true}
                    initialValues={initialValues}
                    validationSchema={validationSchema}





                    onSubmit={async (values, { setSubmitting }) => {
                        setSubmitting(true);
                        if (!activeToUpdate.client_name) {

                            let uploaded;
                            if (values.clientImg) {
                                const formData = new FormData();
                                formData.append('files', values.clientImg);
                                try {
                                    const response = await fetch('http://localhost:1337/api/upload', {
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
                                client_image: uploaded ? uploaded[0].id : null,
                                client_name: values.clientName,
                                client_roles: values.roles,
                                start_date: values.startDate,
                                end_date: values.endDate,
                            }
                            let endPoint = "/api/clients/";
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
                                title: "Your client saved",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            closeClientModal()

                            // navegate('/services')
                        } else {
                            // ============================================ update form ===================================

                            let uploaded;
                            if (values.clientImg) {
                                const formData = new FormData();
                                formData.append('files', values.clientImg);
                                try {
                                    const response = await fetch('http://localhost:1337/api/upload', {
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
                                client_image: uploaded ? uploaded[0].id : activeToUpdate?.client_image ? getImage(activeToUpdate?.client_name?.id) : null,
                                client_name: values.clientName,
                                client_roles: values.roles,
                                start_date: values.startDate,
                                end_date: values.endDate,
                            }
                            let endPoint = "/api/clients/";
                            let url = domain + endPoint + activeToUpdate.documentId;
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
                                title: "Your client updated",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            closeClientModal()
                            // navegate('/services')
                        }
                    }}

                >
                    {({ values, setFieldValue, errors, touched, dirty, isValid }) => (
                        <Form className=' p-3 d-flex flex-column justify-content-between h-100' >
                            <div>
                                <div>
                                    <div id={style.imgsForm} className=' d-block'>
                                        <div className=' position-relative d-flex flex-column h-100'>
                                            <p className=' text-white'>Client image {`( jpg / jpeg / png )`}</p>
                                            <div className={style.uploadField}>
                                                <div>
                                                    {
                                                        imageInfo ? (
                                                            <img src={URL.createObjectURL(imageInfo)} alt="" />
                                                        ) : activeToUpdate.client_image ? (
                                                            <img src={domain + activeToUpdate.client_image.url} alt="" />
                                                        ) : (
                                                            <MdOutlineAddPhotoAlternate className={style.addIcon} />
                                                        )
                                                    }
                                                </div>
                                                <label htmlFor="clientImg"><GrUploadOption className={style.uploadIcon} />
                                                    <input
                                                        id="clientImg"

                                                        name='clientImg'
                                                        type="file"
                                                        accept="image/*"
                                                        ref={imageRef}
                                                        onChange={(event) => {
                                                            const file = event.currentTarget.files[0];
                                                            setImageInfo(file);
                                                            setFieldValue("clientImg", file)

                                                        }}
                                                    />

                                                </label>
                                            </div>
                                            {errors.clientImg && touched.clientImg &&
                                                <div className={style.error} >{errors.clientImg}</div>

                                            }
                                        </div>
                                    </div>

                                    <div className={style.textInputWrapper}>
                                        <Field type="text" name="clientName" id="clientName" className={style.textInput} placeholder="" />
                                        <label className={style.textLabel} htmlFor="clientName">Client name <span className=" text-warning">*</span></label>
                                        <ErrorMessage name="clientName" component="div" className={style.textError} />
                                    </div>

                                    <div className={style.multiTextWrapper}>
                                        <FieldArray name="roles">
                                            {
                                                <label className=" w-100 d-inline ">
                                                    <div className={style.titles}>
                                                        {values.roles.map((role, index) => (
                                                            <div key={index} className={style.textInputWrapper}>
                                                                <input
                                                                    id={`role-${index}`}
                                                                    className={style.textInput}
                                                                    type="text"
                                                                    value={values.roles[index]}
                                                                    onChange={(e) => setFieldValue(`roles[${index}]`, e.target.value)}
                                                                    placeholder=""
                                                                />
                                                                <label
                                                                    htmlFor={`role-${index}`}
                                                                    className={style.textLabel}
                                                                >
                                                                    Role {index + 1} <span className=" text-warning">*</span>
                                                                </label>
                                                                {errors.roles &&
                                                                    <p className={style.textError} >{errors.roles[index]}</p>

                                                                }
                                                            </div>
                                                        ))}
                                                        <div className=" d-flex align-items-center w-100 justify-content-end  ">
                                                            <button type="button"
                                                                onClick={() => {
                                                                    if (values.roles.length < 4) {
                                                                        setFieldValue("roles", [...values.roles, ""]);

                                                                    }
                                                                }}>
                                                                <IoAddCircleSharp className={`${style.add}  ${values.roles.length == 4 ? "opacity-25" : null}`} /></button>
                                                            <button type="button" onClick={() => {
                                                                setFieldValue("roles", [""]);
                                                            }}>
                                                                <RiResetLeftLine className={style.add} /></button>
                                                        </div>
                                                    </div>
                                                </label>

                                            }

                                        </FieldArray>
                                    </div>

                                    <div className={style.textInputWrapper}>
                                        <Field type="date" name="startDate" id="startDate" className={style.textInput} placeholder="" max={getDate()} />
                                        <label className={style.textLabel} htmlFor="startDate">Start date <span className=" text-warning">*</span></label>
                                        <ErrorMessage name="startDate" component="div" className={style.textError} />
                                    </div>


                                    <div className={style.textInputWrapper}>
                                        <Field type="date" name="endDate" id="endDate" className={style.textInput} placeholder="" max={getDate()} />
                                        <label className={style.textLabel} htmlFor="endDate">End date <span className=" text-warning">*</span></label>
                                        <ErrorMessage name="endDate" component="div" className={style.textError} />
                                    </div>
                                </div>

                            </div>
                            <div className=' w-100 d-flex flex-row-reverse gap-3'>
                                {!activeToUpdate.client_name ?
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
