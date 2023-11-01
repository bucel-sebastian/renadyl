import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import React from "react";
import CheckoutNotLoggedIn from "./CheckoutNotLoggedIn";
import CheckoutLoggedIn from "./CheckoutLoggedIn";

async function Checkout() {
  const session = await getServerSession(authOptions);

  return (
    <>
      {session ? (
        <>
          <CheckoutLoggedIn />
        </>
      ) : (
        <>
          <CheckoutNotLoggedIn />
        </>
      )}
    </>
  );
}

export default Checkout;
