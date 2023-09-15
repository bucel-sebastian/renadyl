'use client'
import React, { useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { useTranslations } from "next-intl";

import renadylLogo from '@/public/renadyl_logo.svg';

import roLocaleIcon from '@/public/images/ro-icon.svg'
import enLocaleIcon from '@/public/images/en-icon.svg'
import deLocaleIcon from '@/public/images/de-icon.svg'

import { FaUserCircle } from "react-icons/fa";

function OtherHeader({currentLocale}) {

    const [languageSwitcherOpen, setLanguageSwitcherOpen] = useState(false);

    const t = useTranslations('Header');


    const locales = {ro:roLocaleIcon,en:enLocaleIcon,de:deLocaleIcon};

    const filteredLocales = [];
    for (const key in locales) {
        if(key !== currentLocale) {
            filteredLocales.push(locales[key]);
        }
    }

    const openLanguageSwitcher = () => {
        setLanguageSwitcherOpen(true);
    }

    const closeLanguageSwitcher = () => {
        setLanguageSwitcherOpen(false);
    }

  return (
    <header className='fixed block top-0 left-0 w-full h-[75px]  text-foregroundPrimary z-10'>
        <div className='relative flex max-w-[1200px] mx-auto justify-between items-center content-center h-full py-2 max-md:px-5'>
            <div className='h-full w-1/5 max-md:w-1/2'>
                <Image 
                    src={renadylLogo}
                    alt='Renadyl'
                    className='h-full w-max'
                /> 
            </div>
            <div className='w-3/5 max-md:w-1/2'>
                <nav className=' max-md:hidden'>
                    <ul className='flex row justify-center gap-[20px]'>
                        <li className="text-xl relative px-[3px] py-[1px] after:absolute after:bottom-0 after:left-0 after:content-[''] after:w-full after:h-[4px] after:bg-gradient-to-r after:from-gradientGreen after:to-gradientPurple after:scale-x-0 hover:after:scale-x-100 after:duration-150 after:transition-all">
                            <Link href="/">{t('home')}</Link>
                        </li>
                        <li className="text-xl relative px-[3px] py-[1px] after:absolute after:bottom-0 after:left-0 after:content-[''] after:w-full after:h-[4px] after:bg-gradient-to-r after:from-gradientGreen after:to-gradientPurple after:scale-x-0 hover:after:scale-x-100 after:duration-150 after:transition-all">
                            <Link href="/product">{t('product')}</Link>
                        </li>
                        <li className="text-xl relative px-[3px] py-[1px] after:absolute after:bottom-0 after:left-0 after:content-[''] after:w-full after:h-[4px] after:bg-gradient-to-r after:from-gradientGreen after:to-gradientPurple after:scale-x-0 hover:after:scale-x-100 after:duration-150 after:transition-all">
                            <Link href="#">{t('affiliates')}</Link>
                        </li>
                        <li className="text-xl relative px-[3px] py-[1px] after:absolute after:bottom-0 after:left-0 after:content-[''] after:w-full after:h-[4px] after:bg-gradient-to-r after:from-gradientGreen after:to-gradientPurple after:scale-x-0 hover:after:scale-x-100 after:duration-150 after:transition-all">
                            <Link href="#">{t('contact')}</Link>
                        </li>
                    </ul>
                </nav>
                <div className='hidden max-md:flex justify-end'>
                    <button >
                        x
                    </button>
                </div>
                
            </div>
            <div className='w-1/5 flex row justify-end gap-[6px] max-md:hidden'>
                <div>
                    <Link href="#">
                        <FaUserCircle className='text-[35px]'/>
                    </Link>
                </div>
                <div className='relative flex gap-[6px]' onMouseOver={openLanguageSwitcher} onMouseLeave={closeLanguageSwitcher}>
                    <Link href="#">
                        <Image 
                            src={locales[currentLocale]}
                            alt='Renadyl'
                            className='h-[35px] w-[35px] block rounded-full border-2 border-foregroundPrimary'
                        />
                    </Link>
                    <div className={`relative block  ${languageSwitcherOpen ? 'w-[76px]' : 'w-[0px]'} overflow-hidden   transition-all duration-500 ease-in-out`}>
                        <div className='absolute top-0 left-0 flex flex-row gap-[6px] w-content'>
                            {filteredLocales.map((value,index)=>(
                                <button key={index} className='w-[35px]'>
                                    <Image 
                                        src={value}
                                        alt='Renadyl'
                                        className='h-[35px] w-[35px] rounded-full border-2 border-foregroundPrimary'
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='hidden max-md:block h-screen w-full bg-backgroundPrimary'>

        </div>
    </header>
  )
}

export default OtherHeader