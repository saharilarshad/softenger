'use client'
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { createEmployeeStore } from "@/store/store"
import { getTranslations } from "@/app/initTranslations";
import TranslationsProvider from '@/context/AppTranslationProvider';
import type { LocalesProps, EmployeeData } from "@/types"

const i18nNamespaces = ['editEmployee'];

const EditPage = ({ params: { locale } }: { params: LocalesProps }) => {
  const [translations, setTranslations] = useState<undefined | null>(null);
  const [data, setData] = useState<EmployeeData | null>(null)
  const [deleteTrigger, setDeleteTrigger] = useState<number>(0);

  const fetchData = () => {
    setDeleteTrigger((prev) => prev + 1);
  };

  useEffect(() => {
    const getDataLocalStorage = localStorage.getItem('persist-employee')

    setData(JSON.parse(getDataLocalStorage as string))

    console.log('getDataLocalStorage', getDataLocalStorage)

  }, [deleteTrigger])

  // const removeEmploy = employeeStore((state: any) => state?.removeEmployee)
  const { removeEmployee } = createEmployeeStore();


  useEffect(() => {
    getTranslations(locale, i18nNamespaces).then(({ t, resources }) => {
      setTranslations({ t, resources });
    });
  }, [locale]);

  console.log(data)

  return (
    <>
      {translations &&
        <div className="bg-green-200 p-5 flex flex-wrap h-screen w-screen">
          {data && data.state.employee?.map((item: any) => (
            <div key={item.id} className="p-3 flex flex-col border-black border-2 items-center rounded-md mx-5 my-5 h-80 w-52 justify-around">
              <div className="w-48 h-24 items-center justify-center flex">
                <Image src={`/uploads/${item.profileImage}`} alt="item" width={100} height={100} className="w-24 h-24 rounded-full object-cover" />
              </div>

              <div className="flex flex-col gap-1 w-full">
                {/* <h3 className="text-xs items-center justify-center flex">{item.name}</h3> */}
                <h3 className="overflow-hidden text-ellipsis whitespace-nowrap w-full">{translations.t('Name')} : {item.name.length > 25 ? `${item.name.substring(0, 25)}...` : item.name}</h3>

                {/* <h3>RM {parseFloat(item.price)}</h3> */}
                <h3>{translations.t('Salary')} : RM {item.salary}</h3>
                <h3>{translations.t('Age')} : {item.age}</h3>
              </div>
              <div className="p-1 flex flex-row gap-2 items-center">
                <Link href={`/edit/${item.id}`}>
                  <button className="text-sm justify-center text-black border-2 border-black rounded-md text-black border-2 border-black rounded-md transition hover:bg-gradient-to-r from-green-500 to-green-700 hover:text-white">
                    <h3 className="mx-6 my-1">{translations.t('Edit')}</h3>
                  </button>
                </Link>

              </div>
            </div>
          ))}
        </div>
      }
    </>
  )
}

export default EditPage