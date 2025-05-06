"use client";
import React, { useEffect, useState } from "react";
import { ChevronDown } from 'lucide-react';
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

const Navbar: React.FC = () => {
    const { i18n, t } = useTranslation();
    const [currentLang, setCurrentLang] = useState(i18n.language || "en");
    const [isScrolled, setIsScrolled] = useState(false);
    const [isHoveringLang, setIsHoveringLang] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    const [showTopBar, setShowTopBar] = useState(true);
    const { scrollYProgress } = useScroll();
    const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    useEffect(() => {
        setIsMounted(true);
        let previousScrollY = 0;

        const handleScroll = () => {
            const scrollY = window.scrollY;
            setIsScrolled(scrollY > 50);

            if (window.innerWidth < 768) {
                setShowTopBar(scrollY < 50 || scrollY < previousScrollY);
            }
            previousScrollY = scrollY;

            const sections = ['home', 'about-me', 'featured-project', 'my-projects', 'contact'];
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 100 && rect.bottom >= 100) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (isMounted) {
            const handleResize = () => {
                if (window.innerWidth < 768) {
                    document.body.style.paddingBottom = "70px";
                    setShowTopBar(true);
                } else {
                    document.body.style.paddingBottom = "0";
                }
            };

            handleResize();
            window.addEventListener("resize", handleResize);

            return () => {
                document.body.style.paddingBottom = "0";
                window.removeEventListener("resize", handleResize);
            };
        }
    }, [isMounted]);

    const handleLanguageChange = (lang: string) => {
        i18n.changeLanguage(lang);
        setCurrentLang(lang);
        setIsHoveringLang(false);
    };

    const navItems = [
        { name: t('home'), href: "#home" },
        { name: t('about'), href: "#about-me" },
        { name: t('featured'), href: "#featured-project" },
        { name: t('projects'), href: "#my-projects" },
        { name: t('contact'), href: "#contact" }
    ];

    return (
        <>
            {/* Scroll Progress Bar */}
            <motion.div className="fixed top-0 left-0 h-1 bg-[#E14F41] z-[9999]" style={{ width }} />

            {/* Background */}
            {isMounted && (
                <motion.div
                    className="fixed top-0 right-0 w-11/12 -z-10 translate-y-[6%]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <Image
                        src="/header-bg-color.png"
                        alt="Background color"
                        className="w-full"
                        width={1920}
                        height={1080}
                        priority
                    />
                </motion.div>
            )}

            {/* Main Navbar Container */}
            <motion.div
                className={`fixed top-0 w-[95%] max-w-7xl mx-auto left-0 right-0 px-5 lg:px-8 xl:px-[10%] py-2 z-50 transition-all duration-300 rounded-full my-3 ${isScrolled ? 'backdrop-blur-sm bg-white/90 shadow-md border border-gray-100/30' : ''} ${typeof window !== 'undefined' && window.innerWidth < 768 && !showTopBar ? 'opacity-0 -translate-y-full' : 'opacity-100 translate-y-0'}`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
                <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
                    {/* Logo - Aligné à gauche */}
                    <motion.a
                        href="#home"
                        className="relative z-50"
                        whileHover={{ scale: 1.05, filter: "drop-shadow(0 0 6px #E14F41)" }}
                        animate={{
                            filter: [
                                "drop-shadow(0 0 0px #E14F41)",
                                "drop-shadow(0 0 8px #E14F41)",
                                "drop-shadow(0 0 0px #E14F41)"
                            ]
                        }}
                        transition={{ repeat: Infinity, duration: 3 }}
                    >
                        <Image
                            src="/logo.png"
                            alt="Logo"
                            width={112}
                            height={28}
                            className="w-auto h-auto cursor-pointer"
                            priority
                        />
                    </motion.a>

                    {/* Desktop Navigation - Centré */}
                    <motion.nav className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
                        <motion.ul className="flex items-center gap-6 lg:gap-8">
                            {navItems.map((item, index) => (
                                <motion.li
                                    key={item.href}
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * index }}
                                >
                                    <motion.a
                                        href={item.href}
                                        className="font-outfit text-gray-800 hover:text-black transition-colors relative group"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {item.name}
                                        <motion.span
                                            className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#E14F41] group-hover:w-full transition-all duration-300"
                                            layoutId="navUnderline"
                                        />
                                    </motion.a>
                                </motion.li>
                            ))}
                        </motion.ul>
                    </motion.nav>

                    {/* Language Switcher - Aligné à droite */}
                    <div className="flex items-center relative z-50">
                        <motion.div
                            className="relative"
                            onHoverStart={() => setIsHoveringLang(true)}
                            onHoverEnd={() => setIsHoveringLang(false)}
                        >
                            <motion.button
                                className="flex items-center gap-1 px-3 py-1 rounded-md border border-gray-300 bg-white/50 backdrop-blur-sm"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span className="text-sm">{currentLang.toUpperCase()}</span>
                                <motion.div
                                    animate={{ rotate: isHoveringLang ? 180 : 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <ChevronDown size={16} />
                                </motion.div>
                            </motion.button>

                            <AnimatePresence>
                                {isHoveringLang && (
                                    <motion.div
                                        className="absolute right-0 mt-2 w-20 bg-white rounded-md shadow-lg overflow-hidden"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {["en", "fr"].map((lang) => (
                                            <motion.button
                                                key={lang}
                                                onClick={() => handleLanguageChange(lang)}
                                                className={`w-full px-3 py-2 text-sm text-left hover:bg-gray-100 transition-colors ${currentLang === lang ? 'bg-gray-100 font-medium' : ''}`}
                                                whileHover={{ x: 5 }}
                                            >
                                                {lang.toUpperCase()}
                                            </motion.button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {/* Mobile Navigation - Hidden on desktop */}
            <div className="md:hidden">
                <motion.div
                    className="fixed bottom-0 left-0 right-0 bg-white shadow-lg rounded-full border-t border-gray-100 z-40 m-2"
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                    <div className="flex items-center justify-around py-1 px-2">
                        {navItems.map((item) => {
                            const sectionId = item.href.replace('#', '');
                            const isActive = activeSection === sectionId;

                            return (
                                <motion.a
                                    key={item.href}
                                    href={item.href}
                                    className="flex flex-col items-center text-center relative"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setActiveSection(sectionId)}
                                >
                                    {item.href === "#home" &&
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path
                                                d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
                                                stroke={isActive ? "#E14F41" : "currentColor"}
                                                strokeWidth="2"
                                            />
                                            <path
                                                d="M9 22V12H15V22"
                                                stroke={isActive ? "#E14F41" : "currentColor"}
                                                strokeWidth="2"
                                            />
                                        </svg>
                                    }
                                    {item.href === "#about-me" &&
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path
                                                d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                                                stroke={isActive ? "#E14F41" : "currentColor"}
                                                strokeWidth="2"
                                            />
                                            <path
                                                d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                                                stroke={isActive ? "#E14F41" : "currentColor"}
                                                strokeWidth="2"
                                            />
                                        </svg>
                                    }
                                    {item.href === "#featured-project" &&
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path
                                                d="M12 2L2 7L12 12L22 7L12 2Z"
                                                stroke={isActive ? "#E14F41" : "currentColor"}
                                                strokeWidth="2"
                                            />
                                            <path
                                                d="M2 17L12 22L22 17"
                                                stroke={isActive ? "#E14F41" : "currentColor"}
                                                strokeWidth="2"
                                            />
                                            <path
                                                d="M2 12L12 17L22 12"
                                                stroke={isActive ? "#E14F41" : "currentColor"}
                                                strokeWidth="2"
                                            />
                                        </svg>
                                    }
                                    {item.href === "#my-projects" &&
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path
                                                d="M22 19C22 19.5304 21.7893 20.0391 21.4142 20.4142C21.0391 20.7893 20.5304 21 20 21H4C3.46957 21 2.96086 21.7893 2.58579 20.4142C2.21071 20.0391 2 19.5304 2 19V5C2 4.46957 2.21071 3.96086 2.58579 3.58579C2.96086 3.21071 3.46957 3 4 3H9L11 6H20C20.5304 6 21.0391 6.21071 21.4142 6.58579C21.7893 6.96086 22 7.46957 22 8V19Z"
                                                stroke={isActive ? "#E14F41" : "currentColor"}
                                                strokeWidth="2"
                                            />
                                        </svg>
                                    }
                                    {item.href === "#contact" &&
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path
                                                d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                                                stroke={isActive ? "#E14F41" : "currentColor"}
                                                strokeWidth="2"
                                            />
                                            <path
                                                d="M22 6L12 13L2 6"
                                                stroke={isActive ? "#E14F41" : "currentColor"}
                                                strokeWidth="2"
                                            />
                                        </svg>
                                    }
                                    <span
                                        className="text-xs mt-1"
                                        style={{ color: isActive ? "#E14F41" : "inherit" }}
                                    >
                                        {item.name}
                                    </span>
                                </motion.a>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Espace réservé pour le contenu mobile */}
                <div className="pb-16"></div>
            </div>
        </>
    );
};

export default Navbar;