'use client';

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {useTranslations} from 'next-intl'

import renadylLogoWhite from '@/public/renadyl_logo_white.svg'


import {FaPhone,FaEnvelope, FaFacebook,FaInstagram,FaPinterest,FaYoutube, FaTwitter} from 'react-icons/fa'

function Footer() {

    const t = useTranslations("Footer");

  return (
    <footer className='w-full bg-foregroundPrimary text-backgroundPrimary py-7 max-[1200px]:px-4 '>
<div className='flex max-w-[1200px] w-full mx-auto gap-2 uppercase pb-5 max-lg:flex-wrap'>
              <div className='w-1/4 max-lg:w-1/2 max-sm:w-full max-sm:text-center max-sm:flex max-sm:flex-col max-sm:items-center'>
                  <h5>S.C. Healthy Medical S.R.L.</h5>
                  <p>RO 43590495</p>
                  <br />
                  <p>Cal. Dorobanți nr. 111-131<br/>București, România</p>
                  <br/>
                  <p className='flex flex-row items-center gap-1'><FaPhone /> - <Link className='duration-150 hover:text-accentPrimary' href="tel: 4073356600">+40 733 566 000</Link></p>
                  <p className='flex flex-row items-start gap-1 mt-1'><FaEnvelope className='mt-0.5'/> - <Link className='duration-150 hover:text-accentPrimary' href="mailto: office@healthymedical.ro">office@healthymedical.ro</Link></p>
              </div> 
              <div className='w-1/4  max-lg:w-2/2 max-sm:w-full max-sm:text-center max-sm:flex max-sm:flex-col max-sm:items-center max-sm:pt-10'>
                  <h5 className='pb-3'>{t('linkuri-utile')}</h5>
                  <ul>
                      <li>
                          <Link className='duration-150 hover:text-accentPrimary' href="#">{t('linkU1')}</Link>
                      </li>
                      <li>
                          <Link className='duration-150 hover:text-accentPrimary' href="#">{t('linkU2')}</Link>
                      </li>
                      <li>
                          <Link className='duration-150 hover:text-accentPrimary' href="#">{t('linkU3')}</Link>
                      </li>
                      <li>
                          <Link className='duration-150 hover:text-accentPrimary' href="#">{t('linkU4')}</Link>
                      </li>
                      <li>
                          <Link className='duration-150 hover:text-accentPrimary' href="#">{t('linkU5')}</Link>
                      </li>
                      <li>
                          <Link className='duration-150 hover:text-accentPrimary' href="#">{t('linkU6')}</Link>
                      </li>
                      
                  </ul>
              </div>
              <div className='w-1/4 max-lg:w-1/2 max-sm:w-full flex flex-col  max-sm:text-center max-sm:flex max-sm:flex-col max-sm:items-center max-sm:pt-10'>
                  {/* <h5>{t('harta-website')}</h5>
                  <ul>
                      <li>
                          <Link className='duration-150 hover:text-accentPrimary' href="/">{t("linkD1")}</Link>
                      </li>
                      <li>
                          <Link className='duration-150 hover:text-accentPrimary' href="/about">{t("linkD2")}</Link>
                      </li>
                      <li>
                          <Link className='duration-150 hover:text-accentPrimary' href="#">{t("linkD3")}</Link>
                      </li>
                  </ul>
                  <div>
                      
                      <LocaleSwitcherFooter />
                  </div> */}
                  <h1 className='text-5xl font-extrabold'>HEALTHY MEDICAL</h1>
                  <div className='flex flex-row justify-start my-5 items-center gap-5 text-2xl'>
                      <Link className='duration-150 hover:text-accentPrimary' href={t("linkFb")} aria-label='Facebook'>
                          <FaFacebook />
                      </Link>
                      <Link className='duration-150 hover:text-accentPrimary' href={t("linkIg")} aria-label='Instagram'>
                          <FaInstagram />
                      </Link>
                      <Link className='duration-150 hover:text-accentPrimary' href={t("linkTw")} aria-label='Twitter'>
                          <FaTwitter />
                      </Link>
                      
                      
                      
                  </div>
              </div>
              <div className='w-1/4 max-lg:w-2/2 gap-5 flex flex-col items-start max-sm:w-full max-sm:text-center max-sm:flex max-sm:flex-col max-sm:items-center max-sm:pt-10'>
                  
                  <Image 
                      src={renadylLogoWhite}
                      alt='Renadyl'
                      className=''
                  />
                  
  
                  <Image 
                      src="/images/kibow-logo-white.png"
                      width={200}
                      height={0}
                      alt="Renadyl"
                  />  
  
                  
              </div>
          </div>
<div className='flex flex-row justify-center gap-5 max-sm:flex-col max-sm:items-center'>
           <Link href="https://anpc.ro/ce-este-sal/">
               <Image 
                   src="/images/anpc-sal.png"
                   width={250}
                   height={0}
                   alt='ANPC SAL'
               />
           </Link>
           <Link href="https://ec.europa.eu/consumers/odr">
               <Image 
                   src="/images/anpc-sol.png"
                   width={250}
                   height={0}
                   alt='ANPC SOL'
               />
           </Link>
       </div>
    </footer>
    // <footer className='w-screen bg-foregroundPrimary text-backgroundPrimary py-7 max-xl:px-5'>
          
    //       <div className='flex flex-row justify-center gap-5 max-sm:flex-col max-sm:items-center'>
    //           <Link href="https://anpc.ro/ce-este-sal/">
    //               <Image 
    //                   src="/images/anpc-sal.png"
    //                   width={250}
    //                   height={0}
    //                   alt='ANPC SAL'
    //               />
    //           </Link>
    //           <Link href="https://ec.europa.eu/consumers/odr">
    //               <Image 
    //                   src="/images/anpc-sol.png"
    //                   width={250}
    //                   height={0}
    //                   alt='ANPC SOL'
    //               />
    //           </Link>
    //       </div>
    //   </footer>
  )
}

export default Footer