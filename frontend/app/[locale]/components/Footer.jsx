import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {useTranslations} from 'next-intl'

import renadylLogoWhite from '../../../public/renadyl_logo_white.svg'

import {FaPhone,FaEnvelope} from 'react-icons/fa'

function Footer() {

    const translation = useTranslations("Footer");
  return (
    <footer className='w-full bg-foregroundPrimary text-backgroundPrimary py-7 max-xl:px-5'>
        <div className='flex max-w-[1200px] w-full mx-auto gap-2 uppercase pb-5 max-lg:flex-wrap'>
            <div className='w-1/4 max-lg:w-1/2 max-sm:w-full max-sm:text-center max-sm:flex max-sm:flex-col max-sm:items-center'>
                <h5>S.C. Healty Medical S.R.L.</h5>
                <p>RO 43590495</p>
                <br />
                <p>Cal. Dorobanți nr. 111-131<br/>Bl. 9 Ap. 227, București<br/>România</p>
                <br/>
                <p className='flex flex-row items-center gap-1'><FaPhone /> - <Link href="#">0723 123 123</Link></p>
                <p className='flex flex-row items-center gap-1'><FaEnvelope /> - <Link href="#">adresa@email.com</Link></p>
            </div> 
            <div className='w-1/4  max-lg:w-2/2 max-sm:w-full max-sm:text-center max-sm:flex max-sm:flex-col max-sm:items-center max-sm:pt-10'>
                <h5>{translation('linkuri-utile')}</h5>
                <ul>
                    <li>
                        <Link href="#">{translation('linkU1')}</Link>
                    </li>
                    <li>
                        <Link href="#">{translation('linkU2')}</Link>
                    </li>
                    <li>
                        <Link href="#">{translation('linkU3')}</Link>
                    </li>
                    <li>
                        <Link href="#">{translation('linkU4')}</Link>
                    </li>
                    <li>
                        <Link href="#">{translation('linkU5')}</Link>
                    </li>
                    <li>
                        <Link href="#">{translation('linkU6')}</Link>
                    </li>
                    
                </ul>
            </div>
            <div className='w-1/4 max-lg:w-1/2 max-sm:w-full max-sm:text-center max-sm:flex max-sm:flex-col max-sm:items-center max-sm:pt-10'>
                <h5>{translation('harta-website')}</h5>
                <ul>
                    <li>
                        <Link href="/">{translation("linkD1")}</Link>
                    </li>
                    <li>
                        <Link href="/about">{translation("linkD2")}</Link>
                    </li>
                    <li>
                        <Link href="#">{translation("linkD3")}</Link>
                    </li>
                </ul>
            </div>
            <div className='w-1/4 max-lg:w-2/2 max-sm:w-full max-sm:text-center max-sm:flex max-sm:flex-col max-sm:items-center max-sm:pt-10'>
                
                <Image 
                    src={renadylLogoWhite}
                    alt='Renadyl'
                    className=''
                />
                <div>
                    <Link href="#"></Link>
                    <Link href="#"></Link>
                    <Link href="#"></Link>
                    <Link href="#"></Link>
                </div>
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
  )
}

export default Footer