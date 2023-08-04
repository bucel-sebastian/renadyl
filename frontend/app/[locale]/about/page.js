import {useTranslations} from 'next-intl';
import {getTranslator} from 'next-intl/server';

export async function generateMetadata({params: {locale}}) {
    const translation = await getTranslator(locale,'About');
  
    return {
      title: `Renadyl - ${translation('page-title')}` 
    }
  }

export default function About() {
    

      const translation = useTranslations('About');

    return(
        <main>
            <div>

            </div>

        </main>
    )

}