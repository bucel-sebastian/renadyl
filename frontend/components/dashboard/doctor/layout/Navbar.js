"use client";
import { signOut, useSession } from "next-auth/react";

import React, { useState } from "react";

import Image from "next/image";
import Link from "next-intl/link";

import renadylLogo from "@/public/renadyl_logo.svg";
import { useTranslations } from "use-intl";

import { FaHome, FaShoppingCart, FaListUl } from "react-icons/fa";
import {
  FaGear,
  FaFileInvoiceDollar,
  FaRepeat,
  FaUserAstronaut,
  FaArrowRightFromBracket,
  FaUserDoctor,
  FaUsers,
} from "react-icons/fa6";
import { usePathname } from "next-intl/client";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/slices/cartSlice";

import { useRouter } from "next/navigation";

function Navbar({ currentLocale }) {
  const pathname = usePathname();

  console.log(pathname);

  const t = useTranslations("Dashboard");

  const router = useRouter();

  const dispatch = useDispatch();

  const handleBuyItem = (e) => {
    e.preventDefault();
    dispatch(addToCart({ productName: productData.productName }));
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
    router.push("/cart", { locale: currentLocale });
  };

  const handleSignOut = (e) => {
    e.preventDefault();
    signOut({ callbackUrl: "/login" });
  };

  return (
    <>
      <div className="h-full flex flex-col min-w-[250px] w-1/6 border-r-[1px] border-foregroundPrimary20 px-8 py-10 gap-6 max-lg:hidden">
        <div className="h-1/5">
          <Image
            src={renadylLogo}
            alt="Renadyl"
            className={`w-full relative top-0 left-0 transition-all duration-300`}
          />
        </div>
        <div className="h-3/5">
          <nav className="flex flex-col gap-2">
            <li className="list-none">
              <Link
                href="/dashboard/doctor/"
                locale={currentLocale}
                className={`flex flex-row items-center content-center gap-4 text-lg px-3 py-2 rounded-lg ${
                  pathname === "/dashboard/doctor"
                    ? "bg-dashboardBlue20 text-dashboardBlue"
                    : "text-foregroundPrimary90 hover:bg-dashboardBlue10"
                } `}
              >
                <FaHome className="text-2xl" />
                {t("doctor.navbar.general")}
              </Link>
            </li>
            <li className="list-none">
              <Link
                href="/dashboard/doctor/patients"
                locale={currentLocale}
                className={`flex flex-row items-center content-center gap-4 text-lg px-3 py-2 rounded-lg ${
                  pathname === "/dashboard/doctor/patients"
                    ? "bg-dashboardBlue20 text-dashboardBlue"
                    : "text-foregroundPrimary90 hover:bg-dashboardBlue10"
                } `}
              >
                <FaUsers className="text-2xl" />
                {t("doctor.navbar.patients")}
              </Link>
            </li>
            <li className="list-none">
              <Link
                href="/dashboard/doctor/affiliates"
                locale={currentLocale}
                className={`flex flex-row items-center content-center gap-4 text-lg px-3 py-2 rounded-lg ${
                  pathname === "/dashboard/doctor/affiliates"
                    ? "bg-dashboardBlue20 text-dashboardBlue"
                    : "text-foregroundPrimary90 hover:bg-dashboardBlue10"
                } `}
              >
                <FaUserDoctor className="text-2xl" />
                {t("doctor.navbar.affiliates")}
              </Link>
            </li>
            <li className="list-none">
              <Link
                href="/dashboard/doctor/settings"
                locale={currentLocale}
                className={`flex flex-row items-center content-center gap-4 text-lg px-3 py-2 rounded-lg ${
                  pathname === "/dashboard/doctor/settings"
                    ? "bg-dashboardBlue20 text-dashboardBlue"
                    : "text-foregroundPrimary90 hover:bg-dashboardBlue10"
                } `}
              >
                <FaGear className="text-2xl" />
                {t("doctor.navbar.settings")}
              </Link>
            </li>

            {/* <li className="list-none">
              <button
                className={` w-full flex flex-row items-center content-center gap-4 text-lg px-3 py-2 rounded-lg ${
                  pathname === "/dashboard/client/settings"
                    ? "bg-dashboardBlue20 text-dashboardBlue"
                    : "text-foregroundPrimary90 hover:bg-dashboardBlue10"
                } `}
                onClick={handleSignOut}
              >
                
                <FaArrowRightFromBracket className="text-2xl" />
                {t("doctor.navbar.logout")}
              </button>
            </li> */}
          </nav>
        </div>
        <div className="h-1/5"></div>
      </div>
    </>
  );
}

export default Navbar;
