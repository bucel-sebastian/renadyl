'use client'

import HomeSlider from "@/components/HomeSlider"
import { useTranslations } from "next-intl"
import Image from "next/image"
import Link from "next/link"

export default function Index() {

    const t = useTranslations("Index");

    return (
        <main className="bg-foregroundPrimary w-full h-screen relative">
            <HomeSlider />
            <br/>
            <br/>
            <br/>
            <br/>
            <div className="flex flex-row gap-[50px] absolute bottom-10 w-content w-full justify-center max-sm:flex-col max-sm:gap-2 max-sm:items-center">
                <Link href="#" className="block bg-gradient-to-r w-[300px] from-gradientGreen via-gradientPurple to-gradientGreen bg-[length:200%] bg-left hover:bg-right duration-500 ease transition-all text-center text-3xl text-backgroundPrimary rounded-2xl py-3">
                    {t("buy-btn")}
                </Link>
                <Link href="/product" className="block bg-gradient-to-r w-[300px] from-gradientGreen via-gradientPurple to-gradientGreen bg-[length:200%] bg-left hover:bg-right duration-500 ease transition-all text-center text-3xl text-backgroundPrimary rounded-2xl py-3">
                    {t("about-btn")}
                </Link>
                
            </div>

        </main>
    )
}