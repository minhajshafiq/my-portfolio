'use client'
import Navbar from "@/app/components/Navbar";
import Header from "@/app/components/Header";
import About from "@/app/components/About";
import Projects from "@/app/components/Projects";
import Contact from "@/app/components/Contact";
import Footer from "@/app/components/Footer";
import "../i18n"

export default function Home() {
  return (
    <>
        <Navbar />
        <Header />
        <About />
        <Projects/>
        <Contact />
        <Footer />
    </>
  );
}
