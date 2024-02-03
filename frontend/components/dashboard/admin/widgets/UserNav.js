"use client";
import { signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next-intl/client";
import React, { useEffect, useState } from "react";

function UserNav() {
  const session = useSession();
  const router = useRouter();

  const [fnameInitial, setFnameInitial] = useState("");

  const t = useTranslations("Dashboard");

  const handleSignOut = (e) => {
    e.preventDefault();
    if (session.data.user.role === "admin") {
      signOut({ callbackUrl: "/admin/login" });
    } else {
      signOut({ callbackUrl: "/login" });
    }
  };

  useEffect(() => {
    console.log("nav user session.data ", session);
    setFnameInitial(session.data?.user?.f_name?.charAt(0));

    if (session.status === "unauthenticated") {
      router.replace("/");
    }
  }, [session]);

  return (
    <div className="flex flex-row items-center content-center gap-3">
      <div className="w-[35px] flex justify-center align-center items-center aspect-square bg-gradientPurple text-backgroundPrimary font-bold rounded-full text-xl">
        {fnameInitial}
      </div>
      <div className="flex flex-col mr-4">
        <span className="w-full leading-none capitalize">
          {session.data?.user?.role === "doctor" ? "Dr. " : ""}
          {session.data?.user.f_name} {session.data?.user.l_name}
        </span>
        <span className="w-full leading-none capitalize">
          {session.data?.user?.role}
        </span>
      </div>
      <button
        onClick={handleSignOut}
        className="block  bg-gradient-to-r  from-gradientGreen via-gradientPurple to-gradientGreen bg-[length:200%] bg-left hover:bg-right duration-500 ease transition-[background] text-center  text-backgroundPrimary rounded-2xl  p-1"
      >
        <div className="w-full py-1 px-4 rounded-xl bg-backgroundPrimary text-center  text-foregroundPrimary font-bold">
          {t("sign-out-btn")}
        </div>
      </button>
    </div>
  );
}

export default UserNav;
