import { Link } from 'react-router-dom'
import style from './index.module.css'

export default function ErrorPage(){
    return(
        <div className="ErrorPage d-flex h-100 w-100">
            <div className={`${style.backDs}`}>
                <div>
                    <h1>404</h1>
                    <p>It seems we've lost the beat...</p>
                    <Link className={`${style.btnDs}`} to="/"> Go to home</Link>
                </div>

            </div>
        </div>
    )
}