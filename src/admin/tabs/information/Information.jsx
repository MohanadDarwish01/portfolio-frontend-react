import { useEffect, useState } from 'react'
import style from './index.module.css'
import Profile from './components/Profile'
import About from './components/About'
import Clients from './components/clients'
import Skills from './components/skills'
import Education from './components/education'
import Experience from './components/experience'
import Reviews from './components/reviews'
import States from './components/states'

export default function Information() {

    const renderTap = () => {
        switch (activeTab) {
            case 0:
                return <Profile />
            case 1:
                return <About />
            case 2:
                return <Clients />
            case 3:
                return <Skills />
            case 4:
                return <Education />
            case 5:
                return <Experience />
            case 6:
                return <Reviews />
            case 7:
                return <States />
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
                        <li onClick={() => setActivTab(0)} className={activeTab == 0 ? style.active : ""}>profile</li>
                        <li onClick={() => setActivTab(1)} className={activeTab == 1 ? style.active : ""}>about</li>
                        <li onClick={() => setActivTab(2)} className={activeTab == 2 ? style.active : ""}>clients</li>
                        <li onClick={() => setActivTab(3)} className={activeTab == 3 ? style.active : ""}>skills</li>
                        <li onClick={() => setActivTab(4)} className={activeTab == 4 ? style.active : ""}>education</li>
                        <li onClick={() => setActivTab(5)} className={activeTab == 5 ? style.active : ""}>experience</li>
                        <li onClick={() => setActivTab(6)} className={activeTab == 6 ? style.active : ""}>reviews</li>
                        <li onClick={() => setActivTab(7)} className={activeTab == 7 ? style.active : ""}>states</li>
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
