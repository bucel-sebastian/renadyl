'use client'

import { useTranslations } from "next-intl";
import Link from "next/link";
import React, { useState } from "react"

import {FaEye, FaEyeSlash} from "react-icons/fa"
import { useRouter, usePathname } from "next-intl/client";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function ForgotPassForm({ locale }) {
    const router = useRouter();
    const t = useTranslations("Forgot-pass");

    const [emailInput,setEmailInput]= useState("")



    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch("/api/client/forget-password",{
            method:"POST",
            body: JSON.stringify({
                email:emailInput
            })
        });

        if(response.ok){
            const body = await response.json();

            if(body.response === true){
                router.push(`/lost-password/reset`);
                router.refresh();
            } else {
                toast.error(t("no-account"), {
                    position: "bottom-right",
                    autoClose: 2500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                  });

            }
        }
    }

    return (<>
    <form onSubmit={handleSubmit} className="min-w-[400px] mt-6">
        <div className="w-full flex flex-col mb-2">
                    <label className='px-1 text-foregroundPrimary70'>
                        {t("forget-pass-form.email-label")}

                    </label>
                    <input placeholder={t("forget-pass-form.email-ph")} type="email" name='lname' className='bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 ' value={emailInput} onChange={(e)=>{setEmailInput(e.target.value)}} required/>
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
    <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>)
}

export default ForgotPassForm