"use client";
import React, {useState, useRef, useEffect, useCallback} from "react";
import Image from "next/image";
import {useTranslation} from "next-i18next";
import {FiGithub, FiExternalLink} from "react-icons/fi";
import {FaArrowRight} from "react-icons/fa";
import {motion, useInView, AnimatePresence} from "framer-motion";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const projectsData = [
    {
        src: "/wwproject.png",
        title: "wwproject_title",
        description: "wwproject_description",
        tech: ["Next.js 15", "Tailwind CSS v4", "TypeScript", "gsap"],
        link: "https://wuwa-delta.vercel.app/",
        github: "",
        longDescription: "wwproject_long_description"
    },
    {
        src: "/teona.jpg",
        title: "project_6_title",
        description: "project_6_description",
        tech: ["Expo", "React Native", "TypeScript"],
        link: "",
        github: "",
        longDescription: "project_6_long_description"
    },
    {
        src: "/work-5.png",
        title: "kasa_title",
        description: "kasa_description",
        tech: ["React", "SCSS"],
        link: "https://minhajshafiq-kasa.netlify.app/",
        github: "",
        longDescription: "kasa_long_description"
    },
    {
        src: "/work-2.png",
        title: "ohmyfood_title",
        description: "ohmyfood_description",
        tech: ["HTML", "SCSS"],
        link: "https://minhajshafiq.github.io/OhMyFood/",
        github: "https://github.com/minhajshafiq/OhMyFood",
        longDescription: "ohmyfood_long_description"
    },
    {
        src: "/work-4.png",
        title: "pfc_title",
        description: "pfc_description",
        tech: ["Next.JS", "Framer Motion"],
        link: "https://pfc-minhaj.netlify.app/",
        github: "https://github.com/minhajshafiq/pierre-feuille-ciseau",
        longDescription: "pfc_long_description"
    },
    {
        src: "/work-6.png",
        title: "project_5_title",
        description: "project_5_description",
        tech: ["HTML", "CSS"],
        link: "https://minhajshafiq.github.io/Booki/",
        github: "https://github.com/minhajshafiq/Booki",
        longDescription: "project_5_long_description"
    },
    {
        src: "/work-8.png",
        title: "project_7_title",
        description: "project_7_description",
        tech: ["Public API"],
        link: "https://catfats.netlify.app/",
        github: "https://github.com/minhajshafiq/Cat-Facts",
        longDescription: "project_7_long_description"
    },
    {
        src: "/work-9.png",
        title: "project_8_title",
        description: "project_8_description",
        tech: ["Node.js", "MongoDB", "JWT"],
        link: "https://github.com/minhajshafiq/Projet-6",
        github: "",
        longDescription: "project_8_long_description"
    }
];

