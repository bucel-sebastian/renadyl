"use client";
import { getSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import React from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ClientJoinAffiliates({ reloadData }) {
  const t = useTranslations("Dashboard.client.affiliates");

  const handleJoinAffiliateProgram = async (e) => {
    e.preventDefault();

    const session = await getSession();

    if (session) {
      const response = await fetch(`/api/client/add/join-affiliate`, {
        method: "POST",
        body: JSON.stringify({
          id: session?.user?.id,
        }),
      });

      if (response.ok) {
        const body = await response.json();
        if (body.response) {
          toast.success(t("affiliate-join-success"), {
            position: "bottom-right",
            autoClose: 2500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          reloadData();
        } else {
          toast.error(t("affiliate-join-fail"), {
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
        toast.error(t("affiliate-join-fail"), {
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
      toast.error(t("affiliate-join-fail"), {
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

  return (
    <>
      <h2 className="text-xl font-bold text-center ">
        {t("affiliate-join-title")}
      </h2>

      <button
        onClick={handleJoinAffiliateProgram}
        className="block  bg-gradient-to-r w-max from-gradientGreen via-gradientPurple to-gradientGreen bg-[length:200%] bg-left hover:bg-right duration-500 ease transition-all text-center text-2xl text-backgroundPrimary rounded-2xl py-3 px-12 mx-auto mt-4"
      >
        {t("affiliate-join-btn")}
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
    </>
  );
}

export default ClientJoinAffiliates;
