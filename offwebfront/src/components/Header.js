import React from 'react'

function Header() {
  return (
    <header>
        <div className='header-container'>
            <div>
                <img className='header-logo' src='/renadyl_logo_white.svg' />
            </div>
            <div className='language-switcher-container'>
                <a className='language-switcher' href='/'>
                    <img src='/ro-icon.svg' /> 
                </a>
                <a className='language-switcher' href='/en'>
                    <img src='/en-icon.svg' /> 
                </a>
                <a className='language-switcher' href='/de'>
                    <img src='/ge-icon.svg' /> 
                </a>
                
            </div>

        </div>
       

    </header>
  )
}

export default Header