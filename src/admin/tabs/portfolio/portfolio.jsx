import { useEffect, useState } from 'react'
import style from './index.module.css'
import Categories from './components/categories'
import Projects from './components/projects'
import { useCategoriesData } from '../../../store'
import { useNavigate } from 'react-router-dom'

export default function Portfolio() {

   
    // const navigate = useNavigate()
    const renderTap = () => {
        switch (activeTab) {
            case 0:
                return <Categories />
            case 1:
                return <Projects />
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
                        <li onClick={() => setActivTab(0)} className={activeTab == 0 ? style.active : ""}>categories</li>
                        <li onClick={() => setActivTab(1)} className={activeTab == 1 ? style.active : ""}>projects</li>
                        
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
