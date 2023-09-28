'use client'

import React, { useState } from 'react'

import Image from 'next/image'
import Link from 'next-intl/link'


import renadylLogo from '@/public/renadyl_logo.svg';
import { useTranslations } from 'use-intl';


import {FaHome, FaShoppingCart, FaListUl } from 'react-icons/fa'
import {FaGear, FaFileInvoiceDollar} from 'react-icons/fa6'
import { usePathname } from 'next-intl/client';

function Navbar({currentLocale}) {

    const pathname = usePathname();

    console.log(pathname);

    const t = useTranslations('Dashboard');

    return (
        <>
            <div className='h-full flex flex-col w-1/6 border-r-[1px] border-foregroundPrimary20 px-8 py-10 gap-6'>                
                <div className='h-1/5'>
                    <Image
                        src={renadylLogo}
                        alt='Renadyl'
                        className={`w-full relative top-0 left-0 transition-all duration-300`}
                    />
                </div>
                <div className='h-3/5'>
                    <nav className='flex flex-col gap-2'>
                        <li className='list-none'>
                            <Link href='/dashboard/client/' locale={currentLocale} className={`flex flex-row items-center content-center gap-4 text-lg px-3 py-2 rounded-lg ${pathname === '/dashboard/client' ? 'bg-dashboardBlue20 text-dashboardBlue' : 'text-foregroundPrimary90 hover:bg-dashboardBlue10'} `}>
                                <FaHome className='text-2xl'/>
                                {t("client.navbar.general")}
                            </Link>
                        </li>
                        <li className='list-none'>
                            <Link href='/dashboard/client/buy' locale={currentLocale} className={`flex flex-row items-center content-center gap-4 text-lg px-3 py-2 rounded-lg ${pathname === '/dashboard/client/buy' ? 'bg-dashboardBlue20 text-dashboardBlue' : 'text-foregroundPrimary90 hover:bg-dashboardBlue10'} `}>
                                <FaShoppingCart className='text-2xl'/>
                                {t("client.navbar.buy")}

                            </Link>
                        </li>
                        <li className='list-none'>
                            <Link href='/dashboard/client/orders' locale={currentLocale} className={`flex flex-row items-center content-center gap-4 text-lg px-3 py-2 rounded-lg ${pathname === '/dashboard/client/orders' ? 'bg-dashboardBlue20 text-dashboardBlue' : 'text-foregroundPrimary90 hover:bg-dashboardBlue10'} `}>
                                <FaListUl className='text-2xl'/>
                                {t("client.navbar.orders")}

                            </Link>
                        </li>
                        <li className='list-none'>
                            <Link href='/dashboard/client/subscription' locale={currentLocale} className={`flex flex-row items-center content-center gap-4 text-lg px-3 py-2 rounded-lg ${pathname === '/dashboard/client/subscription' ? 'bg-dashboardBlue20 text-dashboardBlue' : 'text-foregroundPrimary90 hover:bg-dashboardBlue10'} `}>
                                <FaHome className='text-2xl'/>
                                {t("client.navbar.subscription")}

                            </Link>
                        </li>
                        <li className='list-none'>
                            <Link href='/dashboard/client/invoices' locale={currentLocale} className={`flex flex-row items-center content-center gap-4 text-lg px-3 py-2 rounded-lg ${pathname === '/dashboard/client/invoices' ? 'bg-dashboardBlue20 text-dashboardBlue' : 'text-foregroundPrimary90 hover:bg-dashboardBlue10'} `}>
                                <FaFileInvoiceDollar className='text-2xl'/>
                                {t("client.navbar.invoices")}

                            </Link>
                        </li>
                        <li className='list-none'>
                            <Link href='/dashboard/client/settings' locale={currentLocale} className={`flex flex-row items-center content-center gap-4 text-lg px-3 py-2 rounded-lg ${pathname === '/dashboard/client/settings' ? 'bg-dashboardBlue20 text-dashboardBlue' : 'text-foregroundPrimary90 hover:bg-dashboardBlue10'} `}>
                                <FaGear className='text-2xl'/>
                                {t("client.navbar.settings")}

                            </Link>
                        </li>
                        
                    </nav>
                </div>
                <div className='h-1/5'>

                </div>
            </div>
        </>
    )
}

export default Navbar

