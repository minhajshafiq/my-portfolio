import React from "react";
import {useTranslation} from "react-i18next";
import {motion} from "framer-motion";
import {ArrowRight, Download, Handshake, Code, Server, GitBranch} from 'lucide-react';
import { SiMalt } from "react-icons/si";
import { FiGithub, FiLinkedin } from "react-icons/fi";

const buttonHover = {
    scale: 1.05,
    boxShadow: "0 10px 20px rgba(0,0,0,0.2)"
};

const techChips: Array<{ label: string; icon?: React.ElementType }> = [
    { label: 'Next.js 15', icon: Code },
    { label: 'Spring Boot', icon: Server },
    { label: 'CI/CD GitHub Actions', icon: GitBranch },
    { label: 'TypeScript' },
    { label: 'TailwindCSS' },
];

const Header: React.FC = () => {
    const {t} = useTranslation();

    return (
        <motion.div
            id="home"
            className="w-11/12 max-w-4xl text-center mx-auto h-screen flex flex-col items-center justify-center gap-6 px-4 sm:px-8"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.8}}
        >
            {/* Salutation */}
            <motion.h3
                className="flex items-end gap-2 text-xl md:text-2xl mb-3 font-outfit"
                initial={{opacity: 0, y: -20}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: 0.4, type: "spring", stiffness: 150}}
            >
                {t("hello")}
                <motion.span
                    initial={{rotate: -30, scale: 0}}
                    animate={{rotate: 0, scale: 1}}
                    transition={{delay: 0.6, type: "spring", stiffness: 300}}
                    className="bg-gray-100 rounded-full p-1"
                >
                    <Handshake className="w-6 h-6 text-[#E14F41]"/>
                </motion.span>
            </motion.h3>

            {/* Titre + sous-titre modernisés */}
            <div className="flex flex-col items-center">
                <motion.h1
                    className="text-3xl sm:text-5xl lg:text-[60px] font-outfit font-extrabold tracking-tight leading-tight text-gray-900 text-center"
                    initial={{opacity: 0, y: -30}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.5, type: "spring", stiffness: 100}}
                >
                    {t("hero_title")}
                </motion.h1>
                <motion.p
                    className="mt-4 text-lg text-gray-600 max-w-2xl text-center"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{delay: 0.6}}
                >
                    {t("hero_subtitle")}
                </motion.p>
                <motion.div
                    className="h-1.5 bg-gradient-to-r from-[#E14F41] to-red-400 w-24 mt-6 rounded-full"
                    initial={{width: 0, opacity: 0}}
                    animate={{width: "64px", opacity: 1}}
                    transition={{delay: 0.7, type: "spring", stiffness: 100}}
                />
            </div>

            

            {/* Tags techno unifiés */}
            <motion.div
                className="flex flex-wrap justify-center gap-3 mt-5"
                initial={{opacity: 0, y: 10}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: 0.7}}
            >
                {techChips.map((chip, index) => (
                    <motion.span
                        key={chip.label}
                        className="inline-flex items-center gap-2 px-4 py-1.5 text-sm bg-white/80 backdrop-blur border border-gray-200 text-gray-800 rounded-full shadow-sm hover:bg-white"
                        whileHover={{scale: 1.05}}
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.7 + (index * 0.08)}}
                    >
                        {chip.icon ? <chip.icon size={16} className="text-gray-800"/> : null}
                        {chip.label}
                    </motion.span>
                ))}
            </motion.div>

            {/* Conteneur principal pour le texte et les boutons sociaux */}
            <div className="flex flex-col md:flex-row items-center gap-8 w-full max-w-2xl mt-4">
                {/* Boutons sociaux à gauche */}
                <motion.div
                    className="flex flex-row md:flex-col gap-4 order-2 md:order-1"
                    initial={{opacity: 0, x: -20}}
                    animate={{opacity: 1, x: 0}}
                    transition={{delay: 0.8}}
                >
                    {/* Github */}
                    <motion.a
                        href="https://github.com/minhajshafiq"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        className="p-3 border rounded-full border-gray-300 flex items-center justify-center hover:text-white hover:bg-gray-800 transition-all duration-300 group relative overflow-hidden shadow-sm"
                        whileHover={buttonHover}
                        whileTap={{scale: 0.95}}
                    >
                        <span className="relative z-10 transform group-hover:rotate-12 transition-transform duration-300">
                            <FiGithub size={22} className="group-hover:stroke-white"/>
                        </span>
                    </motion.a>
                    {/* LinkedIn */}
                    <motion.a
                        href="https://www.linkedin.com/in/minhajshafiq/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        className="p-3 border rounded-full border-gray-300 flex items-center justify-center hover:text-white hover:bg-blue-700 transition-all duration-300 group relative overflow-hidden shadow-sm"
                        whileHover={buttonHover}
                        whileTap={{scale: 0.95}}
                    >
                        <span className="relative z-10 transform group-hover:rotate-12 transition-transform duration-300">
                            <FiLinkedin  size={22} className="group-hover:stroke-white"/>
                        </span>
                    </motion.a>
                    {/* Malt */}
                    <motion.a
                        href="https://www.malt.fr/profile/tonprofil"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Malt"
                        className="p-3 border rounded-full border-gray-300 flex items-center justify-center hover:text-white hover:bg-[#FF5C57] transition-all duration-300 group relative overflow-hidden shadow-sm"
                        whileHover={buttonHover}
                        whileTap={{scale: 0.95}}
                    >
                        <span className="relative z-10 transform group-hover:rotate-12 transition-transform duration-300">
                            <SiMalt size={22} className="group-hover:stroke-white"/>
                        </span>
                    </motion.a>
                </motion.div>

                {/* Description */}
                <motion.p
                    className="flex-1 font-outfit text-lg text-left text-gray-600 order-1 md:order-2 p-4 rounded-lg border shadow-sm"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{delay: 0.8}}
                >
                    Développeur passionné, je construis des interfaces modernes et scalables avec une attention
                    particulière à l&#39;expérience utilisateur et aux performances.
                </motion.p>
            </div>

            {/* Boutons principaux modernisés */}
            <motion.div
                className="flex flex-col items-center justify-center gap-4 mt-8 w-full max-w-2xl"
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: 0.9}}
            >
                <div className="flex flex-col sm:flex-row w-full justify-center gap-4">
                    {/* CTA primaire: Voir mes projets */}
                    <motion.a
                        href="#my-projects"
                        className="px-10 py-4 border border-transparent rounded-full bg-[#E14F41] text-white flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-300 group relative overflow-hidden w-full sm:w-auto"
                        whileHover={buttonHover}
                        whileTap={{scale: 0.95}}
                    >
                        <span className="relative z-10 font-medium">
                            {t("cta_primary")}
                        </span>
                        <span className="relative z-10">
                            <ArrowRight color="white" size={20} className="transform group-hover:translate-x-3 transition-transform duration-300"/>
                        </span>
                        <motion.span
                            className="absolute inset-0 bg-gradient-to-r from-[#E14F41] to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        />
                    </motion.a>
                    {/* CTA secondaire: Télécharger le CV */}
                    <motion.a
                        href="/CV_Zubair_Minhaj.pdf"
                        download
                        className="px-10 py-4 border rounded-full border-gray-200 flex items-center justify-center gap-2 hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 group relative overflow-hidden w-full sm:w-auto"
                        whileHover={buttonHover}
                        whileTap={{scale: 0.95}}
                    >
                        <span className="relative z-10 font-medium">
                            {t("cta_secondary")}
                        </span>
                        <span className="relative z-10">
                            <Download size={20} className="transform group-hover:translate-y-1 transition-transform duration-300"/>
                        </span>
                    </motion.a>
                </div>
                
            </motion.div>

            {/* Indicateur de défilement */}
            <motion.div
                className="mt-8 mb-4 flex flex-col items-center"
                initial={{opacity: 0, y: -20}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: 1.2, duration: 0.5}}
            >
                <span className="text-xs text-gray-500 mb-2">Découvrir plus</span>
                <motion.div
                    className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center pt-1"
                    animate={{y: [0, 5, 0]}}
                    transition={{repeat: Infinity, duration: 1.5}}
                >
                    <motion.div
                        className="w-1.5 h-3 bg-[#E14F41] rounded-full"
                        animate={{y: [0, 5, 0]}}
                        transition={{repeat: Infinity, duration: 1.5}}
                    />
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default Header;