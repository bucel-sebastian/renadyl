'use client'
import { useTranslations } from 'next-intl'
import React from 'react'

function MonthlySales() {

const t = useTranslations("Dashboard");
  return (
    <div className='w-full border-foregroundPrimary10 border-[1px] rounded-xl shadow-xl py-6 px-8 bg-backgroundPrimary'>
        <h3 className='text-2xl font-bold'>
                {t("admin.analytics.monthly-sales.title")}
            </h3>
        <table className='w-full'>
            <tr>
                <th className='text-left font-normal text-foregroundSecondary pb-2'>
                    {t("admin.analytics.monthly-sales.month")}
                </th>
                <th className='text-left font-normal text-foregroundSecondary pb-2'>
                    {t("admin.analytics.monthly-sales.total-sales")}
                </th>
                <th className='text-right font-normal text-foregroundSecondary pb-2'>
                    {t("admin.analytics.monthly-sales.value-ron")}
                </th>
                <th className='text-right font-normal text-foregroundSecondary pb-2'>
                    {t("admin.analytics.monthly-sales.value-eur")}
                </th>
            </tr>
            <tr className='border-b-[1px] border-b-foregroundSecondary20'>
                <td className='py-2'>09/2023</td>
                <td className='py-2'>23</td>
                <td className='text-right py-2'>1500</td>
                <td className='text-right py-2'>450</td>
            </tr>
            <tr className='border-b-[1px] border-b-foregroundSecondary20'>
                <td className='py-2'>08/2023</td>
                <td className='py-2'>23</td>
                <td className='text-right py-2'>1500</td>
                <td className='text-right py-2'>450</td>
            </tr>
            <tr className='border-b-[1px] border-b-foregroundSecondary20'>
                <td className='py-2'>07/2023</td>
                <td className='py-2'>23</td>
                <td className='text-right py-2'>1500</td>
                <td className='text-right py-2'>450</td>
            </tr>
            <tr className='border-b-[1px] border-b-foregroundSecondary20'>
                <td className='py-2'>06/2023</td>
                <td className='py-2'>23</td>
                <td className='text-right py-2'>1500</td>
                <td className='text-right py-2'>450</td>
            </tr>
            <tr className='border-b-[1px] border-b-foregroundSecondary20'>
                <td className='py-2'>05/2023</td>
                <td className='py-2'>23</td>
                <td className='text-right py-2'>1500</td>
                <td className='text-right py-2'>450</td>
            </tr>
            <tr className='border-b-[1px] border-b-foregroundSecondary20'>
                <td className='py-2'>04/2023</td>
                <td className='py-2'>23</td>
                <td className='text-right py-2'>1500</td>
                <td className='text-right py-2'>450</td>
            </tr>
        </table>
    </div>
  )
}

export default MonthlySales