import { useTranslations } from "next-intl";
import React from "react";
import { FaUsers } from "react-icons/fa6";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ClientAffiliateData({ data }) {
  const t = useTranslations("Dashboard.client.affiliates");

  return (
    <>
      <div className="w-full flex flex-row gap-8 pb-8">
        <div className="w-3/4 relative border-foregroundPrimary10 border-[1px] rounded-xl shadow-xl p-4">
          <h2 className="text-xl font-bold mb-4">
            {t("affiliate-code-title")}
          </h2>

          <div className="flex flex-row ">
            <input
              readOnly
              value={data.code}
              className="w-3/4 text-center  outline-none  bg-foregroundSecondary10 py-2  rounded-l-lg"
            />

            <button
              onClick={() => {
                navigator.clipboard.writeText(data.code);
                toast.success(t("promocode-copy-success"), {
                  position: "bottom-right",
                  autoClose: 2500,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: true,
                  progress: undefined,
                  theme: "colored",
                });
              }}
              className="bg-gradientPurple text-backgroundPrimary px-4 rounded-r-lg w-1/4"
            >
              {t("promocode-copy-btn")}
            </button>
          </div>
        </div>
        <div className="w-1/4 relative border-foregroundPrimary10 border-[1px] rounded-xl shadow-xl flex flex-col bg-gradientPurple text-backgroundPrimary  p-4">
          <div className="flex flex-row gap-4 max-w-full overflow-hidden">
            <div className="text-5xl">
              <FaUsers />
            </div>
            <div>
              <h2 className="text-xl font-bold mb-4">
                {t("affiliate-code-stats-title")}
              </h2>
              <h3 className="text-2xl font-bold">
                {data.times_used} {t("affiliate-code-stats-subtitle")}
              </h3>
            </div>
          </div>
        </div>
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
    </>
  );
}

export default ClientAffiliateData;
