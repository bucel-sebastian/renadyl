import React from 'react'
import { getLocale } from 'next-intl/server'
import { useRouter } from 'next/navigation'

function LocaleSwitcherFooter() {
  const locales = ['ro', 'en', 'de'];
  const router = useRouter();

    return (
    <div>
        {currentLocale}
        {locale}
    </div>
  )
}

export default LocaleSwitcherFooter