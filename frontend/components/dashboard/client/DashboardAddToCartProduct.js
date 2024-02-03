"use client";

import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { addToCart } from "@/redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";

function DashboardAddToCartProduct({ product, currentLocale }) {
  const [countryCode, setCountryCode] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [productDataIsLoading, setProductDataIsLoading] = useState(true);

  const [productData, setProductData] = useState({
    currency: "",
    price: "",
    onSale: false,
    salePrice: "",
    salePercentage: false,
    saleValue: "",
  });

  const router = useRouter();

  const t = useTranslations("Product");

  const getIpCountry = async () => {
    const response = await fetch("https://ipapi.co/json/");
    const data = await response.json();
    setCountryCode(data.country_code);
  };

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ productName: product }));
    toast.success(t("add-to-cart-success"), {
      position: "bottom-right",
      autoClose: 2500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    router.push("/cart", { locale: currentLocale });
  };

  const getProductData = async (countryCode) => {
    const response = await fetch(
      `/api/data/json/product/${countryCode}/${product}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();

    await setProductData({
      productName: data?.body?.product_name,
      currency: data?.body?.currency,
      price: data?.body?.price,
      onSale: data?.body?.on_sale,
      salePrice: data?.body?.sale_price,
      salePercentage: data?.body?.sale_percentage,
      saleValue: data?.body?.sale_value,
    });
    setProductDataIsLoading(false);
  };

  useEffect(() => {
    getIpCountry();
  }, []);

  useEffect(() => {
    if (countryCode !== null) getProductData(countryCode);
  }, [countryCode]);

  useEffect(() => {
    console.log(productData);
  }, [productData]);

  return (
    <>
      {productDataIsLoading ? (
        <div className="h-[200px] flex justify-center items-center content-center">
          <span className="loader"></span>
        </div>
      ) : (
        <>
          {productData.price !== "" ? (
            <div className="max-md:mb-4 w-max max-md:mx-auto">
              <div className="text-3xl mb-4 w-max flex items-end max-sm:text-xl">
                <span className="mb-[1px]">
                  {t("hero-section.product-price")}:
                </span>
                &nbsp;
                <div>
                  {productData.onSale ? (
                    <div className="flex justify-between items-center content-center text-lg ">
                      <span>
                        <del>
                          {productData.price} {productData.currency}
                        </del>
                      </span>
                      <span className="bg-gradient-to-r from-gradientGreen to-gradientPurple text-backgroundPrimary ml-2 rounded-full px-4">
                        - {productData.saleValue}{" "}
                        {productData.salePercentage
                          ? "%"
                          : productData.currency}
                      </span>
                    </div>
                  ) : (
                    ""
                  )}

                  <div>
                    <span className="font-extrabold">
                      {productData.onSale
                        ? productData.salePrice
                        : productData.price}{" "}
                      {productData.currency}
                    </span>{" "}
                    /&nbsp;
                    <span>{t("hero-section.product-unit")}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-row gap-5 max-md:justify-center max-md:gap-2">
                <button
                  onClick={handleAddToCart}
                  // href="/buy"
                  // href="https://www.emag.ro/renadyl-pentru-insuficienta-renala-60-comprimate-rnd/pd/D1D5C3YBM/?cmpid=101143&gclid=CjwKCAjwsKqoBhBPEiwALrrqiI6-RpbKtsr_0UzHmEIo-6DLzegwvfrY7Lsg0TlhXC7_rcIdUbQIihoCoPgQAvD_BwE"
                  className="block bg-gradient-to-r w-[250px] from-gradientGreen via-gradientPurple to-gradientGreen bg-[length:200%] bg-left hover:bg-right duration-500 ease transition-all text-center text-2xl text-backgroundPrimary rounded-2xl py-2.5 max-sm:w-full"
                  disabled={isDisabled}
                >
                  {t("hero-section.product-client-buy-btn")}
                </button>
                {/* <button className="block bg-gradient-to-r w-[250px] from-gradientGreen via-gradientPurple to-gradientGreen bg-[length:200%] bg-left hover:bg-right duration-500 ease transition-all text-center text-2xl text-gradientGreen hover:text-gradientPurple rounded-2xl p-[3px]">
          <div className="bg-backgroundPrimary rounded-xl py-2.5 ">
              {t("hero-section.product-subscription-btn")}
          </div>
      </button> */}
              </div>
            </div>
          ) : (
            ""
          )}
        </>
      )}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default DashboardAddToCartProduct;
