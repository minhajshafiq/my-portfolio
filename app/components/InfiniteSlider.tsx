"use client";
import {useState} from "react";
import {FaAngular, FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaGithub, FaFigma, FaDocker} from "react-icons/fa";
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
    SiGithubactions
} from "react-icons/si";

const Logos = [
    {icon: SiWebstorm, name: "WebStorm", color: "#07C3F2"},
    {icon: SiIntellijidea, name: "IntelliJ IDEA", color: "#FE315D"},
    {icon: SiFirebase, name: "Firebase", color: "#FFCA28"},
    {icon: SiMongodb, name: "MongoDB", color: "#47A248"},
    {icon: FaFigma, name: "Figma", color: "#F24E1E"},
    {icon: FaGithub, name: "Git", color: "#F05032"},
    {icon: FaAngular, name: "Angular", color: "#DD0031"},
    {icon: FaReact, name: "React", color: "#61DAFB"},
    {icon: FaNodeJs, name: "Node.js", color: "#339933"},
    {icon: SiJavascript, name: "JavaScript", color: "#F7DF1E"},
    {icon: SiTypescript, name: "TypeScript", color: "#3178C6"},
    {icon: FaHtml5, name: "HTML5", color: "#E34F26"},
    {icon: FaCss3Alt, name: "CSS3", color: "#1572B6"},
    {icon: SiSpringboot, name: "Spring Boot", color: "#6DB33F"},
    {icon: SiCucumber, name: "Cucumber", color: "#23D96C"},
    {icon: SiCypress, name: "Cypress", color: "#17202C"},
    {icon: FaDocker, name: "Docker", color: "#2496ED"},
    {icon: SiGithubactions, name: "GitHub Actions", color: "#2088FF"},
    {icon: SiPostgresql, name: "PostgreSQL", color: "#336791"},
];

export const InfiniteSlider = () => {
    const [isPaused, setIsPaused] = useState(false);

    return (
        <div
            className="relative w-full overflow-hidden before:absolute before:left-0 before:top-0 before:z-[2] before:h-full before:w-[50px]"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div
                className="flex w-[calc(100px*38)] sm:w-[calc(125px*38)] animate-infinite-slider"
                style={{ animationPlayState: isPaused ? "paused" : "running" }}
            >
                {Logos.map((logo, index) => (
                    <div
                        className="slide flex w-[100px] sm:w-[125px] items-center justify-center flex-col p-2"
                        key={index}
                    >
                        <div className="w-12 h-12 sm:w-16 sm:h-16 mb-1 sm:mb-2 flex items-center justify-center">
                            <logo.icon size={48} color={logo.color}/>
                        </div>
                        <span className="text-xs sm:text-sm text-gray-700 font-medium text-center">{logo.name}</span>
                    </div>
                ))}
                {Logos.map((logo, index) => (
                    <div
                        className="slide flex w-[100px] sm:w-[125px] items-center justify-center flex-col p-2"
                        key={`duplicate-${index}`}
                    >
                        <div className="w-12 h-12 sm:w-16 sm:h-16 mb-1 sm:mb-2 flex items-center justify-center">
                            <logo.icon size={48} color={logo.color}/>
                        </div>
                        <span className="text-xs sm:text-sm text-gray-700 font-medium text-center">{logo.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};