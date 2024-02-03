"use client";

import React, { useState } from "react";
import Image from "next/image";

import img1 from "@/public/images/product_image_1.png";
import img2 from "@/public/images/product_image_2.png";
import img3 from "@/public/images/product_image_3.png";
// import img4 from "@/public/images/product_image_4.png";

function ProductImageSlider() {
  const [actualImage, setActualImage] = useState(img1);

  const switchImage = (img) => {
    setActualImage(img);
  };

  return (
    <div className="px-8">
      <div className="w-full aspect-square">
        <Image
          src={actualImage}
          width={1000}
          height={1000}
          className="aspect-square max-w-full h-full object-contain"
          alt="Renadyl Product Image"
          priority={true}
        />
      </div>
      <div className="w-full flex flex-row gap-2 pt-4">
        <button
          className="p-3 aspect-square w-1/4 transition-all duration-300 hover:p-2"
          onClick={() => {
            switchImage(img1);
          }}
        >
          <Image
            src={img1}
            width={1000}
            height={1000}
            className="object-contain aspect-square"
            alt="Renadyl Product Image - 1"
          />
        </button>
        <button
          className="p-3 aspect-square w-1/4 transition-all duration-300 hover:p-2"
          onClick={() => {
            switchImage(img2);
          }}
        >
          <Image
            src={img2}
            width={1000}
            height={1000}
            className="object-contain aspect-square"
            alt="Renadyl Product Image - 2"
          />
        </button>
        <button
          className="p-3 aspect-square w-1/4 transition-all duration-300 hover:p-2"
          onClick={() => {
            switchImage(img3);
          }}
        >
          <Image
            src={img3}
            width={1000}
            height={1000}
            className="object-contain aspect-square"
            alt="Renadyl Product Image - 3"
          />
        </button>
        {/* <button
          className="p-3 aspect-square w-1/4 transition-all duration-300 hover:p-2"
          onClick={() => {
            switchImage(img4);
          }}
        >
          <Image
            src={img4}
            width={1000}
            height={1000}
            className="object-contain aspect-square"
            alt="Renadyl Product Image - 4"
          />
        </button> */}
      </div>
    </div>
  );
}

export default ProductImageSlider;
