"use client";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function NewAdminForm({ getUpdatedData }) {
  const [formData, setFormData] = useState({
    f_name: "",
    l_name: "",
    email: "",
    password: "",
  });

  const t = useTranslations("Dashboard.admin.settings.new-admin-form");

  const handleChangeFormData = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleNewAdminSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/admin/create/new/admin", {
      method: "POST",
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const body = await response.json();

      if (body.response) {
        getUpdatedData();
        setFormData({ f_name: "", l_name: "", email: "", password: "" });
        toast.success(t("new-admin-success"), {
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
        toast.error(t(`new-admin-fail-${body.error}`), {
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
      toast.error(t(`new-admin-fail`), {
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

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <>
      <h2 className="text-xl font-bold">{t("new-admin-title")}</h2>
      <form onSubmit={handleNewAdminSubmit}>
        <div className="w-full flex flex-col mb-2 max-md:w-full">
          <label className="px-1 text-foregroundPrimary70">
            {t("fname-label")}
          </label>
          <input
            placeholder={t("fname-ph")}
            type="text"
            name="f_name"
            onChange={handleChangeFormData}
            value={formData?.f_name}
            className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
            required
          />
        </div>
        <div className="w-full flex flex-col mb-2 max-md:w-full">
          <label className="px-1 text-foregroundPrimary70">
            {t("lname-label")}
          </label>
          <input
            placeholder={t("lname-ph")}
            type="text"
            name="l_name"
            onChange={handleChangeFormData}
            value={formData?.l_name}
            className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
            required
          />
        </div>
        <div className="w-full flex flex-col mb-2 max-md:w-full">
          <label className="px-1 text-foregroundPrimary70">
            {t("email-label")}
          </label>
          <input
            placeholder={t("email-ph")}
            type="email"
            name="email"
            onChange={handleChangeFormData}
            value={formData?.email}
            className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
            required
          />
        </div>
        <div className="w-full flex flex-col mb-2 max-md:w-full">
          <label className="px-1 text-foregroundPrimary70">
            {t("password-label")}
          </label>
          <input
            placeholder={t("password-ph")}
            type="password"
            name="password"
            onChange={handleChangeFormData}
            value={formData?.password}
            className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
            required
          />
        </div>
        <button
          type="submit"
          className="block  bg-gradient-to-r w-full from-gradientGreen via-gradientPurple to-gradientGreen bg-[length:200%] bg-left hover:bg-right duration-500 ease transition-all text-center text-2xl text-backgroundPrimary rounded-2xl py-3"
        >
          {t("submit-add-btn")}
        </button>
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
  );
}

export default NewAdminForm;
