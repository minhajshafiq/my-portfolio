"use client";
import React, { FormEvent, useState, useEffect } from "react";
import { useTranslation } from "next-i18next";
import { ArrowRight, Loader, Check, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ContactForm: React.FC = () => {
    const { t } = useTranslation();
    const [result, setResult] = useState<{ message: string; success: boolean } | null>(null);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(false);
    const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const validateName = (name: string) => /^[a-zA-Z\s]{2,50}$/.test(name);
    const validateEmail = (email: string) => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    const validateMessage = (message: string) => message.length >= 10;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Validation en temps réel seulement après que le champ a été touché
        if (touched[name]) {
            let error = "";
            if (!value.trim()) {
                error = t(`errors.${name}`);
            } else {
                if (name === "name" && !validateName(value)) error = t("errors.invalid_name");
                if (name === "email" && !validateEmail(value)) error = t("errors.invalid_email");
                if (name === "message" && !validateMessage(value)) error = t("errors.invalid_message");
            }
            setErrors(prev => ({ ...prev, [name]: error }));
        }
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name } = event.target;
        if (!touched[name]) {
            setTouched(prev => ({ ...prev, [name]: true }));
            // Déclencher la validation au premier blur
            handleChange(event);
        }
    };

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setResult(null);

        // Valider tous les champs avant soumission
        const newErrors: { [key: string]: string } = {};

        if (!formData.name || !validateName(formData.name)) {
            newErrors.name = t("errors.invalid_name");
        }
        if (!formData.email || !validateEmail(formData.email)) {
            newErrors.email = t("errors.invalid_email");
        }
        if (!formData.message || !validateMessage(formData.message)) {
            newErrors.message = t("errors.invalid_message");
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setLoading(false);
            // Marquer tous les champs comme touchés pour afficher les erreurs
            setTouched({
                name: true,
                email: true,
                message: true
            });
            return;
        }

        const submissionData = new FormData();
        submissionData.append("name", formData.name);
        submissionData.append("email", formData.email);
        submissionData.append("message", formData.message);
        submissionData.append("access_key", "b38fac5c-2dd4-4c73-989d-f15b62ed1364");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: submissionData
            });

            const data = await response.json();

            if (data.success) {
                setResult({
                    message: t("form_submission_success"),
                    success: true
                });
                // Réinitialiser le formulaire
                setFormData({
                    name: "",
                    email: "",
                    message: ""
                });
                setErrors({});
                setTouched({});
            } else {
                setResult({
                    message: data.message || t("form_submission_error"),
                    success: false
                });
            }
        } catch (error) {
            console.error("Submission error:", error);
            setResult({
                message: t("form_submission_error"),
                success: false
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            id="contact"
            className="w-full px-[12%] py-10 scroll-mt-20 bg-no-repeat bg-center bg-[length:90%_auto]"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
            >
                <h4 className="text-center mb-2 text-lg font-outfit">{t("connect_with_me")}</h4>
                <h2 className="text-center text-5xl font-outfit">{t("get_in_touch")}</h2>
                <p className="text-center max-w-2xl mx-auto mt-5 mb-12 font-outfit">{t("contact_description")}</p>
            </motion.div>

            <motion.form
                onSubmit={onSubmit}
                className="max-w-2xl mx-auto"
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 mb-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                    >
                        <input
                            type="text"
                            placeholder={t("placeholder_name")}
                            className={`w-full p-3 outline-none border border-gray-400 rounded-md bg-white transition-colors ${
                                errors.name ? "border-red-500" : "hover:border-gray-600 focus:border-gray-600"
                            }`}
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                        />
                        <AnimatePresence>
                            {touched.name && errors.name && (
                                <motion.p
                                    className="text-red-500 text-sm mt-1 flex items-center gap-1"
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -5 }}
                                >
                                    <X size={14} /> {errors.name}
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                    >
                        <input
                            type="email"
                            placeholder={t("placeholder_email")}
                            className={`w-full p-3 outline-none border border-gray-400 rounded-md bg-white transition-colors ${
                                errors.email ? "border-red-500" : "hover:border-gray-600 focus:border-gray-600"
                            }`}
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                        />
                        <AnimatePresence>
                            {touched.email && errors.email && (
                                <motion.p
                                    className="text-red-500 text-sm mt-1 flex items-center gap-1"
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -5 }}
                                >
                                    <X size={14} /> {errors.email}
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                >
                    <textarea
                        placeholder={t("placeholder_message")}
                        className={`w-full p-3 outline-none border border-gray-400 rounded-md bg-white mb-6 transition-colors ${
                            errors.message ? "border-red-500" : "hover:border-gray-600 focus:border-gray-600"
                        }`}
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                    />
                    <AnimatePresence>
                        {touched.message && errors.message && (
                            <motion.p
                                className="text-red-500 text-sm mt-1 flex items-center gap-1"
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                            >
                                <X size={14} /> {errors.message}
                            </motion.p>
                        )}
                    </AnimatePresence>
                </motion.div>

                <motion.div
                    className="text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                >
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
                </motion.div>

                <AnimatePresence>
                    {result && (
                        <motion.div
                            className={`mt-4 text-center text-sm flex items-center justify-center gap-2 ${
                                result.success ? "text-green-600" : "text-red-600"
                            }`}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            {result.success ? <Check size={16} /> : <X size={16} />}
                            {result.message}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.form>
        </motion.div>
    );
};

const Contact: React.FC = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className="h-64 flex items-center justify-center">Chargement du formulaire...</div>;

    return <ContactForm />;
};

export default Contact;