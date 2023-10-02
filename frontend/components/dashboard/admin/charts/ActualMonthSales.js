'use client'

import { useTranslations } from 'next-intl';
import React, { Suspense, useState } from 'react'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

function ActualMonthSales() {

    const t = useTranslations("Dashboard")

const [currency, setCurrency] = useState("ron");

const data = [
    {
        date: '01/09/2023',
        valueRon: '1520',
        valueEur: '300',
    },
    {
        date: '02/09/2023',
        valueRon: '628',
        valueEur: '100',
    },
    {
        date: '03/09/2023',
        valueRon: '3000',
        valueEur: '1000',
    },
    {
        date: '04/09/2023',
        valueRon: '120',
        valueEur: '0',
    },
    {
        date: '05/09/2023',
        valueRon: '1520',
        valueEur: '300',
    },
    {
        date: '06/09/2023',
        valueRon: '1520',
        valueEur: '300',
    },
    {
        date: '07/09/2023',
        valueRon: '1520',
        valueEur: '300',
    },
    {
        date: '08/09/2023',
        valueRon: '2100',
        valueEur: '300',
    },
    {
        date: '08/09/2023',
        valueRon: '2100',
        valueEur: '300',
    },
    {
        date: '08/09/2023',
        valueRon: '2100',
        valueEur: '300',
    },
    {
        date: '08/09/2023',
        valueRon: '2100',
        valueEur: '300',
    },
    {
        date: '08/09/2023',
        valueRon: '2100',
        valueEur: '300',
    },
    {
        date: '08/09/2023',
        valueRon: '2100',
        valueEur: '300',
    },
    {
        date: '08/09/2023',
        valueRon: '2100',
        valueEur: '300',
    },
    {
        date: '08/09/2023',
        valueRon: '2100',
        valueEur: '300',
    },
    {
        date: '08/09/2023',
        valueRon: '2100',
        valueEur: '300',
    },
    {
        date: '08/09/2023',
        valueRon: '2100',
        valueEur: '300',
    },
    {
        date: '08/09/2023',
        valueRon: '2100',
        valueEur: '300',
    },
    {
        date: '08/09/2023',
        valueRon: '2100',
        valueEur: '300',
    },
    {
        date: '08/09/2023',
        valueRon: '2100',
        valueEur: '300',
    },
    {
        date: '08/09/2023',
        valueRon: '2100',
        valueEur: '300',
    },
    {
        date: '08/09/2023',
        valueRon: '2100',
        valueEur: '300',
    },
    {
        date: '08/09/2023',
        valueRon: '2100',
        valueEur: '300',
    },
    {
        date: '08/09/2023',
        valueRon: '2100',
        valueEur: '300',
    },
    {
        date: '08/09/2023',
        valueRon: '2100',
        valueEur: '300',
    },
    {
        date: '08/09/2023',
        valueRon: '2100',
        valueEur: '300',
    },
    {
        date: '08/09/2023',
        valueRon: '2100',
        valueEur: '300',
    },
    {
        date: '08/09/2023',
        valueRon: '2100',
        valueEur: '300',
    },
    {
        date: '08/09/2023',
        valueRon: '2100',
        valueEur: '300',
    },
    {
        date: '08/09/2023',
        valueRon: '2100',
        valueEur: '300',
    },
    {
        date: '08/09/2023',
        valueRon: '2100',
        valueEur: '300',
    },
    {
        date: '08/09/2023',
        valueRon: '2100',
        valueEur: '300',
    },
    {
        date: '08/09/2023',
        valueRon: '2100',
        valueEur: '300',
    },
    {
        date: '08/09/2023',
        valueRon: '2100',
        valueEur: '300',
    },
    {
        date: '08/09/2023',
        valueRon: '2100',
        valueEur: '300',
    },
    {
        date: '08/09/2023',
        valueRon: '2100',
        valueEur: '300',
    },
    {
        date: '08/09/2023',
        valueRon: '2100',
        valueEur: '300',
    },
    {
        date: '08/09/2023',
        valueRon: '2100',
        valueEur: '300',
    },
    {
        date: '08/09/2023',
        valueRon: '2100',
        valueEur: '300',
    },
    {
        date: '08/09/2023',
        valueRon: '2100',
        valueEur: '300',
    },
    {
        date: '08/09/2023',
        valueRon: '2100',
        valueEur: '300',
    },
    {
        date: '08/09/2023',
        valueRon: '2100',
        valueEur: '300',
    },
    {
        date: '08/09/2023',
        valueRon: '2100',
        valueEur: '300',
    },
    {
        date: '08/09/2023',
        valueRon: '2100',
        valueEur: '300',
    },
    {
        date: '08/09/2023',
        valueRon: '2100',
        valueEur: '300',
    },
    {
        date: '08/09/2023',
        valueRon: '2100',
        valueEur: '300',
    },
    {
        date: '08/09/2023',
        valueRon: '2100',
        valueEur: '300',
    },
    {
        date: '08/09/2023',
        valueRon: '2100',
        valueEur: '300',
    },
    {
        date: '08/09/2023',
        valueRon: '2100',
        valueEur: '300',
    },
    {
        date: '08/09/2023',
        valueRon: '2100',
        valueEur: '300',
    },
    {
        date: '08/09/2023',
        valueRon: '2100',
        valueEur: '300',
    },
    {
        date: '08/09/2023',
        valueRon: '2100',
        valueEur: '300',
    },
]


const handleChangeCurrency = (curr) => {
    setCurrency(curr);
} 

  return (
    <div className='w-full border-foregroundPrimary10 border-[1px] rounded-xl shadow-xl py-6 px-8 bg-backgroundPrimary'>
        <div className='flex flex-row justify-between  mb-4 items-center content-center'>
        <div className='flex flex-row items-center content-center gap-4'>
            <h3 className='text-2xl font-bold'>
                {t("admin.analytics.actual-month-sales.title")}
            </h3>
            <div className='border-[1px] border-dashboardBlue80 rounded-md flex flex-row w-max overflow-hidden'>
                <button className={`py-2 font-bold px-4 border-r-[1px] border-foregroundPrimay ${currency === 'ron' ? 'bg-dashboardBlue40' : ''}`} onClick={()=>handleChangeCurrency("ron")}>
                    RON
                </button>
                <button className={`py-2 px-4 border-l-[1px] border-foregroundPrimay font-bold ${currency === 'eur' ? 'bg-dashboardBlue40' : ''}`} onClick={()=>handleChangeCurrency("eur")}>
                    EUR
                </button>
            </div>
        </div>
        <h3 className='text-2xl font-bold'>
            {t("admin.analytics.actual-month-sales.total")}: {currency === 'ron' ? `${data.reduce((sum, item) => sum + parseInt(item.valueRon, 10), 0)} RON` : `${data.reduce((sum, item) => sum + parseInt(item.valueEur, 10), 0)} EUR`}
        </h3>    
        </div>
        <Suspense>
            <ResponsiveContainer width="100%" height={200}>
                <LineChart
                    width="100%"
                    height="100%"
                    data={data}
                
                >
                    <Line type="monotone" dataKey={currency === 'ron' ? "valueRon": "valueEur"} stroke='var(--dashboard-blue)' />
                    
                    <CartesianGrid stroke="var(--foreground-secondary-20)"/>
                    <XAxis dataKey="date"/>
                    <YAxis hide={true} domain={[0,Math.max(...data.map(item=>item.valueRon))+100]} />
                    <Tooltip />
                </LineChart>
            </ResponsiveContainer>

        </Suspense>
    </div>
  )
}

export default ActualMonthSales