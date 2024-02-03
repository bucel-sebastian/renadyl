"use client";
import { getSession, useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import ChangePassForm from "./ChangePassForm";
import ChangeUserDataFrom from "./ChangeUserDataFrom";

function ClientEditInfo() {
  const { update } = useSession();
  const [userInitialData, setUserInitialData] = useState(null);

  const getUserData = async () => {
    const session = await getSession();
    console.log("Session - ", session);
    const response = await fetch(
      `/api/client/data/json/get-user-data/${session.user.id}`
    );
    if (response.ok) {
      const body = await response.json();
      console.log("user data - ", body);
      setUserInitialData(body.body);

      console.log(
        "update- session - ",
        await update({
          f_name: body.body?.f_name,
          l_name: body.body?.l_name,
          email: body.body?.email,
          phone: body.body?.phone,
        })
      );
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="flex flex-row gap-16 max-xl:flex-col">
      {userInitialData !== null ? (
        <>
          <ChangeUserDataFrom
            userInitialData={userInitialData}
            getUserData={getUserData}
          />
          <ChangePassForm userId={userInitialData?.id} />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default ClientEditInfo;
