import style from './index.module.css'

export default function Loader() {
    return (
        <div id={style.loader}>
            <div className={style.chaotic_orbit}></div>
        </div>

    );
}

