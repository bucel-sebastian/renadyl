"use client";
import Image from "next/image";
import React, { useState } from "react";

import prodImg from "@/public/images/product_image_1.png";
import { useTranslations } from "next-intl";

function Cart() {
  const [productQuantity, setProductQuantity] = useState(1);

  const t = useTranslations("Buy");

  const addQuantity = (event) => {
    event.preventDefault();
  };

  const reduceQuantity = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <div className="flex flex-row">
        <div className="w-1/3">
          <Image src={prodImg} />
        </div>
        <div className="w-2/3"></div>
      </div>
    </>
  );
}

export default Cart;
