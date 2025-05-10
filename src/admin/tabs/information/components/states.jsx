import style from './information.module.css'
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from 'axios';
import Swal from 'sweetalert2';
import { useDomain, useInformation, useLoader } from '../../../../store';

const validationSchema = Yup.object({

    experienceYears: Yup.number()
        .typeError('Must be a number')
        .integer('Must be an integer')
        .min(1, 'Must be at least 1')
        .max(40, 'Must be at most 40'),

    projects: Yup.number()
        .typeError('Must be a number')
        .integer('Must be an integer')
        .min(1, 'Must be at least 1')
        .max(9999, 'Must be at most 9999'),

    clients: Yup.number()
        .typeError('Must be a number')
        .integer('Must be an integer')
        .min(1, 'Must be at least 1')
        .max(9999, 'Must be at most 9999'),
});

export default function States() {
    const { information } = useInformation();
    const { domain } = useDomain();
    const { loader_index, open_loader, close_loader } = useLoader();

    const initialValues = {
        experienceYears:  information?.experience_years || "",
        projects: information?.projects_no || "",
        clients: information?.clients_no || "",

    }




    return (
        <div id={style.section}>
            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting }) => {
                    open_loader();
                    setSubmitting(true);

                    let data = {
                        experience_years: values.experienceYears,
                        projects_no: values.projects,
                        clients_no: values.clients,
                    }






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
                    window.location.reload();
                    Swal.fire({
                        icon: "success",
                        text: "Save Success",
                        timer: 1500

                    })
                    
                    close_loader();

                }}

            >

                {({ dirty, isValid }) => (
                    <Form className=' p-3 d-flex flex-column justify-content-between h-100' >


                        <div>
                            <div className={style.textInputWrapper}>
                                <Field type="number" name="experienceYears" id="experienceYears" className={style.textInput} placeholder="" />
                                <label htmlFor="experienceYears" className={style.textLabel} >Years of experience <span className=" text-warning">*</span></label>
                                <ErrorMessage name="experienceYears" component="div" className={style.textError} />
                            </div>
                            <div className={style.textInputWrapper}>
                                <Field type="number" name="projects" id="projects" className={style.textInput} placeholder="" />
                                <label htmlFor="projects" className={style.textLabel} >Number of projects <span className=" text-warning">*</span></label>
                                <ErrorMessage name="projects" component="div" className={style.textError} />
                            </div>
                            <div className={style.textInputWrapper}>
                                <Field type="number" name="clients" id="clients" className={style.textInput} placeholder="" />
                                <label htmlFor="clients" className={style.textLabel} >Number of clients <span className=" text-warning">*</span></label>
                                <ErrorMessage name="clients" component="div" className={style.textError} />
                            </div>
                        </div>
                        <div className=' w-100 d-flex flex-row-reverse gap-3'>

                            <button type="submit" className={` ${!dirty || !isValid ? style.nonSubmit : style.submit}`} disabled={!dirty || !isValid} >
                                Save
                            </button>
                        </div>


                    </Form>
                )
                }
            </Formik >
        </div>
    )
}
