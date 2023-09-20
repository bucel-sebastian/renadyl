'use client'
import React, { useEffect, useRef, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { useTranslations } from "next-intl";

import renadylLogo from '@/public/renadyl_logo.svg';
import renadylLogoWhite from '@/public/renadyl_logo_white.svg';

import roLocaleIcon from '@/public/images/ro-icon.svg'
import enLocaleIcon from '@/public/images/en-icon.svg'
import deLocaleIcon from '@/public/images/de-icon.svg'

import { FaUserCircle } from "react-icons/fa";

function HomeHeader({currentLocale}) {


    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [headerWhite, setHeaderWhite] = useState(false);

    const [isAffiliatesOpenDesktop, setIsAffiliatesOpenDesktop] = useState(false);

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

    const handleHoverAffiliates = () => {
        setIsAffiliatesOpenDesktop(true);
    }

    const handleLeaveAffiliates = () => {
        setIsAffiliatesOpenDesktop(false);
    }

    

    const handleMenuBtnClick = () =>{
        setIsMenuOpen(!isMenuOpen);
    }


    const handleScroll = () => {
        if(window.scrollY >= 100){
            setHeaderWhite(true);
        } else {
            isMenuOpen ? (setHeaderWhite(true)) : (setHeaderWhite(false));
        }
    }


    useEffect(()=>{
        window.addEventListener("scroll",handleScroll);
        setHeaderWhite(isMenuOpen);
        
        return () => {
            window.removeEventListener("scroll",handleScroll);
        }
    },[isMenuOpen]);

    

  return (
    <header className={`fixed block top-0 left-0 w-full h-[75px] z-10 ${headerWhite ? 'bg-backgroundPrimary90 shadow-lg header-white' : 'text-backgroundPrimary'} transition-all duration-300 `}>
        <div className='relative flex max-w-[1200px] mx-auto justify-between items-center content-center h-full py-2 max-md:px-5 max-[1200px]:px-4'>
            <div className='h-full w-1/5 max-md:w-1/2 relative'>
                <Image 
                    src={renadylLogoWhite}
                    alt='Renadyl'
                    className={`h-full w-max transition-all duration-300 ${headerWhite ? 'opacity-0' : 'opacity-1'}`}
                /> 
                <Image 
                    src={renadylLogo}
                    alt='Renadyl'
                    className={`h-full w-max absolute top-0 left-0 transition-all duration-300 ${headerWhite ? 'opacity-1' : 'opacity-0'}`}
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
                        <li className="text-xl relative px-[3px] py-[1px] after:absolute after:bottom-0 after:left-0 after:content-[''] after:w-full after:h-[4px] after:bg-gradient-to-r after:from-gradientGreen after:to-gradientPurple after:scale-x-0 hover:after:scale-x-100 after:duration-150 after:transition-all flex justify-center" onMouseOver={handleHoverAffiliates} onMouseLeave={handleLeaveAffiliates}>
                            <Link href="#">{t('affiliates')}</Link>
                            <div className={`absolute pt-1 transition-all duration-300 top-full drop-shadow-md  ${isAffiliatesOpenDesktop ? 'opacity-1 pointer-event-auto' : 'opacity-0 pointer-events-none'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58.59 28.73" className='w-[20px] mx-auto block'>
                                <g >
                                    <path className='fill-backgroundPrimary' d="m58.59,28.73H0L24.28,1.75c2.1-2.33,7.94-2.33,10.03,0l24.28,26.98Z"/>
                                </g>
                                </svg>
                                <nav className='text-center py-3 px-4 rounded-lg bg-backgroundPrimary text-foregroundPrimary'>
                                    <ul className='flex flex-col items-center content-center gap-[2px]'>
                                        <li className="text-xl relative px-[3px] py-[1px] after:absolute after:bottom-0 after:left-0 after:content-[''] after:w-full after:h-[4px] after:bg-gradient-to-r after:from-gradientGreen after:to-gradientPurple after:scale-x-0 hover:after:scale-x-100 after:duration-150 after:transition-all">
                                            <Link href="#">{t('ambassadors')}</Link>
                                        </li>
                                        <li className="text-xl relative px-[3px] py-[1px] after:absolute after:bottom-0 after:left-0 after:content-[''] after:w-full after:h-[4px] after:bg-gradient-to-r after:from-gradientGreen after:to-gradientPurple after:scale-x-0 hover:after:scale-x-100 after:duration-150 after:transition-all">
                                            <Link href="#">{t('doctors')}</Link>
                                        </li>
                                        <li className="text-xl relative px-[3px] py-[1px] after:absolute after:bottom-0 after:left-0 after:content-[''] after:w-full after:h-[4px] after:bg-gradient-to-r after:from-gradientGreen after:to-gradientPurple after:scale-x-0 hover:after:scale-x-100 after:duration-150 after:transition-all">
                                            <Link href="#">{t('distributors')}</Link>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </li>
                        <li className="text-xl relative px-[3px] py-[1px] after:absolute after:bottom-0 after:left-0 after:content-[''] after:w-full after:h-[4px] after:bg-gradient-to-r after:from-gradientGreen after:to-gradientPurple after:scale-x-0 hover:after:scale-x-100 after:duration-150 after:transition-all">
                            <Link href="/contact">{t('contact')}</Link>
                        </li>
                    </ul>
                </nav>
                <div className='hidden max-md:flex justify-end'>
                    <button onClick={handleMenuBtnClick} className={`burger-menu ${isMenuOpen ? 'opened' : ''}`} >
                        <svg width={50} viewBox="0 0 100 100">
                            <path className="line line1" d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058" />
                            <path className="line line2" d="M 20,50 H 80" />
                            <path className="line line3" d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942" />
                        </svg>
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
                            className={`h-[35px] w-[35px] block rounded-full border-2 transition-all duration-300 ${headerWhite ? 'border-foregroundPrimary' : 'border-backgroundPrimary'}`}
                        />
                    </Link>
                    <div className={`relative block  ${languageSwitcherOpen ? 'w-[76px]' : 'w-[0px]'} overflow-hidden   transition-all duration-500 ease-in-out`}>
                        <div className='absolute top-0 left-0 flex flex-row gap-[6px] w-content'>
                            {filteredLocales.map((value,index)=>(
                                <button key={index} className='w-[35px]'>
                                    <Image 
                                        src={value}
                                        alt='Renadyl'
                                        className={`h-[35px] w-[35px] rounded-full border-2  transition-all duration-300 ${headerWhite ? 'border-foregroundPrimary' : 'border-backgroundPrimary'}`}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className={`hidden max-md:block h-screen w-full bg-backgroundPrimary90 text-foregroundPrimary transition-all duration-300 ${isMenuOpen ? 'translate-x-0 pointer-events-auto' : 'translate-x-[100vw] pointer-events-none'}`}>
            <div className='relative'>
                <nav className=''>
                    <ul className='flex flex-col justify-center gap-[20px] px-5 pt-5'>
                        <li className="text-4xl text-right relative px-[3px] py-[1px] after:absolute after:bottom-0 after:left-0 after:content-[''] after:w-full after:h-[4px] after:bg-gradient-to-r after:from-gradientGreen after:to-gradientPurple after:scale-x-0 hover:after:scale-x-100 after:duration-150 after:transition-all">
                            <Link href="/">{t('home')}</Link>
                        </li>
                        <li className="text-4xl text-right relative px-[3px] py-[1px] after:absolute after:bottom-0 after:left-0 after:content-[''] after:w-full after:h-[4px] after:bg-gradient-to-r after:from-gradientGreen after:to-gradientPurple after:scale-x-0 hover:after:scale-x-100 after:duration-150 after:transition-all">
                            <Link href="/product">{t('product')}</Link>
                        </li>
                        <li className="text-4xl text-right relative px-[3px] py-[1px] after:absolute after:bottom-0 after:left-0 after:content-[''] after:w-full after:h-[4px] after:bg-gradient-to-r after:from-gradientGreen after:to-gradientPurple after:scale-x-0 hover:after:scale-x-100 after:duration-150 after:transition-all">
                            <Link href="#">{t('ambassadors')}</Link>
                        </li>
                        <li className="text-4xl text-right relative px-[3px] py-[1px] after:absolute after:bottom-0 after:left-0 after:content-[''] after:w-full after:h-[4px] after:bg-gradient-to-r after:from-gradientGreen after:to-gradientPurple after:scale-x-0 hover:after:scale-x-100 after:duration-150 after:transition-all">
                            <Link href="#">{t('doctors')}</Link>
                        </li>
                        <li className="text-4xl text-right relative px-[3px] py-[1px] after:absolute after:bottom-0 after:left-0 after:content-[''] after:w-full after:h-[4px] after:bg-gradient-to-r after:from-gradientGreen after:to-gradientPurple after:scale-x-0 hover:after:scale-x-100 after:duration-150 after:transition-all">
                            <Link href="#">{t('distributors')}</Link>
                        </li>     
                        <li className="text-4xl text-right relative px-[3px] py-[1px] after:absolute after:bottom-0 after:left-0 after:content-[''] after:w-full after:h-[4px] after:bg-gradient-to-r after:from-gradientGreen after:to-gradientPurple after:scale-x-0 hover:after:scale-x-100 after:duration-150 after:transition-all">
                            <Link href="#">{t('contact')}</Link>
                        </li>
                        <li className="text-4xl text-right relative px-[3px] py-[1px] after:absolute after:bottom-0 after:left-0 after:content-[''] after:w-full after:h-[4px] after:bg-gradient-to-r after:from-gradientGreen after:to-gradientPurple after:scale-x-0 hover:after:scale-x-100 after:duration-150 after:transition-all">
                            <Link href="#">{t('account')}</Link>
                        </li>
                    </ul>
                </nav>
                <div className='relative mt-8 w-full flex justify-center flex-row gap-[10px]'>
                    {
                        Object.values(locales).map((locale,index)=>(
                            <button key={index} className='w-[45px]'>
                                    <Image 
                                        src={locale}
                                        alt='Renadyl'
                                        className={`h-[45px] w-[45px] rounded-full border-2  transition-all duration-300 border-foregroundPrimary`}
                                    />
                                </button>
                        ))
                    }
                </div>
            </div>
        </div>
    </header>
  )
}

export default HomeHeader