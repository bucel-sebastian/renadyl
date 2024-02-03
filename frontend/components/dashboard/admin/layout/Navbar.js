"use client";

import React, { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next-intl/link";

import renadylLogo from "@/public/renadyl_logo.svg";
import { useTranslations } from "use-intl";

import { FaHome, FaShoppingCart, FaListUl } from "react-icons/fa";
import {
  FaGear,
  FaUsers,
  FaTruck,
  FaPills,
  FaFileInvoiceDollar,
  FaChartLine,
  FaListCheck,
  FaRepeat,
  FaUserDoctor,
  FaUserAstronaut,
  FaArrowRotateLeft,
  FaEnvelope,
} from "react-icons/fa6";
import { usePathname } from "next-intl/client";

function Navbar({ currentLocale }) {
  const [notifications, setNotifications] = useState({});

  const pathname = usePathname();

  const t = useTranslations("Dashboard");

  const getNotificationData = async () => {
    const response = await fetch(`/api/admin/data/json/notifications`);
    if (response.ok) {
      const body = await response.json();
      setNotifications(body.body);
    }
  };

  useEffect(() => {
    getNotificationData();

    const handleNavbarInterval = (e) => {
      getNotificationData();
    };

    const navbarInterval = setInterval(handleNavbarInterval, 60000);
    return () => {
      clearInterval(navbarInterval);
    };
  }, []);

  return (
    <>
      <div className="h-full flex flex-col w-1/6 border-r-[1px] border-foregroundPrimary20 px-4 pt-10 pb-2 gap-6 min-w-[250px]">
        <div className="px-2">
          <Image
            src={renadylLogo}
            alt="Renadyl"
            className={`w-full relative top-0 left-0 transition-all duration-300`}
          />
        </div>
        <div className="h-5/6 overflow-y-auto px-2">
          <nav className="flex flex-col gap-2">
            <li className="list-none">
              <Link
                href="/admin/dashboard"
                locale={currentLocale}
                className={`flex flex-row items-center content-center gap-4 text-lg px-3 py-2 rounded-lg ${
                  pathname === "/admin/dashboard"
                    ? "bg-dashboardBlue20 text-dashboardBlue"
                    : "text-foregroundPrimary90 hover:bg-dashboardBlue10"
                } `}
              >
                <FaHome className="text-2xl" />
                {t("admin.navbar.general")}
              </Link>
            </li>
            <li className="list-none">
              <Link
                href="/admin/dashboard/orders"
                locale={currentLocale}
                className={`flex flex-row items-center content-center gap-4 text-lg px-3 py-2 relative rounded-lg ${
                  pathname === "/admin/dashboard/orders"
                    ? "bg-dashboardBlue20 text-dashboardBlue"
                    : "text-foregroundPrimary90 hover:bg-dashboardBlue10"
                } `}
              >
                {notifications?.orders && notifications?.orders !== "0" ? (
                  <>
                    <div className="absolute top-0 translate-x-[-25%] translate-y-[-25%] left-0 w-[25px] h-[25px] flex justify-center content-center items-center rounded-full bg-[#f1c40d] text-md  text-foregroundPrimary">
                      {notifications.orders}
                    </div>
                  </>
                ) : (
                  <></>
                )}
                <FaListCheck className="text-2xl" />
                {t("admin.navbar.orders")}
              </Link>
            </li>
            <li className="list-none">
              <Link
                href="/admin/dashboard/cancel-requests"
                locale={currentLocale}
                className={`flex flex-row items-center content-center gap-4 text-lg px-3 py-2 relative  rounded-lg ${
                  pathname === "/admin/dashboard/cancel-requests"
                    ? "bg-dashboardBlue20 text-dashboardBlue"
                    : "text-foregroundPrimary90 hover:bg-dashboardBlue10"
                } `}
              >
                {notifications?.cancelRequests &&
                notifications?.cancelRequests !== "0" ? (
                  <>
                    <div className="absolute top-0 translate-x-[-25%] translate-y-[-25%] left-0 w-[25px] h-[25px] flex justify-center content-center items-center rounded-full bg-[#e74d3d] text-md text-foregroundPrimary">
                      {notifications.cancelRequests}
                    </div>
                  </>
                ) : (
                  <></>
                )}
                <FaArrowRotateLeft className="text-2xl" />
                {t("admin.navbar.cancel-orders")}
              </Link>
            </li>
            <li className="list-none">
              <Link
                href="/admin/dashboard/subscriptions"
                locale={currentLocale}
                className={`flex flex-row items-center content-center gap-4 text-lg px-3 py-2 rounded-lg ${
                  pathname === "/admin/dashboard/subscriptions"
                    ? "bg-dashboardBlue20 text-dashboardBlue"
                    : "text-foregroundPrimary90 hover:bg-dashboardBlue10"
                } `}
              >
                <FaRepeat className="text-2xl" />
                {t("admin.navbar.subscriptions")}
              </Link>
            </li>
            <li className="list-none">
              <Link
                href="/admin/dashboard/invoices"
                locale={currentLocale}
                className={`flex flex-row items-center content-center gap-4 text-lg px-3 py-2 rounded-lg ${
                  pathname === "/admin/dashboard/invoices"
                    ? "bg-dashboardBlue20 text-dashboardBlue"
                    : "text-foregroundPrimary90 hover:bg-dashboardBlue10"
                } `}
              >
                <FaFileInvoiceDollar className="text-2xl" />
                {t("admin.navbar.invoices")}
              </Link>
            </li>
            <li className="list-none">
              <Link
                href="/admin/dashboard/analytics"
                locale={currentLocale}
                className={`flex flex-row items-center content-center gap-4 text-lg px-3 py-2 rounded-lg ${
                  pathname === "/admin/dashboard/analytics"
                    ? "bg-dashboardBlue20 text-dashboardBlue"
                    : "text-foregroundPrimary90 hover:bg-dashboardBlue10"
                } `}
              >
                <FaChartLine className="text-2xl" />
                {t("admin.navbar.analytics")}
              </Link>
            </li>
            <li className="list-none">
              <Link
                href="/admin/dashboard/clients"
                locale={currentLocale}
                className={`flex flex-row items-center content-center gap-4 text-lg px-3 py-2 rounded-lg ${
                  pathname === "/admin/dashboard/clients"
                    ? "bg-dashboardBlue20 text-dashboardBlue"
                    : "text-foregroundPrimary90 hover:bg-dashboardBlue10"
                } `}
              >
                <FaUsers className="text-2xl" />
                {t("admin.navbar.clients")}
              </Link>
            </li>
            <li className="list-none">
              <Link
                href="/admin/dashboard/medics"
                locale={currentLocale}
                className={`flex flex-row items-center content-center gap-4 text-lg px-3 py-2 relative  rounded-lg ${
                  pathname === "/admin/dashboard/medics"
                    ? "bg-dashboardBlue20 text-dashboardBlue"
                    : "text-foregroundPrimary90 hover:bg-dashboardBlue10"
                } `}
              >
                {notifications?.inactiveDoctors &&
                notifications?.inactiveDoctors !== "0" ? (
                  <>
                    <div className="absolute top-0 translate-x-[-25%] translate-y-[-25%] left-0 w-[25px] h-[25px] flex justify-center content-center items-center rounded-full bg-[#e74d3d] text-md  text-foregroundPrimary">
                      {notifications.inactiveDoctors}
                    </div>
                  </>
                ) : (
                  <></>
                )}
                <FaUserDoctor className="text-2xl" />
                {t("admin.navbar.medics")}
              </Link>
            </li>
            <li className="list-none">
              <Link
                href="/admin/dashboard/distributors"
                locale={currentLocale}
                className={`flex flex-row items-center content-center gap-4 text-lg px-3 py-2 relative rounded-lg ${
                  pathname === "/admin/dashboard/distributors"
                    ? "bg-dashboardBlue20 text-dashboardBlue"
                    : "text-foregroundPrimary90 hover:bg-dashboardBlue10"
                } `}
              >
                {notifications?.distribuitorForm &&
                notifications?.distribuitorForm !== "0" ? (
                  <>
                    <div className="absolute top-0 translate-x-[-25%] translate-y-[-25%] left-0 w-[25px] h-[25px] flex justify-center content-center items-center rounded-full bg-[#f1c40d] text-md  text-foregroundPrimary">
                      {notifications.distribuitorForm}
                    </div>
                  </>
                ) : (
                  <></>
                )}
                <FaTruck className="text-2xl" />
                {t("admin.navbar.distributors")}
              </Link>
            </li>
            <li className="list-none">
              <Link
                href="/admin/dashboard/affiliates"
                locale={currentLocale}
                className={`flex flex-row items-center content-center gap-4 text-lg px-3 py-2 rounded-lg ${
                  pathname === "/admin/dashboard/affiliates"
                    ? "bg-dashboardBlue20 text-dashboardBlue"
                    : "text-foregroundPrimary90 hover:bg-dashboardBlue10"
                } `}
              >
                <FaUserAstronaut className="text-2xl" />
                {t("admin.navbar.affiliates")}
              </Link>
            </li>
            <li className="list-none">
              <Link
                href="/admin/dashboard/product"
                locale={currentLocale}
                className={`flex flex-row items-center content-center gap-4 text-lg px-3 py-2 rounded-lg ${
                  pathname === "/admin/dashboard/product"
                    ? "bg-dashboardBlue20 text-dashboardBlue"
                    : "text-foregroundPrimary90 hover:bg-dashboardBlue10"
                } `}
              >
                <FaPills className="text-2xl" />
                {t("admin.navbar.product")}
              </Link>
            </li>
            <li className="list-none">
              <Link
                href="/admin/dashboard/contact"
                locale={currentLocale}
                className={`flex flex-row items-center relative content-center gap-4 text-lg px-3 py-2 rounded-lg ${
                  pathname === "/admin/dashboard/contact"
                    ? "bg-dashboardBlue20 text-dashboardBlue"
                    : "text-foregroundPrimary90 hover:bg-dashboardBlue10"
                } `}
              >
                {notifications?.contactForm &&
                notifications?.contactForm !== "0" ? (
                  <>
                    <div className="absolute top-0 translate-x-[-25%] translate-y-[-25%] left-0 w-[25px] h-[25px] flex justify-center content-center items-center rounded-full bg-[#f1c40d] text-md  text-foregroundPrimary">
                      {notifications.contactForm}
                    </div>
                  </>
                ) : (
                  <></>
                )}
                <FaEnvelope className="text-2xl" />
                {t("admin.navbar.contact")}
              </Link>
            </li>
            <li className="list-none">
              <Link
                href="/admin/dashboard/settings"
                locale={currentLocale}
                className={`flex flex-row items-center content-center gap-4 text-lg px-3 py-2 rounded-lg ${
                  pathname === "/admin/dashboard/settings"
                    ? "bg-dashboardBlue20 text-dashboardBlue"
                    : "text-foregroundPrimary90 hover:bg-dashboardBlue10"
                } `}
              >
                <FaGear className="text-2xl" />
                {t("admin.navbar.settings")}
              </Link>
            </li>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Navbar;
