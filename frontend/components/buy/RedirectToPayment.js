import React, { useEffect } from "react";

function RedirectToPayment({ netopiaEnvKey, netopiaData }) {
  useEffect(() => {
    document.getElementById("netopiaDataFrom").submit();
    console.log("din redirect env", netopiaEnvKey);
    console.log("din redirect data", netopiaData);
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
      </form>
    </>
  );
}

export default RedirectToPayment;
