'use client'
import Link from "next/link"
import { getTranslations } from "@/app/initTranslations";
import { useEffect, useState } from "react";
import type { LocalesProps } from "@/types"


const i18nNamespaces = ['navbar'];

const Navbar = ({ locale }: LocalesProps) => {
    const [translations, setTranslations] = useState(null);


    useEffect(() => {
        getTranslations(locale, i18nNamespaces).then(({ t, resources }) => {
            setTranslations({ t, resources });
        });
    }, [locale]);

    return (
        <>
            {translations &&
                <div className="bg-green-400 flex items-center justify-center gap-4 p-4 sticky top-0">
                    <Link href="/add">
                        <div className='border-2 border-black rounded-md py-2 px-4 cursor-pointer text-black font-semibold'>{translations.t('add')}</div>
                    </Link>

                    <Link href="/edit">
                        <div className='border-2 border-black rounded-md py-2 px-4 cursor-pointer text-black font-semibold'>{translations.t('edit')}</div>
                    </Link>

                    <Link href="/view">
                        <div className='border-2 border-black rounded-md py-2 px-4 cursor-pointer text-black font-semibold'>{translations.t('view')}</div>
                    </Link>

                    {/* <Link href="/profileuserapi">
                <div className='border-2 border-white rounded-md py-2 px-4 cursor-pointer'>Data KGISL</div>
            </Link> */}


                </div>
            }
        </>

    )
}

export default Navbar