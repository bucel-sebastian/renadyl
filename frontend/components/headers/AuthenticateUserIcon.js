import { useSession } from "next-auth/react";
import React from "react";
import Link from "next-intl/link";
import { FaCircleUser } from "react-icons/fa6";

function AuthenticateUserIcon({ currentLocale }) {
  const session = useSession();

  const fnameInitial = session?.data?.user?.f_name?.charAt(0);

  return (
    <>
      {session !== null && fnameInitial ? (
        <>
          <Link
            href={
              session?.data?.user?.role === "admin"
                ? "/admin/dashboard"
                : "/dashboard/client"
            }
            locale={currentLocale}
            aria-label="Account"
          >
            <div className="w-[35px] flex justify-center align-center items-center aspect-square bg-gradientPurple text-backgroundPrimary font-bold rounded-full text-xl">
              {fnameInitial}
            </div>
          </Link>
        </>
      ) : (
        <>
          <Link href="/login" locale={currentLocale} aria-label="Account">
            <FaCircleUser className="text-[35px]" />
          </Link>
        </>
      )}
    </>
  );
}

export default AuthenticateUserIcon;
