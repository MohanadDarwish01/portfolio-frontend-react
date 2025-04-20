import axios from "axios";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import style from './index.module.css'
import { useDomain, useLoader } from "../../store";
import Swal from "sweetalert2";
import Loader from "../../components/loader";

export default function Login() {

    const email = useRef();
    const password = useRef();
    const navigate = useNavigate();
    const { open_loader, close_loader, loader_index } = useLoader();
    const { domain } = useDomain();


    const handleSubmit = (e) => {

        open_loader();
        e.preventDefault();
        let domainName = domain;
        let endPoint = "/api/auth/local"
        let url = domainName + endPoint;
        let userData = {
            identifier: email.current.value,
            password: password.current.value,
        }

        axios.post(url, userData).then((res) => {
            let tocken = res.data.jwt;
            sessionStorage.setItem("token", tocken);
            setTimeout(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Login successfully',
                    timer: 1500
                }).then(() => {
                    close_loader();
                    navigate('/admin');
                });
            }, 1000)

        }).catch((err) => {

            setTimeout(() => {
                Swal.fire({
                    icon: 'error',
                    title: err.response.data.error.message.replace("identifier", "email"),
                    timer: 1500
                }).then(() => {
                    close_loader();
                });
            }, 1000)
        })
    }

    useEffect(() => {
        let token = sessionStorage.getItem("token");
        if (token) {
            navigate('/admin');
        }
    }, [handleSubmit]);


    return (
        <div className={` col-12 h-100 d-flex align-items-center justify-content-center ${style.loginBg} `}>

            {loader_index && <Loader />}
            <form onSubmit={handleSubmit} className={`rounded d-flex flex-column align-items-center gap-4 py-5 px-5 ${style.formDs}`}>
                <h2 className=' text-white'>Admin Login</h2>

                <input
                    type="text"
                    id="identifier"
                    ref={email}
                    required
                    placeholder='Enter your phone' className={` w-100 form-control  ${style.inputDs}`}
                />

                <input
                    type="password"
                    id="password"
                    ref={password}
                    required
                    placeholder='Enter your phone' className={` w-100 form-control  ${style.inputDs}`}
                />

                <button type="submit" className={`${style.submitDs} btn w-100 `}>Login</button>
            </form>
        </div>
    );

};

