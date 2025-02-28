"use client"
import React, { FormEvent } from 'react';
import { useTranslation } from 'next-i18next';
import {ArrowRight} from "lucide-react";

const Contact: React.FC = () => {
    const { t } = useTranslation();
    const [result, setResult] = React.useState("");
    const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setResult("Sending....");
        const formData = new FormData(event.currentTarget);
        const errors: { [key: string]: string } = {};

        // Validation
        if (!formData.get("name")) {
            errors.name = t("errors.name");
        }
        if (!formData.get("email")) {
            errors.email = t("errors.email");
        }
        if (!formData.get("message")) {
            errors.message = t("errors.message");
        }

        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            setResult(""); // Clear result if validation fails
            return;
        }

        formData.append("access_key", "b38fac5c-2dd4-4c73-989d-f15b62ed1364");

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
            console.log("Error", data);
            setResult(data.message);
        }
    };

    return (
        <div id={"contact"} className={"w-full px-[12%] py-10 scroll-mt-20 bg-no-repeat bg-center bg-[length:90%_auto]"}>
            <h4 className={"text-center mb-2 text-lg font-outfit"}>{t("connect_with_me")}</h4>
            <h2 className={"text-center text-5xl font-outfit"}>{t("get_in_touch")}</h2>
            <p className={"text-center max-w-2xl mx-auto mt-5 mb-12 font-outfit"}>
                {t("contact_description")}
            </p>

            <form onSubmit={onSubmit} className={"max-w-2xl mx-auto"}>
                <div className={"grid grid-cols-auto gap-6 mt-10 mb-8"}>
                    <div>
                        <input
                            type={"text"}
                            placeholder={t("placeholder_name")}
                            className={"w-full p-3 outline-none border-[0.5px] border-gray-400 rounded-md bg-white"}
                            name={"name"}
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>
                    <div>
                        <input
                            type={"email"}
                            placeholder={t("placeholder_email")}
                            className={"w-full p-3 outline-none border-[0.5px] border-gray-400 rounded-md bg-white"}
                            name={"email"}
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>
                </div>

                <div>
                    <textarea
                        placeholder={t("placeholder_message")}
                        className={"w-full p-3 outline-none border-[0.5px] border-gray-400 rounded-md bg-white mb-6"}
                        name={"message"}
                    />
                    {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
                </div>

                <button
                    type="submit"
                    className="py-3 px-8 w-max flex items-center justify-between gap-2 bg-black text-white rounded-full mx-auto hover:bg-gray-800 duration-500 group"
                >
                    {t("submit_now")}
                    <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-2" />
                </button>

                <p className={"mt-4"}>{result}</p>
            </form>
        </div>
    );
};

export default Contact;
