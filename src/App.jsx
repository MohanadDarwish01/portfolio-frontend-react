import { Route, Routes, useLocation } from "react-router-dom";
import ErrorPage from "./pages/404 page";
import HomePage from "./pages/home page";
import { useCategoriesData, useDomain, useInformation, useLoader, useProjectModal, useRoutes } from "./store";
import axios from "axios";
import { useEffect, useState } from "react";
import ProjectsPage from "./pages/projects page";
import ProjectModal from "./components/projectModal";
import SocialMediaDesignForm from "./components/forms/SocialMediaDesignForm";
import Login from "./admin/loginPage";
import AdminPage from "./admin/adminPage";
import Loader from "./components/loader";
import UiUxDesignForm from "./components/forms/UiUxDesignForm";
// import LoginPage from "./admin/loginPage";


export default function App() {
  const { setData, data } = useCategoriesData();
  const { setActiveProjectId, setData: acProject, project_images } = useProjectModal();
  const { information, setInformation } = useInformation();
  const location = useLocation();
  const { domain } = useDomain();
  const { acceptedrRoutes, setRoutes } = useRoutes();
  const { loader_index, open_loader, close_loader } = useLoader();

  const [categories, setCategories] = useState([]);



  useEffect(() => {

    open_loader();
    let url = domain + "/api/categories?sort=createdAt:desc"
    axios.get(url, {
      params: {
        populate: "*",
      }
    }).then((res) => {
      let cats = res.data.data;
      const routes = cats.map((el) => ('/portfolio/' + el.category_path));
      setRoutes([...acceptedrRoutes, ...routes]);
      setData(cats);
      setCategories(routes);
    })




    let projectName = location.pathname.split('/')[3];
    if (projectName && projectName != 0) {
      setActiveProjectId(projectName)
      let endPoint = `/api/projects/${projectName}?sort=createdAt:desc`;
      let url2 = domain + endPoint;
      axios.get(url2, {
        params: {
          populate: "*",
        }
      }).then((res) => {
        acProject(res.data.data.project_images)

      })

    }


    let url2 = domain + "/api/user-informations";
    setTimeout(() => {

      axios.get(url2, { params: { populate: "*" } }).then((res) => {
        setInformation(res.data.data[0]);
      })
      close_loader();
    }, 2000);





  }, [])



  return (
    <div className=" position-relative">
      {loader_index && <div className="main_loader w-100 h-100"><Loader /></div>}
      <Routes >
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<HomePage />} />
        <Route path="/services" element={<HomePage />} />
        <Route path="/services/marketing-design" element={<SocialMediaDesignForm />} />
        <Route path="/services/ui-ux-design" element={<UiUxDesignForm />} />
        <Route path="/portfolio" element={<HomePage />} />
        {
          categories.map((el, index) => (
            <Route key={index} path={el} element={<ProjectsPage />} />

          ))

        }
        {
          categories.map((el, index) => (
            <Route key={index} path={el + "/:id?"} element={<ProjectModal images={project_images} />} />

          ))

        }

        <Route path="/admin" element={<AdminPage />} />
        
        

        <Route path="/contact" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>

  )
}