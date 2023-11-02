import React, { useEffect } from "react";

function RedirectToPayment({ netopiaEnvKey, netopiaData }) {
  useEffect(() => {
    document.getElementById("netopiaDataFrom").submit();
  }, []);
  return (
    <>
      <form
        className="hidden"
        id="netopiaDataFrom"
        action="https://sandboxsecure.mobilpay.ro"
        method="POST"
        target="_blank"
      >
        <input type="hidden" name="env_key" value={netopiaEnvKey} />
        <input type="hidden" name="data" value={netopiaData} />
        <input
          type="hidden"
          name="signature"
          value="2VZR-GOQH-7A8W-VLRB-UOOW"
        />
      </form>
    </>
  );
}

export default RedirectToPayment;
