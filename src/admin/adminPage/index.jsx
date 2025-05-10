import { useNavigate } from 'react-router-dom';
import style from './index.module.css'
import { useEffect, useState } from 'react';
import logo from '../../assets/honda_logo@2x.png'
import profile from '../../assets/honda3.png'
import { TbLogout } from "react-icons/tb";
import Information from '../tabs/information/Information';
import Portfolio from '../tabs/portfolio/portfolio';
import ServicesAdmin from '../tabs/services/services';

export default function AdminPage() {
    const navigate = useNavigate();

    const handleLogOut = () => {
        sessionStorage.clear();
        navigate('/login');
    }

    


    useEffect(() => {
        let token = sessionStorage.getItem("token");
        if (!token) {
            navigate('/login');
        }

    }, []);

    const renderContent = () => {
        switch (activeTab) {
            case 0:
                return <Information /> 
            case 1:
                return <Portfolio />
            case 2:
                return <ServicesAdmin />
            default:
                return <h1>shop</h1>
        }
    }
    const [activeTab, setActivTab] = useState(0);
    return (
        <div className={style.dashboard}>
            <div className={style.listDs}>
                <div className={style.top}>
                    <div className={style.header}>
                        <img src={logo} alt="" />
                        <button onClick={() => { handleLogOut() }} ><TbLogout />
                        </button>
                    </div>

                    <hr className=' text-white' />

                    <ul>

                        <p>Navigation</p>
                        <li onClick={() => setActivTab(0)}  className={activeTab == 0 ? style.active : ""}>Information</li>
                        <li onClick={() => setActivTab(1)}  className={activeTab == 1 ? style.active : ""}>Portfolio</li>
                        <li onClick={() => setActivTab(2)}  className={activeTab == 2 ? style.active : ""}>Services</li>
                    </ul>
                </div>



                <div className={style.footer}>
                <hr className=' text-white' />
                    <p>user account</p>
                    <div className={style.userInfo}>
                        <img src={profile} alt="" />
                        <div>
                            <h4>name</h4>
                            <h5>role</h5>

                        </div>
                    </div>


                </div>


            </div>

            <div className={style.render}>
                {renderContent()}

            </div>
        </div>
    )
}
