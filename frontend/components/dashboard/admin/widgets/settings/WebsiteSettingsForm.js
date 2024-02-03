"use client";
import LoadingBlock from "@/components/LoadingBlock";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function WebsiteSettingsForm() {
  const [dataIsLoading, setDataIsLoading] = useState(true);

  const [initialData, setInitialData] = useState([]);
  const [updatedData, setUpdatedData] = useState([]);

  const t = useTranslations("Dashboard.admin.settings.website-settings-form");

  const getWebsiteSettingsData = async () => {
    const response = await fetch("/api/admin/data/json/website/settings");

    if (response.ok) {
      const body = await response.json();

      const data = body.body.reduce((accumulator, { name, value }) => {
        accumulator[name] = value;
        return accumulator;
      }, {});

      setInitialData(data);
      setUpdatedData(data);
      setDataIsLoading(false);
    }
  };

  const handleChangeSettingsData = (e) => {
    const { name, value } = e.target;

    setUpdatedData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/admin/update/website/settings", {
      method: "POST",
      body: JSON.stringify(updatedData),
    });

    if (response.ok) {
      const body = await response.json();
      if (body.response === true) {
        getWebsiteSettingsData();
        toast.success(t("change-settings-success"), {
          position: "bottom-right",
          autoClose: 2500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        toast.error(t("change-settings-fail"), {
          position: "bottom-right",
          autoClose: 2500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } else {
      toast.error(t("change-settings-fail"), {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    setUpdatedData(initialData);
  };

  useEffect(() => {
    getWebsiteSettingsData();
  }, []);

  return (
    <>
      <h2 className="text-xl font-bold">{t("website-settings-title")}</h2>
      {dataIsLoading ? (
        <>
          <LoadingBlock />
        </>
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <div className="w-full flex flex-col mb-2 max-md:w-full">
              <div className="w-full flex flex-col mb-2 max-md:w-full">
                <label className="px-1 text-foregroundPrimary70">
                  {t("vat-label")}
                </label>
                <input
                  placeholder={t("vat-ph")}
                  type="number"
                  name="vat"
                  onChange={handleChangeSettingsData}
                  value={updatedData?.vat}
                  className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                  required
                />
              </div>
              <div className="w-full flex flex-col mb-2 max-md:w-full">
                <label className="px-1 text-foregroundPrimary70">
                  {t("vat-int-label")}
                </label>
                <input
                  placeholder={t("vat-int-ph")}
                  type="number"
                  name="vat_int"
                  onChange={handleChangeSettingsData}
                  value={updatedData?.vat_int}
                  className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                  required
                />
              </div>
              <div className="w-full flex flex-col mb-2 max-md:w-full">
                <label className="px-1 text-foregroundPrimary70">
                  {t("invoice-series-label")}
                </label>
                <input
                  placeholder={t("invoice-series-ph")}
                  type="text"
                  name="invoice_series"
                  onChange={handleChangeSettingsData}
                  value={updatedData?.invoice_series}
                  className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                  required
                />
              </div>
              <div className="w-full flex flex-col mb-2 max-md:w-full">
                <label className="px-1 text-foregroundPrimary70">
                  {t("promotion-landing-page-label")}
                </label>
                <input
                  // placeholder={t("promotion-landing-page-ph")}
                  type="text"
                  name="promotion_landing_page"
                  onChange={handleChangeSettingsData}
                  value={updatedData?.promotion_landing_page}
                  className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                  required
                  readOnly={true}
                />
              </div>
            </div>
            <div className="flex flex-row gap-4 ">
              <button
                onClick={handleReset}
                type="button"
                className="block  bg-dashboardRed hover:bg-dashboardRed80 w-1/2  duration-300 ease transition-all text-center text-2xl text-backgroundPrimary rounded-2xl py-3"
              >
                {t("reset-btn")}
              </button>
              <button
                type="submit"
                className="block  bg-gradient-to-r w-1/2 from-gradientGreen via-gradientPurple to-gradientGreen bg-[length:200%] bg-left hover:bg-right duration-500 ease transition-all text-center text-2xl text-backgroundPrimary rounded-2xl py-3"
              >
                {t("submit-btn")}
              </button>
            </div>
            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </form>
        </>
      )}
    </>
  );
}

export default WebsiteSettingsForm;
