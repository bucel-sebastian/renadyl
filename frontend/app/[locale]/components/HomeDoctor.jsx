'use client';

import React, {useState, useEffect} from 'react';

import Link from 'next/link';
import Image from 'next/image';
import {useTranslations} from 'next-intl';

function HomeDoctor() {

  const [videoDoctorHover, setVideoDoctorHover] = useState(false);

  const translation = useTranslations("Index");
  useEffect(()=>{
    videoDoctorHover ? 
    (document.getElementById("home-doctor-video").play()) :
    (document.getElementById("home-doctor-video").pause())
  },[videoDoctorHover])
  return (
    <div className='relative h-full w-1/2' onMouseOver={()=>{
        setVideoDoctorHover(true);
      }} onMouseOut={()=>{
        setVideoDoctorHover(false);

      }}>
        <video id='home-doctor-video' loop muted className='absolute top-0 left-0 w-full h-full object-cover z-0 ease-out duration-300 brightness-[0.50] group-hover:brightness-[0.75]'>
          <source src="/videos/doctors_hero video_V02.mp4" type='video/mp4' />
        </video>
        <div className='relative z-10 h-full flex flex-col items-center justify-center pb-7 '>
          <h3 className='text-backgroundPrimary uppercase text-5xl text-center align-middle font-extrabold max-w-[500px] h-[115px] flex items-center justify-center max-md:text-3xl max-sm:text-2xl'>{translation('doctor-heading')}</h3>
          <Link href="#" className='shadow-lg text-backgroundPrimary uppercase text-center rounded-full bg-accentPrimary w-[300px] text-2xl font-extrabold py-1.5 h-max ease-out duration-150 hover:bg-accentSecondary max-md:w-[250px] max-sm:text-xl max-sm:w-max max-sm:px-[25px]'>
            {translation("inscrieteBtn")}
          </Link>
        </div>
        
    </div>
  )
}

export default HomeDoctor