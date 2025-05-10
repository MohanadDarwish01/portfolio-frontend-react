import { useState } from "react";
import { create } from "zustand";



export const useDomain = create(() => ({
    domain: "http://localhost:1337"
}));

export const useRoutes = create((set) => ({
    acceptedrRoutes: ['/', '/home', '/about', '/services', '/portfolio', '/contact' , '/login' , '/admin'],
    setRoutes: (categories) => (set(() => ({ acceptedrRoutes: categories })))
}));





export const useInformation= create((set) => (
    {
        information: {},
        setInformation: (data) => (set(() => ({ information: data }))),
        
    }
));

export const useProjectModal = create((set) => (
    {
        projectModalIndex: false,
        openProjectModal: () => (set(() => ({ projectModalIndex: true }))),
        closeProjectModal: () => (set(() => ({ projectModalIndex: false }))),
    
        project_images:[],
        active_project_id: 0,
        setData: (project) => (set(() => ({ project_images: project }))),
        setActiveProjectId: (project) => (set(() => ({ active_project_id: project }))),
        resetActiveProjectId: () => (set(() => ({ active_project_id: 0 }))),
    }
));

export const useLoader = create((set) => (
    {
       
        loader_index: false,
        open_loader: () => (set(() => ({ loader_index: true }))),
        close_loader: () => (set(() => ({ loader_index: false }))),
    }
));


// ============ Admin =========================


export const useClientModal = create((set) => (
    {
        


        activeToUpdate:{},
        setActiveClientToUpdate: (client) => (set(() => ({ activeToUpdate: client }))),
        resetActiveClient: () => (set(() => ({ activeToUpdate: {} }))),


        clientModalIndex: false,
        openClientModal: () => (set(() => ({ clientModalIndex: true }))),
        closeClientModal: () => (set(() => ({ clientModalIndex: false , }))),

    
    }
));


// ================ Skills =====================

export const useSkillsModal = create((set) => (
    {
        activeToUpdate:{},
        setActiveSkillsToUpdate: (skill) => (set(() => ({ activeToUpdate: skill }))),
        resetActiveSkill: () => (set(() => ({ activeToUpdate: {} }))),

        skillsModalIndex: false,
        openSkillsModal: () => (set(() => ({ skillsModalIndex: true }))),
        closeSkillsModal: () => (set(() => ({ skillsModalIndex: false , }))),
    }
));



// ================ Education =====================

export const useEducationModal = create((set) => (
    {
        activeToUpdate:{},
        setActiveEducationToUpdate: (Education) => (set(() => ({ activeToUpdate: Education }))),
        resetActiveEducation: () => (set(() => ({ activeToUpdate: {} }))),


        educationModalIndex: false,
        openEducationModal: () => (set(() => ({ educationModalIndex: true }))),
        closeEducationModal: () => (set(() => ({ educationModalIndex: false , }))),
    }
));


// ================ Experiance =====================

export const useExperianceModal = create((set) => (
    {
        activeToUpdate:{},
        setActiveExperianceToUpdate: (Experiance) => (set(() => ({ activeToUpdate: Experiance }))),
        resetActiveExperiance: () => (set(() => ({ activeToUpdate: {} }))),


        experianceModalIndex: false,
        openExperianceModal: () => (set(() => ({ experianceModalIndex: true }))),
        closeExperianceModal: () => (set(() => ({ experianceModalIndex: false , }))),
    }
));

// ================ Reviews =====================

export const useReviewsModal = create((set) => (
    {
        activeToUpdate:{},
        setActiveReviewsToUpdate: (Review) => (set(() => ({ activeToUpdate: Review }))),
        resetActiveReviews: () => (set(() => ({ activeToUpdate: {} }))),


        reviewsModalIndex: false,
        openReviewsModal: () => (set(() => ({ reviewsModalIndex: true }))),
        closeReviewseModal: () => (set(() => ({ reviewsModalIndex: false , }))),
    }
));


// ================ Categories =====================

export const useCategoriesData = create((set) => (
    {
        data: [
            // { documentId: 1, name: "Cold Drinks", path: "cold", catImg: img },
        ],

        active_cat_id: 0,
        setData: (categories) => (set(() => ({ data: categories }))),
        setActiveId: (activeTab) => (set(() => ({ active_cat_id: activeTab }))),
        resetActiveId: () => (set(() => ({ active_cat_id: 0 }))),



        activeToUpdate:{},
        setActiveCategoryToUpdate: (Category) => (set(() => ({ activeToUpdate: Category }))),
        resetActiveCategory: () => (set(() => ({ activeToUpdate: {} }))),


        categoryModalIndex: false,
        openCategoryModal: () => (set(() => ({ categoryModalIndex: true }))),
        closeCategoryeModal: () => (set(() => ({ categoryModalIndex: false , }))),
    }
));


// ================ Projects =====================

export const useProjectsAdmin = create((set) => (
    {
        activeToUpdate:{},
        setActiveProjectToUpdate: (Project) => (set(() => ({ activeToUpdate: Project }))),
        resetActiveProject: () => (set(() => ({ activeToUpdate: {} }))),

        tap:"All",
        setTap: (tap) => (set(() => ({ tap: tap }))),


        projectModalIndex: false,
        openProjectModal: () => (set(() => ({ projectModalIndex: true }))),
        closeProjectModal: () => (set(() => ({ projectModalIndex: false , }))),



        activeToView:{},
        setActiveProjectToView: (Project) => (set(() => ({ activeToView: Project }))),
        resetActiveProjectView: () => (set(() => ({ activeToView: {} }))),

        viewModalIndex: false,
        openViewModal: () => (set(() => ({ viewModalIndex: true }))),
        closeViewModal: () => (set(() => ({ viewModalIndex: false , }))),
    }
));


// ================ Projects =====================

export const useServicesAdmin = create((set) => (
    {
        

        tap:"All",
        setTap: (tap) => (set(() => ({ tap: tap }))),


        // my services

        activeTap: null,
        setActiveTap: (tap) => (set(() => ({ activeTap: tap }))),


        activeToView:{},
        setActiveServiceToView: (service) => (set(() => ({ activeToView: service }))),
        resetActiveServiceView: () => (set(() => ({ activeToView: {} }))),


        viewModalIndex: false,
        openViewModal: () => (set(() => ({ viewModalIndex: true }))),
        closeViewModal: () => (set(() => ({ viewModalIndex: false , }))),



        iframeModalIndex: false,
        openIframeModal: () => (set(() => ({ iframeModalIndex: true }))),
        closeIframeModal: () => (set(() => ({ iframeModalIndex: false , }))),
    }
));
