import React from 'react'
import { useTranslation } from 'react-i18next'

const lngs = {
    ro: {nativeName: 'Română'},
    en: {nativeName: 'English'},
    de: {nativeName: 'Deutsch'}
}

function Header() {
const {t, i18n} = useTranslation();

  return (
    <header>
        <div className='header-container'>
            <div className='header-logo-container'>
                <img className='header-logo' src='/renadyl_logo_white.svg' />
            </div>
            <div className='language-switcher-container'>
                {
                    Object.keys(lngs).map((lng) => (
                        <button className='language-switcher' onClick={() => i18n.changeLanguage(lng)}>
                            <img src={`/${lng}-icon.svg`} /> 
                        </button>
                    ))
                }
                {/* <button className='language-switcher' href='/' nClick={() => i18n.changeLanguage(lng)}>
                    <img src='/ro-icon.svg' /> 
                </button>
                <button className='language-switcher' href='/en'>
                    <img src='/en-icon.svg' /> 
                </button>
                <button className='language-switcher' href='/de'>
                    <img src='/ge-icon.svg' /> 
                </button> */}
            </div>
        </div>
    </header>
  )
}

export default Header