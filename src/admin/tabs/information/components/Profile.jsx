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

const validationSchema = Yup.object({
    logo: Yup.mixed()
        .test("fileSize", "File too large. Max size is 2MB", value =>
            value ? value.size <= 2 * 1024 * 1024 : false
        )
        .test(
            'fileFormat',
            'Unsupported Format',
            value => value && ['image/jpg', 'image/jpeg', 'image/png'].includes(value.type)
        ).required('A file is required'),
    resume: Yup.mixed()
        .test("fileSize", "File too large. Max size is 2MB", value =>
            value ? value.size <= 2 * 1024 * 1024 : false
        )
        .test("fileFormat", "Unsupported Format", value =>
            value ? value.type === "application/pdf" : false
        ).required("A file is required"),

    profile: Yup.mixed()
        .test("fileSize", "File too large. Max size is 2MB", value =>
            value ? value.size <= 2 * 1024 * 1024 : false
        )
        .test(
            'fileFormat',
            'Unsupported Format',
            value => value && ['image/jpg', 'image/jpeg', 'image/png'].includes(value.type)
        ).required('A file is required'),
    userName: Yup.string().required("Required"),
    titles: Yup.array().of(Yup.string().required("Required")),
    description: Yup.string().required("Required"),
    links: Yup.array()
        .of(Yup.string()),



    from: Yup.string()
        .matches(/^\d{4}$/, 'Enter a valid 4-digit year')
        .required('Year is required'),

    to: Yup.string()
        .matches(/^\d{4}$/, 'Enter a valid 4-digit year')
        .required('Year is required'),
});


