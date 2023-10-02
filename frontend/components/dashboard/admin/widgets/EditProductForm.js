'use client'
import { useTranslations } from 'next-intl'
import React, { useState } from 'react'

function EditProductForm() {

    const [isRonOffer,setIsRonOffer] = useState(false);
    const [isEurOffer,setIsEurOffer] = useState(false);

    const t = useTranslations("Dashboard");

    const handleToggleRonOffer = (event) => {
        event.preventDefault();
        setIsRonOffer(!isRonOffer);
    }
    const handleToggleEurOffer = (event) => {
        event.preventDefault();
        setIsEurOffer(!isEurOffer);
    }

    const handleLeaveBtnClick = (event) => {
        event.preventDefault();
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
    }

  return (
    <>
        <form>
            <div className='flex flex-row gap-4'>
                <div className='w-1/2'>
                    <h3 className='text-xl mb-4'>
                        {t("admin.product.edit-form.ron.title")}
                    </h3>
                    <div className="w-full flex flex-col mb-2">
                        <label className='px-1 text-foregroundPrimary70'>
                            {t("admin.product.edit-form.ron.prp-label")}
                        </label>
                        <input placeholder={t("admin.product.edit-form.eur.offer-label")} type="" name='' className='bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 ' />
                    </div>
                    <div className="w-full flex flex-col mb-2">
                        <label className='px-1 text-foregroundPrimary70'>
                            {t("admin.product.edit-form.ron.price-label")}
                        </label>
                        <input placeholder={t("admin.product.edit-form.eur.offer-label")} type="" name='' className='bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 ' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <div className='flex flex-row gap-2 items-center content-center'>
                            {/* <input type='checkbox' checked={isRonOffer} hidden defaultChecked /> */}
                            <button type='button' className={`relative w-[44px] h-max shadow-md rounded-full border-[1px] border-foregroundSecondary40 p-[1px] ${isRonOffer ? 'bg-dashboardBlue40' : ''} transition-all duration-300`} onClick={handleToggleRonOffer}>
                                <div className={`relative w-[20px] h-[20px] shadow-md rounded-full border-[1px] border-foregroundSecondary40 bg-backgroundPrimary translate-x-${isRonOffer ? 'full' : '0'} duration-300 transition-all`}></div>
                            </button>
                            <label>{t("admin.product.edit-form.ron.offer-toggle")}</label>
                        </div>
                        <div className={`w-full ${isRonOffer ? 'flex' : 'hidden' } flex-col mb-2`}>
                            <label className='px-1 text-foregroundPrimary70'>
                                {t("admin.product.edit-form.ron.offer-label")}
                            </label>
                            <input placeholder={t("admin.product.edit-form.eur.offer-label")} type="" name='' className='bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 ' required={isRonOffer} disabled={!isRonOffer} />
                        </div> 
                    </div>
                </div>
                <div className='w-1/2'> 
                    <h3 className='text-xl mb-4'>
                        {t("admin.product.edit-form.eur.title")}
                    </h3>
                    <div className="w-full flex flex-col mb-2">
                        <label className='px-1 text-foregroundPrimary70'>
                            {t("admin.product.edit-form.eur.prp-label")}
                        </label>
                        <input placeholder={t("admin.product.edit-form.eur.offer-label")} type="" name='' className='bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 ' />
                    </div>
                    <div className="w-full flex flex-col mb-2">
                        <label className='px-1 text-foregroundPrimary70'>
                            {t("admin.product.edit-form.eur.price-label")}
                        </label>
                        <input placeholder={t("admin.product.edit-form.eur.offer-label")} type="" name='' className='bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 ' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <div className='flex flex-row gap-2 items-center content-center'>
                            {/* <input type='checkbox' checked={isEurOffer} hidden defaultChecked /> */}
                            <button type='button' className={`relative w-[44px] h-max shadow-md rounded-full border-[1px] border-foregroundSecondary40 p-[1px] ${isEurOffer ? 'bg-dashboardBlue40' : ''} transition-all duration-300`} onClick={handleToggleEurOffer}>
                                <div className={`relative w-[20px] h-[20px] shadow-md rounded-full border-[1px] border-foregroundSecondary40 bg-backgroundPrimary translate-x-${isEurOffer ? 'full' : '0'} duration-300 transition-all`}></div>
                            </button>
                            <label>{t("admin.product.edit-form.eur.offer-toggle")}</label>
                        </div>
                        <div className={`w-full ${isEurOffer ? 'flex' : 'hidden' } flex-col mb-2`} >
                            <label className='px-1 text-foregroundPrimary70'>
                                {t("admin.product.edit-form.eur.offer-label")}
                            </label>
                            <input placeholder={t("admin.product.edit-form.eur.offer-label")} type="" name='' className='bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 ' required={isEurOffer} disabled={!isEurOffer} />
                        </div> 
                    </div>
                </div>

            </div>
            
                <div className='flex flex-row gap-2 mt-4'>
                    <button type='submit' className='px-6 py-2 bg-dashboardGreen border-2  text-backgroundPrimary rounded-lg '>
                        {t("admin.product.edit-form.save-btn")}
                    </button>
                    <button type='button' className='px-6 py-2 bg-dashboardRed border-2 text-backgroundPrimary rounded-lg '>
                        {t("admin.product.edit-form.leave-btn")}
                    </button>
                </div>
               
        </form> 
    </>
  )
}

export default EditProductForm