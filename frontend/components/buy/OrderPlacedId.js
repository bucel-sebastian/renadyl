"use client";
import { notFound, useSearchParams } from "next/navigation";
import React from "react";

function OrderPlacedId() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  if (orderId) {
    return <>{orderId}</>;
  } else {
    notFound();
  }
}

export default OrderPlacedId;
