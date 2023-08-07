import {useTranslations} from 'next-intl';
import {getTranslator} from 'next-intl/server';
import Link from 'next/link'

export async function generateMetadata({params: {locale}}) {
    const translation = await getTranslator(locale,'About');
  
    return {
      title: `Renadyl - ${translation('page-title')}` 
    }
  }

export default function About() {
    

      const translation = useTranslations('About');

    return(
        <main className='pt-[100px] bg-backgroundPrimary font-extrabold'>
          <section className='block max-w-[1200px] mx-auto py-24 px-5'>
            <div className='flex flex-row'>
              <div className='w-2/5'>
                
              </div>
              <div className='w-3/5'>
                <h1 className='text-4xl heading-decorations'>{translation("hero-heading")}</h1>

                <p className='text-xl'>
                {translation("hero-description")}
                </p>
                <Link href="#" className='shadow-lg text-backgroundPrimary uppercase text-center rounded-full bg-accentPrimary w-[300px] text-2xl font-extrabold py-1.5 h-max ease-out duration-150 hover:bg-accentSecondary max-md:w-[250px]'>{translation("comandaBtn")}</Link>
              </div>
            </div>
          </section>
          <section className='block max-w-[1200px] mx-auto px-5'>
            <div className=''>
              <h2 className='text-center text-4xl'>{translation("section-1-heading")}</h2>
              <p className='text-justify'>
              {translation("section-1-description")}
              </p>
            </div>
            <div>
              <div>

              </div>
              <div>

              </div>
              <div>
                
              </div>
            </div>

          </section>
            
        </main>
    )

}