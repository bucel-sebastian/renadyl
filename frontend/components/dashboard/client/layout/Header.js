import { SessionProvider, useSession } from "next-auth/react";

import { useTranslations } from "next-intl";
import { usePathname } from "next-intl/client";
import React from "react";
import renadylLogo from "@/public/renadyl_logo.svg";
import Image from "next/image";
import { useParams } from "next/navigation";
import UserNav from "../../admin/widgets/UserNav";
import DashboardPageTitle from "./DashboardPageTitle";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import SessionProviderInClient from "@/components/SessionProviderInClient";

function Header({ currentLocale }) {
  const session = getServerSession(authOptions);

  const t = useTranslations("Dashboard");

  return (
    <>
      <div className="hidden max-lg:fixed top-0 left-0 w-full max-lg:flex flex-row justify-between px-2 max-h-[75px] h-full z-50 bg-backgroundPrimary border-b-[1px] py-2">
        <div className="w-2/5 h-full">
          <Image
            src={renadylLogo}
            alt="Renadyl"
            className={`h-full relative top-0 left-0 transition-all duration-300`}
          />
        </div>
        <div className="w-3/5 h-full flex flex-row justify-end"></div>
      </div>
      <div className="max-lg:mt-[65px] h-[75px] flex flex-row items-center content-center justify-between">
        <DashboardPageTitle />
        <div>
          <SessionProviderInClient session={session}>
            <UserNav />
          </SessionProviderInClient>
        </div>
      </div>
    </>
  );
}

export default Header;
