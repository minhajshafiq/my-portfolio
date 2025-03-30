"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { ArrowRight, Send, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const projectsData = [
    {
        src: "/work-3.png",
        title: "mets_merveilles_title",
        description: "mets_merveilles_description",
        tech: ["Spring Boot", "Next.js", "Cucumber", "Tailwind", "TypeScript", "PostgreSQL"],
        link: "https://front-mets-merveilles.vercel.app/",
        longDescription: "mets_merveilles_long_description"
    },
    {
        src: "/teona.jpg",
        title: "project_6_title",
        description: "project_6_description",
        tech: ["Expo", "React Native", "TypeScript"],
        link: "",
        longDescription: "project_6_long_description"
    },
    {
        src: "/work-5.png",
        title: "kasa_title",
        description: "kasa_description",
        tech: ["React", "SCSS"],
        link: "https://minhajshafiq-kasa.netlify.app/",
        longDescription: "kasa_long_description"
    },
    {
        src: "/work-2.png",
        title: "ohmyfood_title",
        description: "ohmyfood_description",
        tech: ["HTML", "SCSS"],
        link: "https://minhajshafiq.github.io/Projet-3/",
        longDescription: "ohmyfood_long_description"
    },
    {
        src: "/work-4.png",
        title: "pfc_title",
        description: "pfc_description",
        tech: ["Next.JS", "Framer Motion"],
        link: "https://pfc-minhaj.netlify.app/",
        longDescription: "pfc_long_description"
    },
    {
        src: "/work-6.png",
        title: "project_5_title",
        description: "project_5_description",
        tech: ["HTML", "CSS"],
        link: "https://minhajshafiq.github.io/Projet-2/",
        longDescription: "project_5_long_description"
    },
    {
        src: "/work-8.png",
        title: "project_7_title",
        description: "project_7_description",
        tech: ["Public API"],
        link: "https://catfats.netlify.app/",
        longDescription: "project_7_long_description"
    },
    {
        src: "/work-9.png",
        title: "project_8_title",
        description: "project_8_description",
        tech: ["Node.js", "MongoDB", "JWT"],
        link: "https://github.com/minhajshafiq/Projet-6",
        longDescription: "project_8_long_description"
    }
];

const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        // Vérification initiale
        checkIfMobile();

        // Écouteur pour les changements de taille
        window.addEventListener('resize', checkIfMobile);

        // Nettoyage
        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    return isMobile;
};

