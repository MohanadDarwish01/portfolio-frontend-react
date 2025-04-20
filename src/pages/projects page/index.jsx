import axios from 'axios'
import Nav from '../../components/navBar'
import Footer from "../../components/footer";
import style from './index.module.css'
import { useCategoriesData, useDomain, useLoader, useProjectModal, useRoutes } from '../../store'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import icon from '../../assets/categories/eye.png'
import ProjectModal from '../../components/projectModal';
import Loader from '../../components/loader';

export default function ProjectsPage() {
    const { close_loader, loader_index, open_loader } = useLoader();
    let navegate = useNavigate();
    const location = useLocation();
    const { domain } = useDomain();//
    const { setActiveId, data, resetActiveId } = useCategoriesData();//
    const { openProjectModal, projectModalIndex, setData, setActiveProjectId, project_images, active_project_id } = useProjectModal();
    const { acceptedrRoutes } = useRoutes();//
    const [allProjects, setAllProjects] = useState({});

    useEffect(() => {
        if (acceptedrRoutes.includes(location.pathname)) {
            let catName = location.pathname.split('/')[2];
            let activeCat = data.find((el) => (el.category_path == catName));
            setActiveId(activeCat.documentId);
            let endPoint = `/api/categories/${activeCat.documentId}`;
            let url = domain + endPoint;
            open_loader();

            axios.get(url, {
                params: {
                    populate: {
                        projects: { populate: "*" }
                    }
                }
            }).then((res) => {

                setAllProjects(res.data.data);
                setTimeout(() => {
                    close_loader();
                    // console.log(res.data.data)
                }, 1200)
                // setCheck(true);
            })
        }




    }, [location.pathname])

   

    const handleModal = (id) => {
        navegate(location.pathname + "/" + id)
        openProjectModal();
        let activeProject = allProjects.projects.find((el) => (el.documentId == id))
        setData(activeProject.project_images)
        setActiveProjectId(id)




       

    }



    return (
        <div className={projectModalIndex == false ? "overflow-auto" : "position-fixed w-100"}>

            {projectModalIndex && <ProjectModal images={project_images} />}
            {!projectModalIndex && <Nav />}

            <div id={style.ServicesSec} className=' w-100 ' >

                <div id={style.title} className=' container'>
                    <h4>{allProjects.category_name}</h4>
                    <h2>{allProjects.category_name}</h2>
                </div>

                {/* d-flex justify-content-between container   */}

                <div id={style.content} className=' container '>

                    {
                        allProjects.projects && (
                            allProjects.projects.map((el) => (
                                <div key={el.documentId} id={style.card} className="d-flex flex-column" onClick={() => { handleModal(el.documentId) }}>
                                    {loader_index && <Loader />}
                                    <div id={style.frame}>
                                        <img id={style.icon} src={icon} alt="" />
                                        <img id={style.catBG} src={domain + el.project_cover.url} alt="" />
                                    </div>
                                    <div id={style.info}>
                                        <h2>{el.project_name}</h2>
                                        <p>{el.project_description.slice(0, 120) + "....."}</p>
                                    </div>
                                </div>
                            ))
                        )
                    }






                </div>

            </div>

            <Footer />
        </div>
    )
}
