'use client'

import { useTranslations } from "next-intl";
import Link from "next/link";
import React, { useState } from "react"

import {FaEye, FaEyeSlash} from "react-icons/fa"


function ForgotPassForm() {
    const t = useTranslations("Forgot-pass");

    const [passwordVisible, setPasswordVisible] = useState(false);

    const handlePasswordVisibleClick = (event) => {
        event.preventDefault();
        setPasswordVisible(!passwordVisible);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
    }

    return (<>
    <form onSubmit={handleSubmit} className="min-w-[400px] mt-6">
        <div className="w-full flex flex-col mb-2">
                    <label className='px-1 text-foregroundPrimary70'>
                        {t("forget-pass-form.email-label")}

                    </label>
                    <input placeholder={t("forget-pass-form.email-ph")} type="email" name='lname' className='bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 ' required/>
                </div>
                <button type="submit" className="block bg-gradient-to-r w-full from-gradientGreen via-gradientPurple to-gradientGreen bg-[length:200%] bg-left hover:bg-right duration-500 ease transition-all text-center text-2xl text-backgroundPrimary rounded-2xl py-2 mx-auto">
                    {t("forget-pass-form.submit-btn")}
                </button>
                <div className="flex flex-col items-center content-center gap-1 mt-2 mb-4">
                    <Link href="/register" >
                        {t("forget-pass-form.register-link")}
                    </Link>
                    
                </div>
    </form>
    </>)
}

export default ForgotPassForm