'use client'
import { useTranslations } from 'next-intl'
import React, { Suspense } from 'react'
import { Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

function ClientsPie() {


    const t = useTranslations("Dashboard");

    const data = [
        {
            title: "Clienți autentificați",
            value: 7
        },
        {
            title: "Clienți anonimi",
            value: 14
        },
    ]

  return (
    <div className='w-full border-foregroundPrimary10 border-[1px] rounded-xl shadow-xl py-6 px-8 bg-backgroundPrimary'>
        <h3 className='text-2xl font-bold'>
                {t("admin.analytics.clients-pie.title")}
            </h3>
        <Suspense>
            <ResponsiveContainer width="100%" height={250}>
                <PieChart width="100%" height={250}>
                    <Pie data={data} dataKey="value" nameKey="title" cx="50%" cy="50%" outerRadius={90} fill='#197BBD' label />
                        
                    <Tooltip/>
                </PieChart>
            </ResponsiveContainer>
        </Suspense>
    </div>
  )
}

export default ClientsPie