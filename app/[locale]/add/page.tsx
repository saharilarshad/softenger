'use client'

import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Toaster, toast } from 'sonner'
import { createEmployeeStore } from "@/store/store"
import { ErrorMessage } from "@hookform/error-message"
import { getTranslations } from "@/app/initTranslations";
import TranslationsProvider from '@/context/AppTranslationProvider';
import { useEffect, useState } from "react";
import type {LocalesProps, FormData} from "@/types"

const i18nNamespaces = ['addEmployee'];


const AddPage = ({ params: { locale } }: { params: LocalesProps }) => {
    const [translations, setTranslations] = useState<undefined | null>(null);
    const { register, handleSubmit, getValues, watch, reset, formState: { errors } } = useForm<FormData>();
    const [file, setFile] = useState<File | null>(null)

    // const currentLocale = 'en';
    const currentLocale = locale;

    const addEmploy = createEmployeeStore((state:any) => state.addEmployee);
    // console.log('addEmploy', addEmploy)

    const onSubmit : FormData = async (data: HTMLFormElement, e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append("image", file);
        formData.append("name", data.name)
        formData.append("salary", data.salary);
        formData.append("age", data.age);

        if (addEmploy) {
            // await setDataReady(formData)
            await addEmploy(formData)
            toast.success("Employee has been Added!");
            setFile(null)
            reset()

            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            console.log("here1")
            toast.error("Something went wrong!");
        }


    };


    useEffect(() => {
        getTranslations(locale, i18nNamespaces).then(({ t, resources }) => {
            setTranslations({ t, resources });
        });
    }, [locale]);


    return (
        <>
            <Toaster position="top-center" richColors />
            {translations &&
                <div className="bg-green-200 p-5 flex flex-wrap h-screen w-screen">
                    <div className='flex items-center justify-center mx-auto'>
                        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="flex flex-col gap-4 w-[27rem]">

                            <div className="flex flex-col gap-1 ">
                                <label className="font-semibold flex items-center justify-center" htmlFor="">Profile Image</label>
                                <div className="flex h-[10rem] w-[10rem] rounded-full border-2 border-dashed border-white items-center justify-center mx-auto"
                                    style={file && { backgroundImage: `url(${URL.createObjectURL(file)})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
                                >
                                    <div className="h-[5rem] w-[5rem] mx-auto cursor-pointer"
                                        style={{ backgroundImage: `url(/upload.png)`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', opacity: file ? 0 : 1 }}
                                    >
                                        <input
                                            {...register("image", {
                                                required: "Image is required",
                                            })}
                                            type="file"
                                            id="picture"
                                            accept='image/*'
                                            // hidden
                                            className="h-full w-full inset-0 opacity-0 cursor-pointer text-black"
                                            onChange={(e) => {
                                                if (e.target.files) {
                                                    setFile(e.target.files?.[0])
                                                }
                                            }}
                                        />
                                        <ErrorMessage
                                            errors={errors}
                                            name="image"
                                            render={({ message }) => <p className="text-red-500">{message}</p>}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="font-semibold" htmlFor="">{translations.t('Name')}</label>
                                <input className='border-2 border-gray-300 focus:ring rounded-md p-1 text-black'
                                    {...register("name", {
                                        required: "Must have at least 3 character",
                                        maxLength: {
                                            value: 50,
                                            message: "Name must not exceed 50 characters",
                                        },
                                        minLength: {
                                            value: 3,
                                            message: "Name must be at least 3 characters",
                                        }
                                    })} />
                                <ErrorMessage
                                    errors={errors}
                                    name="name"
                                    render={({ message }) => <p className="text-red-500">{message}</p>}
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="font-semibold" htmlFor="">{translations.t('Salary')} RM</label>
                                <input className='border-2 border-gray-300 focus:ring rounded-md p-1 text-black'
                                    type="number" {...register("salary", {
                                        required: "Must have at least 2 number",
                                        maxLength: {
                                            value: 7,
                                            message: "Name must not exceed 7",
                                        },
                                        minLength: {
                                            value: 2,
                                            message: "Name must be at least 2",
                                        }
                                    })} />
                                <ErrorMessage
                                    errors={errors}
                                    name="salary"
                                    render={({ message }) => <p className="text-red-500">{message}</p>}
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="font-semibold" htmlFor="">{translations.t('Age')}</label>
                                <input className='border-2 border-gray-300 focus:ring rounded-md p-1 text-black'
                                    type="number" {...register("age", {
                                        required: "Must have at least 2 number",
                                        maxLength: {
                                            value: 3,
                                            message: "Name must not exceed 3",
                                        },
                                        minLength: {
                                            value: 2,
                                            message: "Name must be at least 2",
                                        }
                                    })} />
                                <ErrorMessage
                                    errors={errors}
                                    name="age"
                                    render={({ message }) => <p className="text-red-500">{message}</p>}
                                />
                            </div>

                            <button type="submit" className="text-white p-2 justify-center mt-3 bg-black p-1 rounded-md cursor-pointer text-center border-2 border-white" onClick={() => console.log("clicked")}>{translations.t('Add Employee')}</button>

                        </form >
                    </div >
                </div>
            }
        </>

    )
}

export default AddPage