import style from './information.module.css'
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import axios from 'axios';
import { GrUploadOption } from "react-icons/gr";
import { useRef, useState } from 'react';
import { MdOutlineAddPhotoAlternate } from 'react-icons/md';
import { FaFilePdf } from 'react-icons/fa6';
import { IoAddCircleSharp } from 'react-icons/io5';
import { RiResetLeftLine } from 'react-icons/ri';
import { useDomain, useLoader } from '../../../../store';
import Swal from 'sweetalert2';
import Loader from '../../../../components/loader';
import moment from 'moment';


const validationSchema = Yup.object({
    aboutImg: Yup.mixed()
        .test("fileSize", "File too large. Max size is 2MB", value =>
            value ? value.size <= 2 * 1024 * 1024 : false
        )
        .test(
            'fileFormat',
            'Unsupported Format',
            value => value && ['image/jpg', 'image/jpeg', 'image/png'].includes(value.type)
        ).required('A file is required'),
    longDescription: Yup.array()
        .of(Yup.string().required('A file is required')),
    birthDate: Yup.date().required("Required"),
    phone: Yup.number("must be number").positive("Number of designs must be positive counter").required("Required"),
    email: Yup.string().email("This Not Email").required("Required"),
    country: Yup.string().required("Required"),
    freelance: Yup.string()
        .oneOf(['available', 'unavailable'], 'Please choose an option')
        .required('This field is required'),
});


