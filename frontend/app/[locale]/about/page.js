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
            <div className='flex flex-row gap-5 justify-around text-backgroundPrimary'>
              <div className='w-1/3 bg-accentThird  rounded-2xl px-7 pt-8 pb-10'>
                    <span  className='relative block mx-auto text-center text-6xl'>
                      2
                    </span>
                  <h3 className='uppercase text-center text-3xl mb-4'>{translation("section-1-box-1-heading")}</h3>
                  <p className='text-center'>
                  {translation("section-1-box-1-description")}
                  </p>
              </div>
              <div className='w-1/3 bg-accentPrimary  rounded-2xl px-7 pt-8 pb-10'>
              <div>
                    <span className='relative block mx-auto text-center text-6xl'>
                      45
                    </span>
                  </div>
                  <h3 className='uppercase text-center text-3xl mb-4'>{translation("section-1-box-2-heading")}</h3>
                  <p className='text-center'>
                  {translation("section-1-box-2-description")}
                  </p>
              </div >
              <div className='w-1/3 bg-accentThird  rounded-2xl px-7 pt-8 pb-10'>
              <div>
                    <span className='relative block mx-auto text-center text-6xl'>
                      3
                    </span>
                  </div>
                  <h3 className='uppercase text-center text-3xl mb-4'>{translation("section-1-box-3-heading")}</h3>
                  <p className='text-center'>
                  {translation("section-1-box-3-description")}
                  </p>
              </div>
            </div>

          </section>

          <section className='block max-w-[1200px] mx-auto px-5'>
            <div>
            <h2 className='heading-decorations text-left text-4xl '>{translation("section-2-heading")}</h2>
            <p className='text-justify'>
              {translation("section-2-description-1")}
              <br />
              <br />
              {translation("section-2-description-2")}          
            </p>
            </div>
            <div className='flex flex-row'>
              <div className='w-1/2'>
                <p>
                {translation("section-2-description-3")}
              <br />
              <br />
              {translation("section-2-description-4")}  
                </p>
              </div>
              <div className='w-1/2'>
                {/* <Image
                  src=""
                /> */}
              </div>
            </div>

            <div className='max-w-[1000px] mx-auto flex flex-col gap-6'>
              
              <div className='flex flex-row items-center gap-5'>
                <div className='rounded-full border-4 border-accentPrimary flex justify-center items-center w-[50px] h-[50px] text-3xl'>
                  1
                </div>
                <p className='w-auto'>
                {translation("section-2-step-1")} 
                </p>
              </div>
              <div className='flex flex-row items-center '>
                <div className='rounded-full border-4 border-accentPrimary flex justify-center items-center w-[50px] h-[50px] mr-5 text-3xl'>
                  2
                </div>
                <p className='w-auto'>
                {translation("section-2-step-2")} 
                </p>
              </div>
              <div className='flex flex-row items-center '>
                <div className='rounded-full border-4 border-accentPrimary flex justify-center items-center w-[50px] h-[50px] mr-5 text-3xl'>
                  3
                </div>
                <p className='w-auto'>
                {translation("section-2-step-3")} 
                </p>
              </div>
              <div className='flex flex-row items-center '>
                <div className='rounded-full border-4 border-accentPrimary flex justify-center items-center w-[50px] h-[50px] mr-5 text-3xl'>
                  4
                </div>
                <p className='w-auto'>
                {translation("section-2-step-4")} 
                </p>
              </div>
            </div>

          </section>
            
        </main>
    )

}