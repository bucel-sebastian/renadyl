'use client'

import React, { useState } from 'react'

import Image from 'next/image'
import Link from 'next-intl/link'


import renadylLogo from '@/public/renadyl_logo.svg';
import { useTranslations } from 'use-intl';


import {FaHome, FaShoppingCart, FaListUl } from 'react-icons/fa'
import {FaGear, FaUsers, FaTruck, FaPills, FaFileInvoiceDollar, FaChartLine, FaListCheck, FaRepeat, FaUserDoctor,FaUserAstronaut} from 'react-icons/fa6'
import { usePathname } from 'next-intl/client';

function Navbar({currentLocale}) {

    const pathname = usePathname();

    console.log(pathname);

    const t = useTranslations('Dashboard');

    return (
        <>
            <div className='h-full flex flex-col w-1/6 border-r-[1px] border-foregroundPrimary20 px-8 py-10 gap-6 min-w-[250px]'>                
                <div className='h-1/5'>
                    <Image
                        src={renadylLogo}
                        alt='Renadyl'
                        className={`w-full relative top-0 left-0 transition-all duration-300`}
                    />
                </div>
                <div className='h-4/5'>
                    <nav className='flex flex-col gap-2'>
                        <li className='list-none'>
                            <Link href='/admin/dashboard' locale={currentLocale} className={`flex flex-row items-center content-center gap-4 text-lg px-3 py-2 rounded-lg ${pathname === '/admin/dashboard' ? 'bg-dashboardBlue20 text-dashboardBlue' : 'text-foregroundPrimary90 hover:bg-dashboardBlue10'} `}>
                                <FaHome className='text-2xl'/>
                                {t("admin.navbar.general")}
                            </Link>
                        </li>
                        <li className='list-none'>
                            <Link href='/admin/dashboard/orders' locale={currentLocale} className={`flex flex-row items-center content-center gap-4 text-lg px-3 py-2 rounded-lg ${pathname === '/admin/dashboard/orders' ? 'bg-dashboardBlue20 text-dashboardBlue' : 'text-foregroundPrimary90 hover:bg-dashboardBlue10'} `}>
                                <FaListCheck className='text-2xl'/>
                                {t("admin.navbar.orders")}
                            </Link>
                        </li>
                        <li className='list-none'>
                            <Link href='/admin/dashboard/subscriptions' locale={currentLocale} className={`flex flex-row items-center content-center gap-4 text-lg px-3 py-2 rounded-lg ${pathname === '/admin/dashboard/subscriptions' ? 'bg-dashboardBlue20 text-dashboardBlue' : 'text-foregroundPrimary90 hover:bg-dashboardBlue10'} `}>
                                <FaRepeat className='text-2xl'/>
                                {t("admin.navbar.subscriptions")}
                            </Link>
                        </li>
                        <li className='list-none'>
                            <Link href='/admin/dashboard/invoices' locale={currentLocale} className={`flex flex-row items-center content-center gap-4 text-lg px-3 py-2 rounded-lg ${pathname === '/admin/dashboard/invoices' ? 'bg-dashboardBlue20 text-dashboardBlue' : 'text-foregroundPrimary90 hover:bg-dashboardBlue10'} `}>
                                <FaFileInvoiceDollar className='text-2xl'/>
                                {t("admin.navbar.invoices")}
                            </Link>
                        </li>
                        <li className='list-none'>
                            <Link href='/admin/dashboard/analytics' locale={currentLocale} className={`flex flex-row items-center content-center gap-4 text-lg px-3 py-2 rounded-lg ${pathname === '/admin/dashboard/analytics' ? 'bg-dashboardBlue20 text-dashboardBlue' : 'text-foregroundPrimary90 hover:bg-dashboardBlue10'} `}>
                                <FaChartLine className='text-2xl'/>
                                {t("admin.navbar.analytics")}
                            </Link>
                        </li>
                        <li className='list-none'>
                            <Link href='/admin/dashboard/clients' locale={currentLocale} className={`flex flex-row items-center content-center gap-4 text-lg px-3 py-2 rounded-lg ${pathname === '/admin/dashboard/clients' ? 'bg-dashboardBlue20 text-dashboardBlue' : 'text-foregroundPrimary90 hover:bg-dashboardBlue10'} `}>
                                <FaUsers className='text-2xl'/>
                                {t("admin.navbar.clients")}
                            </Link>
                        </li>
                        <li className='list-none'>
                            <Link href='/admin/dashboard/medics' locale={currentLocale} className={`flex flex-row items-center content-center gap-4 text-lg px-3 py-2 rounded-lg ${pathname === '/admin/dashboard/medics' ? 'bg-dashboardBlue20 text-dashboardBlue' : 'text-foregroundPrimary90 hover:bg-dashboardBlue10'} `}>
                                <FaUserDoctor className='text-2xl'/>
                                {t("admin.navbar.medics")}
                            </Link>
                        </li>
                        <li className='list-none'>
                            <Link href='/admin/dashboard/distributors' locale={currentLocale} className={`flex flex-row items-center content-center gap-4 text-lg px-3 py-2 rounded-lg ${pathname === '/admin/dashboard/distributors' ? 'bg-dashboardBlue20 text-dashboardBlue' : 'text-foregroundPrimary90 hover:bg-dashboardBlue10'} `}>
                                <FaTruck className='text-2xl'/>
                                {t("admin.navbar.distributors")}
                            </Link>
                        </li>
                        <li className='list-none'>
                            <Link href='/admin/dashboard/affiliates' locale={currentLocale} className={`flex flex-row items-center content-center gap-4 text-lg px-3 py-2 rounded-lg ${pathname === '/admin/dashboard/affiliates' ? 'bg-dashboardBlue20 text-dashboardBlue' : 'text-foregroundPrimary90 hover:bg-dashboardBlue10'} `}>
                                <FaUserAstronaut className='text-2xl'/>
                                {t("admin.navbar.affiliates")}
                            </Link>
                        </li>
                        <li className='list-none'>
                            <Link href='/admin/dashboard/product' locale={currentLocale} className={`flex flex-row items-center content-center gap-4 text-lg px-3 py-2 rounded-lg ${pathname === '/admin/dashboard/product' ? 'bg-dashboardBlue20 text-dashboardBlue' : 'text-foregroundPrimary90 hover:bg-dashboardBlue10'} `}>
                                <FaPills className='text-2xl'/>
                                {t("admin.navbar.product")}
                            </Link>
                        </li>
                        <li className='list-none'>
                            <Link href='/admin/dashboard/settings' locale={currentLocale} className={`flex flex-row items-center content-center gap-4 text-lg px-3 py-2 rounded-lg ${pathname === '/admin/dashboard/settings' ? 'bg-dashboardBlue20 text-dashboardBlue' : 'text-foregroundPrimary90 hover:bg-dashboardBlue10'} `}>
                                <FaGear className='text-2xl'/>
                                {t("admin.navbar.settings")}
                            </Link>
                        </li>
   
                    </nav>
                </div>
                
            </div>
        </>
    )
}

export default Navbar

