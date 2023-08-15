'use client';

import Image from "next/image";
import Link from "next/link";

import { useTranslations } from "next-intl";

import renadylKidney from "@/public/images/renadyl_kidneys.svg"



export default function Contact() {
    const t = useTranslations('About');

    return(

        <main className="pt-[100px] bg-backgroundPrimary font-extrabold">
<section className='block max-w-[1200px] mx-auto pt-4 pb-24 px-5'>
            <div className='flex flex-row items-center'>
              <div className='w-2/5'>
                  <Image
                    src="/images/renadyl_bottles_2_circle.png"
                    alt="Renadyl Bottles"
                    width={1000}
                    height={1000}
                    className='w-full px-10'
                  />
              </div>
              <div className='w-3/5'>
                <h1 className='text-4xl heading-decorations'>{t("hero-heading")}</h1>

                <p className='text-xl mb-8'>
                {t("hero-description")}
                </p>
                <Link href="#" className='block shadow-lg text-backgroundPrimary uppercase text-center rounded-full bg-accentPrimary w-[300px] text-2xl font-extrabold py-1.5 h-max ease-out duration-150 hover:bg-accentSecondary max-md:w-[250px]'>{t("comandaBtn")}</Link>
              </div>
            </div>
          </section>
          <section className='block max-w-[1200px] mx-auto px-5'>
            <div className=''>
              <h2 className='text-center text-4xl pb-2 mb-5'>{t("section-1-heading")}</h2>
              <p className='text-justify text-xl'>
              {t("section-1-description")}
              </p>
            </div>
            <div className='flex flex-row gap-3 justify-around text-backgroundPrimary my-10'>
              <div className='w-1/3 bg-accentThird  rounded-2xl px-4 pt-8 pb-10'>
                    <span  className='relative block mx-auto text-center text-6xl'>
                      2
                    </span>
                  <h3 className='uppercase text-center text-3xl mb-4'>{t("section-1-box-1-heading")}</h3>
                  <p className='text-center text-xl'>
                  {t("section-1-box-1-description")}
                  </p>
              </div>
              <div className='w-1/3 bg-accentPrimary  rounded-2xl px-4 pt-8 pb-10'>
              <div>
                    <span className='relative block mx-auto text-center text-6xl'>
                      45
                    </span>
                  </div>
                  <h3 className='uppercase text-center text-3xl mb-4'>{t("section-1-box-2-heading")}</h3>
                  <p className='text-center text-xl'>
                  {t("section-1-box-2-description")}
                  </p>
              </div >
              <div className='w-1/3 bg-accentThird  rounded-2xl px-4 pt-8 pb-10'>
              <div>
                    <span className='relative block mx-auto text-center text-6xl'>
                      3
                    </span>
                  </div>
                  <h3 className='uppercase text-center text-3xl mb-4'>{t("section-1-box-3-heading")}</h3>
                  <p className='text-center text-xl'>
                  {t("section-1-box-3-description")}
                  </p>
              </div>
            </div>

          </section>

          <section className='block max-w-[1200px] mx-auto px-5'>
            <div>
            <h2 className='heading-decorations text-left text-4xl '>{t("section-2-heading")}</h2>
            <p className='text-justify text-xl'>
              {t("section-2-description-1")}
              <br />
              <br />
              {t("section-2-description-2")}          
            </p>
            <br/>
            </div>
            <div className='flex flex-row items-'>
              <div className='w-1/2'>
                <p className='text-justify text-xl'>
                {t("section-2-description-3")}
              <br />
              <br />
              {t("section-2-description-4")}  
                </p>
              </div>
              <div className='w-1/2'>
                <Image
                  src={renadylKidney}
                  alt="Renadyl Kidney"
                  className='px-5 mx-auto'
                />
              </div>
            </div>

            <div className='max-w-[1000px] mx-auto flex flex-col gap-6'>
              
              <div className='flex flex-row items-center gap-5'>
                <div className='rounded-full border-4 border-accentPrimary flex justify-center items-center w-[50px] h-[50px] text-3xl'>
                  1
                </div>
                <p className='w-auto text-justify text-xl'>
                {t("section-2-step-1")} 
                </p>
              </div>
              <div className='flex flex-row items-center '>
                <div className='rounded-full border-4 border-accentPrimary flex justify-center items-center w-[50px] h-[50px] mr-5 text-3xl'>
                  2
                </div>
                <p className='w-auto text-justify text-xl' >
                {t("section-2-step-2")} 
                </p>
              </div>
              <div className='flex flex-row items-center '>
                <div className='rounded-full border-4 border-accentPrimary flex justify-center items-center w-[50px] h-[50px] mr-5 text-3xl'>
                  3
                </div>
                <p className='w-auto text-justify text-xl'>
                {t("section-2-step-3")} 
                </p>
              </div>
              <div className='flex flex-row items-center '>
                <div className='rounded-full border-4 border-accentPrimary flex justify-center items-center w-[50px] h-[50px] mr-5 text-3xl'>
                  4
                </div>
                <p className='w-auto text-justify text-xl'>
                {t("section-2-step-4")} 
                </p>
              </div>
            </div>

          </section>

          <section>

            <div>

              
            </div>

          </section>
        </main>



    );
}