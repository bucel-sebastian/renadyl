import { signOut, useSession } from "next-auth/react";
import React from "react";

function UserNav() {
  const session = useSession();

  const fnameInitial = session?.data?.user?.f_name?.charAt(0);

  console.log("session - ", session, fnameInitial);

  const handleSignOut = (e) => {
    e.preventDefault();
    signOut({ callbackUrl: "/admin/login" });
  };

  return (
    <div className="flex flex-row items-center content-center gap-3">
      <div className="w-[35px] flex justify-center align-center items-center aspect-square bg-gradientPurple text-backgroundPrimary font-bold rounded-full text-xl">
        {fnameInitial}
      </div>
      <span>
        {session?.data?.user.f_name} {session?.data?.user.l_name}
      </span>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}

export default UserNav;
