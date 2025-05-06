import React from 'react';
import Image from 'next/image';
import {useTranslation} from 'react-i18next';
import {motion} from 'framer-motion';
import {CheckCircle2, Code, GitBranch, Play, Server} from 'lucide-react';

const MostRelevantProject = () => {
    const {t} = useTranslation();

    return (
        <section id="featured-project"
                 className="relative min-h-dvh w-full overflow-hidden py-20 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    className="text-center mb-16"
                    initial={{opacity: 0, y: 20}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true}}
                    transition={{duration: 0.6}}
                >
                    <h4 className="mb-2 text-lg font-outfit text-[#E14F41]">{t("devops_subtitle") || "DevOps & Tests"}</h4>
                    <h2 className="text-4xl md:text-5xl font-outfit font-bold text-gray-900 mb-8 relative inline-block pb-3 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:transform after:-translate-x-1/2 after:w-full after:h-1 after:bg-[#E14F41] after:rounded-full">
                        {t("devops_title") || "Infrastructure as Code"}
                    </h2>
                    <p className="max-w-2xl mx-auto mt-5 font-outfit text-gray-600">
                        {t("devops_description") || "Découvrez comment j'ai implémenté une infrastructure DevOps complète avec des tests automatisés et une intégration continue."}
                    </p>
                </motion.div>

                <motion.div
                    className="mt-16 mb-7"
                    initial={{opacity: 0, y: 30}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true}}
                    transition={{duration: 0.6, delay: 0.6}}
                >
                    <div className="rounded-xl p-6 shadow-lg border border-gray-200 overflow-hidden">
                        <h3 className="text-2xl font-bold mb-6">{t("kanban_title") || "Gestion de projet Agile"}</h3>

                        <p className="text-gray-700 mb-6">
                            {t("kanban_description") || "J'utilise la méthodologie Kanban pour une visualisation claire des tâches et une livraison continue. Cela permet une meilleure transparence et une optimisation du flux de travail."}
                        </p>

                        <div className="relative w-full h-auto rounded-lg overflow-hidden border border-gray-200">
                            <div className="aspect-w-16 aspect-h-9 w-full">
                                <Image
                                    src="/kanban-board.webp"
                                    alt="Tableau Kanban"
                                    width={2213}
                                    height={956}
                                    className="object-cover rounded-lg w-full"
                                    priority
                                />
                            </div>
                        </div>

                        <div className="mt-6 text-center">
            <span className="text-sm text-gray-500">
                {t("kanban_tools")}
            </span>
                        </div>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{opacity: 0, x: -30}}
                        whileInView={{opacity: 1, x: 0}}
                        viewport={{once: true}}
                        transition={{duration: 0.6}}
                        className="space-y-6"
                    >
                        <div className="rounded-xl p-6 shadow-md border border-gray-100">


                            <h3 className="text-2xl font-bold">{t("pipeline_title")}</h3>
                            <p className="text-gray-700">
                                {t("pipeline_description")}
                            </p>

                            <div className="relative rounded-lg overflow-hidden border-2 border-gray-200 shadow-lg">
                                <div className="absolute top-0 left-0 right-0 h-10 bg-gray-800 flex items-center px-4">
                                    <div className="flex space-x-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                    </div>
                                    <div className="text-white text-xs ml-4">Pipeline CI/CD</div>
                                </div>
                                <div className="pt-10">
                                    <Image
                                        src="/pipeline.webp"
                                        alt="Pipeline CI/CD"
                                        width={1378}
                                        height={744}
                                        className="rounded-b-md object-cover w-full h-full"
                                        priority
                                    />
                                </div>
                            </div>


                            <div className="flex flex-wrap gap-3 mt-4">
                                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">GitHub Actions</span>
                                <span
                                    className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">Docker</span>
                                <span
                                    className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">Railways</span>
                                <span
                                    className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Vercel</span>
                            </div>

                        </div>
                    </motion.div>

                    <motion.div
                        initial={{opacity: 0, x: 30}}
                        whileInView={{opacity: 1, x: 0}}
                        viewport={{once: true}}
                        transition={{duration: 0.6, delay: 0.2}}
                        className="space-y-8"
                    >
                        <div
                            className=" rounded-xl p-6 shadow-md border border-gray-100 transition-all hover:shadow-lg">
                            <div className="flex items-center mb-4">
                                <div className="p-2 bg-green-100 rounded-lg mr-4">
                                    <Play size={20} className="text-green-600"/>
                                </div>
                                <h4 className="text-xl font-semibold">Tests Cypress</h4>
                            </div>
                            <p className="text-gray-600 mb-4">
                                {t("cypress_description")}
                            </p>
                            <div className="bg-gray-900 rounded-md p-3 text-green-400 text-sm font-mono">
                                <code>cypress run --spec &quot;cypress/e2e/login.spec.js&quot;</code>
                                <div className="mt-2 text-white">✓ Vérifie la connexion utilisateur</div>
                                <div className="text-white">✓ Valide les messages d&apos;erreur</div>
                            </div>
                        </div>

                        <div
                            className=" rounded-xl p-6 shadow-md border border-gray-100 transition-all hover:shadow-lg">
                            <div className="flex items-center mb-4">
                                <div className="p-2 bg-green-100 rounded-lg mr-4">
                                    <CheckCircle2 size={20} className="text-green-600"/>
                                </div>
                                <h4 className="text-xl font-semibold">Tests Cucumber BDD</h4>
                            </div>
                            <p className="text-gray-600 mb-4">
                                {t("cucumber_description")}
                            </p>
                            <div className="bg-gray-900 rounded-md p-3 text-green-300 text-sm font-mono mb-4">
                                <code className="text-white">Feature: Adding the menu items <br/>
                                    As a user <br/>
                                    I want to add a Starter, MainCourse, Dessert and Drink</code>
                                <div className="text-blue-300 mt-1"> Scenario: Adding a Desserts to the BDD</div>
                                <div className="ml-4 text-gray-300"> When I add a Desserts with the following details
                                </div>
                                <div className="ml-4 text-gray-300">| name | price | description | id | menuId |
                                    imageUrl |
                                </div>
                                <div className="ml-4 text-gray-300">| Tiramisu | 7 | Italian | 1 | null | test-image.jpg
                                    |
                                </div>
                                <div className="ml-4 text-gray-300">
                                    Then the Dessert named &apos;Tiramisu&apos; should be added
                                </div>
                            </div>

                        </div>
                    </motion.div>


                    <div className=" rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all">
                        <div className="flex items-center mb-4">
                            <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center mr-4">
                                <svg viewBox="0 0 24 24" className="w-6 h-6 text-yellow-600" fill="currentColor">
                                    <path
                                        d="M3.89 15.673L6.255.461A.542.542 0 017.27.288l2.543 4.771zm16.794 3.692l-2.25-14a.54.54 0 00-.919-.295l-14.2 14.294 7.857 4.428a1.621 1.621 0 001.587 0zM14.3 7.147l-1.82-3.482a.542.542 0 00-.96 0L3.53 17.984z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold">Firebase Storage</h3>
                        </div>

                        <p className="text-gray-700 mb-4">
                            {t("firebase_description")}
                        </p>

                        <ul className="space-y-2 mb-4 text-gray-600">
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2">✓</span>
                                {t("firebase_description_1")}
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2">✓</span>
                                {t("firebase_description_2")}
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2">✓</span>
                                {t("firebase_description_3")}
                            </li>
                        </ul>
                    </div>

                    <a
                        href="https://front-mets-merveilles.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                    >
                        <div
                            className="rounded-xl w-full shadow-md border border-gray-100 hover:shadow-lg transition-all">
                            <div className="relative w-full h-64">
                                <Image
                                    src="/work-3.png"
                                    alt="MVP"
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="rounded-xl object-cover"
                                />
                                <div
                                    className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 rounded-xl">
                                    <h1 className="text-white text-2xl font-semibold">Résultat MVP</h1>
                                </div>
                            </div>
                        </div>
                    </a>


                </div>


                <motion.div
                    className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
                    initial={{opacity: 0, y: 30}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true}}
                    transition={{duration: 0.6, delay: 0.4}}
                >
                    <div
                        className=" rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all">
                        <GitBranch size={28} className="text-[#E14F41] mb-4"/>
                        <h4 className="text-xl font-semibold mb-2">{t("bloc_1_title")}</h4>
                        <p className="text-gray-600">
                            {t("bloc_1_description")}
                        </p>
                    </div>

                    <div
                        className=" rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all">
                        <Server size={28} className="text-[#E14F41] mb-4"/>
                        <h4 className="text-xl font-semibold mb-2">{t("bloc_2_title")}</h4>
                        <p className="text-gray-600">
                            {t("bloc_2_description")}
                        </p>
                    </div>

                    <div
                        className=" rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all">
                        <Code size={28} className="text-[#E14F41] mb-4"/>
                        <h4 className="text-xl font-semibold mb-2">{t("bloc_3_title")}</h4>
                        <p className="text-gray-600">
                            {t("bloc_3_description")}
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default MostRelevantProject;