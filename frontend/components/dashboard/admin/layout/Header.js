import { useTranslations } from "next-intl";
import React from "react";
import UserNav from "../widgets/UserNav";
import AdminDashboardPageTitle from "./AdminDashboardPageTitle";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import SessionProviderInClient from "@/components/SessionProviderInClient";

function Header({ currentLocale }) {
  const session = getServerSession(authOptions);
  const t = useTranslations("Dashboard");

  return (
    <>
      <div className="h-[75px] flex flex-row items-center content-center justify-between">
        <AdminDashboardPageTitle />
        <div>
          <SessionProviderInClient session={session}>
            <UserNav currentLocale={currentLocale} />
          </SessionProviderInClient>
        </div>
      </div>
    </>
  );
}

export default Header;
