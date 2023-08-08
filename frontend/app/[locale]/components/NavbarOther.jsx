'use client';
import './navbar.css'

import React, {useEffect,useState} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {useTranslations} from 'next-intl'

import renadylLogo from '@/public/renadyl_logo.svg'
import renadylLogoWhite from '@/public/renadyl_logo_white.svg'

function NavbarOther() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [headerWhite, setHeaderWhite] = useState(false);

  const handleMenuBtn = () => {
    setIsMenuOpen(!isMenuOpen);
  }


  const handleScroll = () => {
    if(window.scrollY >= 100){
      setHeaderWhite(true);
    } else {
      setHeaderWhite(false);
    }
  }

  useEffect(()=>{
    window.addEventListener("scroll",handleScroll);
    return () => {
      window.removeEventListener("scroll",handleScroll);
    }
  },[])


  return (
    <header className={`fixed top-0 left-0 w-full py-2 z-50 duration-300 bg-backgroundPrimary`}>
      <div className='flex flex-row max-w-[1200px] justify-between content-center items-center w-full mx-auto'>
        <div>
          <Link href="#" className='header-logo-container w-[200px] max-md:w-[150px]'>
            <Image 
              src={renadylLogo}
              alt='Renadyl'
              className='header-logo'
            />
            

          </Link>
        </div>
        <div>
          <button className={`duration-300 menu-btn ${isMenuOpen ? 'menu-open' : ''} header-white `} onClick={handleMenuBtn}>

            <svg width="100" height="100" viewBox="0 0 100 100" >
              <path className="duration-300 line line1" d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058" />
              <path className="duration-300 line line2" d="M 20,50 H 80" />
              <path className="duration-300 line line3" d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942" />
            </svg>  

            {/* <div className='bar-1'></div>
            <div className='bar-2'></div>
            <div className='bar-3'></div> */}
          </button>
        </div>
      </div>
    </header>
  )
}

export default NavbarOther