const ProjectsContent: React.FC = () => {
    const {t} = useTranslation();
    const [showAll, setShowAll] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const underlineRef = useRef<HTMLSpanElement>(null);
    const projectsRef = useRef<HTMLDivElement>(null);
    const projectRefs = useRef<Array<HTMLDivElement | null>>([]);

    const isInView = useInView(sectionRef, {
        once: false,
        amount: 0.2,
    });

    const displayedProjects = showAll ? projectsData : projectsData.slice(0, 4);

    // Ref callback pour corriger le type
    const setProjectRef = useCallback((el: HTMLDivElement | null, idx: number) => {
        projectRefs.current[idx] = el;
    }, []);

    const handleImageError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
        const target = e.target as HTMLImageElement;
        target.src = "/logo.png";
    }, []);

    useEffect(() => {
        if (!sectionRef.current || typeof window === "undefined") return;

        if (titleRef.current) {
            gsap.fromTo(
                titleRef.current,
                {opacity: 0, y: 30},
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: titleRef.current,
                        start: "top 80%",
                        toggleActions: "play none none none",
                    },
                }
            );
        }

        if (underlineRef.current) {
            gsap.fromTo(
                underlineRef.current,
                {width: "0%"},
                {
                    width: "100%",
                    duration: 0.8,
                    delay: 0.3,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: titleRef.current,
                        start: "top 80%",
                        toggleActions: "play none none none",
                    },
                }
            );
        }

        if (projectsRef.current) {
            const projectElements = projectRefs.current.filter(Boolean);
            gsap.fromTo(
                projectElements,
                {opacity: 0, y: 50},
                {
                    opacity: 1,
                    y: 0,
                    stagger: 0.15,
                    duration: 0.5,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: projectsRef.current,
                        start: "top 70%",
                        toggleActions: "play none none none",
                    },
                }
            );
        }

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill(true));
        };
    }, [showAll]);

    const cardVariants = {
        initial: {opacity: 1, y: 0},
        hover: {
            y: -8,
            transition: {duration: 0.3, ease: "easeOut"},
        },
    };

    const overlayVariants = {
        hidden: {opacity: 0},
        visible: {opacity: 1, transition: {duration: 0.3}},
    };

    return (
        <div
            id="my-projects"
            ref={sectionRef}
            className="w-full px-4 md:px-12 py-16 scroll-mt-20 flex flex-col justify-center items-center min-h-screen"
        >
            <div className="text-center mb-12">
                <motion.h4
                    className="mb-2 text-lg font-medium text-[#E14F41]"
                    initial={{opacity: 0, y: 10}}
                    animate={isInView ? {opacity: 1, y: 0} : {opacity: 0, y: 10}}
                    transition={{duration: 0.4}}
                >
                    {t("projects_title")}
                </motion.h4>

                <div className="relative inline-block">
                    <h2
                        ref={titleRef}
                        className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 pb-3 relative"
                    >
                        {t("projects_latest_work")}
                        <span
                            ref={underlineRef}
                            className="absolute bottom-0 left-0 h-1 rounded-full bg-gradient-to-r from-[#E14F41] to-purple-600"
                        />
                    </h2>
                </div>

                <motion.p
                    className="max-w-2xl mx-auto mt-4 text-gray-500"
                    initial={{opacity: 0}}
                    animate={isInView ? {opacity: 1} : {opacity: 0}}
                    transition={{duration: 0.6, delay: 0.2}}
                >
                    {t("projects_description")}
                </motion.p>
            </div>

            <div
                ref={projectsRef}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl"
            >
                <AnimatePresence mode="wait">
                    {displayedProjects.map((project, index) => (
                        <motion.div
                            key={index}
                            ref={el => setProjectRef(el, index)}
                            variants={cardVariants}
                            initial="initial"
                            whileHover="hover"
                            onHoverStart={() => setHoveredIndex(index)}
                            onHoverEnd={() => setHoveredIndex(null)}
                            className="group relative rounded-xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300"
                        >
                            <div className="aspect-[4/3] relative overflow-hidden">
                                <motion.div
                                    className="absolute top-3 right-3 flex gap-2 z-10"
                                    initial={{opacity: 0, y: -10}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.2, duration: 0.3}}
                                >
                                    {project.link && (
                                        <motion.a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-white p-2 rounded-full shadow-sm hover:bg-gray-100 transition-colors"
                                            title={t("visit_site")}
                                            aria-label={t("visit_site")}
                                            whileHover={{scale: 1.2, rotate: 5}}
                                            whileTap={{scale: 0.9}}
                                        >
                                            <FiExternalLink
                                                size={16}
                                                className="text-gray-800 transition-colors duration-300 hover:text-[#E14F41]"
                                            />
                                        </motion.a>
                                    )}
                                    {project.github && (
                                        <motion.a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-white p-2 rounded-full shadow-sm hover:bg-gray-100 transition-colors"
                                            title={t("view_code")}
                                            aria-label={t("view_code")}
                                            whileHover={{scale: 1.2, rotate: -5}}
                                            whileTap={{scale: 0.9}}
                                        >
                                            <FiGithub
                                                size={16}
                                                className="text-gray-800 transition-colors duration-300 hover:text-[#E14F41]"
                                            />
                                        </motion.a>
                                    )}
                                </motion.div>

                                <Image
                                    src={project.src}
                                    alt={t(project.title)}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    onError={handleImageError}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    priority={index < 2}
                                />

                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4 flex flex-col justify-end"
                                    variants={overlayVariants}
                                    initial="hidden"
                                    animate={hoveredIndex === index ? "visible" : "hidden"}
                                >
                                    <motion.h3
                                        className="text-white font-semibold text-lg mb-2"
                                        initial={{y: 20, opacity: 0}}
                                        animate={hoveredIndex === index ? {y: 0, opacity: 1} : {y: 20, opacity: 0}}
                                        transition={{duration: 0.3, delay: 0.1}}
                                    >
                                        {t(project.title)}
                                    </motion.h3>

                                    <motion.p
                                        className="text-gray-200 text-sm line-clamp-2"
                                        initial={{y: 20, opacity: 0}}
                                        animate={hoveredIndex === index ? {y: 0, opacity: 1} : {y: 20, opacity: 0}}
                                        transition={{duration: 0.3, delay: 0.2}}
                                    >
                                        {t(project.description)}
                                    </motion.p>

                                    <motion.div
                                        className="flex flex-wrap gap-2 mt-3"
                                        initial={{y: 20, opacity: 0}}
                                        animate={hoveredIndex === index ? {y: 0, opacity: 1} : {y: 20, opacity: 0}}
                                        transition={{duration: 0.3, delay: 0.3}}
                                    >
                                        {project.tech.slice(0, 3).map((tech) => (
                                            <span
                                                key={tech}
                                                className="bg-white/20 text-white text-xs px-2 py-1 rounded backdrop-blur-sm"
                                            >
                                                    {tech}
                                                </span>
                                        ))}
                                        {project.tech.length > 3 && (
                                            <span
                                                className="bg-white/20 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                                                    +{project.tech.length - 3}
                                                </span>
                                        )}
                                    </motion.div>
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {!showAll && (
                <motion.div className="flex justify-center mt-12">
                    <motion.button
                        type="button"
                        className={`py-3 px-8 w-max flex items-center justify-between gap-2 bg-[#E14F41] text-white rounded-full mx-auto transition-all duration-500 group shadow-lg relative overflow-hidden focus:ring-2 focus:ring-[#E14F41]/20`}
                        whileHover={{
                            scale: 1.05,
                            boxShadow: "0 8px 20px rgba(225, 79, 65, 0.3)",
                            transition: {type: "spring", stiffness: 400, damping: 10},
                        }}
                        whileTap={{scale: 0.95}}
                        onClick={() => setShowAll(true)}
                        >
                        <span className="relative z-10 flex items-center gap-2 font-medium">
                            {t("show_more")}
                            <FaArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-2"/>
                        </span>
                        <motion.span
                            className="absolute inset-0 bg-gradient-to-r from-[#E14F41] to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        />
                    </motion.button>
                </motion.div>
            )}
        </div>
    );
};

export default ProjectsContent;