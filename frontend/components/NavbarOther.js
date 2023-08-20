'use client';

import './css/navbar.css';

import React, {useState,useEffect} from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { useTranslations } from 'next-intl';

import anime from 'animejs';

import renadylLogo from '@/public/renadyl_logo.svg';
import LocaleSwitcher from './LocaleSwitcher';



function NavbarOther() {
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [headerWhite, setHeaderWhite] = useState(false);

  const [buttonTimeout,setButtonTimeout] = useState(false);

  const t = useTranslations("Navbar");

  const handleMenuLinkClick = async (e) => {
    setIsMenuOpen(false);
  }

  const handleMenuBtn = () => {
    setButtonTimeout(true);
    if(!buttonTimeout){
      setIsMenuOpen(!isMenuOpen);
    }
    setTimeout(() => {
      setButtonTimeout(false);
    }, 550);
  }

  const handleScroll = () => {
    if(window.scrollY >= 50){
      setHeaderWhite(true);
    } else {
      console.log(isMenuOpen);
      isMenuOpen ? (setHeaderWhite(true)) : (setHeaderWhite(false));         
    }
  }

  const handleMenuOpen = () => {
    console.log("menu open");

    const elements = document.querySelectorAll(".navbar-el");

    setTimeout(()=>{
      anime({
        targets: elements,
        translateX: ['100%',0],
        opacity: [0,1],
        loop: false,
        easing: 'easeInOutExpo',
        delay: function(el, i) {
          return i * 150
        }
      });
      
    }, 200);


  }

  const handleMenuClose = () => {
    console.log("menu close");

    const elements = document.querySelectorAll(".navbar-el");

    anime({
      targets: elements,
      translateX: [0,'100%'],
      opacity: [1,0],
      loop: false,
      easing: 'easeInOutExpo',
      duration: 200,
      delay:0,
      // delay: function(el, i) {
      //   return i * 200
      // }
    });
   
  }

const handleMenuBtnHover = () => {
      if(!buttonTimeout){
        setIsMenuOpen(true);
        // keepMenuOpen(true);
      }
      
    }


  useEffect(()=>{
    window.addEventListener("scroll",handleScroll);

    isMenuOpen ? (setHeaderWhite(true)) : (window.scrollY >= 100 ? (setHeaderWhite(true)) : (setHeaderWhite(false)));
    
    isMenuOpen ? (handleMenuOpen()) : (handleMenuClose());
    return () => {
      window.removeEventListener("scroll",handleScroll);
    }
  },[isMenuOpen]);


  return (
    <header className={`fixed header-container transition-all ${isMenuOpen ? 'menu-open' : ''} top-0 left-0 w-full py-2 px-5 px-5 z-50 duration-300 ${headerWhite ? 'bg-backgroundPrimary70 shadow-lg backdrop-blur-md' : '' }`}>
      <div className='relative flex z-20 flex-row max-w-[1200px] justify-between content-center items-center w-full mx-auto'>
        <div>
          <Link href="/" className='header-logo-container w-[200px] max-md:w-[150px] '>
              <Image 
              src={renadylLogo}
              alt='Renadyl'
              className='header-logo'
            />
            
          </Link>
        </div>
        <div className='flex flex-row justify-center items-center
        '>
          <button  className={`duration-300 menu-btn ${isMenuOpen ? 'menu-open' : ''} header-white mr-5`} onClick={handleMenuBtn} onMouseOver={handleMenuBtnHover} disabled={buttonTimeout}>

            <svg width="100" height="100" viewBox="0 0 100 100" >
              <path className="duration-300 line line1" d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058" />
              <path className="duration-300 line line2" d="M 20,50 H 80" />
              <path className="duration-300 line line3" d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942" />
            </svg>  

            {/* <div className='bar-1'></div>
            <div className='bar-2'></div>
            <div className='bar-3'></div> */}
          </button>
          <LocaleSwitcher />
        </div>
      </div>

      <div className={`relative z-10 duration-300 w-full mx-auto menu-container ${isMenuOpen ? 'menu-open' : ''}  `}>
        <nav className='w-full flex justify-center items-center'>
          <ul className='text-center text-4xl font-extrabold max-sm:text-3xl '>
            <li className='navbar-el my-5 mx-auto px-3 before:duration-300 w-max relative hover:before:w-full before:absolute before:content-[""] before:w-0 before:h-[4px] before: before:bg-foregroundPrimary before:left-0 before:bottom-[-2px] before:origin-center-left '>
              <Link href="/" >{t("home-link")}</Link>
            </li>
            <li className='navbar-el my-5 mx-auto px-3 before:duration-300 w-max relative hover:before:w-full before:absolute before:content-[""] before:w-0 before:h-[4px] before: before:bg-foregroundPrimary before:left-0 before:bottom-[-2px] before:origin-center-left '>
              <Link href="/about" legacyBehavior passHref prefetch={true}>
                <a onClick={(e)=>handleMenuLinkClick(e)}>
                  {t("about-link")}
                </a>
              </Link>
            </li>
            <li className='navbar-el my-5 mx-auto px-3 before:duration-300 w-max relative hover:before:w-full before:absolute before:content-[""] before:w-0 before:h-[4px] before: before:bg-foregroundPrimary before:left-0 before:bottom-[-2px] before:origin-center-left '>
              <Link href="/contact" legacyBehavior passHref prefetch={true}>
                <a onClick={(e)=>handleMenuLinkClick(e)}>
                  {t("contact-link")}
                </a>
              </Link>
            </li>
            <li className='navbar-el my-5 mx-auto px-3 before:duration-300 w-max relative hover:before:w-full before:absolute before:content-[""] before:w-0 before:h-[4px] before: before:bg-foregroundPrimary before:left-0 before:bottom-[-2px] before:origin-center-left '>
              <Link href="/#" legacyBehavior passHref prefetch={true}>
                <a onClick={(e)=>handleMenuLinkClick(e)}>
                  {t("login-link")}
                </a>
              </Link>
            </li>
            <li className='navbar-el my-5 mx-auto px-3 before:duration-300 w-max relative hover:before:w-full before:absolute before:content-[""] before:w-0 before:h-[4px] before: before:bg-foregroundPrimary before:left-0 before:bottom-[-2px] before:origin-center-left '>
              <Link href="/#" legacyBehavior passHref prefetch={true}>
                <a onClick={(e)=>handleMenuLinkClick(e)}>
                  {t("register-link")}
                </a>
              </Link>
            </li>
            
            <li className='navbar-el my-5 mx-auto px-3 w-max relative'>
              <Link href="#" className='shadow-lg text-backgroundPrimary uppercase text-center rounded-full bg-accentPrimary w-[300px] text-3xl font-extrabold py-1.5 px-8 h-max ease-out duration-150 hover:bg-accentSecondary max-md:w-[300px] max-sm:text-3xl'>{t("order-link")}</Link>
            </li>
            
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default NavbarOther