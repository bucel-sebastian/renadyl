"use client";
import { useTranslations } from "next-intl";
import Link from "next-intl/link";
import React, { useEffect, useState } from "react";

import { FaXmark } from "react-icons/fa6";
function CancelRequestPreview({
  closePreview,
  previewRequest,
  acceptRequest,
  denyRequest,
}) {
  const t = useTranslations("Dashboard");

  const handleClosePreview = (e) => {
    e.preventDefault();
    closePreview();
  };

  const datetimeOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  const formatter = new Intl.DateTimeFormat("ro-RO", datetimeOptions);

  return (
    <div className=" fixed top-0 left-0 w-screen h-screen p-1 flex justify-center content-center items-center backdrop-blur z-50">
      <div className="max-w-[450px] min-w-[250px] w-full p-4 bg-backgroundPrimary rounded-xl border-[1px] border-foregroundPrimary20 shadow-xl">
        <button onClick={handleClosePreview} className="float-right text-xl">
          <FaXmark />
        </button>

        <p>
          <span className="font-bold">
            {t("admin.contact.contact-list.date-title")}
          </span>{" "}
          {formatter?.format(new Date(previewRequest?.date))}
        </p>
        <p>
          <span className="font-bold">
            {t("admin.contact.contact-list.order-title")}
          </span>{" "}
          <Link href={`/admin/dashboard/orders/${previewRequest?.order_id}`}>
            {previewRequest?.order_id}
          </Link>
        </p>

        <br />
        <p className="font-bold">
          {t("admin.contact.contact-list.reason-title")}
        </p>
        <p>{previewRequest?.reason}</p>
        <br />

        <div className="w-full flex justify-center items-center content-center gap-4">
          <button
            className="px-4 py-2 bg-dashboardRed text-backgroundPrimary rounded-lg "
            onClick={(e) => denyRequest(e, previewRequest.id)}
          >
            Refuză
          </button>
          <button
            className="px-4 py-2 bg-dashboardGreen text-backgroundPrimary rounded-lg "
            onClick={(e) => acceptRequest(e, previewRequest.id)}
          >
            Acceptă
          </button>
        </div>
      </div>
    </div>
  );
}

export default CancelRequestPreview;
