import { useState } from "react";
import { create } from "zustand";



export const useDomain = create(() => ({
    domain: "http://localhost:1337"
}));

export const useRoutes = create((set) => ({
    acceptedrRoutes: ['/', '/home', '/about', '/services', '/portfolio', '/contact' , '/login' , '/admin'],
    setRoutes: (categories) => (set(() => ({ acceptedrRoutes: categories })))
}));



export const useCategoriesData = create((set) => (
    {
        data: [
            // { documentId: 1, name: "Cold Drinks", path: "cold", catImg: img },
        ],


        active_cat_id: 0,
        setData: (categories) => (set(() => ({ data: categories }))),
        setActiveId: (activeTab) => (set(() => ({ active_cat_id: activeTab }))),
        resetActiveId: () => (set(() => ({ active_cat_id: 0 }))),
    }
));


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