const ProjectsContent: React.FC = () => {
    const { t } = useTranslation();
    const [showAll, setShowAll] = useState(false);
    const [cursorPositions, setCursorPositions] = useState<Record<number, {x: number, y: number}>>({});
    const [hoveredProject, setHoveredProject] = useState<number | null>(null);
    const [expandedDescriptions, setExpandedDescriptions] = useState<Record<number, boolean>>({});
    const isMobile = useIsMobile();

    const ref = React.useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, {
        once: false,
        amount: 0.3,
        ...(isMobile ? { triggerOnce: true, skip: true } : {})
    });

    const displayedProjects = showAll ? projectsData : projectsData.slice(0, 4);

    const handleMouseMove = (e: React.MouseEvent, index: number) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setCursorPositions(prev => ({
            ...prev,
            [index]: {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            }
        }));
    };

    const toggleDescription = (index: number) => {
        setExpandedDescriptions(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    // Animation conditionnelle
    const animationProps = (delay = 0) => isMobile ? {
        initial: { opacity: 1, y: 0 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 1, y: 0 },
        transition: { duration: 0 }
    } : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 20 },
        transition: { duration: 0.5, delay }
    };

    return (
        <div
            id="my-projects"
            ref={ref}
            className="w-full px-[12%] py-10 scroll-mt-20 flex flex-col justify-center items-center min-h-screen"
        >
            {isMobile ? (
                <>
                    {/* Version mobile simplifiée */}
                    <div className="text-center">
                        <h4 className="mb-2 text-lg font-outfit">{t("projects_title")}</h4>
                        <h2 className="text-5xl font-outfit">{t("projects_latest_work")}</h2>
                        <p className="max-w-2xl mx-auto mt-5 mb-12 font-outfit">
                            {t("projects_description")}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 my-10 w-full">
                        {displayedProjects.map((project, index) => (
                            <div key={index} className="relative">
                                <a
                                    href={project.link || "#"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`relative rounded-lg overflow-hidden group block ${!project.link && 'pointer-events-none opacity-80'}`}
                                    onMouseMove={(e) => handleMouseMove(e, index)}
                                    onMouseEnter={() => setHoveredProject(index)}
                                    onMouseLeave={() => setHoveredProject(null)}
                                >
                                    <div className="h-[250px] w-full relative overflow-hidden">
                                        <Image
                                            src={project.src}
                                            alt={t(project.title)}
                                            fill
                                            className="object-cover rounded-lg transition-transform duration-500 group-hover:scale-105"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.src = "/fallback-image.png";
                                            }}
                                        />
                                        {project.link && (
                                            <div className="absolute bottom-2 right-2 bg-white/90 p-2 rounded-lg shadow-md flex items-center justify-center w-10 h-10 transition-transform duration-300 group-hover:scale-110">
                                                <Send size={24} className="text-black" />
                                            </div>
                                        )}
                                    </div>
                                </a>

                                <div className="w-full mt-5 bg-white/60 backdrop-blur-md p-3 rounded-lg flex flex-col hover:shadow-lg">
                                    <div className="flex justify-between items-start">
                                        <h2 className="text-lg font-bold text-black">{t(project.title)}</h2>
                                        <button
                                            onClick={() => toggleDescription(index)}
                                            className="text-gray-500 hover:text-black transition-colors"
                                        >
                                            {expandedDescriptions[index] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                        </button>
                                    </div>

                                    {expandedDescriptions[index] ? (
                                        <p className="text-sm text-gray-700 mt-2">
                                            {t(project.longDescription)}
                                        </p>
                                    ) : (
                                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                                            {t(project.description)}
                                        </p>
                                    )}

                                    <div className="flex gap-2 mt-3 flex-wrap">
                                        {project.tech.map((tech) => (
                                            <span
                                                key={tech}
                                                className="bg-gray-800 text-white text-xs px-2 py-1 rounded-md"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
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
                </>
            ) : (
                <AnimatePresence>
                    {isInView && (
                        <>
                            {/* Version desktop avec animations */}
                            <motion.div className="text-center" {...animationProps()}>
                                <h4 className="mb-2 text-lg font-outfit">{t("projects_title")}</h4>
                                <h2 className="text-5xl font-outfit">{t("projects_latest_work")}</h2>
                                <p className="max-w-2xl mx-auto mt-5 mb-12 font-outfit">
                                    {t("projects_description")}
                                </p>
                            </motion.div>

                            <motion.div
                                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 my-10 w-full"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                {displayedProjects.map((project, index) => (
                                    <motion.div
                                        key={index}
                                        {...animationProps(index * 0.1)}
                                        className="relative"
                                    >
                                        <motion.a
                                            href={project.link || "#"}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`relative rounded-lg overflow-hidden group block ${!project.link && 'pointer-events-none opacity-80'}`}
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.98 }}
                                            onMouseMove={(e) => handleMouseMove(e, index)}
                                            onMouseEnter={() => setHoveredProject(index)}
                                            onMouseLeave={() => setHoveredProject(null)}
                                        >
                                            <div className="h-[250px] w-full relative overflow-hidden">
                                                <Image
                                                    src={project.src}
                                                    alt={t(project.title)}
                                                    fill
                                                    className="object-cover rounded-lg transition-transform duration-500 group-hover:scale-105"
                                                    onError={(e) => {
                                                        const target = e.target as HTMLImageElement;
                                                        target.src = "/fallback-image.png";
                                                    }}
                                                />
                                                {project.link && (
                                                    <div className="absolute bottom-2 right-2 bg-white/90 p-2 rounded-lg shadow-md flex items-center justify-center w-10 h-10 transition-transform duration-300 group-hover:scale-110">
                                                        <Send size={24} className="text-black" />
                                                    </div>
                                                )}

                                                {hoveredProject === index && cursorPositions[index] && project.link && (
                                                    <motion.div
                                                        className="absolute text-white bg-black/80 px-3 py-2 rounded-md pointer-events-none z-10 text-sm"
                                                        initial={{ opacity: 0, scale: 0.8 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        exit={{ opacity: 0, scale: 0.8 }}
                                                        style={{
                                                            left: cursorPositions[index].x,
                                                            top: cursorPositions[index].y,
                                                            transform: 'translate(10px, 10px)',
                                                        }}
                                                    >
                                                        {t("view_preview")}
                                                    </motion.div>
                                                )}
                                            </div>
                                        </motion.a>

                                        <motion.div
                                            className="w-full mt-5 bg-white/60 backdrop-blur-md p-3 rounded-lg flex flex-col"
                                            whileHover={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                                        >
                                            <div className="flex justify-between items-start">
                                                <h2 className="text-lg font-bold text-black">{t(project.title)}</h2>
                                                <button
                                                    onClick={() => toggleDescription(index)}
                                                    className="text-gray-500 hover:text-black transition-colors"
                                                >
                                                    {expandedDescriptions[index] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                                </button>
                                            </div>

                                            <AnimatePresence>
                                                {expandedDescriptions[index] ? (
                                                    <motion.p
                                                        className="text-sm text-gray-700 mt-2"
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: 'auto' }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                    >
                                                        {t(project.longDescription)}
                                                    </motion.p>
                                                ) : (
                                                    <motion.p
                                                        className="text-xs text-gray-500 mt-1 line-clamp-2"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }}
                                                        transition={{ duration: 0.2 }}
                                                    >
                                                        {t(project.description)}
                                                    </motion.p>
                                                )}
                                            </AnimatePresence>

                                            <div className="flex gap-2 mt-3 flex-wrap">
                                                {project.tech.map((tech) => (
                                                    <motion.span
                                                        key={tech}
                                                        className="bg-gray-800 text-white text-xs px-2 py-1 rounded-md"
                                                        whileHover={{ scale: 1.05 }}
                                                    >
                                                        {tech}
                                                    </motion.span>
                                                ))}
                                            </div>
                                        </motion.div>
                                    </motion.div>
                                ))}
                            </motion.div>

                            {!showAll && (
                                <motion.div
                                    className="flex justify-center mt-10"
                                    {...animationProps(0.4)}
                                >
                                    <motion.button
                                        onClick={() => setShowAll(true)}
                                        className="px-10 py-3 border border-white rounded-full bg-black text-white flex items-center gap-2 hover:bg-gray-800 transition-all duration-300 group"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {t("show_more")}
                                        <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-2" />
                                    </motion.button>
                                </motion.div>
                            )}
                        </>
                    )}
                </AnimatePresence>
            )}
        </div>
    );
};

export default ProjectsContent;