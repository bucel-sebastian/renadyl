'use client'


import { useTranslations } from 'next-intl'
import { usePathname } from 'next-intl/client';
import React, { useState } from 'react'

function Header({currentLocale}) {

    const t = useTranslations('Dashboard');
    const pathname = usePathname();

    return (
        <>
            <div className='h-[75px] flex flex-row items-center content-center justify-between'>
                <div>
                    <h1 className='text-3xl font-bold'>
                        {t(`client.header.${pathname}`)}
                    </h1>
                </div>
                <div>
                    
                </div>
            </div>
        </>
    )
}

export default Header
