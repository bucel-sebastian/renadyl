import {useTranslations} from 'next-intl';
import {getTranslator} from 'next-intl/server';

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

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
      <div className='w-full h-screen bg-[#a0a0f0]'>
        <div className='relative w-full h-1/2 group'>
          <video autoPlay loop muted className='absolute top-0 left-0 w-full h-full object-cover z-0 ease-out duration-300 brightness-[0.50] group-hover:brightness-[0.75]'>
            <source src="/videos/home-hero.mp4" type='video/mp4' />
          </video>
          
            <div className='relative h-4/5 pt-24 flex justify-center items-center z-10'>
              <Image 
                src="/images/renadyl_bottles.png"
                width={350}
                height={0}
              />
            </div>
            <div className='relative flex flex-row gap-5 w-max mx-auto h-1/5 z-10'>
              <Link href="#" className='shadow-lg text-backgroundPrimary uppercase text-center rounded-full bg-accentPrimary w-[300px] text-2xl font-extrabold py-1.5 h-max ease-out duration-150 hover:bg-accentSecondary'>{translation("comandaBtn")}</Link>
              <Link href="/about" className='shadow-lg text-backgroundPrimary uppercase text-center rounded-full bg-accentPrimary w-[300px] text-2xl font-extrabold py-1.5 h-max ease-out duration-150 hover:bg-accentSecondary'>{translation("detaliiBtn")}</Link>
            </div>
          

          
        </div>
        <div className='w-full h-1/2 flex flex-row bg-[#ff0000]'>
          <div className='relative h-full w-1/2 bg-[#00ff00]'>
            <video autoPlay loop muted className='absolute top-0 left-0 w-full h-full object-cover z-0 ease-out duration-300 brightness-[0.20] group-hover:brightness-[0.75]'>
              <source src="/videos/home-doctor.mp4" type='video/mp4' />
            </video>
            <div className='relative z-10 h-1/2 flex items-end justify-center pb-7'>
              <h3 className='text-backgroundPrimary uppercase text-5xl leading-[5.5rem] text-center font-extrabold w-[350px]'>{translation('doctor-heading')}</h3>
            </div>
            <div className='relative z-10 flex justify-center'>
              <Link href="#" className='shadow-lg text-backgroundPrimary uppercase text-center rounded-full bg-accentPrimary w-[300px] text-2xl font-extrabold py-1.5 h-max ease-out duration-150 hover:bg-accentSecondary'>
                {translation("inscrieteBtn")}
              </Link>
            </div>
            
          </div>
          <div className='relative h-full w-1/2'>
            <video autoPlay loop muted className='absolute top-0 left-0 w-full h-full object-cover z-0 ease-out duration-300 brightness-[0.20] group-hover:brightness-[0.75]'>
              <source src="/videos/home-distribuitor.mp4" type='video/mp4' />
            </video>
            <div className='relative z-10 h-1/2 flex items-end justify-center pb-7'>
              <h3 className='text-backgroundPrimary uppercase text-5xl text-center font-extrabold w-[350px]'>{translation('distribuitor-heading')}</h3>
            </div>
            <div className='relative z-10 flex justify-center'>
              <Link href="#" className='shadow-lg text-backgroundPrimary uppercase text-center rounded-full bg-accentPrimary w-[300px] text-2xl font-extrabold py-1.5 h-max ease-out duration-150 hover:bg-accentSecondary'>
                {translation("inscrieteBtn")}
              </Link>
            </div>
           
          </div>
        </div>
      </div>

    </main>
  )
}
