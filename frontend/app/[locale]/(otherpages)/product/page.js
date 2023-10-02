import { useTranslations } from "next-intl"
import Image from "next/image";
import Link from "next/link";
import { getTranslator } from "next-intl/server"


import {FaArrowDown, FaArrowRight} from "react-icons/fa6";
import {FaShippingFast, FaUndoAlt} from "react-icons/fa";

import renadylBody from '@/public/images/renadyl_body.svg';
import renadylKidneys from '@/public/images/renadyl_kidneys.svg';
import renadylPill from '@/public/images/renadyl_pill.svg';
import renadylStomach from '@/public/images/renadyl_stomach.svg';
import ProductImageSlider from "@/components/ProductImageSlider";


export async function generateMetadata({params: {locale}}) {
    const t = await getTranslator(locale, 'Product');
   
    return {
      title: `Renadyl™ -  ${t('page-title')}`
    };
  }


export default function Product() {
    
    const t = useTranslations("Product");


    return(
        <main className=" block  pt-[90px] text-lg">
                    
            <section className="flex flex-row max-w-[1200px] w-full mx-auto rounded-xl shadow-xl p-8 mb-12 border-foregroundPrimary10 border-[1px] max-md:flex-col max-md:px-2">
                <div className="w-2/5 max-md:w-[80%] max-md:mx-auto max-sm:w-full">
                    <ProductImageSlider />
                </div>
                <div className="w-3/5 flex flex-col justify-between max-md:w-full">
                    <div>
                        <h1 className="text-4xl mb-4">{t("hero-section.product-name")}</h1>
                        <div  className="block max-md:flex max-md:flex-col-reverse ">
                            <p className="text-justify mb-6">{t("hero-section.product-desc")}</p>
                            <div className="max-md:mb-4">
                                <div className="text-3xl mb-4">
                                    <span>{t("hero-section.product-price")}:</span>&nbsp;
                                    <span className="font-extrabold">460 RON</span> /&nbsp; 
                                    <span>{t("hero-section.product-unit")}</span>
                                </div>
                                <div className="flex flex-row gap-5 max-md:justify-center max-md:gap-2">
                                    <Link href="https://www.emag.ro/renadyl-pentru-insuficienta-renala-60-comprimate-rnd/pd/D1D5C3YBM/?cmpid=101143&gclid=CjwKCAjwsKqoBhBPEiwALrrqiI6-RpbKtsr_0UzHmEIo-6DLzegwvfrY7Lsg0TlhXC7_rcIdUbQIihoCoPgQAvD_BwE" className="block bg-gradient-to-r w-[250px] from-gradientGreen via-gradientPurple to-gradientGreen bg-[length:200%] bg-left hover:bg-right duration-500 ease transition-all text-center text-2xl text-backgroundPrimary rounded-2xl py-2.5">
                                        {t("hero-section.product-buy-btn")}
                                    </Link>
                                    {/* <button className="block bg-gradient-to-r w-[250px] from-gradientGreen via-gradientPurple to-gradientGreen bg-[length:200%] bg-left hover:bg-right duration-500 ease transition-all text-center text-2xl text-gradientGreen hover:text-gradientPurple rounded-2xl p-[3px]">
                                        <div className="bg-backgroundPrimary rounded-xl py-2.5 ">
                                            {t("hero-section.product-subscription-btn")}
                                        </div>
                                    </button> */}
                                </div>
                            </div>                           
                        </div>
                        
                    </div>
                    <div className="flex flex-col gap-2  max-md:items-center max-md:mt-2">
                        {/* <div className="flex flex-row gap-2 items-center content-center">
                            <FaShippingFast />
                            <p>
                                {t("hero-section.product-shippment")}
                                &nbsp;
                                <span className="text-gradientGreen">
                                    {t("hero-section.product-shippment-green")}
                                </span>
                            </p>
                        </div> */}
                        
                    </div>
                </div>
                
            </section>
            <section className="max-w-[1200px] mx-auto px-4">
                <h2 className="font-bold text-gradientGreen uppercase text-3xl text-center whitespace-normal">{t("about-section.title")}</h2>

                <video className="aspect-">
                    <source src="#"></source>
                </video>

                <p className="text-justify">
                    {t("about-section.desc")}
                </p>
                <div className="flex flex-row justify-between items-stretch content-stretch gap-3 max-md:flex-col max-md:items-center">
                    <div className='relative w-1/3 rounded-lg bg-gradient-to-r from-gradientGreen to-gradientPurple p-[3px] my-2  max-md:max-w-[450px] max-md:w-[90%]'>
                        <div className="bg-backgroundPrimary rounded-md px-4 py-6 h-full">
                            <h2 className="text-center text-5xl font-bold text-gradientGreen">{t("about-section.about-tabs.tab-1.number")}</h2>
                            <h3 className="text-center text-2xl font-bold">{t("about-section.about-tabs.tab-1.title")}</h3>
                            <p className="text-justify ">{t("about-section.about-tabs.tab-1.text")}</p>                    
                        </div>
                    </div>
                    <div className='relative w-1/3 rounded-lg bg-gradientPurple from-gradientGreen to-gradientPurple p-[3px] max-md:max-w-[500px] max-md:w-[100%]'>
                        <div className="bg-backgroundPrimary rounded-md px-4 py-6 h-full">
                            <h2 className="text-center text-5xl font-bold text-gradientGreen">{t("about-section.about-tabs.tab-2.number")}</h2>
                            <h3 className="text-center text-2xl font-bold">{t("about-section.about-tabs.tab-2.title")}</h3>
                            <p className="text-justify ">{t("about-section.about-tabs.tab-2.text")}</p>                    
                        </div>
                    </div>
                    <div className='relative w-1/3 rounded-lg bg-gradient-to-r from-gradientPurple to-gradientGreen p-[3px] my-2 max-md:max-w-[450px] max-md:w-[90%]'>
                        <div className="bg-backgroundPrimary rounded-md px-4 py-6 h-full">
                            <h2 className="text-center text-5xl font-bold text-gradientGreen">{t("about-section.about-tabs.tab-3.number")}</h2>
                            <h3 className="text-center text-2xl font-bold">{t("about-section.about-tabs.tab-3.title")}</h3>
                            <p className="text-justify ">{t("about-section.about-tabs.tab-3.text")}</p>                    
                        </div>
                    </div>
                </div>
            </section>
            <section className="max-w-[1200px] mx-auto pt-16 pb-4  px-4">
                <h2 className="break-normal relative w-full font-bold text-gradientGreen uppercase text-3xl pb-3 mb-5 after:content-[''] after:absolute after:w-[55%] after:bottom-0 after:left-0 after:h-[3px] after:bg-gradient-to-r after:from-gradientGreen after:to-gradientPurple">
                    {t("more-section.title")}
                </h2>
                <p className="text-justify">
                    {t("more-section.desc.p-1")}
                    <br/><br/>
                    {t("more-section.desc.p-2")}
                    <br/><br/>
                    

                </p>
                <div className="flex flex-row max-md:flex-col-reverse ">
                    <p className="text-justify w-1/2 gap-3 max-md:w-full">
                        {t("more-section.desc.p-3")}
                        <br/><br/>
                        {t("more-section.desc.p-4")}
                    </p>
                    <div className="w-1/2 max-md:w-full">
                        <Image
                            src="/images/capsule-high.png"
                            width={250}
                            height={300}
                            className="mx-auto block"
                            alt="capsule"
                        />
                    </div>
                </div>
                <div className="w-[85%] mx-auto block mt-16 mb-4 max-md:w-full max-md:gap-8">
                    <div className="flex flex-row items-center content-center gap-3 my-6">
                        <div className="relative flex justify-center content-center items-center text-3xl font-bold w-[50px] h-[50px] aspect-square rounded-full bg-gradient-to-r from-gradientGreen to-gradientPurple p-1">
                            <span className="text-gradientGreen w-full text-center h-full bg-backgroundPrimary rounded-full flex justify-center content-center items-center">1</span>
                        </div>
                        <p className="text-justify font-bold">
                            {t("more-section.list.p-1")}
                        </p>
                    </div>
                    <div className="flex flex-row items-center content-center gap-3 my-6">
                        <div className="relative flex justify-center content-center items-center text-3xl font-bold w-[50px] h-[50px] aspect-square rounded-full bg-gradient-to-r from-gradientGreen to-gradientPurple p-1">
                            <span className="text-gradientGreen w-full text-center h-full bg-backgroundPrimary rounded-full flex justify-center content-center items-center">2</span>
                        </div>
                        <p className="text-justify font-bold">
                            {t("more-section.list.p-2")}
                        </p>
                    </div>
                    <div className="flex flex-row items-center content-center gap-3 my-6">
                        <div className="relative flex justify-center content-center items-center text-3xl font-bold w-[50px] h-[50px] aspect-square rounded-full bg-gradient-to-r from-gradientGreen to-gradientPurple p-1">
                            <span className="text-gradientGreen w-full text-center h-full bg-backgroundPrimary rounded-full flex justify-center content-center items-center">3</span>
                        </div>
                        <p className="text-justify font-bold">
                            {t("more-section.list.p-3")}
                        </p>
                    </div>
                    <div className="flex flex-row items-center content-center gap-3 my-6">
                        <div className="relative flex justify-center content-center items-center text-3xl font-bold w-[50px] h-[50px] aspect-square rounded-full bg-gradient-to-r from-gradientGreen to-gradientPurple p-1">
                            <span className="text-gradientGreen w-full text-center h-full bg-backgroundPrimary rounded-full flex justify-center content-center items-center">4</span>
                        </div>
                        <p className="text-justify font-bold">
                            {t("more-section.list.p-4")}
                        </p>
                    </div>
                </div>
            </section>
            <section className="max-w-[1200px] mx-auto bg-[#F9F9F9] pt-12 pb-20 px-8">
                <h2 className="text-3xl text-bold text-center">{t("steps-section.title")}</h2>
                <p className="text-center">{t("steps-section.desc")}</p>
                {/* <Image src="" /> */}
                <div className="flex flex-row items-stretch items-center pt-8 max-md:flex-col">
                    <div className="w-1/3 flex flex-col items-center gap-8 max-md:w-full max-md:items-stretch">
                        <h3 className="text-center">
                            {t("steps-section.steps.step-1.heading")}
                        </h3>
                        <div>
                            <Image 
                                src={renadylPill}
                                className="w-[50%] block mx-auto mb-8"
                                alt='Pill'
                            />
                            <h3 className="text-[#555677] text-xl font-bold">{t("steps-section.steps.step-1.title-1")}</h3>
                            <p className="text-justify">{t("steps-section.steps.step-1.text-1")}</p>
                        </div>
                        <div className="mx-auto">
                            <FaArrowDown 
                                className="text-5xl text-[#555677]"
                            />
                        </div>
                        <div>
                            <Image 
                                src={renadylStomach}
                                className="w-[50%] block mx-auto mb-8"
                                alt="Stomach"
                            />
                            <h3 className="text-[#555677] text-xl font-bold">{t("steps-section.steps.step-1.title-1")}</h3>
                            <p className="text-justify">{t("steps-section.steps.step-1.text-2")}</p>
                        </div>
                    </div>
                    <div className="w-1/3 flex flex-col max-md:w-full max-md:items-center">
                        <FaArrowDown 
                                className="text-5xl text-[#555677] md:hidden"
                            />
                        <h3 className="h-max text-center">
                            {t("steps-section.steps.step-2.heading")}    
                        </h3>
                        <div className="flex flex-row items-center h-full max-md:flex-col">
                            <div>
                                <FaArrowRight
                                    className="text-5xl text-[#555677] max-md:hidden"
                                />
                            </div>
                            <div className="flex flex-col px-4">
                                <Image 
                                    src={renadylBody}
                                    className="w-[75%] block mx-auto h-1/2 max-md:w-[50%]"
                                    alt="Body"
                                />
                                <div className="block h-1/2 mt-8">
                                    <h3 className="text-[#555677] text-xl font-bold">{t("steps-section.steps.step-2.title")}</h3>
                                    <p className="text-justify">{t("steps-section.steps.step-2.text")}</p>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/3 flex flex-col max-md:w-full max-md:items-center">
                        <FaArrowDown 
                                className="text-5xl text-[#555677] md:hidden"
                            />
                        <h3 className="h-max text-center"> 
                            {t("steps-section.steps.step-3.heading")}
                        </h3>
                        <div className="flex flex-row items-center h-full">
                            <div className="">
                                <FaArrowRight
                                    className="text-5xl text-[#555677] max-md:hidden"
                                />
                            </div>
                            <div className="flex flex-col px-4">
                                <Image 
                                    src={renadylKidneys}
                                    className="w-[60%] h-1/2 block mx-auto mt-24 max-md:w-[50%] max-md:mt-2"
                                    alt="Kidneys"
                                />
                                <div className="block h-1/2 mt-8">
                                    <h3 className="text-[#555677] text-xl font-bold">{t("steps-section.steps.step-3.title")}</h3>
                                    <p className="text-justify">{t("steps-section.steps.step-3.text")}</p>
                                </div>
                                
                            </div>
                        </div>
                        
                        
                    </div>
                </div>
            </section>
            <section className="w-full bg-gradient-to-r from-gradientGreen to-gradientPurple px-8">
                <div className="mx-auto max-w-[1200px] text-backgroundPrimary py-10">
                    <div>
                        <div className="flex flex-row items-center content-center gap-5 max-md:flex-col">
                            <div className="w-1/5 aspect-square p-5 max-md:w-[50%]">
                                <Image src="/images/Dr.Richard-Snyder-HCP-Testimonial.png"
                                width={150}
                                height={150}
                                className="w-full h-full bg-foregroundPrimary rounded-full"
                                alt="Dr. Richard Snyder"
                                />
                            </div>
                            <div className="w-3/5 max-md:w-full">
                                <p className="text-justify">
                                „
                                {t("review")}
                                ”
                                </p>
                            </div>
                            <div className="w-1/5 text-center max-md:w-full">
                                <span>
                                (D.O., Nephrology)
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}