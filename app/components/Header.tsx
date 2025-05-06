import React from "react";
import {useTranslation} from "react-i18next";
import {motion} from "framer-motion";
import {ArrowRight, Download, Handshake} from 'lucide-react';
import { SiMalt } from "react-icons/si";
import { FiGithub, FiLinkedin } from "react-icons/fi";

const buttonHover = {
    scale: 1.05,
    boxShadow: "0 10px 20px rgba(0,0,0,0.2)"
};

const skills = ['Next.js', 'TypeScript', 'TailwindCSS', 'Spring Boot'];

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

            {/* Titre */}
            <div className="flex flex-col items-center">
                <motion.h1
                    className="text-3xl py-3 sm:text-5xl lg:text-[66px] font-outfit font-bold bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent"
                    initial={{opacity: 0, y: -30}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.5, type: "spring", stiffness: 100}}
                >
                    {t("job_title")}
                </motion.h1>
                <motion.div
                    className="h-2 bg-gradient-to-r from-[#E14F41] to-red-400 w-24 mt-4 rounded-full"
                    initial={{width: 0, opacity: 0}}
                    animate={{width: "80%", opacity: 1}}
                    transition={{delay: 0.7, type: "spring", stiffness: 100}}
                />
            </div>

            {/* Slogan */}
            <motion.p
                className="text-lg text-gray-500 font-light mt-2 max-w-2xl"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{delay: 0.6}}
            >
                {t("description")}
            </motion.p>

            {/* Skills Tags */}
            <motion.div
                className="flex flex-wrap justify-center gap-3 mt-4"
                initial={{opacity: 0, y: 10}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: 0.7}}
            >
                {skills.map((skill, index) => (
                    <motion.span
                        key={skill}
                        className="px-4 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full cursor-default border border-gray-200 shadow-sm"
                        whileHover={{scale: 1.05}}
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.7 + (index * 0.1)}}
                    >
                        {skill}
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

            {/* Boutons principaux */}
            <motion.div
                className="flex flex-col items-center justify-center gap-4 mt-8 w-full max-w-xl"
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: 0.9}}
            >
                <div className="flex flex-col sm:flex-row w-full justify-center gap-4">
                    {/* Contact Button */}
                    <motion.a
                        href="#contact"
                        className="px-10 py-4 border border-transparent rounded-full bg-[#E14F41] text-white flex items-center justify-center gap-2 hover:border-[#FF6B5D] transition-all duration-300 group relative overflow-hidden shadow-md w-full sm:w-auto"
                        whileHover={buttonHover}
                        whileTap={{scale: 0.95}}
                    >
                        <span className="relative z-10 font-medium">
                            {t("contact_me")}
                        </span>
                        <span className="relative z-10">
                            <ArrowRight color="white" size={20} className="transform group-hover:translate-x-3 transition-transform duration-300"/>
                        </span>
                        <motion.span
                            className="absolute inset-0 bg-gradient-to-r from-[#E14F41] to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        />
                    </motion.a>
                    {/* Download CV */}
                    <motion.a
                        href="/CV_Zubair_Minhaj.pdf"
                        download
                        className="px-10 py-4 border rounded-full border-gray-300 flex items-center justify-center gap-2 hover:text-white hover:bg-gray-800 transition-all duration-300 group relative overflow-hidden shadow-sm w-full sm:w-auto"
                        whileHover={buttonHover}
                        whileTap={{scale: 0.95}}
                    >
                        <span className="relative z-10 font-medium">
                            {t("resume")}
                        </span>
                        <span className="relative z-10">
                            <Download size={20} className="group-hover:stroke-white transform group-hover:translate-y-1 transition-transform duration-300"/>
                        </span>
                        <motion.span
                            className="absolute inset-0 bg-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        />
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