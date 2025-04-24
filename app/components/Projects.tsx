"use client";
import React, {useState, useRef} from "react";
import Image from "next/image";
import {useTranslation} from "next-i18next";
import {ArrowRight, ExternalLink, GithubIcon} from "lucide-react";
import {motion, useInView} from "framer-motion";

const projectsData = [
    {
        src: "/wwproject.png",
        title: "wwproject_title",
        description: "wwproject_description",
        tech: ["Next.js 15", "Tailwind CSS v4", "TypeScript", "gsap"],
        link: "https://wuwa-delta.vercel.app/",
        github: "https://wuwa-delta.vercel.app/",
        longDescription: "wwproject_long_description"
    },
    {
        src: "/teona.jpg",
        title: "project_6_title",
        description: "project_6_description",
        tech: ["Expo", "React Native", "TypeScript"],
        link: "",
        github: "https://wuwa-delta.vercel.app/",
        longDescription: "project_6_long_description"
    },
    {
        src: "/work-5.png",
        title: "kasa_title",
        description: "kasa_description",
        tech: ["React", "SCSS"],
        link: "https://minhajshafiq-kasa.netlify.app/",
        github: "https://wuwa-delta.vercel.app/",
        longDescription: "kasa_long_description"
    },
    {
        src: "/work-2.png",
        title: "ohmyfood_title",
        description: "ohmyfood_description",
        tech: ["HTML", "SCSS"],
        link: "https://minhajshafiq.github.io/Projet-3/",
        github: "https://wuwa-delta.vercel.app/",
        longDescription: "ohmyfood_long_description"
    },
    {
        src: "/work-4.png",
        title: "pfc_title",
        description: "pfc_description",
        tech: ["Next.JS", "Framer Motion"],
        link: "https://pfc-minhaj.netlify.app/",
        github: "https://wuwa-delta.vercel.app/",
        longDescription: "pfc_long_description"
    },
    {
        src: "/work-6.png",
        title: "project_5_title",
        description: "project_5_description",
        tech: ["HTML", "CSS"],
        link: "https://minhajshafiq.github.io/Projet-2/",
        github: "https://wuwa-delta.vercel.app/",
        longDescription: "project_5_long_description"
    },
    {
        src: "/work-8.png",
        title: "project_7_title",
        description: "project_7_description",
        tech: ["Public API"],
        link: "https://catfats.netlify.app/",
        github: "https://wuwa-delta.vercel.app/",
        longDescription: "project_7_long_description"
    },
    {
        src: "/work-9.png",
        title: "project_8_title",
        description: "project_8_description",
        tech: ["Node.js", "MongoDB", "JWT"],
        link: "https://github.com/minhajshafiq/Projet-6",
        github: "https://wuwa-delta.vercel.app/",
        longDescription: "project_8_long_description"
    }
];

const ProjectsContent: React.FC = () => {
    const {t} = useTranslation();
    const [showAll, setShowAll] = useState(false);

    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, {
        once: false,
        amount: 0.3
    });

    const displayedProjects = showAll ? projectsData : projectsData.slice(0, 4);

    return (
        <div
            id="my-projects"
            ref={ref}
            className="w-full px-4 md:px-12 py-16 scroll-mt-20 flex flex-col justify-center items-center min-h-screen"
        >
            <motion.div
                className="text-center mb-12"
                initial={{opacity: 0, y: 20}}
                animate={isInView ? {opacity: 1, y: 0} : {opacity: 0, y: 20}}
                transition={{duration: 0.5}}
            >
                <h4 className="mb-2 text-lg font-medium text-gray-500">{t("projects_title")}</h4>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 relative inline-block pb-3 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:transform after:-translate-x-1/2 after:w-full after:h-1 after:bg-[#E14F41] after:rounded-full">
                    {t("projects_latest_work")}
                </h2>
                <p className="max-w-2xl mx-auto mt-4 text-gray-500">
                    {t("projects_description")}
                </p>
            </motion.div>

            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl"
                initial={{opacity: 0}}
                animate={isInView ? {opacity: 1} : {opacity: 0}}
                transition={{duration: 0.6, delay: 0.2}}
            >
                {displayedProjects.map((project, index) => (
                    <motion.div
                        key={index}
                        initial={{opacity: 0, y: 20}}
                        animate={isInView ? {opacity: 1, y: 0} : {opacity: 0, y: 20}}
                        transition={{duration: 0.5, delay: 0.1 * index}}
                        className="group relative rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
                    >
                        <div className="aspect-[4/3] relative overflow-hidden">
                            {/* Liens vers site & github */}
                            <div className="absolute top-3 right-3 flex gap-2 z-10">
                                {project.link && (
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-white p-2 rounded-full shadow-sm hover:bg-gray-100 transition-colors"
                                        title={t("visit_site")}
                                    >
                                        <ExternalLink size={16} className="text-gray-800 hover:text-[#E14F41]"/>
                                    </a>
                                )}
                                {project.github && (
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-white p-2 rounded-full shadow-sm hover:bg-gray-100 transition-colors"
                                        title={t("view_code")}
                                    >
                                        <GithubIcon size={16} className="text-gray-800 hover:text-[#E14F41]"/>
                                    </a>
                                )}
                            </div>

                            <Image
                                src={project.src}
                                alt={t(project.title)}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = "/fallback-image.png";
                                }}
                            />

                            <div
                                className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
                                <h3 className="text-white font-semibold text-lg mb-2">{t(project.title)}</h3>
                                <p className="text-gray-200 text-sm line-clamp-2">{t(project.description)}</p>
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {project.tech.slice(0, 3).map((tech) => (
                                        <span key={tech}
                                              className="bg-white/20 text-white text-xs px-2 py-1 rounded">
                                {tech}
                            </span>
                                    ))}
                                    {project.tech.length > 3 && (
                                        <span className="bg-white/20 text-white text-xs px-2 py-1 rounded">
                                +{project.tech.length - 3}
                            </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {!showAll && (
                <motion.div
                    className="flex justify-center mt-12"
                    initial={{opacity: 0, y: 20}}
                    animate={isInView ? {opacity: 1, y: 0} : {opacity: 0, y: 20}}
                    transition={{duration: 0.5, delay: 0.4}}
                >
                    <motion.button
                        onClick={() => setShowAll(true)}
                        className="px-6 py-3 rounded-full bg-gray-900 text-white flex items-center gap-2 hover:bg-gray-800 transition-all"
                        whileHover={{scale: 1.05}}
                        whileTap={{scale: 0.95}}
                    >
                        {t("show_more")}
                        <ArrowRight size={16}
                                    className="transition-transform duration-300 group-hover:translate-x-1"/>
                    </motion.button>
                </motion.div>
            )}
        </div>
    );
};

export default ProjectsContent;