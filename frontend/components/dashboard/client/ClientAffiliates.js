"use client";
import { SessionProvider, getSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import ClientJoinAffiliates from "./ClientJoinAffiliates";
import ClientAffiliateData from "./ClientAffiliateData";

import ClientPromocodes from "./ClientPromocodes";

function ClientAffiliates() {
  const [dataIsLoading, setDataIsLoading] = useState(true);
  const [affiliateData, setAffiliateData] = useState(null);
  const [promocodesData, setPromocodesData] = useState(null);

  const getAffiliateData = async () => {
    const session = await getSession();

    const response = await fetch(
      `/api/client/data/json/affiliate-data/${session?.user?.id}`
    );
    if (response.ok) {
      const body = await response.json();

      if (body.affiliateData !== null) {
        setAffiliateData(body.affiliateData);
      }

      if (body.promocodesData !== null) {
        setPromocodesData(body.promocodesData);
      }
      setDataIsLoading(false);
    }
  };

  useEffect(() => {
    getAffiliateData();
  }, []);

  useEffect(() => {
    console.log("Affiliate data - ", affiliateData);
    console.log("Promocode data - ", promocodesData);
  }, [affiliateData, promocodesData]);

  return (
    <SessionProvider>
      <>
        {dataIsLoading ? (
          <></>
        ) : (
          <>
            {affiliateData === null ? (
              <>
                <ClientJoinAffiliates reloadData={getAffiliateData} />
              </>
            ) : (
              <>
                <ClientAffiliateData data={affiliateData} />
              </>
            )}
            {promocodesData === null ? (
              <></>
            ) : (
              <>
                {promocodesData.length === 0 ? (
                  <></>
                ) : (
                  <>
                    <ClientPromocodes data={promocodesData} />
                  </>
                )}
              </>
            )}
          </>
        )}
      </>
    </SessionProvider>
  );
}

export default ClientAffiliates;
