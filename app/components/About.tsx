"use client";
import React, {useState, useRef, useEffect} from "react";
import Image from "next/image";
import {useTranslation} from "react-i18next";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {InfiniteSlider} from "@/app/components/InfiniteSlider";
import {FaRegCalendarAlt} from "react-icons/fa";
import {FaCode, FaBriefcase, FaGraduationCap} from "react-icons/fa6";
import {motion} from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

interface Formation {
    year: string;
    degree: string;
    school: string;
    type?: "education" | "experience";
    description?: string;
}

interface CareerInfo {
    formations: Formation[];
}

const Strength: React.FC<{ icon: React.ElementType; title: string; description: string }> = ({
                                                                                                 icon: Icon,
                                                                                                 title,
                                                                                                 description
                                                                                             }) => (
    <motion.div
        className="flex flex-col items-center p-5 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
        whileHover={{y: -5, scale: 1.02}}
        transition={{type: "spring", stiffness: 300}}
    >
        <div className="mb-3 p-3 bg-gradient-to-br from-red-50 to-red-100 rounded-full">
            <Icon size={24} className="text-[#E14F41]"/>
        </div>
        <h4 className="text-lg font-medium mb-2">{title}</h4>
        <p className="text-gray-600 text-sm text-center">{description}</p>
    </motion.div>
);

