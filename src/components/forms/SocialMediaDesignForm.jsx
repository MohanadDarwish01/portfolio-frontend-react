

import axios from "axios";
import style from "./index.module.css";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import moment from "moment";
import { useEffect, useState } from "react";
import { IoMdImages } from "react-icons/io";
import { IoAddCircleSharp } from "react-icons/io5";
import { RiResetLeftLine } from "react-icons/ri";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { useDomain, useInformation, useLoader } from "../../store";
import { MdError, MdOutlineDelete } from "react-icons/md";
import { FaFilePdf } from "react-icons/fa6";
import { Slider, Box, Typography, Button, TextField } from '@mui/material';
import Loader from "../loader";
import { useNavigate } from "react-router-dom";
import Nav from "../navBar";
import { FaLinkedinIn, FaFacebookF, FaGithub, FaTiktok, FaInstagram, FaWhatsapp } from 'react-icons/fa6';
import socialmedia from '../../assets/services/social-design-form.jpg'


const validationSchema = Yup.object({
    clientName: Yup.string().required("Required"),
    businessName: Yup.string().required("Required"),
    industry: Yup.string().required("Required"),
    email: Yup.string().email("This Not Email").required("Required"),
    targetAudience: Yup.string().required("Required"),
    platforms: Yup.array().min(1, "Select at least one post type"),
    designsNo: Yup.number().required("Required").max(30, "Designs must 30 or less").positive("Number of designs must be positive counter").integer(),
    deadline: Yup.date().required("Required"),
    logos: Yup.array()
        .min(1, "Please upload at least one image.").test("fileType", "Only images and PDFs are allowed.", (files) =>
            !files || files.length === 0
                ? true
                : files.every(
                    (file) =>
                        file.type.startsWith("image/") ||
                        file.type === "application/pdf"
                )
        )
        .test("fileSize", "Each file must be less than 2MB.", (files) =>
            !files || files.length === 0
                ? true
                : files.every((file) => file.size <= 2 * 1024 * 1024)
        )
        .required("You must upload an image."),
    fonts: Yup.array(),
    links: Yup.array()
        .of(Yup.string().url('Must be a valid URL')),

    specificRequests: Yup.array()
        .of(Yup.string()),


    budgetRange: Yup.array()
        .of(Yup.number().positive("Number of designs must be positive counter"))
        .min(2)
        .test(
            'is-valid-range',
            'Min should be less than Max',
            ([min, max]) => min < max
        ),

    communication: Yup.array().min(1, "Select at least one post type"),
    purpose: Yup.string().required("Required"),
    postTypes: Yup.array().min(1, "Select at least one post type"),
    colorPreference: Yup.array(),
    typography: Yup.array(),

});