export default function Profile() {
    
    const { domain } = useDomain();
    const [logoAc, setLogoAc] = useState(null);
    const [resumeAc, setResumeAc] = useState(null);
    const [profileAc, setProfileAc] = useState(null);
    const logoRef = useRef();
    const resumeRef = useRef();
    const profileRef = useRef();
    const [titles] = useState([""]);
    const [links] = useState(["", "", "", "", "", ""]);
    const platforms = ['Linkedin', 'Github', 'Facebook', 'Tiktok', 'Instagram', 'Whatsapp number (20  01117521556)']
    const { loader_index, open_loader, close_loader } = useLoader();

    const initialValues = {
        logo: null,
        resume: null,
        profile: null,
        userName: "",
        titles: [...titles],
        description: "",
        links: [...links],
        from: "",
        to: "",
    }





    return (
        <div id={style.section}>
            {/* {loader_index && <div className={style.loader}><Loader /></div> } */}
            <Formik

                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting }) => {
                    open_loader();
                    setSubmitting(true);
                    console.log(values)
                    const formData = new FormData();
                    let uploaded = []; // 👈 Declare it here so it's accessible later
                    
                    if (values.logo) {
                        const logoUpload = formData.append('files', values.logo);
                        uploaded.push(logoUpload);
                    }

                    if (values.resume) {
                        const resumeUpload = formData.append('files', values.resume);
                        uploaded.push(resumeUpload);
                    }

                    if (values.profile) {
                        const profileUpload = formData.append('files', values.profile); 
                        uploaded.push(profileUpload);
                    }

                   

                    try {
                        const response = await fetch('http://localhost:1337/api/upload', {
                            method: 'POST',
                            body: formData,
                        });

                        const result = await response.json();
                        // console.log('Uploaded files:', result);
                        uploaded = result; // 👈 Assign the result here
                    } catch (err) {
                        console.error('Upload error:', err);
                    }



                    // console.log(result)
                    let data = {
                        logo: uploaded[0]?.id,
                        resume: uploaded[1]?.id,
                        profile_pic: uploaded[2]?.id,
                        admin_name: values.userName,
                        job_titles: values.titles,
                        short_description: values.description,
                        platforms: values.links,
                        start_date: values.from,
                        end_date: values.to,



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
                            <div id={style.imgsForm}>
                                <div className=' position-relative d-flex flex-column justify-content-between h-100'>
                                    <p className=' text-white'>Logo {`( jpg / jpeg / png )`} <span className=" text-warning">*</span></p>
                                    <div className={style.uploadField}>

                                        <div>
                                            {
                                                logoAc ?
                                                    <img src={URL.createObjectURL(logoAc)} alt="" />
                                                    :
                                                    <MdOutlineAddPhotoAlternate className={style.addIcon} />
                                            }
                                        </div>

                                        <label htmlFor="logo"><GrUploadOption className={style.uploadIcon} />
                                            <input
                                                id="logo"
                                                
                                                name='logo'
                                                type="file"
                                                accept="image/*"
                                                ref={logoRef}
                                                onChange={(event) => {
                                                    const file = event.currentTarget.files[0];
                                                    setLogoAc(file);
                                                    setFieldValue("logo", file)
                                                    console.log(values.logo)

                                                }}
                                            />

                                        </label>
                                    </div>
                                    {errors.logo && touched.logo &&
                                        <div className={style.error} >{errors.logo}</div>

                                    }
                                </div>

                                <div className=' position-relative d-flex flex-column justify-content-between h-100'>
                                    <p className=' text-white'>Resume {`( pdf )`} <span className=" text-warning">*</span></p>
                                    <div className={style.uploadField}>

                                        <div>
                                            {
                                                resumeAc ?
                                                    <FaFilePdf className={style.pdfIcon} />
                                                    :
                                                    <MdOutlineAddPhotoAlternate className={style.addIcon} />
                                            }
                                        </div>

                                        <label htmlFor="resume"><GrUploadOption className={style.uploadIcon} />

                                            <input
                                                id="resume"
                                                name="resume"
                                                type="file"
                                                accept="application/pdf"
                                                ref={resumeRef}

                                                onChange={(event) => {
                                                    const file = event.currentTarget.files[0];
                                                    setResumeAc(file);
                                                    setFieldValue("resume", file);
                                                    console.log(values.resume)

                                                }}
                                            />

                                        </label>

                                    </div>
                                    {errors.resume && touched.resume &&
                                        <div className={style.error} >{errors.resume}</div>

                                    }
                                </div>

                                <div className=' position-relative d-flex flex-column justify-content-between h-100'>
                                    <p className=' text-white'>Profile {`( jpg / jpeg / png )`} <span className=" text-warning">*</span></p>
                                    <div className={style.uploadField}>

                                        <div>
                                            {
                                                profileAc ?
                                                    <img src={URL.createObjectURL(profileAc)} alt="" />
                                                    :
                                                    <MdOutlineAddPhotoAlternate className={style.addIcon} />
                                            }
                                        </div>

                                        <label htmlFor="profile"><GrUploadOption className={style.uploadIcon} />
                                            <input
                                                id="profile"
                                                name='profile'
                                                type="file"
                                                accept="image/*"
                                                ref={profileRef}
                                                onChange={(event) => {
                                                    const file = event.currentTarget.files[0];
                                                    setProfileAc(file);
                                                    setFieldValue("profile", file)
                                                    console.log(values.logo)

                                                }}
                                            />

                                        </label>
                                    </div>
                                    {errors.profile && touched.profile &&
                                        <div className={style.error} >{errors.profile}</div>

                                    }
                                </div>



                            </div>
                            <hr className=' text-white mb-5' />
                            <div id={style.textForm}>
                                <div className={style.left}>
                                    <div className={style.textInputWrapper}>
                                        <Field name="userName" id="userName" className={style.textInput} placeholder="" />
                                        <label htmlFor="userName" className={style.textLabel} >Name <span className=" text-warning">*</span></label>
                                        <ErrorMessage name="userName" component="div" className={style.textError} />
                                    </div>

                                    <div className={style.multiTextWrapper}>
                                        <FieldArray name="titles">
                                            {
                                                <label className=" w-100 d-inline ">
                                                    <div className={style.titles}>
                                                        {values.titles.map((title, index) => (
                                                            <div key={index} className={style.textInputWrapper}>
                                                                <input
                                                                    id={`title-${index}`}
                                                                    className={style.textInput}
                                                                    type="text"
                                                                    value={values.titles[index]}
                                                                    onChange={(e) => setFieldValue(`titles[${index}]`, e.target.value)}
                                                                    placeholder=""
                                                                />
                                                                <label
                                                                    htmlFor={`title-${index}`}
                                                                    className={style.textLabel}
                                                                >
                                                                    Job title {index + 1} <span className=" text-warning">*</span>
                                                                </label>
                                                                {errors.titles &&
                                                                    <p className={style.textError} >{errors.titles[index]}</p>

                                                                }
                                                            </div>
                                                        ))}
                                                        <div className=" d-flex align-items-center w-100 justify-content-end  ">
                                                            <button type="button"
                                                                onClick={() => {
                                                                    if (values.titles.length < 2) {
                                                                        setFieldValue("titles", [...values.titles, ""]);

                                                                    }
                                                                }}>
                                                                <IoAddCircleSharp className={`${style.add}  ${values.titles.length == 2 ? "opacity-25" : null}`} /></button>
                                                            <button type="button" onClick={() => {
                                                                setFieldValue("titles", [""]);
                                                            }}>
                                                                <RiResetLeftLine className={style.add} /></button>
                                                        </div>
                                                    </div>
                                                </label>

                                            }

                                        </FieldArray>
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
                                            Short description <span className="text-warning">*</span>
                                        </label>
                                        <ErrorMessage name="description" component="div" className={style.textError} />
                                    </div>


                                    <div className=' d-flex gap-3'>
                                        <div className={style.textInputWrapper}>
                                            <Field name="from" id="from" className={style.textInput} placeholder="" />
                                            <label htmlFor="from" className={style.textLabel} >Start year <span className=" text-warning">*</span></label>
                                            <ErrorMessage name="from" component="div" className={style.textError} />
                                        </div>
                                        <div className={style.textInputWrapper}>
                                            <Field name="to" id="to" className={style.textInput} placeholder="" />
                                            <label htmlFor="to" className={style.textLabel} >End year <span className=" text-warning">*</span></label>
                                            <ErrorMessage name="to" component="div" className={style.textError} />
                                        </div>
                                    </div>

                                </div>

                                <div className={style.multiTextWrapper}>
                                    <FieldArray name="links">
                                        {
                                            <label className=" w-100 d-inline ">
                                                <div className={style.fonts}>
                                                    {values.links.map((link, index) => (
                                                        <div key={index} className={`${style.textInputWrapper}`}>
                                                            <input
                                                                id={`links${index}`}
                                                                value={values.links[index]}
                                                                onChange={(e) => setFieldValue(`links[${index}]`, e.target.value)}
                                                                className={style.textInput}
                                                                type="text"
                                                                placeholder=""
                                                            />
                                                            <label
                                                                htmlFor={`links${index}`}
                                                                className={style.textLabel}
                                                            >
                                                                {platforms[index]}
                                                            </label>
                                                            <ErrorMessage name="links" component="div" className={style.textError} />
                                                        </div>

                                                    ))}


                                                </div>
                                            </label>
                                        }
                                    </FieldArray>
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
        </div>
    )
}
