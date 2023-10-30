"use client";

import { Link, useTranslations } from "next-intl";
import React, { useState } from "react";

function DistributorsForm({ currentLocale }) {
  const t = useTranslations("Distributors");

  const [submitBtnEnabled, setSubmitBtnEnabled] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = new Object();

    const formData = new FormData(e.target);
    formData.forEach((data, key) => {
      requestBody[key] = data;
    });

    try {
      const response = await fetch("/api/submit-distributors-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      if (response.body === "success") {
        console.log("Formularul a fost trimis cu succes!");

        e.target.reset();
        setSubmitBtnEnabled(false);
      } else {
        console.error(
          `Eroare la trimiterea formularului: ${response.statusText}`
        );
      }
    } catch (error) {
      console.error(`Eroare la trimiterea formularului: ${error}`);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-8 max-md:flex-col max-md:gap-4">
            <div className="w-1/2 flex flex-col max-md:w-full ">
              <label className="px-1 text-foregroundPrimary70">
                {t("form.first-name-label")}*
              </label>
              <input
                placeholder={t("form.first-name-ph")}
                type="text"
                name="fname"
                className="duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                required
              />
            </div>
            <div className="w-1/2 flex flex-col max-md:w-full">
              <label className="px-1 text-foregroundPrimary70">
                {t("form.last-name-label")}*
              </label>
              <input
                placeholder={t("form.last-name-ph")}
                type="text"
                name="lname"
                className="duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                required
              />
            </div>
          </div>
          <div className="flex flex-row gap-8 max-md:flex-col max-md:gap-4">
            <div className="w-1/2 flex flex-col max-md:w-full ">
              <label className="px-1 text-foregroundPrimary70">
                {t("form.phone-label")}*
              </label>
              <input
                placeholder={t("form.phone-ph")}
                type="number"
                name="phone"
                className="duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                required
              />
            </div>
            <div className="w-1/2 flex flex-col max-md:w-full">
              <label className="px-1 text-foregroundPrimary70">
                {t("form.email-label")}*
              </label>
              <input
                placeholder={t("form.email-ph")}
                type="email"
                name="email"
                className="duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                required
              />
            </div>
          </div>
          <div className="flex flex-row gap-8 max-md:flex-col max-md:gap-4">
            <div className="w-1/2 flex flex-col max-md:w-full ">
              <label className="px-1 text-foregroundPrimary70">
                {t("form.company-name-label")}*
              </label>
              <input
                placeholder={t("form.company-name-ph")}
                type="text"
                name="company_name"
                className="duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                required
              />
            </div>
            <div className="w-1/2 flex flex-col max-md:w-full">
              <label className="px-1 text-foregroundPrimary70">
                {t("form.company-cif-label")}*
              </label>
              <input
                placeholder={t("form.company-cif-ph")}
                type="text"
                name="company_cif"
                className="duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                required
              />
            </div>
          </div>
          <div className="flex flex-row gap-2 ">
            <div className="w-full flex flex-col">
              <label className="px-1 text-foregroundPrimary70">
                {t("form.message-label")}*
              </label>
              <textarea
                rows={3}
                placeholder={t("form.message-ph")}
                name="message"
                className="resize-none duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 h-max"
                required
              />
            </div>
          </div>
          <div className="flex flex-row gap-1">
            <label>
              <input type="checkbox" name="gdpr" required />{" "}
              {t("form.tc-label")}{" "}
              <Link href="/useful/terms-and-conditions" locale={currentLocale}>
                {t("form.tc-link")}
              </Link>
            </label>
          </div>
          {!submitBtnEnabled ? (
            <h3 className="text-right text-gradientPurple">
              {t("form.message-success")}
            </h3>
          ) : (
            <button
              type="submit"
              className="block bg-gradient-to-r w-[200px] from-gradientGreen via-gradientPurple to-gradientGreen bg-[length:200%] bg-left hover:bg-right duration-500 ease transition-all text-center text-2xl text-backgroundPrimary rounded-2xl py-2 ml-auto mr-0"
            >
              {t("form.submit-btn")}
            </button>
          )}
        </div>
      </form>
    </>
  );
}

export default DistributorsForm;
