"use client"
import React from 'react';
import Image from "next/image";
import { Mail, Github  } from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <div className={"mt-20"}>
            <div className={"text-center"}>
                <Image
                    src="/logo.png"
                    alt="Logo"
                    className="w-36 mx-auto mb-2"
                    width={112}
                    height={28}
                    priority
                />

                <div className={"w-max flex items-center gap-2 mx-auto"}>
                    <Mail size={24} className="w-6 text-black" />
                    <p>
                        minhaj.shafiq@icloud.com
                    </p>
                </div>
            </div>

            <div className={"text-center sm:flex items-center justify-between border-t border-gray-400 mx-[10%] mt-12 py-6"}>
                <p>
                    &copy; 2025 Minhaj Zubair. All rights reserved.
                </p>
                <ul>
                    <li>
                        <a
                            target="_blank"
                            href="https://github.com/minhajshafiq"
                            className="flex items-center gap-2 text-black hover:text-gray-700 transition-colors duration-300 group"
                        >
                            <Github size={20} className="group-hover:scale-110 group-hover:text-gray-700 transition-transform duration-300" />
                            Github
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Footer;