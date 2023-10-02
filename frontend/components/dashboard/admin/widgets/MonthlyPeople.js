'use client'
import { useTranslations } from 'next-intl';
import React from 'react'

import {FaUsers, FaTruck,FaUserDoctor,FaUserAstronaut} from 'react-icons/fa6'

function MonthlyPeople({type}) {
    
    const t = useTranslations("Dashboard");

    let peopleIcon;
    let peopleTitle;
    let peopleBg;

    switch (type) {
        case 'client':
            peopleIcon = <FaUsers />;
            peopleBg = "gradientPurple";
            peopleTitle = t("admin.analytics.monthly-people.clients");
            break;
        case 'distributor':
            peopleIcon = <FaTruck />;
            peopleBg = "gradientPurple";
            peopleTitle = t("admin.analytics.monthly-people.distributors");

            break;
        case 'medic':
            peopleIcon = <FaUserDoctor />;
            peopleBg = "gradientPurple";
            peopleTitle = t("admin.analytics.monthly-people.medics");
            break;
        case 'affiliate':
            peopleIcon = <FaUserAstronaut />;
            peopleBg = "gradientPurple";
            peopleTitle = t("admin.analytics.monthly-people.affiliates");
            break;
    }

  return (
    <>
        <div className={`relative w-[48%] border-foregroundPrimary10 border-[1px] rounded-xl shadow-xl flex flex-row gap-4 content-center items-center p-4 text-backgroundPrimary bg-${peopleBg}`} >
            <div className='text-5xl'>
                {peopleIcon}
            </div>
            <div>
                <h3 className='text-2xl font-bold'>31 {peopleTitle}</h3>
                <span className='text-lg'>+ 5</span>
            </div>
        </div>
    </>
  )
}

export default MonthlyPeople