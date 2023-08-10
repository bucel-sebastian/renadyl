import {useTranslations} from 'next-intl';
import {getTranslator} from 'next-intl/server';

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import HomeDoctor from './components/HomeDoctor';
import HomeDistribuitor from './components/HomeDistribuitor';

export async function generateMetadata({params: {locale}}) {
  const translation = await getTranslator(locale,'Index');

  return {
    title: `Renadyl - ${translation('page-title')}` 
  }
}

export default function Home() {

  const translation = useTranslations('Index');

  return (
    <main>

        <div className='w-full h-screen'>
          <div className='relative w-full h-3/5 group'>
            <video autoPlay loop muted className='absolute top-0 left-0 w-full h-full object-cover z-0 ease-out duration-300 brightness-[0.50] group-hover:brightness-[0.75]'>
              <source src="/videos/hero_main_video_V02.mp4" type='video/mp4' />
            </video>
            
              <div className='relative h-4/5 pt-24 flex justify-center items-center z-10 mx-auto max-w-[350px] max-md:max-w-[200px] max-md:pt-32 max-md:h-3/5'>
                <Image 
                  src="/images/renadyl_bottles_1.png"
                  alt="Renadyl Bottles"
                  width={350}
                  height={0}
                />
              </div>
              <div className='relative flex flex-row gap-5 w-max mx-auto h-1/5 z-10 max-md:flex-col max-md:h-2/5 max-md:pt-8'>
                <Link href="#" className='shadow-lg text-backgroundPrimary uppercase text-center rounded-full bg-accentPrimary w-[300px] text-3xl font-extrabold py-1.5 h-max ease-out duration-150 hover:bg-accentSecondary max-md:w-[300px] max-sm:text-2xl'>{translation("comandaBtn")}</Link>
                <Link href="/about" className='shadow-lg text-backgroundPrimary uppercase text-center rounded-full bg-accentPrimary w-[300px] text-3xl font-extrabold py-1.5 h-max ease-out duration-150 hover:bg-accentSecondary max-md:w-[300px] max-sm:text-2xl'>{translation("detaliiBtn")}</Link>
              </div>
            

            
          </div>
          <div className='w-full h-2/5 flex flex-row'>
            <HomeDoctor />
            <HomeDistribuitor />
            
          </div>
        </div>


      

    </main>
  )
}