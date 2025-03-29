"use client";
import React, { useEffect, useRef, useState } from "react";
import { X, AlignRight, ChevronDown } from 'lucide-react';
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

const Navbar: React.FC = () => {
    const sideMenuRef = useRef<HTMLDivElement>(null);
    const { i18n, t } = useTranslation();
    const [currentLang, setCurrentLang] = useState(i18n.language || "en");
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isHoveringLang, setIsHoveringLang] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleMenu = () => {
        if (!isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLanguageChange = (lang: string) => {
        i18n.changeLanguage(lang);
        setCurrentLang(lang);
        setIsHoveringLang(false);
    };

    const navItems = [
        { name: t('home'), href: "#home" },
        { name: t('about'), href: "#about-me" },
        { name: t('projects'), href: "#my-projects" },
        { name: t('contact'), href: "#contact" }
    ];

    return (
        <>
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

            {/* Navbar */}
            <motion.nav
                className={`fixed w-full px-5 lg:px-8 xl:px-[8%] py-4 flex items-center justify-between z-50 transition-all duration-300 ${isScrolled ? 'backdrop-blur-sm bg-white/80 shadow-md' : ''}`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
                {/* Logo */}
                <motion.a
                    href="#home"
                    className="relative z-50"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Image
                        src="/logo.png"
                        alt="Logo"
                        width={112}
                        height={28}
                        className="w-28 cursor-pointer"
                        priority
                    />
                </motion.a>

                {/* Desktop Navigation */}
                <motion.ul
                    className="hidden md:flex items-center gap-6 lg:gap-8 rounded-full px-12 py-3 bg-white/50 backdrop-blur-sm shadow-sm relative z-40"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
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
                                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"
                                    layoutId="navUnderline"
                                />
                            </motion.a>
                        </motion.li>
                    ))}
                </motion.ul>

                {/* Actions */}
                <div className="flex items-center gap-4 relative z-50">
                    {/* Language Switcher */}
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

                    {/* Mobile Menu Button */}
                    <motion.button
                        className="block md:hidden p-2"
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <AlignRight size={28} className="text-black" />
                    </motion.button>
                </div>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={toggleMenu}
                                className="fixed inset-0 bg-black/50 z-40"
                            />

                            <motion.div
                                ref={sideMenuRef}
                                className="fixed top-0 right-0 h-full w-64 bg-white shadow-xl z-50 flex flex-col p-6"
                                initial={{ x: '100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '100%' }}
                                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            >
                                {/* Close Button */}
                                <motion.button
                                    className="self-end mb-8"
                                    onClick={toggleMenu}
                                    whileHover={{ rotate: 90 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <X size={32} className="text-gray-800" />
                                </motion.button>

                                {/* Mobile Menu Links */}
                                <ul className="flex flex-col gap-6">
                                    {navItems.map((item, index) => (
                                        <motion.li
                                            key={item.href}
                                            initial={{ x: 50, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: 0.1 * index }}
                                        >
                                            <motion.a
                                                href={item.href}
                                                onClick={toggleMenu}
                                                className="text-xl font-medium text-gray-800 hover:text-black transition-colors"
                                                whileHover={{ x: 5 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                {item.name}
                                            </motion.a>
                                        </motion.li>
                                    ))}
                                </ul>

                                {/* Language Switcher Mobile */}
                                <div className="mt-auto pt-6 border-t border-gray-200">
                                    <p className="mb-4 text-gray-600">{t('language')}</p>
                                    <div className="flex gap-3">
                                        {["en", "fr"].map((lang) => (
                                            <motion.button
                                                key={lang}
                                                onClick={() => handleLanguageChange(lang)}
                                                className={`px-4 py-2 rounded-md ${currentLang === lang ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'}`}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                {lang.toUpperCase()}
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </motion.nav>
        </>
    );
};

export default Navbar;