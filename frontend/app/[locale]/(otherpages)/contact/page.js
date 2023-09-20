'use client'

import ContactForm from "@/components/ContactForm"
import { useTranslations } from "next-intl"

import { useEffect } from "react"

import Link from 'next/link'

import {FaPhone,FaEnvelope, FaFacebook,FaInstagram,FaPinterest,FaYoutube} from 'react-icons/fa'

export default function Contact() {
    const t = useTranslations("Contact")

    useEffect(()=>{
        document.title = `Renadyl™ - ${t("page-title")}`;
    },[])

    return (
        <main className="block pt-[90px] text-lg">
            <section className="flex flex-col max-w-[1200px] w-full mx-auto pt-4 pb-8 max-md:px-2 max-md:pb-2">
                <h1 className="text-4xl text-center pb-4">
                    {t("title")}
                </h1>
                <p className="text-center">
                    {t("desc")}
                </p>
            </section>
            <section className="flex flex-row max-w-[1200px] w-full mx-auto rounded-xl shadow-xl p-8 mb-12 border-foregroundPrimary10 border-[1px] items-stretch max-md:flex-col max-md:px-2 max-md:border-none max-md:shadow-none">
                <div className="w-2/5 bg-gradient-to-r from-gradientGreen to-gradientPurple rounded-lg py-8 px-8 flex flex-col justify-between text-backgroundPrimary max-md:w-full max-md:gap-8">
                    <div >
                        <h2 className="font-bold text-2xl">
                            {t("contact-info.title")}
                        </h2>
                    </div>
                    <div className="flex flex-col gap-2 ">
                        <div>
                            <p>
                                S.C. Healty Medical S.R.L.
                            </p>
                        </div>
                        <div className="flex flex-row items-center gap-1">
                            <FaPhone /> - <Link className='duration-150 hover:text-backgroundPrimary70' href="tel: 4073356600">+40 733 566 000</Link>
                        </div>
                        <div className="flex flex-row items-center gap-1">
                            <FaEnvelope className='mt-0.5'/> - <Link className='duration-150 hover:text-backgroundPrimary70 break-all' href="mailto: cristian.tanasescu@healthymedical.ro">Cristian.tanasescu@healthymedical.ro</Link>
                        </div>
                        <div>
                            <p>Cal. Dorobanți nr. 111-131<br/>București, România</p>
                        </div>
                    </div>
                    <div className="flex flex-row justify-start items-center gap-4 text-3xl">
                        <Link className='duration-150 hover:text-backgroundPrimary70' href="#">
                            <FaFacebook />
                        </Link>
                        <Link className='duration-150 hover:text-backgroundPrimary70' href="#">
                            <FaInstagram />
                        </Link>
                        <Link className='duration-150 hover:text-backgroundPrimary70' href="#">
                            <FaPinterest />
                        </Link>
                        <Link className='duration-150 hover:text-backgroundPrimary70' href="#">
                            <FaYoutube />
                        </Link>
                    </div>
                </div>
                <div className="w-3/5 py-8 px-8 max-md:w-full max-md:px-0" >
                    <ContactForm />
                </div>
            </section>
        </main>
    )
}