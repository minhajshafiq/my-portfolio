import React, { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Download, Handshake } from 'lucide-react';

const Header: React.FC = () => {
    const { t, ready } = useTranslation();
    const [mounted, setMounted] = useState(false);
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        setMounted(true);
        const timer = setTimeout(() => setShowContent(true), 300);
        return () => clearTimeout(timer);
    }, []);

    const buttonHover = {
        scale: 1.05,
        boxShadow: "0 10px 20px rgba(0,0,0,0.2)"
    };

    if (!mounted || !ready) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
                />
            </div>
        );
    }

    return (
        <AnimatePresence>
            {showContent && (
                <motion.div
                    id="home"
                    className="w-11/12 max-w-3xl text-center mx-auto h-screen flex flex-col items-center justify-center gap-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Image */}
                    <motion.div
                        className="relative w-64 h-64"
                        initial={{ scale: 0.8, opacity: 0, y: 40 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.2 }}
                        whileHover={{
                            y: [0, -10, 0],
                            transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                        }}
                    >
                        <Image
                            src="/memoji.jpg"
                            alt="Zubair Minhaj"
                            fill
                            priority
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="rounded-full object-cover shadow-xl"
                        />
                        <motion.div
                            className="absolute inset-0 rounded-full border-4 border-white/20"
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1.1 }}
                            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                        />
                    </motion.div>

                    {/* Salutation */}
                    <motion.h3
                        className='flex items-end gap-2 text-xl md:text-2xl mb-3 font-outfit'
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, type: "spring", stiffness: 150 }}
                    >
                        {t("hello")}
                        <motion.span
                            initial={{ rotate: -30, scale: 0 }}
                            animate={{ rotate: 0, scale: 1 }}
                            transition={{ delay: 0.6, type: "spring", stiffness: 300 }}
                        >
                            <Handshake className='rounded-full w-6' />
                        </motion.span>
                    </motion.h3>

                    {/* Titre */}
                    <motion.h1
                        className="text-3xl sm:text-6xl lg:text-[66px] font-outfit"
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
                    >
                        {t("job_title")}
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        className="max-w-2xl mx-auto font-outfit text-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7, duration: 1 }}
                    >
                        {t("description")}
                    </motion.p>

                    {/* Boutons */}
                    <motion.div
                        className="flex flex-col sm:flex-row items-center gap-4 mt-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                    >
                        <motion.a
                            href="#contact"
                            className="px-10 py-3 border border-white rounded-full bg-[#E14F41] text-white flex items-center gap-2 hover:border-[#FF6B5D] transition-all duration-300 group relative overflow-hidden"
                            whileHover={buttonHover}
                            whileTap={{ scale: 0.95 }}
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.9 }}
                        >
                            <span className="relative z-10">{t("contact_me")}</span>
                            <motion.span className="relative z-10" whileHover={{ x: 4 }}>
                                <ArrowRight color="white" size={24} />
                            </motion.span>
                            <motion.span
                                className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                initial={{ x: '-100%' }}
                                whileHover={{ x: '0%' }}
                                transition={{ duration: 0.4 }}
                            />
                        </motion.a>

                        <motion.a
                            href="/CV_Zubair_Minhaj.pdf"
                            download
                            className="px-10 py-3 border rounded-full border-gray-500 flex items-center gap-2 hover:text-white hover:bg-gray-700 transition-all duration-300 group relative overflow-hidden"
                            whileHover={buttonHover}
                            whileTap={{ scale: 0.95 }}
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 1.0 }}
                        >
                            <span className="relative z-10">{t("resume")}</span>
                            <motion.span className="relative z-10" whileHover={{ y: 4 }}>
                                <Download size={24} className="group-hover:stroke-white" />
                            </motion.span>
                            <motion.span
                                className="absolute inset-0 bg-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                initial={{ x: '100%' }}
                                whileHover={{ x: '0%' }}
                                transition={{ duration: 0.4 }}
                            />
                        </motion.a>
                    </motion.div>

                    {/* Particules */}
                    <motion.div
                        className="absolute inset-0 -z-10 overflow-hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 }}
                    >
                        {[...Array(15)].map((_, index) => {
                            const size = Math.random() * 20 + 10;
                            return (
                                <motion.div
                                    key={index}
                                    className="absolute rounded-full bg-blue-100/20"
                                    style={{
                                        width: size,
                                        height: size,
                                        left: `${Math.random() * 100}%`,
                                        top: `${Math.random() * 100}%`,
                                    }}
                                    animate={{
                                        y: [0, (Math.random() - 0.5) * 40],
                                        x: [0, (Math.random() - 0.5) * 40],
                                        opacity: [0.2, 0.5, 0.2],
                                    }}
                                    transition={{
                                        duration: 10 + Math.random() * 20,
                                        repeat: Infinity,
                                        repeatType: "reverse",
                                        ease: "easeInOut",
                                        delay: Math.random() * 5
                                    }}
                                />
                            );
                        })}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Header;
