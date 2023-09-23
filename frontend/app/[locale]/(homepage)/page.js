import HomeSlider from "@/components/HomeSlider"
import { useTranslations } from "next-intl"
import Image from "next/image"
import Link from "next/link"

import { Suspense } from "react"
import Loading from "./loading"
import { getTranslator } from "next-intl/server"


export async function generateMetadata({params: {locale}}) {
    const t = await getTranslator(locale, 'Index');
   
    return {
      title: `Renadyl™ -  ${t('page-title')}`
    };
  }

export default function Index() {

    const t = useTranslations("Index");

    return (
        <main className="bg-foregroundPrimary w-full h-screen relative">
            <Suspense fallback={<Loading/>}>
                <HomeSlider />
            </Suspense>
            <br/>
            <br/>
            <br/>
            <br/>
            <div className="flex flex-row gap-[50px] absolute bottom-10 w-content w-full justify-center max-sm:flex-col max-sm:gap-2 max-sm:items-center max-sm:bottom-20">
                <Link href="https://www.emag.ro/renadyl-pentru-insuficienta-renala-60-comprimate-rnd/pd/D1D5C3YBM/?cmpid=101143&gclid=CjwKCAjwsKqoBhBPEiwALrrqiI6-RpbKtsr_0UzHmEIo-6DLzegwvfrY7Lsg0TlhXC7_rcIdUbQIihoCoPgQAvD_BwE" className="block bg-gradient-to-r w-[300px] from-gradientGreen via-gradientPurple to-gradientGreen bg-[length:200%] bg-left hover:bg-right duration-500 ease transition-all text-center text-3xl text-backgroundPrimary rounded-2xl py-3">
                    {t("buy-btn")}
                </Link>
                <Link href="/product" className="block bg-gradient-to-r w-[300px] from-gradientGreen via-gradientPurple to-gradientGreen bg-[length:200%] bg-left hover:bg-right duration-500 ease transition-all text-center text-3xl text-backgroundPrimary rounded-2xl py-3">
                    {t("about-btn")}
                </Link>
                
            </div>

        </main>
    )
}