'use client'

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import i18nConfig from '@/next-i18next.config';
import { ChangeEvent, useEffect } from 'react';

const LanguageSwitcher = () => {
    const router = useRouter();
    const currentPathname = usePathname();
    const { i18n } = useTranslation();

    const currentLocale = i18n.language;

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const newLocale = e.target.value

        const days = 1
        const date = new Date()
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
        const expires = ' expires=' + date.toUTCString()
        document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`

        if (currentLocale === i18nConfig.defaultLocale && !i18nConfig.prefixDefault) {
            router.push('/' + newLocale + currentPathname)
        } else {
            router.push(currentPathname.replace(`/${currentLocale}`, `/${newLocale}`))
        }
    }

    return (
        <select onChange={handleChange} value={currentLocale} className='text-black p-1 rounded-md'>
            <option value="en">
                English
            </option>
            <option value="ms">
                Malay
            </option>
        </select>
    );
}

export default LanguageSwitcher