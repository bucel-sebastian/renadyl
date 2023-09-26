import { getTranslator } from "next-intl/server";



export async function generateMetadata({params: {locale}}){
    const t = await getTranslator(locale, 'Buy');
    


}



export default function Buy() {

}