import React, { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { ArrowRight, Download, Handshake } from 'lucide-react';

const Header: React.FC = () => {
    const { t, ready } = useTranslation();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted || !ready) return <div>Loading...</div>;

    return (
        <div className="w-11/12 max-w-3xl text-center mx-auto h-screen flex flex-col items-center justify-center gap-4">
            <div className="relative w-64 h-64">
                <Image src="/memoji.jpg" alt="Profile Image" fill className="rounded-full object-cover" />
            </div>

            <h3 className='flex items-end gap-2 text-xl md:text-2xl mb-3 font-outfit'>
                {t("hello")}
                <Handshake className='rounded-full w-6' />
            </h3>

            <h1 className="text-3xl sm:text-6xl lg:text-[66px] font-outfit">
                {t("job_title")}
            </h1>
            <p className="max-w-2xl mx-auto font-outfit">
                {t("description")}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
                {/* Bouton "Contact me" */}
                <a
                    href="#contact"
                    className="px-10 py-3 border border-white rounded-full bg-black text-white flex items-center gap-2 hover:bg-gray-800 transition duration-500 group"
                >
                    {t("contact_me")}
                    <ArrowRight color="white" size={38} className="w-3 transition-transform duration-300 group-hover:translate-x-2"/>
                </a>

                {/* Bouton "My resume" */}
                <a
                    href="/CV_Zubair_Minhaj.pdf"
                    download
                    className="px-10 py-3 border rounded-full border-gray-500 flex items-center gap-2  hover:text-white hover:bg-gray-300 transition duration-500 group"
                >
                    {t("resume")}
                    <Download color="black" size={38} className="w-3 transition-transform duration-300 group-hover:translate-y-2"/>
                </a>
            </div>
        </div>
    );
}

export default Header;
