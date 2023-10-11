import { getTranslator } from "next-intl/server";
import Image from "next/image";

import img1 from '@/public/images/product_image_1.png'
import BuyContainer from "@/components/buy/BuyContainer";


export async function generateMetadata({params: {locale}}){
    const t = await getTranslator(locale, 'Buy');
    


}



export default function Buy() {

    return (
        <main className="block pt-[90px] text-lg">
           <BuyContainer />
        </main>
    )

}