
import { useTranslations } from "next-intl"
import Image from "next/image";
import Link from "next/link";
import { getTranslator } from "next-intl/server"


export async function generateMetadata({params: {locale}}) {
    const t = await getTranslator(locale, 'Under-construction');
   
    return {
      title: `Renadyl™ -  ${t('page-title')}`
    };
  }


export default function UnderConstruction() {
    const t = useTranslations("Under-construction")



    return(
        <main className=" block  text-lg">

            <section className="mx-auto w-full h-screen flex items-center content-center justify-center bg-[url('/images/pills_bg.png')] bg-[length:500px] bg-center">
                <div className="p-20 bg-backgroundPrimary rounded-xl shadow-xl border-foregroundPrimary10 border-[1px] max-md:px-8 max-sm:px-2 max-sm:py-10 max-sm:full">
                    <h1 className="text-5xl text-center">
                        {t("heading")}
                    </h1>
                    <p className="text-xl text-center">
                        {t("desc")}
                    </p>
                    <Link href="/" className="block bg-gradient-to-r w-[300px] from-gradientGreen via-gradientPurple to-gradientGreen bg-[length:200%] bg-left hover:bg-right duration-500 ease transition-all text-center text-3xl text-backgroundPrimary rounded-2xl py-3 mx-auto mt-8 max-sm:w-full">
                        {t("back-home-btn")}
                    </Link>
                </div>                
            </section>

        </main>
    )
}