const AboutContent = () => {
    const {t} = useTranslation();
    const [isVisible, setIsVisible] = useState(false);
    const [activeTab, setActiveTab] = useState<"education" | "experience">("experience");
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const underlineRef = useRef<HTMLSpanElement>(null);
    const infoListRef = useRef<HTMLUListElement>(null);
    const toolsSectionRef = useRef<HTMLDivElement>(null);
    const strengthsRef = useRef<HTMLDivElement>(null);

    const infoList: CareerInfo[] = [
        {
            formations: [
                {
                    year: "2017-2019",
                    degree: "Bac STI2D",
                    school: "Lycée Lucie Aubrac",
                    type: "education",
                    description: "Formation technologique orientée vers l'innovation et le développement durable."
                },
                {
                    year: "2022-2023",
                    degree: "Développeur Web",
                    school: "OpenClassrooms",
                    type: "education",
                    description: "Formation intensive en développement web front-end et back-end."
                },
                {
                    year: "2024-2025",
                    degree: "Concepteur Développeur d'Applications",
                    school: "Doranco",
                    type: "education",
                    description: "Formation avancée en conception d'applications et architecture logicielle."
                },
                {
                    year: "Nov 2024 - Fév 2025",
                    degree: t("about_internship_title"),
                    school: "Ukenoon",
                    type: "experience",
                    description: t("about_internship_description")
                },
                {
                    year: "Mars 2025",
                    degree: t("about_freelance_title"),
                    school: "Freelance",
                    type: "experience",
                    description: t("about_freelance_description")
                },
            ],
        },
    ];


    useEffect(() => {
        let trigger: ScrollTrigger | undefined;
        if (sectionRef.current) {
            trigger = ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "top 70%",
                onEnter: () => setIsVisible(true),
                once: true,
            });
        }

        if (isVisible) {
            if (headerRef.current) {
                gsap.fromTo(
                    headerRef.current,
                    {opacity: 0, y: 30},
                    {opacity: 1, y: 0, duration: 0.8}
                );
            }
            if (underlineRef.current) {
                gsap.fromTo(
                    underlineRef.current,
                    {width: "0%"},
                    {width: "100%", duration: 0.7, delay: 0.2, ease: "power2.out"}
                );
            }
            if (descriptionRef.current) {
                gsap.fromTo(
                    descriptionRef.current,
                    {opacity: 0, y: 20},
                    {opacity: 1, y: 0, duration: 0.7, delay: 0.5}
                );
            }
            const infoChildren = infoListRef.current?.children;
            if (infoChildren && infoChildren.length > 0) {
                gsap.fromTo(
                    infoChildren,
                    {opacity: 0, y: 30},
                    {
                        opacity: 1,
                        y: 0,
                        stagger: 0.2,
                        duration: 0.6,
                        delay: 0.7
                    }
                );
            }
            if (strengthsRef.current) {
                gsap.fromTo(
                    strengthsRef.current,
                    {opacity: 0, y: 20},
                    {opacity: 1, y: 0, duration: 0.7, delay: 0.9}
                );
            }
            if (toolsSectionRef.current) {
                gsap.fromTo(
                    toolsSectionRef.current,
                    {opacity: 0},
                    {opacity: 1, duration: 0.8, delay: 1}
                );
            }
            const toolItems = document.querySelectorAll('.tool-item');
            if (toolItems.length > 0) {
                gsap.fromTo(
                    toolItems,
                    {scale: 0.7, opacity: 0},
                    {
                        scale: 1,
                        opacity: 1,
                        duration: 0.5,
                        stagger: 0.1,
                        delay: 1.4
                    }
                );
            }
        }

        return () => {
            trigger?.kill();
        };
    }, [isVisible]);

    return (
        <section
            ref={sectionRef}
            id="about-me"
            className="w-full flex flex-col items-center text-center min-h-screen py-16 md:py-24"
        >
            <div className="opacity-0 w-full px-4" ref={headerRef}>
                <h4 className="mb-2 text-lg font-outfit text-gray-600">
                    {t("about_intro")}
                </h4>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-outfit font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-8 md:mb-16 relative inline-block pb-3">
                    {t("about_title")}
                    <span
                        ref={underlineRef}
                        className="absolute bottom-0 left-0 w-full h-1 rounded-full bg-gradient-to-r from-[#E14F41] to-purple-600"
                    />
                </h2>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 max-w-6xl mx-auto px-4">
                {/* Image + description */}
                <motion.div
                    className="flex flex-col items-center text-center w-full md:w-auto"
                    initial={{opacity: 0, y: 40}}
                    animate={isVisible ? {opacity: 1, y: 0} : {}}
                    transition={{duration: 0.7, delay: 0.5}}
                >
                    <motion.div
                        className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 relative group"
                        initial={{scale: 0.8, opacity: 0}}
                        animate={isVisible ? {scale: 1, opacity: 1} : {}}
                        transition={{duration: 0.7, delay: 0.7, type: "spring"}}
                    >
                        <div
                            className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-400 via-[#E14F41] to-orange-500 p-1 animate-spin-slow opacity-75 blur-sm group-hover:blur-none group-hover:opacity-100 transition-all duration-700"></div>
                        <div className="absolute inset-0.5 rounded-full overflow-hidden bg-white p-1">
                            <Image
                                src="/memoji.jpg"
                                alt="Zubair Minhaj"
                                fill
                                priority
                                sizes="(max-width: 768px) 100vw, 33vw"
                                className="rounded-full object-cover"
                            />
                        </div>
                    </motion.div>

                    <p
                        ref={descriptionRef}
                        className="mt-6 md:mt-8 text-center text-gray-700 text-base md:text-lg leading-relaxed font-light max-w-2xl opacity-0"
                    >
                        {t("about_description")}
                    </p>

                    {/* Points forts */}
                    <div
                        ref={strengthsRef}
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-10 w-full opacity-0"
                    >
                        <Strength
                            icon={FaCode}
                            title="Front-end"
                            description="Création d'interfaces réactives et modernes avec React, Next.js et Tailwind CSS"
                        />
                        <Strength
                            icon={FaBriefcase}
                            title="Mobile"
                            description="Développement d'applications mobiles performantes avec React Native"
                        />
                        <Strength
                            icon={FaGraduationCap}
                            title="Apprentissage"
                            description="Veille technologique constante et adaptation rapide aux nouveaux outils"
                        />
                    </div>
                </motion.div>

                {/* Timeline formations avec tabs */}
                <motion.div
                    className="w-full mt-10 md:mt-0 bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
                    initial={{opacity: 0, y: 40}}
                    animate={isVisible ? {opacity: 1, y: 0} : {}}
                    transition={{duration: 0.7, delay: 0.8}}
                >
                    {/* Tabs de filtrage */}
                    <div className="flex mb-6 bg-gray-100 p-1 rounded-lg w-fit mx-auto">
                        <button
                            onClick={() => setActiveTab("experience")}
                            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm transition-all ${
                                activeTab === "experience"
                                    ? "bg-white text-[#E14F41] shadow-sm"
                                    : "text-gray-600 hover:text-gray-800"
                            }`}
                        >
                            <FaBriefcase size={18}/>
                            {t("about_experience_title")}
                        </button>
                        <button
                            onClick={() => setActiveTab("education")}
                            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm transition-all ${
                                activeTab === "education"
                                    ? "bg-white text-[#E14F41] shadow-sm"
                                    : "text-gray-600 hover:text-gray-800"
                            }`}
                        >
                            <FaGraduationCap size={18}/>
                            {t("about_education_title")}
                        </button>
                    </div>

                    <ul
                        ref={infoListRef}
                        className="grid grid-cols-1 gap-4 md:gap-6 w-full"
                    >
                        {infoList.map(({formations}, index) => (
                            <li key={index} className="opacity-0">
                                <div className="w-full">
                                    <div className="relative border-l-2 border-[#E14F41] pl-5 space-y-8">
                                        {formations
                                            .filter(formation => !activeTab || formation.type === activeTab || !formation.type)
                                            .map((formation, idx) => (
                                                <motion.div
                                                    key={idx}
                                                    className="relative bg-white rounded-lg p-4 hover:shadow-md transition-all border border-transparent hover:border-red-100"
                                                    initial={{opacity: 0, x: -10}}
                                                    animate={isVisible ? {opacity: 1, x: 0} : {}}
                                                    transition={{delay: idx * 0.1}}
                                                    whileHover={{x: 5}}
                                                >
                                                    <div
                                                        className="absolute -left-[1.9rem] top-1.5 flex items-center justify-center w-4 h-4 rounded-full bg-white border-2 border-white shadow-sm">
                                                        {formation.type === "education" ? (
                                                            <FaGraduationCap size={14} className="text-[#E14F41]"/>
                                                        ) : (
                                                            <FaBriefcase size={14} className="text-[#E14F41]"/>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <div
                                                            className="flex flex-wrap items-center gap-2 text-sm mb-1.5">
                                                                            <span
                                                                                className="flex items-center gap-1 text-xs px-2 py-0.5 bg-red-50 text-[#E14F41] rounded-full">
                                                                                <FaRegCalendarAlt size={12}/>
                                                                                {formation.year}
                                                                            </span>
                                                            <span className="text-gray-500">•</span>
                                                            <span
                                                                className="font-medium text-gray-800">{formation.degree}</span>
                                                        </div>
                                                        <p className="text-xs text-left text-gray-500 mt-1 font-medium">{formation.school}</p>
                                                        {formation.description && (
                                                            <p className="text-sm text-left text-gray-600 mt-2">{formation.description}</p>
                                                        )}
                                                    </div>
                                                </motion.div>
                                            ))}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </div>

            {/* Section des outils techniques */}
            <motion.div
                className="flex flex-col items-center gap-6 sm:gap-8 md:gap-12 max-w-6xl mx-auto px-4 mt-16 sm:mt-20 md:mt-24 opacity-0"
                ref={toolsSectionRef}
                initial={{opacity: 0, y: 40}}
                animate={isVisible ? {opacity: 1, y: 0} : {}}
                transition={{duration: 0.8, delay: 1.2, ease: "easeOut"}}
                whileInView={{scale: [0.98, 1]}}
            >
                <div
                    className="relative"
                >
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-outfit font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 bg-clip-text text-transparent mb-4 sm:mb-6 md:mb-10 inline-block px-2">
                        {t("about_techStack_title")}
                    </h3>
                    <motion.span
                        className="absolute bottom-[6px] sm:bottom-[8px] md:bottom-[20px] left-1/2 transform -translate-x-1/2 w-3/4 h-1.5 bg-gradient-to-r from-[#E14F41] to-red-400 rounded-full"
                        initial={{width: "0%"}}
                        animate={isVisible ? {width: "100%"} : {}}
                        transition={{duration: 0.8, delay: 1.4}}
                    ></motion.span>
                </div>

                <motion.div
                    className="w-full max-w-[95vw] sm:max-w-full backdrop-blur-sm p-6 md:p-8 rounded-xl bg-gradient-to-br from-white/70 to-white/90 shadow-sm border border-gray-100/40"
                    whileHover={{boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)"}}
                    transition={{duration: 0.3}}
                >
                    <InfiniteSlider/>
                </motion.div>
            </motion.div>

            {/* Appel à l'action */}
            <motion.div
                className="mt-20 py-8 px-6 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl max-w-4xl mx-auto text-white shadow-lg"
                initial={{opacity: 0, y: 20}}
                animate={isVisible ? {opacity: 1, y: 0} : {}}
                transition={{delay: 1.5}}
                whileHover={{scale: 1.02}}
            >
                <h3 className="text-2xl font-bold mb-4">Envie de travailler ensemble ?</h3>
                <p className="max-w-2xl mx-auto mb-6">Je suis ouvert aux opportunités freelance et aux collaborations
                    sur des projets web et mobile.</p>
                <a
                    href="#contact"
                    className="inline-flex items-center gap-2 bg-white text-red-500 px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors"
                >
                    Me contacter
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m9 18 6-6-6-6"/>
                    </svg>
                </a>
            </motion.div>
        </section>
    );
};

export default AboutContent;