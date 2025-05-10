import style from './portfolio.module.css'
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from 'axios';
import { GrUploadOption } from "react-icons/gr";
import { useEffect, useRef, useState } from 'react';
import { MdError, MdOutlineAddPhotoAlternate, MdOutlineDelete } from 'react-icons/md';
import { useCategoriesData, useDomain, useLoader, useProjectsAdmin, useReviewsModal } from '../../../../store';
import Swal from 'sweetalert2';
import { IoIosCloseCircle, IoMdImages } from "react-icons/io";


const validationSchema = Yup.object({
    projectName: Yup.string().required("Required"),
    coverImg: Yup.mixed()
        .test("fileSize", "File too large. Max size is 2MB", value => {
            if (!value) return false;
            if (typeof value === 'number') return true;
            return value.size <= 5 * 1024 * 1024;
        })
        .test('fileFormat', 'Unsupported Format', value => {
            if (!value) return false;
            if (typeof value === 'number') return true;
            return ['image/jpg', 'image/jpeg', 'image/png'].includes(value.type);
        })
        .required('A file is required'),

    images: Yup.array()
        
        .test(
            "filetype",
            "Only images are allowed",
            (files) =>
                files || files.length > 0
                    ? true
                    : files.every((file) => {
                        // Check both possible image type properties safely
                        const type = file.type || file.mime || '';
                        return type.startsWith("image/"); // Fixed method name (startsWith, not startswith)
                    })
        )
        .test(
            "filesize",
            "Each file must be less than 5MB",
            (files) =>
                files || files.length > 0
                    ? true
                    : files.every((file) => file.size <= 5 * 1024 * 1024)
        )
        .required("You must upload an image."),


    category: Yup.string(),

    description: Yup.string().required("Required"),

});
export default function ProjectsModal() {


    const { domain } = useDomain();
    const { data } = useCategoriesData();
    const [allFiles, setAllFiles] = useState([]);
    const [removedStrapiIds, setRemovedStrapiIds] = useState([]);
    const { closeProjectModal, activeToUpdate, resetActiveProject } = useProjectsAdmin();
    const [imageInfo, setImageInfo] = useState(null);
    const imageRef = useRef();
    const [previews, setPreviews] = useState(null);


   


    const [initialValues, setInitialValues] = useState({
        projectName: activeToUpdate?.project_name || "",
        coverImg: activeToUpdate?.project_cover?.id || null, // whole object


        images: activeToUpdate?.project_images?.map((img) => img?.id) || null,



        category: activeToUpdate?.category?.category_name || "",
        description: activeToUpdate?.project_description || ""
    });


    const getCategory = (catName) => {


        let selectedCat = data.find((el) => el.category_name === catName)
        return selectedCat;



    }


    
    useEffect(() => {
        if (activeToUpdate?.project_images?.length > 0) {

            const simplifiedArray = (activeToUpdate?.project_images?.map((img) => img)).map(item => ({
                url: domain + item.url,
                id: item.id,

            }));

            const strapiImages = simplifiedArray.map(img => ({
                src: img.url,
                type: "strapi",
                id: img.id,
            }));
            setPreviews(strapiImages)
            setAllFiles([]);
        }
    }, [activeToUpdate?.project_images]);


  
    useEffect(() => {
        return () => {
            resetActiveProject();
        };
    }, [activeToUpdate])



    return (
        <div className="overlay " onClick={closeProjectModal}>
            <div onClick={(e) => { e.stopPropagation() }} id={style.createClient} className='col-10 col-md-6  d-flex flex-column gap-3 shadow animate__animated animate__fadeInDown  '>
                <IoIosCloseCircle onClick={closeProjectModal} className={style.closeIcon} />


                {!activeToUpdate.project_name ?
                    <h2>Add Project</h2>
                    :
                    <h2>Edit Project</h2>
                }

                <Formik
                    enableReinitialize={true}
                    initialValues={initialValues}
                    validationSchema={validationSchema}




                    onSubmit={async (values, { setSubmitting }) => {
                        setSubmitting(true);
                        if (!activeToUpdate.project_name) {
                            let uploaded;
                            let uploadedImageIds = [];
                            if (values.coverImg && values.coverImg instanceof File) {
                                const formData = new FormData();
                                formData.append('files', values.coverImg);
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



                            const formData = new FormData();
                            values.images.forEach((file) => {
                                formData.append("files", file);
                            });

                            try {
                                const uploadRes = await axios.post(domain + '/api/upload', formData);
                                uploadedImageIds = uploadRes.data.map((file) => file.id);
                            } catch (err) {
                                console.error("Upload failed", err);
                                setSubmitting(false);
                                return;
                            }

                            let data = {
                                project_name: values.projectName,
                                project_cover: uploaded?.[0]?.id || activeToUpdate?.project_cover?.id || null,
                                project_images: uploadedImageIds.length > 0 ? uploadedImageIds : null,
                                category: getCategory(values.category)?.id || null, // make sure this returns correct category ID
                                project_description: values.description,
                            }
                            let endPoint = "/api/projects/";
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
                                title: "Your project saved",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            closeProjectModal()
                            // window.location.reload();

                        }
                        else {
                            //     // ============================================ update form ===================================


                            let uploaded;

                            if (values.coverImg && values.coverImg instanceof File) {
                                const formData = new FormData();
                                formData.append('files', values.coverImg);
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

                            const localFiles = previews.filter(p => p.type === "local").map(p => p.file);
                            const existingStrapiIds = previews
                                .filter(p => p.type === "strapi")
                                .map(p => p.id);

                            let uploadedImageIds = [];

                            if (localFiles.length > 0) {
                                const formData = new FormData();
                                localFiles.forEach(file => {
                                    formData.append("files", file);
                                });

                                try {
                                    const uploadRes = await axios.post(domain + '/api/upload', formData);
                                    uploadedImageIds = uploadRes.data.map(file => file.id);
                                } catch (err) {
                                    console.error("Upload failed", err);
                                    setSubmitting(false);
                                    return;
                                }
                            }

                            // Combine both
                            const finalImageIds = [...uploadedImageIds, ...existingStrapiIds];
                           
                            let data = {
                                project_name: values.projectName,
                                project_cover: uploaded?.[0]?.id || activeToUpdate?.project_cover?.id || null,
                                project_images:
                                    // (uploadedImageIds.length > 0 && uploadedImageIds) || [...activeToUpdate?.project_images] || null,
                                    finalImageIds.length > 0 ? finalImageIds
                                        : values.images,
                                category: getCategory(values.category)?.id || null, // make sure this returns correct category ID
                                project_description: values.description,
                            }


                            let endPoint = "/api/projects/";
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
                                title: "Your project updated",
                                showConfirmButton: false,
                                timer: 1500
                            });


                            closeProjectModal()

                        }
                    }}

                >
                    {({ setFieldValue, setSubmitting , errors, dirty, isValid, touched , isSubmitting }) => (
                        <Form className=' p-3 d-flex flex-column justify-content-between h-100' >

                            <div className={style.textInputWrapper}>
                                <Field type="text" name="projectName" id="projectName" className={style.textInput} placeholder="" />
                                <label className={style.textLabel} htmlFor="projectName">Project name <span className=" text-warning">*</span></label>
                                <ErrorMessage name="projectName" component="div" className={style.textError} />
                            </div>

                            <div>
                                <div id={style.imgsForm} className=' d-block'>
                                    <div className=' position-relative d-flex flex-column h-100'>
                                        <p className=' text-white'>Category image {`( jpg / jpeg / png )`}</p>
                                        <div className={style.uploadField}>
                                            <div>
                                                {
                                                    imageInfo ? (
                                                        <img src={URL.createObjectURL(imageInfo)} alt="" />
                                                    ) : activeToUpdate.project_cover ? (
                                                        <img src={domain + activeToUpdate.project_cover.url} alt="" />
                                                    ) : (
                                                        <MdOutlineAddPhotoAlternate className={style.addIcon} />
                                                    )
                                                }
                                            </div>
                                            <label htmlFor="coverImg"><GrUploadOption className={style.uploadIcon} />
                                                <input
                                                    id="coverImg"

                                                    name='coverImg'
                                                    type="file"
                                                    accept="image/*"
                                                    ref={imageRef}
                                                    onChange={(event) => {
                                                        const file = event.currentTarget.files[0];
                                                        setImageInfo(file);
                                                        setFieldValue("coverImg", file)


                                                    }}
                                                />

                                            </label>
                                        </div>
                                        {errors.coverImg &&
                                            <div className={style.error} >{errors.coverImg}</div>

                                        }
                                    </div>
                                </div>


                                {/* brand logos */}
                                <div className={style.textColorWrapper}>
                                    <label className=" w-100 mb-4 " > Portfolio images <br /> {`( jpg / jpeg / png / gif / webp /svg /pdf )`}  <span className=" text-warning">*</span>
                                        {errors.images && (
                                            <div className=" position-relative" >
                                                <p className={style.errorsImgs} >{errors.images}</p>
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
                                                    id="images"
                                                    name="images"
                                                    type="file"
                                                    accept="image/*"
                                                    multiple

                                                    onChange={(event) => {
                                                        const files = Array.from(event.currentTarget.files);

                                                        const updatedFiles = files.filter(file =>
                                                            !allFiles.some(f => f.name === file.name && f.size === file.size)
                                                        );

                                                        const newPreviews = updatedFiles.map(file => ({
                                                            src: URL.createObjectURL(file),
                                                            type: "local",
                                                            file,
                                                        }));

                                                        setAllFiles(prev => [...prev, ...updatedFiles]);
                                                        setPreviews(prev => [...(prev || []), ...newPreviews]);
                                                        setFieldValue("images", [...(allFiles || []), ...updatedFiles]);
                                                    }}
                                                />
                                            </div>
                                            {previews && previews.length > 0 && (
                                                <div className="grid grid-cols-4 md:grid-cols-6 gap-md-4 gap-2 " id={style.selectedArea} >
                                                    {previews.map((item, index) => (
                                                        <div key={index} id={style.selectedImg}>
                                                            <div className={style.delete}>
                                                                <MdOutlineDelete onClick={() => {
                                                                    const newPreviews = [...previews];
                                                                    const removed = newPreviews[index];

                                                                    newPreviews.splice(index, 1);
                                                                    setPreviews(newPreviews.length > 0 ? newPreviews : null);

                                                                    // Remove only local files from Formik
                                                                    if (removed.type === "local") {
                                                                        const updatedFiles = allFiles.filter(f => f !== removed.file);
                                                                        setAllFiles(updatedFiles);
                                                                        setFieldValue("images", updatedFiles);
                                                                    }

                                                                    // Optionally store removed Strapi image IDs for backend deletion
                                                                    if (removed.type === "strapi") {
                                                                        // setRemovedStrapiIds(prev => [...prev, removed.id]);
                                                                        console.log(isSubmitting)
                                                                        setSubmitting(true);
                                                                        console.log(isSubmitting)
                                                                    }
                                                                }} />
                                                            </div>
                                                            <img
                                                                src={item.src}
                                                                alt={`preview-${index}`}
                                                                className=" object-cover rounded "
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            )}



                                        </div>
                                    </label>
                                </div>



                                <div className={style.textListWrapper}>
                                    <Field as="select" name="category" id="category" className={style.selectInput} >
                                        <option value="" >Select</option>
                                        {
                                            data && data.map((el, index) => (
                                                <option key={index} value={el.category_name}>{el.category_name}</option>
                                            ))
                                        }

                                    </Field>
                                    <label className={style.selectLabel} htmlFor="category" >Category </label>
                                    <ErrorMessage name="category" component="div" className={style.error} />
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
                                    {errors.description &&
                                            <div className={style.textError} >{errors.description}</div>

                                        }
                                    {/* <ErrorMessage name="description" component="div" className={style.textError} /> */}
                                </div>

                            </div>


                            <div className=' w-100 d-flex flex-row-reverse gap-3'>
                                {!activeToUpdate.project_name ?
                                    <button type="submit" className={` ${!dirty || !isValid ? style.addClientDisable : style.addClient}`} disabled={!dirty || !isValid}  >
                                        Save
                                    </button> :
                                    <button type="submit" className={` ${isSubmitting ? style.addClient : (!dirty || !isValid) ? style.addClientDisable : style.addClient}`} disabled={isSubmitting ? false : (!dirty || !isValid) ? true : false}   >
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
