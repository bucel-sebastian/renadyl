'use client';

import React from 'react'

import Image from 'next/image' 

import roLocaleIcon from '@/public/images/ro-icon.svg'
import enLocaleIcon from '@/public/images/en-icon.svg'
import deLocaleIcon from '@/public/images/ge-icon.svg'

import {useRouter, usePathname, useSearchParams} from 'next/navigation'
import Link from 'next/link';

function LocaleSwitcher() {

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const locale = router.locale;

    const handleLocaleSwitch = (lang) => {

        // router.push(`/${lang}${pathname}${searchParams}`);
        
    }


  return (
    <div className='flex flex-row gap-3'>
        {/* <Link locale="ro" href="/about" >
            <Image
                src={roLocaleIcon}
                alt="RO"
                className='w-[30px] h-[30px] duration-200 border-backgroundPrimary border-[2px] rounded-full hover:border-accentPrimary'
            />
        </Link>
        <Link locale="en" href="/about" >
            <Image
                src={enLocaleIcon}
                alt="EN"
                className='w-[30px] h-[30px] duration-200 border-backgroundPrimary border-[2px] rounded-full hover:border-accentPrimary'
            />
        </Link>
        <Link locale={'de'} href="/about" >
            <Image
                src={deLocaleIcon}
                alt="DE"
                className='w-[30px] h-[30px] duration-200 border-backgroundPrimary border-[2px] rounded-full hover:border-accentPrimary'
            />
        </Link> */}
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

export default LocaleSwitcher