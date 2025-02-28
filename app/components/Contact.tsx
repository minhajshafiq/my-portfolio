"use client";
import React, { FormEvent, useState, useEffect } from "react";
import { useTranslation } from "next-i18next";
import { ArrowRight, Loader } from "lucide-react";

const ContactForm: React.FC = () => {
    const { t } = useTranslation();
    const [result, setResult] = useState<string | null>(null);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(false);

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setResult(null);

        const formData = new FormData(event.currentTarget);
        const errors: { [key: string]: string } = {};

        // Validation des champs
        if (!formData.get("name")) {
            errors.name = t("errors.name");
        }
        const email = formData.get("email") as string;
        if (!email) {
            errors.email = t("errors.email");
        } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            errors.email = t("errors.invalid_email");
        }
        if (!formData.get("message")) {
            errors.message = t("errors.message");
        }

        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            setLoading(false);
            return;
        }

        formData.append("access_key", "b38fac5c-2dd4-4c73-989d-f15b62ed1364");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                setResult(t("form_submission_success"));
                event.currentTarget.reset();
                setErrors({});
            } else {
                setResult(data.message);
            }
        } catch (error) {
            console.error("Submission error:", error); // ✅ Corrige l'erreur ESLint
            setResult(t("form_submission_error"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div id="contact" className="w-full px-[12%] py-10 scroll-mt-20 bg-no-repeat bg-center bg-[length:90%_auto]">
            <h4 className="text-center mb-2 text-lg font-outfit">{t("connect_with_me")}</h4>
            <h2 className="text-center text-5xl font-outfit">{t("get_in_touch")}</h2>
            <p className="text-center max-w-2xl mx-auto mt-5 mb-12 font-outfit">{t("contact_description")}</p>

            <form onSubmit={onSubmit} className="max-w-2xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 mb-8">
                    <div>
                        <input
                            type="text"
                            placeholder={t("placeholder_name")}
                            className="w-full p-3 outline-none border border-gray-400 rounded-md bg-white"
                            name="name"
                            onChange={() => setErrors((prev) => ({ ...prev, name: "" }))}
                            required
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>
                    <div>
                        <input
                            type="email"
                            placeholder={t("placeholder_email")}
                            className="w-full p-3 outline-none border border-gray-400 rounded-md bg-white"
                            name="email"
                            onChange={() => setErrors((prev) => ({ ...prev, email: "" }))}
                            required
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>
                </div>

                <div>
                    <textarea
                        placeholder={t("placeholder_message")}
                        className="w-full p-3 outline-none border border-gray-400 rounded-md bg-white mb-6"
                        name="message"
                        onChange={() => setErrors((prev) => ({ ...prev, message: "" }))}
                        required
                    />
                    {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
                </div>

                <button
                    type="submit"
                    className={`py-3 px-8 w-max flex items-center justify-between gap-2 bg-black text-white rounded-full mx-auto transition-all duration-500 group ${
                        loading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-800"
                    }`}
                    disabled={loading}
                >
                    {loading ? <Loader size={18} className="animate-spin" /> : t("submit_now")}
                    {!loading && <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-2" />}
                </button>

                {result && <p className="mt-4 text-center text-sm">{result}</p>}
            </form>
        </div>
    );
};

// 🎉 Ajout du mounted check directement dans Contact
const Contact: React.FC = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true); // Assure que le rendu se fait uniquement côté client
    }, []);

    if (!mounted) return <div>Chargement du formulaire...</div>; // Affiche un message de chargement

    return <ContactForm />;
};

export default Contact;
