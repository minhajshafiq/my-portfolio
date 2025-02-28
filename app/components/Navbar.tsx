"use client";
import React, { useEffect, useRef, useState } from "react";
import { X, AlignRight } from 'lucide-react';
import Image from "next/image";
import { useTranslation } from "react-i18next";

const Navbar: React.FC = () => {
    const sideMenuRef = useRef<HTMLUListElement>(null);
    const { i18n } = useTranslation();
    const [currentLang, setCurrentLang] = useState("en");
    const [isScroll, setIsScroll] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        setCurrentLang(i18n.language || "en");
    }, [i18n.language]);

    const openMenu = () => {
        if (sideMenuRef.current) {
            sideMenuRef.current.style.transform = "translateX(-16rem)";
        }
        document.body.style.overflow = "hidden";
        setIsMenuOpen(true);
    };

    const closeMenu = () => {
        if (sideMenuRef.current) {
            sideMenuRef.current.style.transform = "translateX(16rem)";
        }
        document.body.style.overflow = "auto";
        setIsMenuOpen(false);
    };

    const handleLanguageChange = (lang: string) => {
        i18n.changeLanguage(lang);
        setCurrentLang(lang);
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScroll(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            {/* Overlay menu */}
            {isMenuOpen && (
                <button
                    onClick={closeMenu}
                    className="fixed inset-0 bg-gray-800 bg-opacity-50 z-40"
                    aria-label="Close menu"
                    type="button" // Ensure it's not treated as a form button
                />
            )}

            <div className="fixed top-0 right-0 w-11/12 -z-10 translate-y-[6%]">
                {isClient && (
                    <Image
                        src="/header-bg-color.png"
                        alt="Background color"
                        className="w-full"
                        width={1920}
                        height={1080}
                        priority
                    />
                )}
            </div>

            <nav
                className={`w-full fixed px-5 lg:px-8 xl:px-[8%] py-4 flex items-center justify-between z-50 
                ${isScroll ? "bg-white bg-opacity-50 backdrop-blur-lg shadow-sm" : ""}`}
            >
                <a href="#top">
                    <Image
                        src="/logo.png"
                        alt="Logo"
                        className="w-28 cursor-pointer mr-14"
                        width={112}
                        height={28}
                        priority
                    />
                </a>

                {/* Navigation Links */}
                <ul className="hidden md:flex items-center gap-6 lg:gap-8 rounded-full px-12 py-3 bg-white shadow-sm bg-opacity-50">
                    {["Home", "About Me", "My Projects", "Contact"].map((item) => (
                        <li key={item}>
                            <a
                                className="font-outfit hover:text-gray-800 hover:underline transition duration-300"
                                href={`#${item.toLowerCase().replace(" ", "-")}`}
                            >
                                {item}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    {/* Dark Mode Toggle */}
                    {/*<button className="hidden">*/}
                    {/*    <Image src={assets.moon_icon} alt="Moon Icon" className="w-6" priority />*/}
                    {/*</button>*/}

                    {/* Language Switcher */}
                    <div className="inline-flex items-center gap-4">
                        {["en", "fr"].map((lang) => (
                            <button
                                key={lang}
                                onClick={() => handleLanguageChange(lang)}
                                className={`text-slate-600 text-sm cursor-pointer px-3 py-1 rounded-md 
                                ${currentLang === lang ? "border border-slate-800" : ""}`}
                            >
                                {lang.toUpperCase()}
                            </button>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="block md:hidden ml-3"
                        onClick={openMenu}
                        tabIndex={0}
                    >
                        <AlignRight color="black" size={28}/>
                    </button>
                </div>

                {/* Sidebar Mobile Menu */}
                <ul
                    ref={sideMenuRef}
                    className="flex md:hidden flex-col gap-4 py-20 px-10 fixed right-[-16rem] top-0 bottom-0 w-64
                    z-50 h-screen bg-rose-50 transition-transform duration-500"
                >
                    {/* Close Button */}
                    <button
                        className="absolute right-6 top-6 cursor-pointer"
                        onClick={closeMenu}
                        tabIndex={0}
                    >
                        <X color="black" size={38}/>
                    </button>

                    {/* Mobile Menu Links */}
                    {["Home", "About Me", "My Projects", "Contact"].map((item) => (
                        <li key={item}>
                            <a
                                className="font-ovo hover:text-gray-800 hover:underline transition duration-300"
                                onClick={closeMenu}
                                href={`#${item.toLowerCase().replace(" ", "-")}`}
                            >
                                {item}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
};

export default Navbar;
