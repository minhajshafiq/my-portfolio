"use client";
import React from 'react';
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { GraduationCap, Languages, Code } from 'lucide-react';

const toolsData = [
    { src: "/vscode.png", width: 24, height: 24 },
    { src: "/firebase.png", width: 24, height: 24 },
    { src: "/mongodb.png", width: 24, height: 24 },
    { src: "/figma.png", width: 24, height: 24 },
    { src: "/git.png", width: 24, height: 24 },
];

const infoList = [
    { icon: <Languages className="w-7 h-7 mx-auto text-gray-700"/>, title: "languages", description: "languages_desc" },
    { icon: <GraduationCap className="w-7 h-7 mx-auto text-gray-700"/>, title: "education", description: "education_desc" },
    { icon: <Code className="w-7 h-7 mx-auto text-gray-700"/>, title: "projects", description: "projects_desc" }
];

const About: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div id='about' className="w-full px-[12%] py-10 scroll-mt-20 flex flex-col items-center text-center">
            <h4 className='mb-2 text-lg font-outfit'>{t('about_intro')}</h4>
            <h2 className="text-5xl font-outfit">{t('about_title')}</h2>

            <div className="flex flex-col lg:flex-row items-center gap-20 my-20 max-w-5xl mx-auto">
                <div className="w-64 sm:w-80 rounded-3xl overflow-hidden">
                    <Image src="/memoji.jpg" alt="Profile Image" width={320} height={320} className="w-full h-full object-cover rounded-3xl" />
                </div>

                <div className="flex-1 flex flex-col items-center text-center">
                    <p className="mb-10 max-w-2xl font-outfit">{t('about_description')}</p>

                    <ul className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
                        {infoList.map(({ icon, title, description }) => (
                            <li key={title} className="border-[0.5px] border-gray-400 rounded-xl p-6 cursor-pointer hover:bg-hoverLight hover:-translate-y-1 duration-500 hover:shadow-black">
                                <div className="mt-3">{icon}</div>
                                <h3 className="my-4 font-semibold text-gray-700">{t(title)}</h3>
                                <p className="text-gray-600 text-sm">{t(description)}</p>
                            </li>
                        ))}
                    </ul>

                    <h4 className='my-6 text-gray-700 font-outfit'>{t('tools_title')}</h4>

                    <ul className='flex flex-wrap justify-center gap-3 sm:gap-5'>
                        {toolsData.map((tool) => (
                            <li key={tool.src} className='flex items-center justify-center w-12 sm:w-14 aspect-square border border-gray-400 rounded-lg cursor-pointer hover:-translate-y-1 duration-500'>
                                <Image src={tool.src} alt='tool' width={tool.width} height={tool.height} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default About;
