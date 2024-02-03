"use client";
import React, { useEffect, useState } from "react";

function ConfirmAccount({ activationCode }) {
  const [dataIsLoading, setDataIsLoading] = useState(true);
  const [confirmResponse, setConfirmResponse] = useState(false);

  const handleConfirmAccount = async () => {
    const response = await fetch(`/api/auth/confirm/${activationCode}`);
    if (response.ok) {
      const body = await response.json();
      if (body.response) {
        setConfirmResponse(true);
      } else {
        setConfirmResponse(false);
      }
    }
    setDataIsLoading(false);
  };

  if (activationCode !== null && dataIsLoading) {
    handleConfirmAccount();
  }

  return (
    <>
      {dataIsLoading ? (
        <>Se incarca</>
      ) : (
        <>
          {confirmResponse ? (
            <>Contul a fost activat</>
          ) : (
            <>Codul de activare este incorect</>
          )}
        </>
      )}
    </>
  );
}

export default ConfirmAccount;
