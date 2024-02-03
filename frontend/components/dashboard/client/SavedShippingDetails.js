"use client";
import { getSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SavedShippingDetails({
  savedShippingDatas,
  savedShippingDatasFetched,
  getUpdatedData,
  showNewDatas,
}) {
  const t = useTranslations("Dashboard.client.settings");

  const handleDeleteShippingDetails = async (id, e) => {
    e.preventDefault();
    const session = await getSession();

    if (window.confirm(t("delete-shipping-confirm"))) {
      const response = await fetch(
        `/api/client/delete/shipping-data/${session.user.id}/${id}`
      );

      if (response.ok) {
        const body = await response.json();
        if (body.response) {
          getUpdatedData();
          toast.success(t("add-to-cart-success"), {
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
          toast.error(t("promocode-fail"), {
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
        toast.error(t("promocode-fail"), {
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
    }
  };

  return (
    <div className="rounded-lg overflow-hidden mt-4">
      <h2 className="text-xl font-bold">
        {t("shipping-title-saved")}
      </h2>
      <div
        className={`flex flex-col gap-2  ${
          showNewDatas ? "max-h-[400px]" : "max-h-[800px]"
        } h-full overflow-y-auto `}
      >
        {savedShippingDatasFetched === true ? (
          <>
            {savedShippingDatas.length === 0 ? (
              <></>
            ) : (
              <>
                {savedShippingDatas.map((option) => (
                  <div
                    key={option.id}
                    className={`w-full border-[1px] rounded-lg p-4 transition-all duration-[0.3s] items-start "border-foregroundPrimary20 flex flex-row"
                  `}
                  >
                    <div className="w-3/4">
                      <h4>
                        {option.f_name} {option.l_name}
                      </h4>

                      <p>{option.email}</p>
                      <p>{option.phone}</p>
                      <p>
                        {option.address} <br /> {option.postal_code},{" "}
                        {option.city},{option.state}, {option.country}
                      </p>
                    </div>
                    <button
                      className="w-1/4 flex flex-row justify-center items-center gap-2 text-dashboardRed"
                      onClick={() =>
                        handleDeleteShippingDetails(option.id, event)
                      }
                    >
                      <FaRegTrashCan className="mb-[3px]" />
                      <span className="max-lg:hidden">{t("delete-btn")}</span>
                    </button>
                  </div>
                ))}
              </>
            )}
          </>
        ) : (
          <></>
        )}
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
    </div>
  );
}

export default SavedShippingDetails;
