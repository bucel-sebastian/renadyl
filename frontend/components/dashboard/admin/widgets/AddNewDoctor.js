"use client";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddNewDoctor({ getUpdatedData }) {
  const [showNewDoctor, setShowNewDoctor] = useState(false);

  const t = useTranslations("Dashboard.admin.doctors");

  const handleAddNewDoctor = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      <button
        onClick={() => setShowNewDoctor(!showNewDoctor)}
        className={`block  bg-gradient-to-r w-full from-gradientGreen via-gradientPurple to-gradientGreen bg-[length:200%] bg-left hover:bg-right duration-500 ease transition-[background] text-center text-2xl text-backgroundPrimary rounded-2xl mb-2 ${
          showNewDoctor ? "p-3" : "p-1"
        }`}
      >
        {showNewDoctor ? (
          <>{t("new-doctor-btn")}</>
        ) : (
          <>
            <div className="w-full py-2 rounded-xl bg-backgroundPrimary text-center text-2xl text-foregroundPrimary font-bold">
              {t("new-doctor-btn")}
            </div>
          </>
        )}
      </button>
      {showNewDoctor ? (
        <>
          <form onSubmit={handleAddNewDoctor}>
            <button
              type="submit"
              className="block  bg-gradient-to-r w-full from-gradientGreen via-gradientPurple to-gradientGreen bg-[length:200%] bg-left hover:bg-right duration-500 ease transition-all text-center text-2xl text-backgroundPrimary rounded-2xl py-3"
            >
              {t("submit-add-btn")}
            </button>
          </form>
        </>
      ) : (
        <></>
      )}
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
    </>
  );
}

export default AddNewDoctor;
