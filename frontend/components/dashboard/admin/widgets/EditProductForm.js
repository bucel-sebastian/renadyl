"use client";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

function EditProductForm() {
  const [isRonOffer, setIsRonOffer] = useState(false);
  const [isEurOffer, setIsEurOffer] = useState(false);

  const [isRonPercentage, setIsRonPercentage] = useState(false);
  const [isEurPercentage, setIsEurPercentage] = useState(false);

  const [ronData, setRonData] = useState({});
  const [eurData, setEurData] = useState({});

  const [isProductDataLoading, setIsProductDataLoading] = useState(true);

  const t = useTranslations("Dashboard");

  const handleToggleRonOffer = (event) => {
    event.preventDefault();
    setIsRonOffer(!isRonOffer);
  };

  const handleToggleRonPercentage = (event) => {
    event.preventDefault();
    setIsRonPercentage(!isRonPercentage);
  };
  const handleToggleEurPercentage = (event) => {
    event.preventDefault();
    setIsEurPercentage(!isEurPercentage);
  };

  const handleToggleEurOffer = (event) => {
    event.preventDefault();
    setIsEurOffer(!isEurOffer);
  };

  const handleLeaveBtnClick = (event) => {
    event.preventDefault();
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
  };

  const getProductData = async (countryCode) => {
    console.log("Contry code - ", countryCode);
    const response = await fetch(
      `/api/admin/data/json/product/${countryCode}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log("data - ", countryCode, " - ", data);
    return data.body[0];
  };

  useEffect(() => {
    async function fetchData() {
      setRonData(await getProductData("RO"));
      setEurData(await getProductData("EN"));
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log("ron", ronData);
    console.log("eur", eurData);
    if (
      Object.keys(ronData).length !== 0 &&
      Object.keys(eurData).length !== 0
    ) {
      setIsProductDataLoading(false);
      setIsRonOffer(ronData.on_sale);
      setIsRonPercentage(ronData.sale_percentage);
      setIsEurOffer(eurData.on_sale);
      setIsEurPercentage(eurData.sale_percentage);
    }
  }, [ronData, eurData]);
  return (
    <>
      {isProductDataLoading ? (
        <div className="flex h-[300px] justify-center content-center items-center">
          {t("admin.product.edit-form.loading")}
        </div>
      ) : (
        <form>
          <div className="flex flex-row gap-4">
            <div className="w-1/2">
              <h3 className="text-xl mb-4">
                {t("admin.product.edit-form.ron.title")}
              </h3>
              <div className="w-full flex flex-col mb-2">
                <label className="px-1 text-foregroundPrimary70">
                  {t("admin.product.edit-form.ron.base-price-label")}
                </label>
                <input
                  type=""
                  name=""
                  value={ronData.price}
                  className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                />
              </div>
              <div className="w-full flex flex-col mb-2">
                <label className="px-1 text-foregroundPrimary70">
                  {t("admin.product.edit-form.ron.vat-label")}
                </label>
                <input
                  type=""
                  name=""
                  value={ronData.vat}
                  className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex flex-row items-center gap-6 content-center">
                  <div className="flex flex-row gap-2 items-center content-center">
                    <input
                      type="checkbox"
                      checked={isRonOffer}
                      readOnly
                      hidden
                    />
                    <button
                      type="button"
                      className={`relative w-[44px] h-max shadow-md rounded-full border-[1px] border-foregroundSecondary40 p-[1px] ${
                        isRonOffer ? "bg-dashboardBlue40" : ""
                      } transition-all duration-300`}
                      onClick={handleToggleRonOffer}
                    >
                      <div
                        className={`relative w-[20px] h-[20px] shadow-md rounded-full border-[1px] border-foregroundSecondary40 bg-backgroundPrimary ${
                          isRonOffer ? "translate-x-full" : "translate-x-0"
                        } duration-300 transition-all`}
                      ></div>
                    </button>
                    <label>
                      {t("admin.product.edit-form.ron.offer-toggle")}
                    </label>
                  </div>
                  <div className="flex flex-row gap-2 items-center content-center">
                    <input
                      type="checkbox"
                      checked={isRonPercentage}
                      readOnly
                      hidden
                    />
                    <button
                      type="button"
                      className={`relative w-[44px] h-max shadow-md rounded-full border-[1px] border-foregroundSecondary40 p-[1px] ${
                        isRonPercentage ? "bg-dashboardBlue40" : ""
                      } transition-all duration-300`}
                      onClick={handleToggleRonPercentage}
                      disabled={!isRonOffer}
                    >
                      <div
                        className={`relative w-[20px] h-[20px] shadow-md rounded-full border-[1px] border-foregroundSecondary40 bg-backgroundPrimary transform ${
                          isRonPercentage ? "translate-x-full" : "translate-x-0"
                        } duration-300 transition-all`}
                      ></div>
                    </button>
                    <label>
                      {t("admin.product.edit-form.ron.percentage-label")}
                    </label>
                  </div>
                </div>
                <div className={`w-full flex flex-col mb-2`}>
                  <label className="px-1 text-foregroundPrimary70">
                    {t("admin.product.edit-form.ron.offer-label")} (
                    {isRonPercentage ? "%" : "RON"})
                  </label>
                  <input
                    placeholder={t("admin.product.edit-form.eur.offer-label")}
                    type=""
                    name=""
                    value={ronData.sale_value}
                    className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                    required={isRonOffer}
                    disabled={!isRonOffer}
                  />
                </div>
              </div>
            </div>
            <div className="w-1/2">
              <h3 className="text-xl mb-4">
                {t("admin.product.edit-form.eur.title")}
              </h3>
              <div className="w-full flex flex-col mb-2">
                <label className="px-1 text-foregroundPrimary70">
                  {t("admin.product.edit-form.eur.base-price-label")}
                </label>
                <input
                  type=""
                  name=""
                  value={eurData.price}
                  className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                />
              </div>
              <div className="w-full flex flex-col mb-2">
                <label className="px-1 text-foregroundPrimary70">
                  {t("admin.product.edit-form.eur.vat-label")}
                </label>
                <input
                  type=""
                  name=""
                  value={eurData.vat}
                  className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex flex-row items-center gap-6 content-center">
                  <div className="flex flex-row gap-2 items-center content-center">
                    <input
                      type="checkbox"
                      checked={isEurOffer}
                      readOnly
                      hidden
                    />
                    <button
                      type="button"
                      className={`relative w-[44px] h-max shadow-md rounded-full border-[1px] border-foregroundSecondary40 p-[1px] ${
                        isEurOffer ? "bg-dashboardBlue40" : ""
                      } transition-all duration-300`}
                      onClick={handleToggleEurOffer}
                    >
                      <div
                        className={`relative w-[20px] h-[20px] shadow-md rounded-full border-[1px] border-foregroundSecondary40 bg-backgroundPrimary ${
                          isEurOffer ? "translate-x-full" : "translate-x-0"
                        } duration-300 transition-all`}
                      ></div>
                    </button>
                    <label>
                      {t("admin.product.edit-form.eur.offer-toggle")}
                    </label>
                  </div>
                  <div className="flex flex-row gap-2 items-center content-center">
                    <input
                      type="checkbox"
                      checked={isEurPercentage}
                      readOnly
                      hidden
                    />
                    <button
                      type="button"
                      className={`relative w-[44px] h-max shadow-md rounded-full border-[1px] border-foregroundSecondary40 p-[1px] ${
                        isEurPercentage ? "bg-dashboardBlue40" : ""
                      } transition-all duration-300`}
                      onClick={handleToggleEurPercentage}
                      disabled={!isEurOffer}
                    >
                      <div
                        className={`relative w-[20px] h-[20px] shadow-md rounded-full border-[1px] border-foregroundSecondary40 bg-backgroundPrimary transform ${
                          isEurPercentage ? "translate-x-full" : "translate-x-0"
                        } duration-300 transition-all`}
                      ></div>
                    </button>
                    <label>
                      {t("admin.product.edit-form.eur.percentage-label")}
                    </label>
                  </div>
                </div>
                <div className={`w-full flex flex-col mb-2`}>
                  <label className="px-1 text-foregroundPrimary70">
                    {t("admin.product.edit-form.eur.offer-label")} (
                    {isEurPercentage ? "%" : "EURO"})
                  </label>
                  <input
                    placeholder={t("admin.product.edit-form.eur.offer-label")}
                    type=""
                    name=""
                    value={eurData.sale_value}
                    className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                    required={isEurOffer}
                    disabled={!isEurOffer}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-row gap-2 mt-4">
            <button
              type="submit"
              className="px-6 py-2 bg-dashboardGreen border-2  text-backgroundPrimary rounded-lg "
            >
              {t("admin.product.edit-form.save-btn")}
            </button>
            <button
              type="button"
              className="px-6 py-2 bg-dashboardRed border-2 text-backgroundPrimary rounded-lg "
            >
              {t("admin.product.edit-form.leave-btn")}
            </button>
          </div>
        </form>
      )}
    </>
  );
}

export default EditProductForm;