export default function About() {

    const { domain } = useDomain();
    const [imageInfo, setImageInfo] = useState(null);
    const [description] = useState([""]);
    const imageRef = useRef();
    // const [infoData] = useState(["", "", "", "", "", ""]);
    const { loader_index, open_loader, close_loader } = useLoader();

    const initialValues = {
        aboutImg: null,
        longDescription: [...description],
        birthDate: "",
        phone: "",
        email: "",
        country: "",
        freelance: "",
    }




    const getDate = () => {
        const nowDate = moment().subtract(10, 'years').format("L");
        let splitsDate = nowDate.split("/");
        const newDate = splitsDate[2] + "-" + splitsDate[0] + "-" + splitsDate[1];
        return newDate;
    }


    return (
        <div id={style.section}>
            {/* {loader_index && <div className={style.loader}><Loader /></div>} */}
            <Formik

                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting }) => {
                    open_loader();
                    setSubmitting(true);
                    console.log(values)
                    const formData = new FormData();
                    let uploaded;

                    if (values.aboutImg) {
                        formData.append('files', values.aboutImg); // ✅ key is "files"
                    }

                    try {
                        const response = await fetch('http://localhost:1337/api/upload', {
                            method: 'POST',
                            body: formData,
                        });

                        const result = await response.json();
                        console.log('Uploaded file:', result);

                        uploaded = result; // ✅ now valid

                    } catch (err) {
                        console.error('Upload error:', err);
                    }




                    let data = {
                        about_image: uploaded[0]?.id,
                        long_description: values.longDescription,
                        birth_date: values.birthDate,
                        phone: values.phone,
                        email: values.email,
                        country: values.country,
                        freelance_state: values.freelance,

                    }




                    setTimeout(() => {


                        let endPoint = "/api/user-informations/";
                        let url = domain + endPoint;

                        axios.put(url + "epefy7x35ocbnfqlk48uo1l1", {
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
                            text: "Submit Success",
                            timer: 1500

                        })
                        // navegate('/services')
                        close_loader();

                    }, 500);
                }}

            >

                {({ values, setFieldValue, errors, handleChange, touched }) => (
                    <Form className=' p-3 d-flex flex-column justify-content-between h-100' >


                        <div>

                            <div id={style.textForm}>



                                <div>
                                    <div id={style.imgsForm} className=' d-block'>
                                        <div className=' position-relative d-flex flex-column h-100'>
                                            <p className=' text-white'>About Image {`( jpg / jpeg / png )`} <span className=" text-warning">*</span></p>
                                            <div className={style.uploadField}>

                                                <div>
                                                    {
                                                        imageInfo ?
                                                            <img src={URL.createObjectURL(imageInfo)} alt="" />
                                                            :
                                                            <MdOutlineAddPhotoAlternate className={style.addIcon} />
                                                    }
                                                </div>

                                                <label htmlFor="aboutImg"><GrUploadOption className={style.uploadIcon} />
                                                    <input
                                                        id="aboutImg"

                                                        name='aboutImg'
                                                        type="file"
                                                        accept="image/*"
                                                        ref={imageRef}
                                                        onChange={(event) => {
                                                            const file = event.currentTarget.files[0];
                                                            setImageInfo(file);
                                                            setFieldValue("aboutImg", file)
                                                            console.log(values.aboutImg)

                                                        }}
                                                    />

                                                </label>
                                            </div>
                                            {errors.aboutImg && touched.aboutImg &&
                                                <div className={style.error} >{errors.aboutImg}</div>

                                            }
                                        </div>
                                    </div>

                                    <div className={style.multiTextWrapper}>
                                        <FieldArray name="longDescription">
                                            {
                                                <label className=" w-100 d-inline  ">
                                                    <div className={`${style.titles}`}>
                                                        {values.longDescription.map((description, index) => (
                                                            <div key={index} className={style.areaInputWrapper}>
                                                                <textarea
                                                                    id={`longDescription-${index}`}
                                                                    className={style.textInput}
                                                                    value={values.longDescription[index]}
                                                                    onChange={(e) => setFieldValue(`longDescription[${index}]`, e.target.value)}
                                                                    placeholder=""
                                                                />
                                                                <label
                                                                    htmlFor={`longDescription-${index}`}
                                                                    className={style.textLabel}
                                                                >
                                                                    About section {index + 1} <span className=" text-warning">*</span>
                                                                </label>
                                                                {errors.longDescription &&
                                                                    <p className={style.textError} >{errors.longDescription[index]}</p>

                                                                }
                                                            </div>
                                                        ))}
                                                        <div className=" d-flex align-items-center w-100 justify-content-end  ">
                                                            <button type="button"
                                                                onClick={() => {
                                                                    if (values.longDescription.length < 5) {
                                                                        setFieldValue("longDescription", [...values.longDescription, ""]);

                                                                    }
                                                                }}>
                                                                <IoAddCircleSharp className={`${style.add}  ${values.longDescription.length == 5 ? "opacity-25" : null}`} /></button>
                                                            <button type="button" onClick={() => {
                                                                setFieldValue("longDescription", [""]);
                                                            }}>
                                                                <RiResetLeftLine className={style.add} /></button>
                                                        </div>
                                                    </div>
                                                </label>

                                            }

                                        </FieldArray>
                                    </div>
                                </div>

                                <div>
                                    <p className=' fs-6 text-white'>Info</p>
                                    <div className={style.textInputWrapper}>
                                        <Field type="date" name="birthDate" id="birthDate" className={style.textInput} placeholder="" max={getDate()} />
                                        <label className={style.textLabel} htmlFor="birthDate">Birth date <span className=" text-warning">*</span></label>
                                        <ErrorMessage name="birthDate" component="div" className={style.textError} />
                                    </div>
                                    <div className={style.textInputWrapper}>
                                        <Field type="text" name="phone" id="phone" className={style.textInput} placeholder="" />
                                        <label className={style.textLabel} htmlFor="phone">Phone number <span className=" text-warning">*</span></label>
                                        <ErrorMessage name="phone" component="div" className={style.textError} />
                                    </div>
                                    <div className={style.textInputWrapper}>
                                        <Field name="email" id="email" className={style.textInput} placeholder="" autoComplete="email" />
                                        <label className={style.textLabel} htmlFor="email">Email contact <span className=" text-warning">*</span></label>
                                        <ErrorMessage name="email" component="div" className={style.textError} />
                                    </div>
                                    <div className={style.textInputWrapper}>
                                        <Field type="text" name="country" id="country" className={style.textInput} placeholder="" />
                                        <label className={style.textLabel} htmlFor="country">From <span className=" text-warning">*</span></label>
                                        <ErrorMessage name="country" component="div" className={style.textError} />
                                    </div>
                                    <div className={style.radio_button_container}>
                                        <div className={style.radio_button}>
                                            <Field
                                                type="radio"
                                                name="freelance"
                                                value="available"
                                                id="radio1"
                                                className={style.radio_button__input}
                                            />
                                            <label htmlFor="radio1" className={style.radio_button__label}>
                                                <span className={style.radio_button__custom}></span>
                                                Available for freelance
                                            </label>
                                        </div>

                                        <div className={style.radio_button}>
                                            <Field
                                                type="radio"
                                                name="freelance"
                                                value="unavailable"
                                                id="radio2"
                                                className={style.radio_button__input}
                                            />
                                            <label htmlFor="radio2" className={style.radio_button__label}>
                                                <span className={style.radio_button__custom}></span>
                                                Unavailable for freelance
                                            </label>
                                        </div>

                                        <ErrorMessage name="freelance" component="div" className={style.textError} />
                                    </div>


                                </div>





                            </div>
                        </div>
                        <div className=' w-100 d-flex flex-row-reverse gap-3'>

                            <button type="submit" className={style.submit} >
                                Save
                            </button>
                            {/* <button type="submit" className={style.reset} >
                                Reset
                            </button> */}
                        </div>


                    </Form>
                )
                }
            </Formik >
        </div >
    )
}
