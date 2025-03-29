"use client"
import React from 'react';
import Image from "next/image";
import { Mail, Github } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
    return (
        <motion.div
            className={"mt-20"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                className={"text-center"}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
            >
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                    <Image
                        src="/logo.png"
                        alt="Logo"
                        className="w-36 mx-auto mb-2"
                        width={112}
                        height={28}
                        priority
                    />
                </motion.div>

                <motion.div
                    className={"w-max flex items-center gap-2 mx-auto"}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                    <motion.div
                        initial={{ rotate: 0 }}
                        whileHover={{ rotate: 15 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Mail size={24} className="w-6 text-black" />
                    </motion.div>
                    <p>
                        minhaj.shafiq@icloud.com
                    </p>
                </motion.div>
            </motion.div>

            <motion.div
                className={"text-center sm:flex items-center justify-between border-t border-gray-400 mx-[10%] mt-12 py-6"}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
            >
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    &copy; 2025 Minhaj Zubair. All rights reserved.
                </motion.p>
                <motion.ul
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    <motion.li
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                        <a
                            target="_blank"
                            href="https://github.com/minhajshafiq"
                            className="flex items-center gap-2 text-black hover:text-gray-700 transition-colors duration-300 group"
                        >
                            <motion.div
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.6 }}
                            >
                                <Github size={20} className="group-hover:scale-110 group-hover:text-gray-700 transition-transform duration-300" />
                            </motion.div>
                            Github
                        </a>
                    </motion.li>
                </motion.ul>
            </motion.div>
        </motion.div>
    );
};

export default Footer;