export default function SocialMediaDesignForm() {

    const navegate = useNavigate();
    const [ service , setService] = useState(); 
    const { loader_index, open_loader, close_loader } = useLoader();
    const { domain } = useDomain();
    const [colors] = useState(["#ff0000", "#00ff00", "#0000ff"]);
    const [fonts] = useState([""]);
    const [links] = useState([""]);
    const [specificRequests] = useState([""]);
    const [previews, setPreviews] = useState(null);

    const { information } = useInformation();
        const platforms = [...information?.platforms || []];
    
        const platformMap = {
            linkedin: {
              icon: <FaLinkedinIn className={style.icon} />,
              class: style.containerOne,
            },
            github: {
              icon: <FaGithub className={style.icon} />,
              class: style.containerTwo,
            },
            facebook: {
              icon: <FaFacebookF className={style.icon} />,
              class: style.containerThree,
            },
            tiktok: {
              icon: <FaTiktok className={style.icon} />,
              class: style.containerFour,
            },
            instagram: {
              icon: <FaInstagram className={style.icon} />,
              class: style.containerFive,
            },
            whatsapp: {
              icon: <FaWhatsapp className={style.icon} />,
              class: style.containerSix,
              isWhatsApp: true,
            },
          };

          useEffect(()=>{
            let endPoint = '/api/services/kum4k5wui6gw96csqth8r4ob'
            let url = domain + endPoint;
            axios.get(url).then((res)=>{
                setService(res.data.data)
            })
        },[])


        const handlePlatforms = () => {
            const activePlatforms = platforms.filter(platforms => platforms.trim() !== "");
    
            return activePlatforms.map((el) => {
                if (el.includes("linkedin.com")) {
                    return ["linkedin", el];
                } else if (el.includes("github.com")) {
                    return ["github", el];
                } else if (el.includes("facebook.com")) {
                    return ["facebook", el];
                } else if (el.includes("tiktok.com")) {
                    return ["tiktok", el];
                } else if (el.includes("instagram.com")) {
                    return ["instagram", el];
                } else if (!el.includes(".com")) {
                    return ["whatsapp", el];
                }
    
                return null; // or some default icon/component
            })
        }

        

    const initialValues = {
        clientName: "",
        email: "",
        businessName: "",
        industry: "",
        targetAudience: "",
        platforms: [],
        designsNo: 1,
        deadline: "",
        logos: null,
        fonts: [...fonts],
        links: [...links],
        specificRequests: [...specificRequests],
        budgetRange: [20, 5000],
        communication: [],
        purpose: "",
        postTypes: [],
        colorPreference: [...colors],
        typography: [],
    }


    const getDate = () => {
        const nowDate = moment().add(1, "days").format("L");
        let splitsDate = nowDate.split("/");
        const newDate = splitsDate[2] + "-" + splitsDate[0] + "-" + splitsDate[1];
        return newDate;
    }



    return (
        <div id={style.social} className=" position-relative ">

            <Nav />
            <div id={style.form}>

                <div id={style.left}>
                    <section id={style.serv} className=" shadow overflow-hidden ">
                        <div >
                            <h1>Order Now</h1>
                            <h3>{service?.service_name}</h3>
                            <p>{service?.service_description}</p>
                        </div>


                        <div className={` ${style.card} animate__animated animate__backInRight animate__delay-1s animate__slower `} >

                            {
                                handlePlatforms().map((el, index) => {
                                    const [platform, url] = el;
                                    const data = platformMap[platform];

                                    if (!data) return null;

                                    const href = data.isWhatsApp ? `https://wa.me/${url.replace(/\s+/g, "")}?text=Hello%2C%20I%27m%20interested!` : url;

                                    return (
                                        <a
                                            key={index}
                                            className={`${style.socialContainer} ${data.class}`}
                                            target="_blank"
                                            href={href}
                                        >
                                            <div className={style.socialSvg}>{data.icon}</div>
                                        </a>
                                    );
                                })

                            }
                        </div>
                    </section>

                    <img src={socialmedia} alt="" />
                </div>
                <div id={style.right}>
                    {loader_index && <div id={style.loader} > <Loader /> </div>}

                    {!loader_index &&

                        <Formik
                            className={style.form}
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={async (values, { setSubmitting }) => {
                                open_loader();
                                setSubmitting(true);
                                console.log(values)
                                const formData = new FormData();
                                values.logos.forEach((file) => {
                                    formData.append("files", file);
                                });

                                let uploadedImageIds = [];

                                try {
                                    const uploadRes = await axios.post(domain + '/api/upload', formData);
                                    uploadedImageIds = uploadRes.data.map((file) => file.id);
                                } catch (err) {
                                    console.error("Upload failed", err);
                                    setSubmitting(false);
                                    return;
                                }

                                let data = {
                                    client_name: values.clientName,
                                    client_email: values.email,
                                    brand_name: values.businessName,
                                    industry_type: values.industry,
                                    target_audience: values.targetAudience,
                                    designs_purpose: values.purpose,
                                    platforms: values.platforms,
                                    post_types: values.postTypes,
                                    designs_number: values.designsNo,
                                    deadline: values.deadline,
                                    colors: values.colorPreference,
                                    typography_style: values.typography,
                                    logos: uploadedImageIds,
                                    brand_fonts: values.fonts,
                                    links: values.links,
                                    requests: values.specificRequests,
                                    budget_range: values.budgetRange,
                                    communications: values.communication,


                                }
                                setTimeout(() => {


                                    let endPoint = "/api/social-media-requests";
                                    let url = domain + endPoint;

                                    axios.post(url,
                                        { data: data },
                                        {
                                            headers: {
                                                "Content-Type": "application/json",
                                            },
                                        }
                                    )

                                    console.log(values);
                                    setSubmitting(false);
                                    Swal.fire({
                                        icon: "success",
                                        text: "Submit Success",
                                        timer: 1500

                                    })
                                    navegate('/services')
                                    close_loader();

                                }, 500);
                            }}
                        >

                            {({ values, setFieldValue, errors, handleChange ,  dirty, isValid,  }) => (
                                <Form className="space-y-4 max-w-3xl mx-auto p-4 ">

                                    <div>
                                        {/* ======================================================================================================================== */}
                                        {/* sectttttttion 1 */}

                                        <div className=" w-100">
                                            <div id={style.title} >
                                                <h4>Project Information</h4>
                                            </div>

                                            <div className={style.textInputWrapper}>
                                                <Field name="clientName" id="clientName" className={style.textInput} placeholder="" />
                                                <label htmlFor="clientName" className={style.textLabel} >Client Name <span className=" text-warning">*</span></label>
                                                <ErrorMessage name="clientName" component="div" className={style.error} />
                                            </div>

                                            <div className={style.textInputWrapper}>
                                                <Field name="email" id="email" className={style.textInput} placeholder="" autoComplete="email" />
                                                <label className={style.textLabel} htmlFor="email">Email contact <span className=" text-warning">*</span></label>
                                                <ErrorMessage name="email" component="div" className={style.error} />
                                            </div>

                                            <div className={style.textInputWrapper}>
                                                <Field name="businessName" id="businessName" className={style.textInput} placeholder="" />
                                                <label className={style.textLabel} htmlFor="businessName">Business Name / Brand <span className=" text-warning">*</span></label>
                                                <ErrorMessage name="businessName" component="div" className={style.error} />
                                            </div>

                                            <div className={style.textInputWrapper}>
                                                <Field name="industry" id="industry" className={style.textInput} placeholder="" />
                                                <label className={style.textLabel} htmlFor="industry">Industry Type <span className=" text-warning">*</span></label>
                                                <ErrorMessage name="industry" component="div" className={style.error} />
                                            </div>

                                            <div className={style.textInputWrapper}>
                                                <Field name="targetAudience" id="targetAudience" className={style.textInput} placeholder="" />
                                                <label className={style.textLabel} htmlFor="targetAudience">Target Audience <span className=" text-warning">*</span></label>
                                                <ErrorMessage name="targetAudience" component="div" className={style.error} />
                                            </div>



                                            <div className={style.textListWrapper}>
                                                <Field as="select" name="purpose" id="purpose" className={style.selectInput} >
                                                    <option value="">Select</option>
                                                    <option value="Brand awareness">Brand awareness</option>
                                                    <option value="Promote a product/service">Promote a product/service</option>
                                                    <option value="Event announcement">Event announcement</option>
                                                    <option value="Engagement">Engagement</option>
                                                    <option value="Testimonials">Testimonials</option>
                                                    <option value="Educational content">Educational content</option>
                                                </Field>
                                                <label className={style.selectLabel} htmlFor="purpose" >Purpose of the Designs <span className=" text-warning">*</span></label>
                                                <ErrorMessage name="purpose" component="div" className={style.error} />
                                            </div>


                                            <div className={style.textCheckWrapper}>
                                                <label>Social Media Platforms <span className=" text-warning">*</span>
                                                    <div className={style.check} role="group">
                                                        {[
                                                            "Facebook",
                                                            "Instagram",
                                                            "Twitter",
                                                            "LinkedIn",
                                                            "Pinterest",
                                                            "TikTok",
                                                        ].map((item) => (
                                                            <div key={item} className={style.block}>
                                                                <Field type="checkbox" name="platforms" value={item} /> {item}
                                                                <svg viewBox="0 0 35.6 35.6">
                                                                    <circle className={style.background} cx="17.8" cy="17.8" r="17.8"></circle>
                                                                    <circle className={style.stroke} cx="17.8" cy="17.8" r="14.37"></circle>
                                                                    <polyline className={style.check} points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>
                                                                </svg>
                                                            </div>
                                                        ))}
                                                        <ErrorMessage name="platforms" component="div" className={style.errorMs} />
                                                    </div>
                                                </label>
                                            </div>

                                            <div className={style.textCheckWrapper}>
                                                <label>Preferred Post Types <span className=" text-warning">*</span>
                                                    <div className={style.check} role="group">
                                                        {[
                                                            "Static Images",
                                                            "Carousels",
                                                            "Reels",
                                                            "Stories",
                                                            "Highlights Covers",
                                                            "Animated Posts",
                                                        ].map((item) => (
                                                            <div key={item} className={style.block}>
                                                                <Field type="checkbox" name="postTypes" value={item} /> {item}
                                                                <svg viewBox="0 0 35.6 35.6">
                                                                    <circle className={style.background} cx="17.8" cy="17.8" r="17.8"></circle>
                                                                    <circle className={style.stroke} cx="17.8" cy="17.8" r="14.37"></circle>
                                                                    <polyline className={style.check} points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>

                                                                </svg>
                                                            </div>
                                                        ))}
                                                        <ErrorMessage name="postTypes" component="div" className={style.errorMs} />
                                                    </div>
                                                </label>
                                            </div>

                                            <div className={style.textInputWrapper}>

                                                <Field type="number" name="designsNo" id="designsNo" className={style.textInput} placeholder="" onChange={handleChange} />
                                                <label className={style.textLabel} htmlFor="designsNo">Number of Designs Required <span className=" text-warning">*</span></label>
                                                <ErrorMessage name="designsNo" component="div" className={style.error} />
                                            </div>

                                            <div className={style.textInputWrapper}>
                                                <Field type="date" name="deadline" id="deadline" className={style.textInput} placeholder="" min={getDate()} />
                                                <label className={style.textLabel} htmlFor="deadline">Deadline/Timeline <span className=" text-warning">*</span></label>
                                                <ErrorMessage name="deadline" component="div" className={style.error} />
                                            </div>
                                            <hr className=" text-white my-5" />

                                        </div>

                                        {/* ======================================================================================================================== */}
                                        {/* sectttttttion 2 */}

                                        <div className=" w-100">
                                            {/* title of the form */}
                                            <div id={style.title} >
                                                <h4>Visual Style & Branding</h4>
                                            </div>


                                            {/* brand logos */}
                                            <div className={style.textColorWrapper}>
                                                <label className=" my-5" > Brand Logos & Refrences <br /> {`( jpg / jpeg / png / gif / webp /svg /pdf )`}  <span className=" text-warning">*</span>
                                                    {errors.logos && (
                                                        <div className=" position-relative" >
                                                            <p className={style.error} >{errors.logos}</p>
                                                        </div>
                                                    )}
                                                    <div id={style.uploadArea} className=" mt-3" onClick={(e) => e.preventDefault()}>
                                                        <div className={style.custum_file_upload} onClick={(e) => e.stopPropagation()} >
                                                            <div className={style.icon}>
                                                                <IoMdImages />
                                                            </div>
                                                            <div className={style.text}>
                                                                <span>Click to upload image</span>
                                                            </div>
                                                            <input
                                                                id="logos"
                                                                name="logos"
                                                                type="file"
                                                                accept="image/*, application/pdf"
                                                                multiple
                                                                onChange={(event) => {
                                                                    
                                                                        const input = event.currentTarget;
                                                                        const newFiles = Array.from(input.files);
                                                                        const existingFiles = values.logos || [];
    
                                                                        // Filter out duplicates (based on name + size)
                                                                        const filteredNewFiles = newFiles.filter(
                                                                            (newFile) => !existingFiles.some(
                                                                                (existing) => existing.name === newFile.name && existing.size === newFile.size
                                                                            )
                                                                        );
    
                                                                        // Combine files
                                                                        const updatedFiles = [...existingFiles, ...filteredNewFiles];
    
                                                                        // Set Formik field
                                                                        setFieldValue("logos", updatedFiles);
    
                                                                        // Reset input to allow re-upload of same file
                                                                        input.value = null;
    
                                                                        // Generate previews
                                                                        const fileReaders = updatedFiles.map((file) => {
                                                                            return new Promise((resolve) => {
                                                                                const reader = new FileReader();
                                                                                reader.onloadend = () => resolve(reader.result);
                                                                                reader.readAsDataURL(file);
                                                                            });
                                                                        });
    
                                                                        Promise.all(fileReaders).then((previews) => {
                                                                            setPreviews(previews);
                                                                        });
                                                                    
                                                                    
                                                                }}

                                                            />
                                                        </div>
                                                        {
                                                            previews && (
                                                                
                                                                <div className="grid grid-cols-4 md:grid-cols-6 gap-md-4 gap-2 " id={style.selectedArea} >
                                                                    
                                                                    {previews.map((src, index) => (
                                                                        <div id={style.selectedImg} key={index}>
                                                                            <div className={style.delete}>
                                                                                <MdOutlineDelete onClick={() => {
                                                                                    const updatedPreviews = [...previews];
                                                                                    const updatedLogos = [...(values.logos || [])];

                                                                                    // Remove the selected index from both
                                                                                    updatedPreviews.splice(index, 1);
                                                                                    updatedLogos.splice(index, 1);

                                                                                    // Update both state and formik field
                                                                                    setPreviews(updatedPreviews);
                                                                                    setFieldValue("logos", updatedLogos);
                                                                                }} />
                                                                            </div>

                                                                            {
                                                                                src.includes("image/") ?
                                                                                    <img
                                                                                        src={src}
                                                                                        alt={`Refrence ${index}`}
                                                                                        className=" object-cover rounded "
                                                                                    /> : src.includes("application/pdf") ?
                                                                                        <div className={style.pdf}>
                                                                                            <FaFilePdf />
                                                                                        </div>
                                                                                        :
                                                                                        <div className={style.err}>
                                                                                            <MdError />
                                                                                        </div>
                                                                            }
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                </label>
                                            </div>




                                            {/* color palette */}
                                            <div className={style.textColorWrapper} onClick={(e) => { e.preventDefault() }}>
                                                <FieldArray name="colors">
                                                    {
                                                        <label className=" my-5">Preferred Colors
                                                            <div className={style.col}>
                                                                {values.colorPreference?.map((color, index) => (
                                                                    <div key={index} className={style.col_btn} onClick={(e) => e.stopPropagation()} >
                                                                        <input
                                                                            name={`colors[${index}]`}
                                                                            id={`colors-${index}`}
                                                                            type="color"
                                                                            value={color}
                                                                            onChange={(e) => setFieldValue(`colorPreference[${index}]`, e.target.value)}
                                                                            style={{
                                                                                width: "40px",
                                                                                height: "40px",
                                                                                borderRadius: "50%",
                                                                                border: "2px solid white",
                                                                                padding: 0,
                                                                                cursor: "pointer",
                                                                                background: "transparent",
                                                                            }}
                                                                        />
                                                                    </div>
                                                                ))}


                                                                <div className=" d-flex align-items-center" >
                                                                    <button type="button"
                                                                        onClick={() => {
                                                                            if (values.colorPreference.length < 6) {
                                                                                setFieldValue("colorPreference", [...values.colorPreference, "#ffffff"]);

                                                                            }
                                                                        }}>
                                                                        <IoAddCircleSharp className={`${style.add}  ${values.colorPreference.length == 6 ? "opacity-25" : null}`} /></button>
                                                                    <button type="button" onClick={() => {

                                                                        setFieldValue("colorPreference", ["#ff0000", "#00ff00", "#0000ff"]);
                                                                    }}>
                                                                        <RiResetLeftLine className={style.add} />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <div className=" mb-4">
                                                                Selected Colors: <span>{values.colorPreference.join(", ")}</span>
                                                            </div>
                                                        </label>
                                                    }
                                                </FieldArray>
                                                {/* <hr className=" text-white my-1" /> */}
                                            </div>


                                            {/* fonts */}


                                            <div className={style.multiTextWrapper}>
                                                <FieldArray name="fonts">
                                                    {
                                                        <label className=" w-100 d-inline "> Brand fonts
                                                            <div className={style.fonts}>
                                                                {values.fonts.map((font, index) => (
                                                                    <div key={index} className={style.textInputWrapper}>
                                                                        <input
                                                                            id={`font-${index}`}
                                                                            className={style.textInput}
                                                                            type="text"
                                                                            value={values.fonts[index]}
                                                                            onChange={(e) => setFieldValue(`fonts[${index}]`, e.target.value)}
                                                                            placeholder=""
                                                                        />
                                                                        <label
                                                                            htmlFor={`font-${index}`}
                                                                            className={style.textLabel}
                                                                        >
                                                                            font {index + 1}
                                                                        </label>
                                                                    </div>
                                                                ))}

                                                                <div className=" d-flex align-items-center w-100 justify-content-end  ">
                                                                    <button type="button"
                                                                        onClick={() => {
                                                                            if (values.fonts.length < 3) {
                                                                                setFieldValue("fonts", [...values.fonts, ""]);

                                                                            }
                                                                        }}>
                                                                        <IoAddCircleSharp className={`${style.add}  ${values.fonts.length == 3 ? "opacity-25" : null}`} /></button>
                                                                    <button type="button" onClick={() => {
                                                                        setFieldValue("fonts", [""]);
                                                                    }}>
                                                                        <RiResetLeftLine className={style.add} /></button>
                                                                </div>
                                                            </div>
                                                        </label>
                                                    }
                                                </FieldArray>
                                                {/* <hr className=" text-white my-1" /> */}
                                            </div>



                                            {/* links */}


                                            <div className={style.multiTextWrapper}>
                                                <FieldArray name="links">
                                                    {
                                                        <label className=" w-100 d-inline "> Refrences {`(URL)s`}
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
                                                                            link {index + 1}
                                                                        </label>
                                                                    </div>
                                                                ))}
                                                                <ErrorMessage name="links" component="div" className={style.error} />
                                                                <div className=" d-flex align-items-center w-100 justify-content-end  ">
                                                                    <button type="button"
                                                                        onClick={() => {
                                                                            if (values.links.length < 10) {
                                                                                setFieldValue("links", [...values.links, ""]);
                                                                            }
                                                                        }}>
                                                                        <IoAddCircleSharp className={`${style.add}  ${values.links.length == 10 ? "opacity-25" : null}`} /></button>
                                                                    <button type="button" onClick={() => {
                                                                        setFieldValue("links", [""]);
                                                                    }}>
                                                                        <RiResetLeftLine className={style.add} /></button>
                                                                </div>
                                                            </div>
                                                        </label>
                                                    }
                                                </FieldArray>
                                                {/* <hr className=" text-white my-1" /> */}
                                            </div>


                                            <div className={style.multiTextWrapper}>
                                                <FieldArray name="specificRequests">
                                                    {
                                                        <label className=" w-100 d-inline  h-100 "> Specific Imagery Requests
                                                            <div className={style.fonts}>
                                                                {values.specificRequests.map((request, index) => (
                                                                    <div key={index} className={style.textInputWrapper}>
                                                                        <textarea
                                                                            id={`request${index}`}
                                                                            value={values.specificRequests[index]}
                                                                            onChange={(e) => setFieldValue(`specificRequests[${index}]`, e.target.value)}
                                                                            className={`${style.textInput}  ${style.textArea}`}
                                                                            placeholder="Detailed descriptions of images they want"
                                                                        />
                                                                        <label
                                                                            htmlFor={`request${index}`}
                                                                            className={style.textLabel}
                                                                        >
                                                                            {/* Request {index + 1} */}
                                                                        </label>
                                                                    </div>
                                                                ))}

                                                                <div className=" d-flex align-items-center w-100 justify-content-end  ">
                                                                    <button type="button"
                                                                        onClick={() => {
                                                                            if (values.specificRequests.length < 10) {
                                                                                setFieldValue("specificRequests", [...values.specificRequests, ""]);
                                                                            }
                                                                        }}>
                                                                        <IoAddCircleSharp className={`${style.add}  ${values.specificRequests.length == 10 ? "opacity-25" : null}`} /></button>
                                                                    <button type="button" onClick={() => {
                                                                        setFieldValue("specificRequests", [""]);
                                                                    }}>
                                                                        <RiResetLeftLine className={style.add} /></button>
                                                                </div>


                                                            </div>

                                                        </label>


                                                    }
                                                </FieldArray>
                                                {/* <hr className=" text-white my-1" /> */}
                                            </div>



                                            {/* text type */}
                                            <div className={style.textCheckWrapper}>
                                                <label>Typography Style
                                                    <div role="group" className={style.check}>
                                                        {[
                                                            "Serif",
                                                            "Sans Serif",
                                                            "Script / Handwritten",
                                                            "Bold Headlines",
                                                            "Minimal Typography",
                                                        ].map((item) => (
                                                            <div key={item} className={style.block}>
                                                                <Field type="checkbox" name="typography" value={item} /> {item}
                                                                <svg viewBox="0 0 35.6 35.6">
                                                                    <circle className={style.background} cx="17.8" cy="17.8" r="17.8"></circle>
                                                                    <circle className={style.stroke} cx="17.8" cy="17.8" r="14.37"></circle>
                                                                    <polyline className={style.check} points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>

                                                                </svg>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </label>
                                            </div>


                                        </div>
                                        <hr className=" text-white my-3" />

                                        {/* ======================================================================================================================== */}
                                        {/* sectttttttion 3 */}

                                        <div className=" w-100">
                                            <div id={style.title} >
                                                <h4>Additional Considerations</h4>
                                            </div>

                                            <div className={style.textCheckWrapper}>
                                                <label>Preferred Communication Method <span className=" text-warning" onClick={(e) => e.preventDefault()}>*</span>
                                                    <div className={style.check} role="group">
                                                        {[
                                                            "Email",
                                                            "Phone",
                                                            "Whatsapp",
                                                            "Video Call",
                                                        ].map((item) => (
                                                            <div key={item} className={style.block}>
                                                                <Field type="checkbox" name="communication" value={item} /> {item}
                                                                <svg viewBox="0 0 35.6 35.6">
                                                                    <circle className={style.background} cx="17.8" cy="17.8" r="17.8"></circle>
                                                                    <circle className={style.stroke} cx="17.8" cy="17.8" r="14.37"></circle>
                                                                    <polyline className={style.check} points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>

                                                                </svg>
                                                            </div>
                                                        ))}
                                                        <ErrorMessage name="communication" component="div" className={style.errorMs} />
                                                    </div>
                                                </label>
                                            </div>

                                            <div className=" d-flex flex-column align-items-center position-relative">
                                                <label className=" w-100 mb-3 text-white">Preferred Communication Method <span className=" text-warning">*</span>
                                                    <Box className=" d-flex justify-content-between gap-3 w-100" my={2}  >
                                                        <TextField

                                                            label="Min"
                                                            type="number"
                                                            positive="true"
                                                            name="budgetRange[0]"
                                                            value={values.budgetRange ? values.budgetRange[0] : ''}
                                                            onChange={handleChange}
                                                            sx={{
                                                                width: '50%',
                                                                '& label': {
                                                                    color: 'white !important',
                                                                    fontWeight: 'bold',
                                                                },
                                                                '& .MuiOutlinedInput-root': {
                                                                    borderRadius: '2rem',
                                                                    color: 'gray',
                                                                    '& input': {
                                                                        fontSize: '1.1rem',
                                                                        padding: '8px 12px',
                                                                        color: 'gray',
                                                                    },
                                                                    '& fieldset': {
                                                                        borderColor: 'gray ',
                                                                        opacity: '1'

                                                                    },
                                                                    '&:hover fieldset ': {
                                                                        borderColor: 'white'
                                                                    },
                                                                    '&:hover input ': {
                                                                        color: 'white'
                                                                    },
                                                                    '&.Mui-focused fieldset': {
                                                                        borderColor: 'white',
                                                                        borderWidth: '0.1em',
                                                                    },
                                                                    '&.Mui-focused input': {
                                                                        color: 'white'

                                                                    },
                                                                },
                                                                '&:hover label': {
                                                                    color: 'white'
                                                                },
                                                            }}
                                                            InputProps={{
                                                                endAdornment: <span > $</span>,
                                                            }}
                                                        />
                                                        <TextField
                                                            label="Max"
                                                            type="number"
                                                            name="budgetRange[1]"
                                                            value={values.budgetRange ? values.budgetRange[1] : ''}
                                                            onChange={handleChange}

                                                            sx={{
                                                                width: '50%',
                                                                '& label': {
                                                                    color: 'white !important',
                                                                    fontWeight: 'bold',
                                                                },
                                                                '& .MuiOutlinedInput-root': {
                                                                    borderRadius: '2rem',
                                                                    color: 'gray',
                                                                    '& input': {
                                                                        fontSize: '1.1rem',
                                                                        padding: '8px 12px',
                                                                        color: 'gray',
                                                                    },
                                                                    '& fieldset': {
                                                                        borderColor: 'gray ',
                                                                        opacity: '1'

                                                                    },
                                                                    '&:hover fieldset ': {
                                                                        borderColor: 'white'
                                                                    },
                                                                    '&:hover input ': {
                                                                        color: 'white'
                                                                    },
                                                                    '&.Mui-focused fieldset': {
                                                                        borderColor: 'white',
                                                                        borderWidth: '0.1em',
                                                                    },
                                                                    '&.Mui-focused input': {
                                                                        color: 'white'

                                                                    },
                                                                },
                                                                '&:hover label': {
                                                                    color: 'white'
                                                                },
                                                            }}
                                                            InputProps={{
                                                                endAdornment: <span > $</span>,
                                                            }}
                                                        />
                                                    </Box>
                                                </label>
                                                <Slider
                                                    value={values.budgetRange}
                                                    onChange={(event, newValue) => {
                                                        setFieldValue('budgetRange', newValue);
                                                    }}
                                                    valueLabelDisplay="auto"
                                                    step={10}
                                                    min={20}
                                                    max={5000}

                                                    sx={{
                                                        width: '95%',
                                                        color: '#d9e064',
                                                        fillOpacity: '#d9e064',

                                                        '&.MuiSlider-thumb':
                                                            { color: '#ff0000' }
                                                    }}
                                                />
                                                {errors.budgetRange && (
                                                    <Typography name="budgetRange"
                                                        sx={{
                                                            color: ' white',
                                                            position: 'absolute',
                                                            right: '0',
                                                            top: '-8px',
                                                            fontSize: '10px',
                                                            backgroundColor: 'red',
                                                            borderRadius: '8px',
                                                            padding: '1px 10px',
                                                        }}
                                                    >{errors.budgetRange}</Typography>
                                                )}
                                            </div>
                                            <hr className=" text-white my-5" />
                                        </div>
                                    </div>


                                    {/* ======================================================================================================================== */}
                                    {/* accept */}

                                    <button type="submit" className={`${ !dirty || !isValid ? style.nonSubmit : style.submit } w-100`}  disabled={!dirty || !isValid}>
                                        Submit
                                    </button>
                                </Form>
                            )
                            }
                        </Formik >


                    }
                </div>
            </div>

        </div >
    )
}

