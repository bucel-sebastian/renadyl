'use client'

import { useTranslations } from "next-intl";
import Link from "next/link";
import React, { useState } from "react"

import {FaEye, FaEyeSlash} from "react-icons/fa"


function LoginForm() {

    const t = useTranslations("Login");

    const [passwordVisible, setPasswordVisible] = useState(false);


    const handlePasswordVisibleClick = (event) => {
        event.preventDefault();
        setPasswordVisible(!passwordVisible);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="min-w-[400px] mt-6">
                <div className="w-full flex flex-col mb-2">
                    <label className='px-1 text-foregroundPrimary70'>
                        {t("login-form.email-label")}

                    </label>
                    <input placeholder={t("login-form.email-ph")} type="email" name='lname' className='bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 ' required/>
                </div>
                <div className="w-full flex flex-col mb-2">
                    <label className='px-1 text-foregroundPrimary70'>
                        {t("login-form.password-label")}

                    </label>
                    <div className="relative flex flex-row items-center content-center">
                        <input placeholder={t("login-form.password-ph")} type={passwordVisible ? 'text' : 'password'} name='lname' className='w-full bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 ' required/>
                        <button onClick={handlePasswordVisibleClick} type="button" className="absolute right-0">
                            {passwordVisible ? (<FaEyeSlash />) : (<FaEye />)}
                        </button>
                    </div>
                    <Link href='/lost-password'>
                        {t("login-form.password-forgot-link")}
                    </Link>
                    
                </div>
                <div className="flex flex-row items-center content-center gap-3  mb-2">
                    <input type="checkbox" name="remember-me" id="login-remember-me" />
                    <label htmlFor="login-remember-me">
                        {t("login-form.remember-label")}
                    </label>
                </div>
                <button type="submit" className="block bg-gradient-to-r w-full from-gradientGreen via-gradientPurple to-gradientGreen bg-[length:200%] bg-left hover:bg-right duration-500 ease transition-all text-center text-2xl text-backgroundPrimary rounded-2xl py-2 mx-auto">
                    {t("login-form.submit-btn")}
                </button>
                {/* <div className="flex flex-col items-center content-center gap-1 mt-2 mb-4">
                    <Link href="/register" >
                        {t("login-form.register-link")}
                    </Link>
                    
                </div> */}
                
            </form>
            <div className="mt-4">
                <p className="text-center">
                    {t("login-form.other-options")}
                </p>
                <div className="flex flex-row gap-5 justify-center mt-2">
                    <button className="w-[40px] h-[40px] bg-foregroundSecondary10 rounded-md">
                        
                    </button>
                    
                    <button className="w-[40px] h-[40px] bg-foregroundSecondary10 rounded-md">

                    </button>
                    
                    <button className="w-[40px] h-[40px] bg-foregroundSecondary10 rounded-md">

                    </button>
                    
                </div>
            </div>
        </>
        )
}

export default LoginForm