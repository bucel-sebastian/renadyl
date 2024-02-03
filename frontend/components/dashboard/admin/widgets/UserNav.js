import { signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import React from "react";

function UserNav() {
  const { data, update } = useSession();
  const fnameInitial = data?.user?.f_name?.charAt(0);

  const t = useTranslations("Dashboard");

  const handleSignOut = (e) => {
    e.preventDefault();
    if (data.user.role === "admin") {
      signOut({ callbackUrl: "/admin/login" });
    } else {
      signOut({ callbackUrl: "/login" });
    }
  };

  return (
    <div className="flex flex-row items-center content-center gap-3">
      <div className="w-[35px] flex justify-center align-center items-center aspect-square bg-gradientPurple text-backgroundPrimary font-bold rounded-full text-xl">
        {fnameInitial}
      </div>
      <div className="flex flex-col mr-4">
        <span className="w-full leading-none capitalize">
          {data?.user?.role === "doctor" ? "Dr. " : ""}
          {data?.user.f_name} {data?.user.l_name}
        </span>
        <span className="w-full leading-none capitalize">
          {data?.user?.role}
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