"use client";
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { GraduationCap, Languages, Code, Sparkles, Zap } from 'lucide-react';

const toolsData = [
    { src: "/Webstorm_Icon.png", name: "WebStorm" },
    { src: "/IntelliJ_IDEA_Icon.jpg", name: "IntelliJ IDEA" },
    { src: "/firebase.png", name: "Firebase" },
    { src: "/mongodb.png", name: "MongoDB" },
    { src: "/figma.png", name: "Figma" },
    { src: "/git.png", name: "Git" },
];

const infoList = [
    { icon: <Languages className="w-7 h-7 mx-auto text-gray-700" />, title: "languages", description: "languages_desc" },
    { icon: <GraduationCap className="w-7 h-7 mx-auto text-gray-700" />, title: "education", description: "education_desc" },
    { icon: <Code className="w-7 h-7 mx-auto text-gray-700" />, title: "projects", description: "projects_desc" }
];

const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);

        return () => {
            window.removeEventListener('resize', checkIfMobile);
        };
    }, []);

    return isMobile;
};

const AboutContent: React.FC = () => {
    const { t } = useTranslation();
    const [hoveredTool, setHoveredTool] = useState<number | null>(null);
    const [hoveredInfo, setHoveredInfo] = useState<number | null>(null);
    const [selectedTool, setSelectedTool] = useState<number | null>(null);
    const isMobile = useIsMobile();

    const ref = React.useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, {
        once: false,
        amount: 0.3,
        ...(isMobile ? { triggerOnce: true, skip: true } : {})
    });

    return (
        <section
            ref={ref}
            id='about-me'
            className="w-full px-[12%] py-20 scroll-mt-20 flex flex-col items-center text-center min-h-screen"
        >
            {isMobile ? (
                <>
                    {/* Mobile version without animations */}
                    <div className="text-center mb-16">
                        <h4 className='mb-2 text-lg font-outfit text-gray-600'>
                            {t('about_intro')}
                        </h4>
                        <h2 className="text-5xl font-outfit font-bold text-gray-900">
                            {t('about_title')}
                        </h2>
                    </div>

                    <div className="flex flex-col lg:flex-row items-center gap-20 my-10 max-w-6xl mx-auto">
                        <div className="flex-1 flex flex-col items-center text-center">
                            <p className="mb-10 max-w-2xl font-outfit text-gray-600 leading-relaxed">
                                {t('about_description')}
                            </p>

                            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto w-full">
                                {infoList.map(({ icon, title, description }) => (
                                    <li
                                        key={title}
                                        className="relative bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all"
                                    >
                                        <div className="mt-3">{icon}</div>
                                        <h3 className="my-4 font-semibold text-gray-800">{t(title)}</h3>
                                        <p className="text-gray-600 text-sm leading-relaxed">{t(description)}</p>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-16 w-full">
                                <h4 className='my-6 text-gray-700 font-outfit font-medium flex items-center justify-center gap-2'>
                                    <Zap className="w-5 h-5 text-yellow-500" />
                                    {t('tools_title')}
                                </h4>

                                <ul className='flex flex-wrap justify-center gap-5 sm:gap-7 max-w-2xl mx-auto'>
                                    {toolsData.map((tool, index) => (
                                        <li key={tool.src} className='relative'>
                                            <div
                                                className={`flex items-center justify-center w-16 h-16 rounded-xl cursor-pointer ${selectedTool === index ? 'bg-gradient-to-br from-blue-100 to-purple-100' : 'bg-white'} border-2 ${hoveredTool === index ? 'border-blue-400' : 'border-gray-200'} shadow-md`}
                                                onMouseEnter={() => setHoveredTool(index)}
                                                onMouseLeave={() => setHoveredTool(null)}
                                                onClick={() => setSelectedTool(selectedTool === index ? null : index)}
                                            >
                                                <Image
                                                    src={tool.src}
                                                    alt={tool.name}
                                                    width={28}
                                                    height={28}
                                                    className="object-contain"
                                                />
                                            </div>
                                        </li>
                                    ))}
                                </ul>

                                {selectedTool !== null && (
                                    <div className="mt-8 max-w-md mx-auto bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl border border-blue-100">
                                        <p className="text-sm text-gray-700">
                                            {t('selected_tool')} <span className="font-semibold text-blue-600">{toolsData[selectedTool].name}</span>
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <AnimatePresence>
                    {isInView && (
                        <>
                            {/* Desktop version with animations */}
                            <motion.div
                                className="text-center mb-16"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 30 }}
                                transition={{ duration: 0.8 }}
                            >
                                <motion.h4
                                    className='mb-2 text-lg font-outfit text-gray-600'
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    {t('about_intro')}
                                </motion.h4>
                                <motion.h2
                                    className="text-5xl font-outfit font-bold text-gray-900"
                                    initial={{ scale: 0.9 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0.9 }}
                                    transition={{ type: "spring", stiffness: 100, delay: 0.3 }}
                                >
                                    {t('about_title')}
                                </motion.h2>
                            </motion.div>

                            <motion.div
                                className="flex flex-col lg:flex-row items-center gap-20 my-10 max-w-6xl mx-auto"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <div className="flex-1 flex flex-col items-center text-center">
                                    <motion.p
                                        className="mb-10 max-w-2xl font-outfit text-gray-600 leading-relaxed"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 20 }}
                                        transition={{ delay: 0.7 }}
                                    >
                                        {t('about_description')}
                                    </motion.p>

                                    <motion.ul
                                        className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto w-full"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ delay: 0.9 }}
                                    >
                                        {infoList.map(({ icon, title, description }, index) => (
                                            <motion.li
                                                key={title}
                                                className="relative bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all"
                                                initial={{ opacity: 0, y: 30 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 30 }}
                                                transition={{ delay: 1 + index * 0.15, type: "spring" }}
                                                whileHover={{
                                                    y: -8,
                                                    scale: 1.02,
                                                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                                                }}
                                                onMouseEnter={() => setHoveredInfo(index)}
                                                onMouseLeave={() => setHoveredInfo(null)}
                                            >
                                                <AnimatePresence>
                                                    {hoveredInfo === index && (
                                                        <motion.div
                                                            className="absolute -top-3 -right-3"
                                                            initial={{ scale: 0, opacity: 0 }}
                                                            animate={{ scale: 1, opacity: 1 }}
                                                            exit={{ scale: 0, opacity: 0 }}
                                                        >
                                                            <Sparkles className="w-5 h-5 text-yellow-400" />
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                                <div className="mt-3">{icon}</div>
                                                <h3 className="my-4 font-semibold text-gray-800">{t(title)}</h3>
                                                <p className="text-gray-600 text-sm leading-relaxed">{t(description)}</p>
                                            </motion.li>
                                        ))}
                                    </motion.ul>

                                    <motion.div
                                        className="mt-16 w-full"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ delay: 1.5 }}
                                    >
                                        <motion.h4
                                            className='my-6 text-gray-700 font-outfit font-medium flex items-center justify-center gap-2'
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 20 }}
                                            transition={{ delay: 1.6 }}
                                        >
                                            <Zap className="w-5 h-5 text-yellow-500 animate-pulse" />
                                            {t('tools_title')}
                                        </motion.h4>

                                        <motion.ul
                                            className='flex flex-wrap justify-center gap-5 sm:gap-7 max-w-2xl mx-auto'
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ delay: 1.7 }}
                                        >
                                            {toolsData.map((tool, index) => (
                                                <motion.li
                                                    key={tool.src}
                                                    className='relative'
                                                    initial={{ scale: 0.7, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    exit={{ scale: 0.7, opacity: 0 }}
                                                    transition={{
                                                        delay: 1.8 + index * 0.1,
                                                        type: "spring",
                                                        stiffness: 600,
                                                        damping: 15
                                                    }}
                                                >
                                                    <motion.div
                                                        className={`flex items-center justify-center w-16 h-16 rounded-xl cursor-pointer ${selectedTool === index ? 'bg-gradient-to-br from-blue-100 to-purple-100' : 'bg-white'} border-2 ${hoveredTool === index ? 'border-blue-400' : 'border-gray-200'} shadow-md`}
                                                        whileHover={{
                                                            y: -12,
                                                            scale: 1.2,
                                                            boxShadow: "0 20px 40px -10px rgba(0, 0, 255, 0.2)"
                                                        }}
                                                        whileTap={{ scale: 0.9 }}
                                                        onHoverStart={() => setHoveredTool(index)}
                                                        onHoverEnd={() => setHoveredTool(null)}
                                                        onClick={() => setSelectedTool(selectedTool === index ? null : index)}
                                                        transition={{
                                                            type: "spring",
                                                            stiffness: 400,
                                                            damping: 15
                                                        }}
                                                    >
                                                        <Image
                                                            src={tool.src}
                                                            alt={tool.name}
                                                            width={28}
                                                            height={28}
                                                            className="object-contain transition-transform duration-300 hover:rotate-12"
                                                        />

                                                        {selectedTool === index && (
                                                            <motion.div
                                                                className="absolute -top-2 -right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center shadow-lg"
                                                                initial={{ scale: 0 }}
                                                                animate={{ scale: 1 }}
                                                                exit={{ scale: 0 }}
                                                                transition={{ type: "spring" }}
                                                            >
                                                                <div className="w-2 h-2 bg-white rounded-full" />
                                                            </motion.div>
                                                        )}
                                                    </motion.div>

                                                    <AnimatePresence>
                                                        {(hoveredTool === index || selectedTool === index) && (
                                                            <motion.div
                                                                className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3"
                                                                initial={{ opacity: 0, y: -10 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                exit={{ opacity: 0, y: -10 }}
                                                                transition={{ duration: 0.2 }}
                                                            >
                                                                <div className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${selectedTool === index ? 'bg-blue-500 text-white' : 'bg-gray-800 text-white'}`}>
                                                                    {tool.name}
                                                                    <div className={`absolute -top-2 left-1/2 w-3 h-3 transform -translate-x-1/2 rotate-45 ${selectedTool === index ? 'bg-blue-500' : 'bg-gray-800'}`} />
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </motion.li>
                                            ))}
                                        </motion.ul>

                                        <AnimatePresence>
                                            {selectedTool !== null && (
                                                <motion.div
                                                    className="mt-8 max-w-md mx-auto bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl border border-blue-100"
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 20 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <p className="text-sm text-gray-700">
                                                        {t('selected_tool')} <span className="font-semibold text-blue-600">{toolsData[selectedTool].name}</span>
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            )}
        </section>
    );
};

const About: React.FC = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-pulse text-gray-500">Loading about section...</div>
            </div>
        );
    }

    return <AboutContent />;
};

export default About;