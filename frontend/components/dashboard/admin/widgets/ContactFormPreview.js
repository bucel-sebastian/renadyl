"use client";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

import { FaXmark } from "react-icons/fa6";

function ContactFormPreview({
  closePreview,
  previewSubmission,
  markAsRead,
  markAsUnread,
}) {
  const t = useTranslations("Dashboard");

  const [markButton, setMarkButton] = useState(
    previewSubmission?.status ? (
      <>
        <button
          className="px-4 py-2 bg-gradientPurple text-backgroundPrimary rounded-lg "
          onClick={(e) => markAsRead(e, previewSubmission?.id)}
        >
          {t("admin.contact.contact-list.mark-read-btn")}
        </button>
      </>
    ) : (
      <>
        <button
          className="px-4 py-2 bg-gradientPurple text-backgroundPrimary rounded-lg "
          onClick={(e) => markAsUnread(e, previewSubmission?.id)}
        >
          {t("admin.contact.contact-list.mark-unread-btn")}
        </button>
      </>
    )
  );

  const handleClosePreview = (e) => {
    e.preventDefault();
    closePreview();
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    if (previewSubmission?.status === 0) {
      setMarkButton(
        <>
          <button
            className="px-4 py-2 bg-gradientPurple text-backgroundPrimary rounded-lg "
            onClick={(e) => markAsRead(e, previewSubmission?.id)}
          >
            {t("admin.contact.contact-list.mark-read-btn")}
          </button>
        </>
      );
    } else {
      setMarkButton(
        <>
          <button
            className="px-4 py-2 bg-gradientPurple text-backgroundPrimary rounded-lg "
            onClick={(e) => markAsUnread(e, previewSubmission?.id)}
          >
            {t("admin.contact.contact-list.mark-unread-btn")}
          </button>
        </>
      );
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [previewSubmission]);

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
            {t("admin.contact.contact-list.name-title")}
          </span>{" "}
          {previewSubmission?.fname} {previewSubmission?.lname}
        </p>
        <p>
          <span className="font-bold">
            {t("admin.contact.contact-list.date-title")}
          </span>{" "}
          {formatter?.format(new Date(previewSubmission?.date))}
        </p>
        <p>
          <span className="font-bold">
            {t("admin.contact.contact-list.email-title")}
          </span>{" "}
          {previewSubmission?.email}
        </p>
        {previewSubmission?.phone && previewSubmission?.phone !== "" ? (
          <>
            {" "}
            <p>
              <span className="font-bold">
                {t("admin.contact.contact-list.phone-title")}
              </span>{" "}
              {previewSubmission?.phone}
            </p>
          </>
        ) : (
          <></>
        )}

        <br />
        <p className="font-bold">
          {t("admin.contact.contact-list.message-title")}
        </p>
        <p>{previewSubmission?.message}</p>
        <br />

        <div className="w-full flex justify-center items-center content-center">
          {markButton}
        </div>
      </div>
    </div>
  );
}

export default ContactFormPreview;
