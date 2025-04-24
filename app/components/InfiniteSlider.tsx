import Image from "next/image";

const Logos = [
    {src: "/Webstorm_Icon.png", name: "WebStorm"},
    {src: "/IntelliJ_IDEA_Icon.jpg", name: "IntelliJ IDEA"},
    {src: "/firebase.png", name: "Firebase"},
    {src: "/mongodb.png", name: "MongoDB"},
    {src: "/figma.png", name: "Figma"},
    {src: "/git.png", name: "Git"},
];

export const InfiniteSlider = () => {
    return (
        <div
            className="relative w-full overflow-hidden before:absolute before:left-0 before:top-0 before:z-[2] before:h-full before:w-[50px] sm:before:w-[100px] after:top-0 after:z-[2] after:h-full after:w-[50px] sm:after:w-[100px] after:bg-[linear-gradient(to_left,white,rgba(255,255,255,0))] after:content-['']">
            <div className="animate-infinite-slider flex w-[calc(100px*12)] sm:w-[calc(125px*12)]">
                {Logos.map((logo, index) => (
                    <div
                        className="slide flex w-[100px] sm:w-[125px] items-center justify-center flex-col p-2"
                        key={index}
                    >
                        <div className="relative w-12 h-12 sm:w-16 sm:h-16 mb-1 sm:mb-2">
                            <Image
                                src={logo.src}
                                alt={logo.name}
                                fill
                                sizes="(max-width: 640px) 48px, 64px"
                                className="object-contain"
                            />
                        </div>
                        <span className="text-xs sm:text-sm text-gray-700 font-medium text-center">{logo.name}</span>
                    </div>
                ))}
                {Logos.map((logo, index) => (
                    <div
                        className="slide flex w-[100px] sm:w-[125px] items-center justify-center flex-col p-2"
                        key={`duplicate-${index}`}
                    >
                        <div className="relative w-12 h-12 sm:w-16 sm:h-16 mb-1 sm:mb-2">
                            <Image
                                src={logo.src}
                                alt={logo.name}
                                fill
                                sizes="(max-width: 640px) 48px, 64px"
                                className="object-contain"
                            />
                        </div>
                        <span className="text-xs sm:text-sm text-gray-700 font-medium text-center">{logo.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};