import { useEffect, useState } from 'react'
import style from './index.module.css'
import ServicesTap from './components/active'
import Requests from './components/requests'
// import MyServices from './components/myServices'

export default function ServicesAdmin() {

   
    // const navigate = useNavigate()
    const renderTap = () => {
        switch (activeTab) {
            case 0:
                return <ServicesTap />
            case 1:
                return <Requests />
            default:
                return null
        }
    }
    const [activeTab, setActivTab] = useState(0);
       
    
    return (
        <div id={style.page}>
            <div id={style.frame}>
                <nav>
                    <ul>
                        <li onClick={() => setActivTab(0)} className={activeTab == 0 ? style.active : ""}>actice</li>
                        <li onClick={() => setActivTab(1)} className={activeTab == 1 ? style.active : ""}>my services</li>
                        
                    </ul>
                    <hr className=' text-white' />
                </nav>

                <main className=' w-100'>
                    {renderTap()}
                </main>
            </div>

        </div>
    )
}
