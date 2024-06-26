"use client";
import LoadingBlock from "@/components/LoadingBlock";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function WebsiteSettingsForm() {
  const router = useRouter();
  const [dataIsLoading, setDataIsLoading] = useState(true);

  const [initialData, setInitialData] = useState([]);
  const [updatedData, setUpdatedData] = useState([]);

  const t = useTranslations("Dashboard.admin.settings.website-settings-form");

  const getWebsiteSettingsData = async () => {
    const response = await fetch("/api/admin/data/json/website/settings");

    if (response.ok) {
      const body = await response.json();
      console.log("website settings -", body);
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

  const handleSetStopSaleOff = (e) => {
    setUpdatedData((prevData) => ({ ...prevData, ["stop_sales"]: "0" }));
  };
  const handleSetStopSaleOn = (e) => {
    setUpdatedData((prevData) => ({ ...prevData, ["stop_sales"]: "1" }));
  };

  useEffect(() => {
    getWebsiteSettingsData();
  }, []);

  // useEffect(() => {
  //   const handleBeforeUnload = (event) => {
  //     if (initialData !== updatedData) {
  //       // Dacă datele nu sunt la fel, cere confirmare înainte de a părăsi pagina
  //       event.preventDefault();
  //       const leaveConfirmation = window.confirm(
  //         "Sigur dorești să părăsești pagina?"
  //       );
  //       if (leaveConfirmation) {
  //         // Dacă utilizatorul confirmă, continuă să părăsească pagina
  //         const nextPage = determineNextPage(); // determină ruta către pagina următoare
  //         router.push(nextPage);
  //       }
  //     }
  //   };

  //   window.addEventListener("beforeunload", handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, [initialData, updatedData, router]);

  useEffect(() => {
    console.log("initial data - ", initialData);
  }, [initialData]);

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
                  {t("shop-status-label")}
                </label>
                <div className="relative w-full mx-auto border-foregroundSecondary20  border-[1px] shadow-lg rounded-xl h-max overflow-hidden">
                  <div className="relative w-full flex flex-row bg-backgroundPrimary">
                    <div
                      className={`absolute w-1/2 top-0 left-0 ${
                        updatedData.stop_sales === "0"
                          ? "translate-x-0 bg-left rounded-r-lg"
                          : "translate-x-full bg-right rounded-l-lg"
                      }  h-full bg-gradient-to-r from-gradientGreen via-gradientPurple to-gradientGreen bg-[length:200%]  transition-all duration-300`}
                    ></div>
                    <button
                      onClick={handleSetStopSaleOff}
                      type="button"
                      className={`w-1/2 text-xl py-3 z-10 transition-all duration-300 ${
                        updatedData.stop_sales === "0"
                          ? "text-backgroundPrimary"
                          : "text-foregroundPrimary"
                      }`}
                    >
                      {t("turn-on-shop")}
                    </button>
                    <button
                      type="button"
                      onClick={handleSetStopSaleOn}
                      className={`w-1/2 text-xl py-3 z-10 transition-all duration-300 ${
                        updatedData.stop_sales === "1"
                          ? "text-backgroundPrimary"
                          : "text-foregroundPrimary"
                      }`}
                    >
                      {t("turn-off-shop")}
                    </button>
                  </div>
                </div>
                {/* <input
                  // placeholder={t("promotion-landing-page-ph")}
                  type="text"
                  name="promotion_landing_page"
                  onChange={handleChangeSettingsData}
                  value={updatedData?.promotion_landing_page}
                  className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                  required
                  readOnly={true}
                /> */}
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
