"use client";

import React, { useEffect, useState } from "react";
import WebsiteSettingsForm from "./settings/WebsiteSettingsForm";
import NewAdminForm from "./settings/NewAdminForm";
import AdminsList from "./settings/AdminsList";
import AdminAccountSettings from "./settings/AdminAccountSettings";
import { SessionProvider } from "next-auth/react";

function WebsiteSettings() {
  const [data, setData] = useState([]);
  const [dataIsLoading, setDataIsLoading] = useState(true);

  const getAdminsList = async () => {
    const response = await fetch("/api/admin/data/json/admins");
    if (response.ok) {
      const body = await response.json();

      console.log(body.body);

      setData(body.body);
      setDataIsLoading(false);
    }
  };
  useEffect(() => {
    if (dataIsLoading) {
      getAdminsList();
    }
  }, []);
  return (
    <div className="flex flex-col gap-4">
      <div className="w-full border-foregroundPrimary10 border-[1px] rounded-xl shadow-xl py-6 px-8 bg-backgroundPrimary">
        <SessionProvider>
          <AdminAccountSettings getUpdatedData={getAdminsList} />
        </SessionProvider>
      </div>
      <div className="flex flex-row gap-4">
        <div className="w-1/2 border-foregroundPrimary10 border-[1px] rounded-xl shadow-xl py-6 px-8 bg-backgroundPrimary">
          <WebsiteSettingsForm />
        </div>
        <div className="w-1/2 border-foregroundPrimary10 border-[1px] rounded-xl shadow-xl py-6 px-8 bg-backgroundPrimary">
          <NewAdminForm getUpdatedData={getAdminsList} />
        </div>
      </div>
      <div className="w-full border-foregroundPrimary10 border-[1px] rounded-xl shadow-xl py-6 px-8 bg-backgroundPrimary">
        <AdminsList dataIsLoading={dataIsLoading} data={data} />
      </div>
    </div>
  );
}

export default WebsiteSettings;
