"use client"

import React from 'react'
import { getLocale } from 'next-intl/server'
import { getIntlManager } from 'next-intl'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import Image from 'next/image'

import roLocaleIcon from '@/public/images/ro-icon.svg'
import enLocaleIcon from '@/public/images/en-icon.svg'
import deLocaleIcon from '@/public/images/ge-icon.svg'
import Link from 'next/link'


function LocaleSwitcherFooter() {
  
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams()

  const handleLocaleSwitch = (lang) => {
    console.log("localele - "+lang+" ");
    console.log(router);
    console.log(pathName);
    console.log(searchParams);

    const intlManager = getIntlManager();
    intlManager.locale = lang;

    const pathWithLocale = `/${lang}${pathName}${searchParams}`;
    router.push(pathWithLocale);
  } 

    return (
    <div className='flex flex-row gap-3 '>
        <button onClick={()=>handleLocaleSwitch("ro")}>
          <Image
            src={roLocaleIcon}
            alt="RO"
            className='w-[30px] h-[30px] duration-200 border-backgroundPrimary border-[2px] rounded-full hover:border-accentPrimary'
          />
        </button>
        <button onClick={()=>handleLocaleSwitch("en")}>
          <Image
            src={enLocaleIcon}
            alt="EN"
            className='w-[30px] h-[30px] duration-200 border-backgroundPrimary border-[2px] rounded-full hover:border-accentPrimary'
          />
        </button>
        <button onClick={()=>handleLocaleSwitch("de")}>
          <Image
            src={deLocaleIcon}
            alt="DE"
            className='w-[30px] h-[30px] duration-200 border-backgroundPrimary border-[2px] rounded-full hover:border-accentPrimary'
          />
        </button>
    </div>
  )
}

export default LocaleSwitcherFooter