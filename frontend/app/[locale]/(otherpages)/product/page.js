'use client'

import { useTranslations } from "next-intl"




export default function Product() {
    const t = useTranslations("Product");

    return(
        <main className="pt-[90px]">
            <section className="flex flex-row">
                <div className="w-2/5">

                </div>
                <div className="w-3/5">
                    <h1>{t("hero-section.product-name")}</h1>
                    <p>{t("hero-section.product-desc")}</p>
                    <div>
                        <span>{t("hero-section.product-price")}</span>
                        <span>450 RON</span> / 
                        <span>{t("hero-section.product-unit")}</span>
                    </div>
                    <div>
                        <button>{t("hero-section.product-buy-btn")}</button>
                        <button>{t("hero-section.product-subscription-btn")}</button>
                    </div>
                </div>
                
            </section>
            <section>
                <h2>{t("about-section.title")}</h2>
                <p>
                    {t("about-section.desc")}
                </p>
                <div>
                    
                </div>
            </section>
        </main>
    )
}