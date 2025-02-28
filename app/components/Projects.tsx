"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { ArrowRight, Send } from 'lucide-react';

const projectsData = [
    { src: "/work-3.png", title: "mets_merveilles_title", description: "mets_merveilles_description", tech: ["Spring Boot", "Next JS", "Cucumber", "Tailwind", "TypeScript"], link: "https://mets-merveilles.com" },
    { src: "/work-5.png", title: "kasa_title", description: "kasa_description", tech: ["React", "SCSS"], link: "https://kasa.com" },
    { src: "/work-2.png", title: "ohmyfood_title", description: "ohmyfood_description", tech: ["HTML", "SCSS"], link: "https://ohmyfood.com" },
    { src: "/work-4.png", title: "kanap_title", description: "kanap_description", tech: ["Node JS", "API"], link: "https://kanap.com" },
    { src: "/work-6.png", title: "project_5_title", description: "project_5_description", tech: ["HTML", "CSS"], link: "https://project5.com" },
    { src: "/work-7.png", title: "project_6_title", description: "project_6_description", tech: ["SEO"], link: "https://project6.com" },
    { src: "/work-8.png", title: "project_7_title", description: "project_7_description", tech: ["Public API"], link: "https://project7.com" },
    { src: "/work-9.png", title: "project_8_title", description: "project_8_description", tech: ["Node JS", "MongoDB", "JWT"], link: "https://project8.com" }
];

const Projects: React.FC = () => {
    const { t } = useTranslation();
    const [showAll, setShowAll] = useState(false);
    const displayedProjects = showAll ? projectsData : projectsData.slice(0, 4);

    // Gestion du tooltip qui suit la souris
    const [tooltip, setTooltip] = useState({ x: 0, y: 0, visible: false });

    const handleMouseMove = (e: React.MouseEvent) => {
        setTooltip({ x: e.clientX, y: e.clientY, visible: true });
    };

    const handleMouseLeave = () => {
        setTooltip((prev) => ({ ...prev, visible: false }));
    };

    return (
        <div id="projects" className="w-full px-[12%] py-10 scroll-mt-20 flex flex-col justify-center items-center">
            <h4 className="text-center mb-2 text-lg font-outfit">{t("projects_title")}</h4>
            <h2 className="text-center text-5xl font-outfit">{t("projects_latest_work")}</h2>
            <p className="text-center max-w-2xl mx-auto mt-5 mb-12 font-outfit">
                {t("projects_description")}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 my-10">
                {displayedProjects.map((project) => (
                    <a
                        key={project.link}  // Utilisation du lien unique du projet comme clé
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative rounded-lg overflow-hidden group hover:scale-105 transition-transform duration-300 cursor-pointer hover:shadow-xl hover:-translate-y-1 block"
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div className="h-[250px] w-full min-w-[350px] relative">
                            <Image
                                src={project.src}
                                alt={t(project.title)}
                                fill
                                className="object-cover rounded-lg group-hover:opacity-80 transition-opacity duration-300"
                            />
                            <div className="absolute bottom-2 right-2 bg-white/90 p-2 rounded-lg shadow-md flex items-center justify-center w-10 h-10">
                                <Send size={24} className="text-black" />
                            </div>
                        </div>

                        <div className="w-full bg-white/60 backdrop-blur-md p-3 rounded-lg mt-2">
                            <h2 className="text-lg font-bold text-black">{t(project.title)}</h2>
                            <p className="text-xs text-gray-500 mt-1">{t(project.description)}</p>
                            <div className="flex gap-2 mt-2">
                                {project.tech.map((tech) => (
                                    <span key={tech} className="bg-gray-800 text-white text-xs px-2 py-1 rounded-md">{tech}</span>  // Utilisation du nom de la technologie comme clé unique
                                ))}
                            </div>
                        </div>
                    </a>
                ))}
            </div>

            {!showAll && (
                <div className="flex justify-center mt-10">
                    <button
                        onClick={() => setShowAll(true)}
                        className="px-10 py-3 border border-white rounded-full bg-black text-white flex items-center gap-2 hover:bg-gray-800 transition-all duration-300 group"
                    >
                        {t("show_more")}
                        <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-2" />
                    </button>
                </div>
            )}

            {/* Tooltip qui suit la souris */}
            {tooltip.visible && (
                <div
                    className="fixed bg-black text-white text-xs px-3 py-1 rounded-md pointer-events-none transition-opacity duration-200"
                    style={{
                        left: `${tooltip.x + 10}px`,
                        top: `${tooltip.y + 10}px`,
                        opacity: tooltip.visible ? 1 : 0,
                    }}
                >
                    {t("Preview")}
                </div>
            )}
        </div>
    );
};

export default Projects;
