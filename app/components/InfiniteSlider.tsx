"use client";
import {motion} from "framer-motion";
import {FaAngular, FaReact, FaNodeJs, FaGithub, FaFigma, FaDocker} from "react-icons/fa";
import {
    SiMongodb,
    SiFirebase,
    SiWebstorm,
    SiIntellijidea,
    SiJavascript,
    SiTypescript,
    SiPostgresql,
    SiSpringboot,
    SiCucumber,
    SiCypress,
    SiGithubactions,
    SiTailwindcss,
    SiNextdotjs,
    SiExpress,
    SiGit,
} from "react-icons/si";

// Structure des compétences avec catégorisation
const skillGroups = [
    {
        category: "Front-end",
        color: "bg-blue-50 border-blue-100",
        iconColor: "text-blue-600",
        skills: [
            {icon: FaReact, name: "React", color: "#61DAFB"},
            {icon: SiNextdotjs, name: "Next.js", color: "#000000"},
            {icon: SiTailwindcss, name: "TailwindCSS", color: "#06B6D4"},
            {icon: SiTypescript, name: "TypeScript", color: "#3178C6"},
            {icon: SiJavascript, name: "JavaScript", color: "#F7DF1E"},
            {icon: FaAngular, name: "Angular", color: "#DD0031"}
        ]
    },
    {
        category: "Back-end",
        color: "bg-green-50 border-green-100",
        iconColor: "text-green-600",
        skills: [
            {icon: FaNodeJs, name: "Node.js", color: "#339933"},
            {icon: SiExpress, name: "Express", color: "#000000"},
            {icon: SiSpringboot, name: "Spring Boot", color: "#6DB33F"},
            {icon: SiMongodb, name: "MongoDB", color: "#47A248"},
            {icon: SiPostgresql, name: "PostgreSQL", color: "#336791"},
            {icon: SiFirebase, name: "Firebase", color: "#FFCA28"}
        ]
    },
    {
        category: "DevOps",
        color: "bg-purple-50 border-purple-100",
        iconColor: "text-purple-600",
        skills: [
            {icon: FaGithub, name: "Github", color: "#3d3d3d"},
            {icon: FaDocker, name: "Docker", color: "#2496ED"},
            {icon: SiGithubactions, name: "GitHub CI/CD", color: "#2088FF"},
            {icon: SiCypress, name: "Cypress", color: "#17202C"},
            {icon: SiCucumber, name: "Cucumber", color: "#23D96C"}
        ]
    },
    {
        category: "Outils",
        color: "bg-orange-50 border-orange-100",
        iconColor: "text-orange-600",
        skills: [
            {icon: SiGit, name: "Git", color: "#F05032"},
            {icon: SiWebstorm, name: "WebStorm", color: "#07C3F2"},
            {icon: SiIntellijidea, name: "IntelliJ IDEA", color: "#FE315D"},
            {icon: FaFigma, name: "Figma", color: "#F24E1E"}
        ]
    }
];

export const InfiniteSlider = () => {
    return (
        <div className="w-full px-2 py-8">
            <div className="max-w-7xl mx-auto space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {skillGroups.map((group, groupIndex) => (
                        <motion.div
                            key={group.category}
                            initial={{opacity: 0, y: 30}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{once: true}}
                            transition={{delay: groupIndex * 0.15, duration: 0.6, type: "spring"}}
                            className="rounded-xl shadow-sm hover:shadow-lg transition-shadow border border-gray-50 bg-white/80 backdrop-blur"
                        >
                            {/* En-tête de section */}
                            <div className={`py-3 px-5 border-b ${group.color.replace('bg', 'border')}`}>
                                <h3 className={`text-lg font-semibold ${group.iconColor}`}>
                                    {group.category}
                                </h3>
                            </div>

                            {/* Grille de compétences */}
                            <div className="p-6 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6 overflow-visible">
                            {group.skills.map((skill, index) => (
                                    <motion.div
                                        key={skill.name}
                                        initial={{opacity: 0, scale: 0.9}}
                                        whileInView={{opacity: 1, scale: 1}}
                                        viewport={{once: true}}
                                        transition={{delay: 0.08 * index, duration: 0.4}}
                                        className="relative group"
                                        whileHover={{scale: 1.13, y: -6}}
                                    >
                                        <div
                                            className="w-14 h-14 flex items-center justify-center rounded-full bg-gray-50 group-hover:bg-[#E14F41]/10 border border-gray-200 group-hover:shadow-lg transition-all duration-300"
                                            aria-label={skill.name}
                                        >
                                            <skill.icon size={28} color={skill.color}/>
                                        </div>
                                        {/* Tooltip visible au hover */}
                                        <div
                                            className="pointer-events-none select-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute left-1/2 -translate-x-1/2 top-full mt-2 bg-gray-900 text-white text-xs px-3 py-1.5 rounded shadow-lg z-20 whitespace-nowrap"
                                        >
                                            {skill.name}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};