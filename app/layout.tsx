import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react";
import { Outfit as OutfitFont, Ovo as OvoFont } from "next/font/google";
import "./globals.css";

const Outfit: ReturnType<typeof OutfitFont> = OutfitFont({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const Ovo: ReturnType<typeof OvoFont> = OvoFont({
    subsets: ["latin"],
    weight: ["400"],
});

export const metadata: Metadata = {
    title: "Portfolio of Minhaj Zubair",
    description: "Full Stack Developer | Next.js, Java & Spring Boot",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="scroll-smooth">
        <body
            className={`${Outfit.className} ${Ovo.className} antialiased leading-8 overflow-x-hidden`}
        >
        {children}
        <Analytics />
        <SpeedInsights />
        </body>
        </html>
    );
}