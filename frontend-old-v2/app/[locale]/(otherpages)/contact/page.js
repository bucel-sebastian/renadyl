'use client';

import Image from "next/image";
import Link from "next/link";

import { useTranslations } from "next-intl";
import ContactForm from "@/components/ContactForm";


export default function Contact() {
    const t = useTranslations('Contact');

    return(

        <main className="pt-[100px] bg-backgroundPrimary font-extrabold">
          <section className='block max-w-[1200px] mx-auto pt-4 pb-24 px-5'>
            <div className="flex flex-row">
              <div  className="w-1/2">
                <h1 className='text-4xl heading-decorations'>{t("hero-heading")}</h1>
              </div>
              <div className="w-1/2">
                <h2 className="text-4xl">
                  {t("contact-form-heading")}
                </h2>
                <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in dui magna. Donec scelerisque dignissim libero, nec lobortis odio blandit sit amet. Ut congue,
                </p>
                <ContactForm />
              </div>
            </div>
          </section>
          
        </main>



    );
}