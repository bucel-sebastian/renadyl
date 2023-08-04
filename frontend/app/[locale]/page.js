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
        <div className='w-full h-1/2'>
          <div className='flex flex-row gap-5 w-max mx-auto'>
            <Link href="#">{translation("comandaBtn")}</Link>
            <Link href="about">{translation("detaliiBtn")}</Link>
          </div>
        </div>
        <div className='w-full h-1/2 flex flex-row bg-[#ff0000]'>
          <div className='h-full w-1/2 bg-[#00ff00]'>
          
          </div>
          <div className='h-full w-1/2'>
          
          </div>
        </div>
      </div>

    </main>
  )
}
