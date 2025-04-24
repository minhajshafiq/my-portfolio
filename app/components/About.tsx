"use client";
import React, {useState, useRef, useEffect} from "react";
import Image from "next/image";
import {useTranslation} from "react-i18next";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {InfiniteSlider} from "@/app/components/InfiniteSlider";

gsap.registerPlugin(ScrollTrigger);

// Informations sur la carrière
const infoList = [
    {
        formations: [
            {
                year: "2017-2019",
                degree: "Bac STI2D",
                school: "Lycée Lucie Aubrac",
            },
            {
                year: "2022-2023",
                degree: "Développeur Web",
                school: "OpenClassrooms",
            },
            {
                year: "2024-2025",
                degree: "Concepteur Développeur d’Applications",
                school: "Doranco",
            },
            {
                year: "Nov 2024 - Fév 2025",
                degree: "Stage Full Stack & Mobile",
                school: "Ukenoon",
            },
        ],
    },
];


const AboutContent = () => {
    const {t} = useTranslation();
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const infoListRef = useRef<HTMLUListElement>(null);
    const toolsSectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Créer le ScrollTrigger qui déclenchera l'animation une seule fois
        const trigger = ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top 70%",
            onEnter: () => setIsVisible(true),
            once: true, // Se déclenche une seule fois
        });

        // Animation GSAP pour les éléments individuels
        if (isVisible) {
            // En-tête
            gsap.fromTo(
                headerRef.current,
                {opacity: 0, y: 30},
                {opacity: 1, y: 0, duration: 0.8}
            );

            // Description
            gsap.fromTo(
                descriptionRef.current,
                {opacity: 0, y: 20},
                {opacity: 1, y: 0, duration: 0.7, delay: 0.5}
            );

            // Liste d'informations
            gsap.fromTo(
                infoListRef.current?.children || [],
                {opacity: 0, y: 30},
                {
                    opacity: 1,
                    y: 0,
                    stagger: 0.2,
                    duration: 0.6,
                    delay: 0.7
                }
            );

            // Section des outils
            gsap.fromTo(
                toolsSectionRef.current,
                {opacity: 0},
                {opacity: 1, duration: 0.8, delay: 1}
            );

            // Les outils individuels
            const toolItems = document.querySelectorAll('.tool-item');
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

        return () => {
            // Nettoyer le ScrollTrigger
            trigger.kill();
        };
    }, [isVisible]);

    return (
        <section
            ref={sectionRef}
            id="about-me"
            className="w-full flex flex-col items-center text-center min-h-screen py-8 md:py-16"
        >
            <div className="opacity-0 w-full px-4" ref={headerRef}>
                <h4 className="mb-2 text-lg font-outfit text-gray-600">
                    {t("about_intro")}
                </h4>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-outfit font-bold text-gray-900 mb-8 md:mb-16 relative inline-block pb-3 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:transform after:-translate-x-1/2 after:w-full after:h-1 after:bg-[#E14F41] after:rounded-full">
                    {t("about_title")}
                </h2>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 max-w-5xl mx-auto px-4">

                {/* Image centrée + description */}
                <div className="flex flex-col items-center text-center w-full md:w-auto">
                    <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 relative">
                        <Image
                            src="/memoji.jpg"
                            alt="Zubair Minhaj"
                            fill
                            priority
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="rounded-full object-cover shadow-md border-4"
                        />
                    </div>

                    <p
                        ref={descriptionRef}
                        className="mt-4 md:mt-6 text-center text-gray-800 text-sm md:text-base leading-relaxed font-light max-w-2xl opacity-0"
                    >
                        {t("about_description")}
                    </p>
                </div>

                {/* Timeline formations */}
                <div className="w-full mt-8 md:mt-0">
                    <ul
                        ref={infoListRef}
                        className="grid grid-cols-1 gap-4 md:gap-6 w-full"
                    >
                        {infoList.map(({formations}, index) => (
                            <li
                                key={index}
                                className="bg-[#fff8f7] rounded-2xl border border-[#f5d0cb] p-6 shadow-sm hover:shadow-md transition-all opacity-0"
                            >
                                <div className="flex flex-col items-center">

                                    {/* Timeline verticale */}
                                    <div className="w-full">
                                        <div className="relative border-l-2 border-[#E14F41] pl-5 space-y-6">
                                            {formations.map((formation, idx) => (
                                                <div key={idx} className="relative">
                                                    {/* Point rouge sur la ligne */}
                                                    <div
                                                        className="absolute -left-[1.65rem] top-1 w-3 h-3 rounded-full bg-[#E14F41] border-2 border-white shadow-sm"></div>

                                                    {/* Contenu */}
                                                    <div>
                                                        <div className="flex flex-wrap items-center gap-2 text-sm">
                                                            <span
                                                                className="font-medium text-[#E14F41]">{formation.year}</span>
                                                            <span className="text-gray-400">•</span>
                                                            <span className="text-gray-800">{formation.degree}</span>
                                                        </div>
                                                        <p className="text-xs text-left text-gray-500 mt-1">{formation.school}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>


            <div
                className="flex flex-col items-center gap-6 sm:gap-8 md:gap-16 max-w-5xl mx-auto px-4 mt-8 sm:mt-12 md:mt-20 opacity-0"
                ref={toolsSectionRef}
            >
                <h3 className="text-xl sm:text-2xl md:text-4xl font-outfit font-bold text-gray-900 mb-4 sm:mb-6 md:mb-10 relative inline-block pb-2 sm:pb-2.5 md:pb-3 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:transform after:-translate-x-1/2 after:w-4/5 after:h-1 after:bg-[#E14F41] after:rounded-full">
                    {t("about_techStack_title")}
                </h3>
                <div className="w-full max-w-[95vw] sm:max-w-full">
                    <InfiniteSlider />
                </div>
            </div>


        </section>
    );
};

export default AboutContent;