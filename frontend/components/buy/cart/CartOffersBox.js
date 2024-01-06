"use client";
import { addToCart, removeFromCart } from "@/redux/slices/cartSlice";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CartOffersBox() {
  const { cart } = useSelector((state) => state.cart);

  const [countryCode, setCountryCode] = useState(null);
  const [productDataIsLoading, setProductDataIsLoading] = useState(true);
  const [isBundleInCart, setIsBundleInCart] = useState(false);

  const [bundleProductData, setBundleProductData] = useState({
    currency: "",
    price: "",
    onSale: false,
    salePrice: "",
    salePercentage: false,
    saleValue: "",
  });
  const [singleProductData, setSingleProductData] = useState({
    currency: "",
    price: "",
    onSale: false,
    salePrice: "",
    salePercentage: false,
    saleValue: "",
  });

  const dispatch = useDispatch();

  const t = useTranslations("Cart");

  const handleConvertToBundle = () => {
    dispatch(removeFromCart("renal_single"));
    dispatch(addToCart({ productName: bundleProductData.productName }));
  };

  const getProductData = async (countryCode, productName) => {
    const response = await fetch(
      `/api/data/json/product/${countryCode}/${productName}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();

    if (productName === "renal_bundle") {
      await setBundleProductData({
        productName: data?.body?.product_name,
        currency: data?.body?.currency,
        price: data?.body?.price,
        onSale: data?.body?.on_sale,
        salePrice: data?.body?.sale_price,
        salePercentage: data?.body?.sale_percentage,
        saleValue: data?.body?.sale_value,
      });
    } else if (productName === "renal_single") {
      await setSingleProductData({
        productName: data?.body?.product_name,
        currency: data?.body?.currency,
        price: data?.body?.price,
        onSale: data?.body?.on_sale,
        salePrice: data?.body?.sale_price,
        salePercentage: data?.body?.sale_percentage,
        saleValue: data?.body?.sale_value,
      });
    }

    setProductDataIsLoading(false);
  };

  const getIpCountry = async () => {
    const response = await fetch("https://ipapi.co/json/");
    const data = await response.json();
    setCountryCode(data.country_code);
  };

  const addProductToCart = (productName) => {
    if (productName === "renal_bundle") {
      dispatch(addToCart({ productName: bundleProductData.productName }));
    } else if (productName === "renal_single") {
      dispatch(addToCart({ productName: singleProductData.productName }));
    }
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
  };

  const checkIfBundleInCart = () => {
    let boolValue = false;
    cart.forEach((item) => {
      if (item.productName === "renal_bundle") {
        boolValue = true;
      }
    });
    setIsBundleInCart(boolValue);
  };

  useEffect(() => {
    getIpCountry();
  }, []);
  useEffect(() => {
    if (countryCode !== null) {
      getProductData(countryCode, "renal_bundle");
      getProductData(countryCode, "renal_single");
    }
  }, [countryCode]);

  useEffect(() => {
    checkIfBundleInCart();
  }, [cart]);

  return (
    <>
      <Suspense fallback={""}>
        {isBundleInCart === false ? (
          <>
            <div className="w-full">
              <div className="relative  w-full flex flex-row items-center content-center flex-nowrap">
                <div className="w-1/6">
                  <Image
                    src="/images/product_image_2.png"
                    width={1000}
                    height={1000}
                    className="w-full aspect-square"
                    alt=""
                  />
                </div>
                <div className="relative w-5/6 h-full flex flex-col ">
                  <h2 className="font-bold text-center text-xl">
                    Profită acum de oferta noastră și poți cumpăra pachetul de 3
                    buc. Renadyl pentru doar 400 RON /buc.
                  </h2>
                  <button
                    onClick={handleConvertToBundle}
                    className="block bg-gradient-to-r w-[250px] from-gradientGreen via-gradientPurple to-gradientGreen bg-[length:200%] bg-left hover:bg-right duration-500 ease transition-all  text-backgroundPrimary rounded-2xl p-1 mx-auto "
                  >
                    <div className="w-full py-2 rounded-xl bg-backgroundPrimary text-center text-2xl text-foregroundPrimary font-bold">
                      {t("add-to-cart-btn")}
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="w-full">
              <h1 className="text-2xl font-bold mb-4 ">Produsele noastre</h1>
              <div className="flex flex-row max-md:flex-col max-md:gap-8">
                <div className="w-1/2 flex flex-row max-md:w-full">
                  <div className="w-1/3">
                    <Image
                      src="/images/product_image_1.png"
                      width={1000}
                      height={1000}
                      className="w-full aspect-square"
                      alt=""
                    />
                  </div>
                  <div className="w-2/3">
                    <h3 className="text-2xl font-bold text-center">
                      {t("renal-single-short-name")}
                    </h3>
                    <h4 className="text-center text-xl">
                      {singleProductData.onSale
                        ? singleProductData.salePrice
                        : singleProductData.price}{" "}
                      {singleProductData.currency}
                    </h4>
                    <button
                      onClick={() => addProductToCart("renal_single")}
                      className="block bg-gradient-to-r w-[200px] from-gradientGreen via-gradientPurple to-gradientGreen bg-[length:200%] bg-left hover:bg-right duration-500 ease transition-all  text-backgroundPrimary rounded-2xl p-1 mx-auto "
                    >
                      <div className="w-full py-2 rounded-xl bg-backgroundPrimary text-center text-2xl text-foregroundPrimary font-bold">
                        {t("add-to-cart-btn")}
                      </div>
                    </button>
                  </div>
                </div>
                <div className="w-1/2 flex flex-row max-md:w-full">
                  <div className="w-1/3">
                    <Image
                      src="/images/product_image_2.png"
                      width={1000}
                      height={1000}
                      className="w-full aspect-square"
                      alt=""
                    />
                  </div>
                  <div className="w-2/3">
                    <h3 className="text-2xl font-bold text-center">
                      {t("renal-bundle-short-name")}
                    </h3>
                    <h4 className="text-center text-xl">
                      {bundleProductData.onSale
                        ? bundleProductData.salePrice
                        : bundleProductData.price}{" "}
                      {bundleProductData.currency}
                    </h4>
                    <button
                      onClick={() => addProductToCart("renal_bundle")}
                      className="block bg-gradient-to-r w-[200px] from-gradientGreen via-gradientPurple to-gradientGreen bg-[length:200%] bg-left hover:bg-right duration-500 ease transition-all  text-backgroundPrimary rounded-2xl p-1 mx-auto "
                    >
                      <div className="w-full py-2 rounded-xl bg-backgroundPrimary text-center text-2xl text-foregroundPrimary font-bold">
                        {t("add-to-cart-btn")}
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
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
      </Suspense>
    </>
  );
}

export default CartOffersBox;
