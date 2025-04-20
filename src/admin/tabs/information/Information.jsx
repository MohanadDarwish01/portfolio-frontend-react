import { useState } from 'react'
import style from './index.module.css'
import Profile from './components/Profile'
import About from './components/About'

export default function Information() {

    const renderTap = () => {
        switch (activeTab) {
            case 0:
                return <Profile />
            case 1:
                return <About />
            case 2:
                return <h1>services</h1>
            default:
                return <h1>shop</h1>
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
                        <li onClick={() => setActivTab(4)} className={activeTab == 4 ? style.active : ""}>resume</li>
                        <li onClick={() => setActivTab(5)} className={activeTab == 5 ? style.active : ""}>reviews</li>
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
