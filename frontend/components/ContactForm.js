'use client'

import { useTranslations } from 'next-intl'
import React from 'react'

function ContactForm() {

    const t = useTranslations("Contact");

    const handleSubmit = async (event) => {
        event.preventDefault();

        const requestBody = new Object();

        const formData = new FormData(event.target);
        formData.forEach((data,key)=>{
            requestBody[key]=data;
        })

        try{
            const response = await fetch('/api/submit-contact-form',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
            });

            if(response.ok) {
                console.log("Formularul a fost trimis cu succes!");
            } else {
                console.error(`Eroare la trimiterea formularului: ${response.statusText}`);
            }
        } catch (error) {
            console.error(`Eroare la trimiterea formularului: ${error}`)
        }
    }

  return (
    <form onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4'>
            <div className='flex flex-row gap-8 max-md:flex-col max-md:gap-4'>
                <div className='w-1/2 flex flex-col max-md:w-full '>
                    <label className='px-1 text-foregroundPrimary70'>
                        {t("contact-form.first-name-label")}*
                    </label>
                    <input placeholder={t("contact-form.first-name-ph")} name='fname' className='duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 ' required/>
                </div>
                <div className='w-1/2 flex flex-col max-md:w-full'>
                    <label className='px-1 text-foregroundPrimary70'>
                        {t("contact-form.last-name-label")}*
                    </label>
                    <input placeholder={t("contact-form.last-name-ph")} name='lname' className='duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 ' required/>
                </div>
            </div>
            <div className='flex flex-row gap-8 max-md:flex-col max-md:gap-4'>
                <div className='w-1/2 flex flex-col max-md:w-full'>
                    <label className='px-1 text-foregroundPrimary70'>
                        {t("contact-form.email-label")}*
                    </label>
                    <input placeholder={t("contact-form.email-ph")} name='email' className='duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 ' required />
                </div>
                <div className='w-1/2 flex flex-col max-md:w-full'>
                    <label className='px-1 text-foregroundPrimary70'>
                        {t("contact-form.phone-label")}
                    </label>
                    <input placeholder={t("contact-form.phone-ph")} name='phone' className='duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 ' />
                </div>
            </div>
            <div>
                <div className='w-full flex flex-col'>
                    <label className='px-1 text-foregroundPrimary70'>
                        {t("contact-form.type-label")}
                    </label>
                    <select name='type' className='duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 '>
                        <option value="" disabled defaultValue>
                            {t("contact-form.type-options.opt-0")}
                        </option>
                        <option value="client">
                            {t("contact-form.type-options.opt-1")}
                        </option>
                        <option value="medic">
                            {t("contact-form.type-options.opt-2")}
                        </option>
                        <option value="distribuitor">
                            {t("contact-form.type-options.opt-3")}
                        </option>
                    </select>
                </div>
            </div>
            <div className='flex flex-row gap-2 '>
                <div className='w-full flex flex-col'>
                    <label className='px-1 text-foregroundPrimary70'>
                        {t("contact-form.message-label")}*
                    </label>
                    <textarea rows={3} placeholder={t("contact-form.message-ph")} name='message' className='resize-none duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 h-max' required />
                </div>
            </div>
            <div className='flex flex-row gap-1'>
                <input type='checkbox' name='gdpr' required /> Sunt de acord cu termenii și condițiile
            </div>
            <button type='submit' className='block bg-gradient-to-r w-[200px] from-gradientGreen via-gradientPurple to-gradientGreen bg-[length:200%] bg-left hover:bg-right duration-500 ease transition-all text-center text-2xl text-backgroundPrimary rounded-2xl py-2 ml-auto mr-0'>
                {t("contact-form.submit-btn")}
            </button>
        </div>
        
    </form>
  )
}

export default ContactForm