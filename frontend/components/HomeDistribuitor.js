'use client';

import React, {useState, useEffect} from 'react'

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

function HomeDistribuitor() {

    const [videoDistribuitorHover, setVideoDistribuitorHover] = useState(false);

    const t = useTranslations('Index');

    useEffect(()=>{
        videoDistribuitorHover ? 
        (document.getElementById("home-distribuitor-video").play()) :
        (document.getElementById("home-distribuitor-video").pause())
    
    
      },[videoDistribuitorHover])
  return (
    <div className='relative h-full w-1/2 group' onMouseOver={()=>{
        setVideoDistribuitorHover(true);
      }} onMouseOut={()=>{
        setVideoDistribuitorHover(false);

      }}>
        <video id="home-distribuitor-video" loop muted className='absolute top-0 left-0 w-full h-full object-cover z-0 ease-out duration-300 brightness-[0.75] group-hover:brightness-[0.95]'>
          <source src="/videos/supplier_hero video_V02.mp4" type='video/mp4' />
        </video>
        <div className='relative z-10 h-full flex flex-col items-center justify-center pb-7'>
          <h3 className='text-backgroundPrimary uppercase text-5xl text-center align-middle font-extrabold max-w-[500px] h-[115px] flex items-center justify-center max-md:text-3xl max-sm:text-2xl'>{t('distribuitor-heading')}</h3>
          <Link href="#" className='shadow-lg text-backgroundPrimary uppercase text-center rounded-full bg-accentPrimary w-[300px] text-2xl font-extrabold py-1.5 h-max ease-out duration-150 hover:bg-accentSecondary max-md:w-[250px] max-sm:text-xl max-sm:w-max max-sm:px-[25px]'>
            {t("inscrieteBtn")}
          </Link>
        </div>
        
      </div>
  )
}

export default HomeDistribuitor