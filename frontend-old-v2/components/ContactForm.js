import React, {useState,useEffect} from 'react'
import { useTranslations } from "next-intl";

function ContactForm() {

    const t = useTranslations('Contact');


  return (
    <form className="w-full p-3" >
                  <div className="w-full py-1.5">
                    <label htmlFor="" className="text-xl">{t("contact-form-name")}</label>
                    <input type="text" name="" required className="w-full text-xl duration-300 rounded-lg outline-none border-[1px] border-foregroundSecondary30 py-1.5 px-3 focus:border-accentFourth70" />
                  </div>
                  <div className="w-full py-1.5">
                    <label htmlFor="" className="text-xl">{t("contact-form-email")}</label>
                    <input type="text" name="" required className="w-full text-xl duration-300 rounded-lg outline-none border-[1px] border-foregroundSecondary30 py-1.5 px-3 focus:border-accentFourth70" />
                  </div>
                  <div className="w-full py-1.5">
                    <label htmlFor="" className="text-xl">{t("contact-form-phone")}</label>
                    <input type="text" name="" required className="w-full text-xl duration-300 rounded-lg outline-none border-[1px] border-foregroundSecondary30 py-1.5 px-3 focus:border-accentFourth70" />
                  </div>
                  <div className="w-full py-1.5">
                    <label htmlFor="" className="text-xl">{t("contact-form-message")}</label>
                    <textarea name required className="w-full text-xl duration-300 rounded-lg outline-none border-[1px] border-foregroundSecondary30 py-1.5 px-3 focus:border-accentFourth70 resize-none h-36" />
                  </div>
                  <button className="mt-4 shadow-lg text-backgroundPrimary uppercase text-center rounded-full bg-accentPrimary w-[250px] text-2xl font-extrabold py-1.5 px-8 h-max ease-out duration-150 hover:bg-accentSecondary max-md:w-[300px] max-sm:text-2xl">
                    {t("contact-form-submit")}
                  </button>
                </form>  
  )
}

export default ContactForm