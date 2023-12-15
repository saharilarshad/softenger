'use client'

import Image from "next/image"
import { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import axios from 'axios'
import { getTranslations } from "@/app/initTranslations";
import { useApiCache } from "@/context/CacheContextApi"
import type { SoftengerData, LocalesProps } from "@/types"

interface ApiResponse {
    data: SoftengerData[];
}


const i18nNamespaces = ['profile'];

const DataApi = ({ locale }: LocalesProps) => {
    const { cacheApiResponse, getCachedApiResponse } = useApiCache();

    const [translations, setTranslations] = useState<undefined | null>(null);

    const [dataSoftenger, setDataSoftenger] = useState<SoftengerData[] | null>(null)

    const { isPending, isError, data, error } = useQuery({
        queryKey: ['SoftengerData'],
        queryFn: async () => {

            const cachedResponse = getCachedApiResponse('SoftengerData');
            // console.log('cachedResponse', cachedResponse)
            if (cachedResponse) {
                return cachedResponse;
            }

            const res = await axios.get('https://reqres.in/api/users');
            const responseData = res.data;

            cacheApiResponse('SoftengerData', responseData);

            return responseData;
        }
    })

    // console.log(data?.data)

    useEffect(() => {
        if (data) {
            setDataSoftenger(data.data)
        }
    }, [data])


    useEffect(() => {
        getTranslations(locale, i18nNamespaces).then(({ t, resources }) => {
            setTranslations({ t, resources });
        });
    }, [locale]);

    // console.log(dataSoftenger)

    return (
        <>
            {translations &&
                <div className="bg-green-200 p-5 flex flex-col h-full w-screen items-center">
                    {dataSoftenger && dataSoftenger?.map((item: any) => (
                        <div key={item.id} className="p-3 flex flex-row border-2 border-black items-center rounded-md mx-5 my-5 w-[30rem] justify-between gap-5">
                            <div className="items-center justify-center flex w-1/3 bg-gradient-to-t from-green-200 via-green-400 to-green-500">
                                <Image src={item.avatar} alt="item" width={100} height={100} className="w-24 h-24 rounded-full object-cover" />
                            </div>

                            <div className="flex flex-col gap-1 w-2/3 items-start justify-start bg-gradient-to-t from-green-200 via-green-400 to-green-500">
                                <h3>{translations.t('First_Name')} : {item.first_name}</h3>
                                <h3>{translations.t('Last Name')} : {item.last_name}</h3>
                                <h3>Email : {item.email}</h3>
                            </div>

                        </div>

                    ))}
                </div>
            }
        </>
    )
}

export default DataApi