"use client";
import React, {FormEvent, useState} from "react";
import {useTranslation} from "react-i18next";
import {FaArrowRight, FaSpinner, FaCheck, FaTimes} from "react-icons/fa";
import {motion, AnimatePresence} from "framer-motion";

const Contact: React.FC = () => {
    const {t} = useTranslation();
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
        const {name, value} = event.target;
        setFormData(prev => ({...prev, [name]: value}));

        if (touched[name]) {
            let error = "";
            if (!value.trim()) {
                error = t(`errors.${name}`);
            } else {
                if (name === "name" && !validateName(value)) error = t("errors.invalid_name");
                if (name === "email" && !validateEmail(value)) error = t("errors.invalid_email");
                if (name === "message" && !validateMessage(value)) error = t("errors.invalid_message");
            }
            setErrors(prev => ({...prev, [name]: error}));
        }
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name} = event.target;
        if (!touched[name]) {
            setTouched(prev => ({...prev, [name]: true}));
            handleChange(event);
        }
    };

    const buttonHover = {scale: 1.05};

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setResult(null);

        const newErrors: { [key: string]: string } = {};
        if (!formData.name || !validateName(formData.name)) newErrors.name = t("errors.invalid_name");
        if (!formData.email || !validateEmail(formData.email)) newErrors.email = t("errors.invalid_email");
        if (!formData.message || !validateMessage(formData.message)) newErrors.message = t("errors.invalid_message");

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setLoading(false);
            setTouched({name: true, email: true, message: true});
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
                setResult({message: t("form_submission_success"), success: true});
                setFormData({name: "", email: "", message: ""});
                setErrors({});
                setTouched({});
            } else {
                setResult({message: data.message ?? t("form_submission_error"), success: false});
            }
        } catch {
            setResult({message: t("form_submission_error"), success: false});
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            id="contact"
            className="relative w-full py-8 px-4 flex justify-center items-center"
            initial={{opacity: 0, y: 50}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, margin: "-100px"}}
            transition={{duration: 0.5}}
        >
            <motion.div
                className="w-full max-w-2xl md:p-1"
                initial={{scale: 0.98, opacity: 0}}
                whileInView={{scale: 1, opacity: 1}}
                viewport={{once: true}}
                transition={{delay: 0.1}}
            >
                <h4 className="text-center mb-2 text-lg font-outfit text-[#E14F41]">{t("connect_with_me")}</h4>
                <h2 className="text-center text-4xl font-bold font-outfit mb-2 bg-gradient-to-r from-[#E14F41] to-purple-600 bg-clip-text text-transparent">{t("get_in_touch")}</h2>
                <p className="text-center max-w-2xl mx-auto mt-2 mb-10 font-outfit text-gray-600">{t("contact_description")}</p>

                <motion.form
                    onSubmit={onSubmit}
                    className="space-y-7 md:p-2"
                    initial={{opacity: 0, scale: 0.98}}
                    whileInView={{opacity: 1, scale: 1}}
                    viewport={{once: true}}
                    transition={{delay: 0.2}}
                    autoComplete="off"
                >
                    {/* Champ nom */}
                    <div className="relative">
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            className={`peer w-full px-4 pt-5 pb-2 border rounded-lg bg-white outline-none transition-all duration-200 focus:border-[#E14F41] focus:ring-2 focus:ring-[#E14F41]/20 ${errors.name ? "border-red-400" : "border-gray-300"}`}
                            placeholder=" "
                            aria-invalid={!!errors.name}
                            aria-describedby="name-error"
                        />
                        <label htmlFor="name"
                               className="absolute left-4 top-2 text-gray-500 text-sm transition-all duration-200 pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm">
                            {t("placeholder_name")}
                        </label>
                        <AnimatePresence>
                            {touched.name && errors.name && (
                                <motion.p
                                    id="name-error"
                                    className="text-red-500 text-xs mt-1 flex items-center gap-1"
                                    initial={{opacity: 0, y: -5}}
                                    animate={{opacity: 1, y: 0}}
                                    exit={{opacity: 0, y: -5}}
                                >
                                    <FaTimes size={12}/> {errors.name}
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </div>
                    {/* Champ email */}
                    <div className="relative">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            className={`peer w-full px-4 pt-5 pb-2 border rounded-lg bg-white outline-none transition-all duration-200 focus:border-[#E14F41] focus:ring-2 focus:ring-[#E14F41]/20 ${errors.email ? "border-red-400" : "border-gray-300"}`}
                            placeholder=" "
                            aria-invalid={!!errors.email}
                            aria-describedby="email-error"
                        />
                        <label htmlFor="email"
                               className="absolute left-4 top-2 text-gray-500 text-sm transition-all duration-200 pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm">
                            {t("placeholder_email")}
                        </label>
                        <AnimatePresence>
                            {touched.email && errors.email && (
                                <motion.p
                                    id="email-error"
                                    className="text-red-500 text-xs mt-1 flex items-center gap-1"
                                    initial={{opacity: 0, y: -5}}
                                    animate={{opacity: 1, y: 0}}
                                    exit={{opacity: 0, y: -5}}
                                >
                                    <FaTimes size={12}/> {errors.email}
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </div>
                    {/* Champ message */}
                    <div className="relative">
                                            <textarea
                                                id="message"
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                required
                                                rows={5}
                                                className={`peer w-full px-4 pt-5 pb-2 border rounded-lg bg-white outline-none transition-all duration-200 focus:border-[#E14F41] focus:ring-2 focus:ring-[#E14F41]/20 resize-none ${errors.message ? "border-red-400" : "border-gray-300"}`}
                                                placeholder=" "
                                                aria-invalid={!!errors.message}
                                                aria-describedby="message-error"
                                            />
                        <label htmlFor="message"
                               className="absolute left-4 top-2 text-gray-500 text-sm transition-all duration-200 pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm">
                            {t("placeholder_message")}
                        </label>
                        <AnimatePresence>
                            {touched.message && errors.message && (
                                <motion.p
                                    id="message-error"
                                    className="text-red-500 text-xs mt-1 flex items-center gap-1"
                                    initial={{opacity: 0, y: -5}}
                                    animate={{opacity: 1, y: 0}}
                                    exit={{opacity: 0, y: -5}}
                                >
                                    <FaTimes size={12}/> {errors.message}
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </div>
                    {/* Bouton */}
                    <div className="text-center mt-6">
                        <motion.button
                            type="submit"
                            className={`py-3 px-8 w-max flex items-center justify-between gap-2 bg-[#E14F41] text-white rounded-full mx-auto transition-all duration-500 group shadow-lg relative overflow-hidden focus:ring-2 focus:ring-[#E14F41]/20 ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
                            whileHover={buttonHover}
                            whileTap={{scale: 0.95}}
                            disabled={loading}
                        >
                                                <span className="relative z-10 flex items-center gap-2 font-medium">
                                                    {loading ?
                                                        <FaSpinner size={18}
                                                                   className="animate-spin"/> : t("submit_now")}
                                                    {!loading && (
                                                        <FaArrowRight
                                                            size={18}
                                                            className="transition-transform duration-300 group-hover:translate-x-2"
                                                        />
                                                    )}
                                                </span>
                            {/* Overlay animé */}
                            <motion.span
                                className="absolute inset-0 bg-gradient-to-r from-[#E14F41] to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            />
                        </motion.button>
                    </div>
                    {/* Message de résultat */}
                    <AnimatePresence>
                        {result && (
                            <motion.div
                                className={`mt-4 text-center text-sm flex items-center justify-center gap-2 ${result.success ? "text-green-600" : "text-red-600"}`}
                                initial={{opacity: 0, y: -10}}
                                animate={{opacity: 1, y: 0}}
                                exit={{opacity: 0, y: -10}}
                                transition={{duration: 0.3}}
                                aria-live="polite"
                            >
                                {result.success ? <FaCheck size={16}/> : <FaTimes size={16}/>}
                                {result.message}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.form>
            </motion.div>
        </motion.div>
    );
};

export default Contact;