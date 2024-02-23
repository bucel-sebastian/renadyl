"use client";
import { useTranslations } from "next-intl";
import React from "react";
import { useState } from "react";

function CancelOrderBtn({ orderData, t }) {
  const [openCancelRequestModal, setOpenCancelRequestModal] = useState(false);

  const handleCancelOrder = (e) => {
    e.preventDefault();
    setOpenCancelRequestModal(true);
    document.body.style.overflow = "hidden";
  };

  const handleDenyCancelOrder = (e) => {
    e.preventDefault();
    setOpenCancelRequestModal(false);
    document.body.style.overflow = "";
  };

  const requestCancelOrder = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/client/request-cancel-order`, {
      method: "POST",
      body: JSON.stringify({
        order_id: orderData.id,
        reason: cancelRequestReason,
      }),
    });
    if (response.ok) {
      const body = await response.json();
      if (body.response === true) {
        toast.success(t("request-cancel-order-success"), {
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
        toast.error(t("request-cancel-order-fail"), {
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
      handleDenyCancelOrder(e);
      getOrderData();
      setCancelRequestReason("");
    }
  };

  return (
    <>
      {orderData.status.toString() === "1" ||
      orderData.status.toString() === "2" ||
      orderData.status.toString() === "3" ? (
        <>
          <button
            className="text-backgroundPrimary bg-dashboardRed px-4 py-1 rounded-xl text-lg hover:bg-dashboardRed80 transition-all duration-[0.3s]"
            onClick={handleCancelOrder}
          >
            Cere anularea comenzii
          </button>
        </>
      ) : (
        <></>
      )}
      {openCancelRequestModal ? (
        <>
          <div className="w-screen h-screen p-1 flex justify-center content-center items-center fixed top-0 left-0">
            <div className="max-w-[450px] w-full p-4 bg-backgroundPrimary rounded-xl border-[1px] border-foregroundPrimary20 shadow-xl">
              <h4 className="font-bold text-center text-xl mb-2">
                Cerere de anulare comandă
              </h4>
              <form onSubmit={requestCancelOrder}>
                <label className="px-1 text-foregroundPrimary70">
                  Motivul pentru care doriti sa anulati comanda
                </label>
                <textarea
                  className="bg-backgroundPrimary duration-300 transition-all outline-none border-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1  resize-none h-[100px] w-full rounded-md"
                  required
                  value={cancelRequestReason}
                  onChange={(e) => setCancelRequestReason(e.target.value)}
                ></textarea>
                <div className="flex flex-row gap-8 justify-center content-center items-center">
                  <button
                    type="button"
                    onClick={handleDenyCancelOrder}
                    className="px-3 py-1 bg-dashboardRed text-backgroundPrimary rounded-xl border-[1px] border-foregroundPrimary20 hover:bg-dashboardRed80 transition-all duration-[0.3s]"
                  >
                    Anuleaza
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1 bg-dashboardGreen text-backgroundPrimary rounded-xl border-[1px] border-foregroundPrimary20 hover:bg-dashboardGreen80 transition-all duration-[0.3s]"
                  >
                    Trimite
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default CancelOrderBtn;
