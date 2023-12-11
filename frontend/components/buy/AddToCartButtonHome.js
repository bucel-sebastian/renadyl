"use client";
import { useTranslations } from "next-intl";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/slices/cartSlice";
import { useRouter, usePathname } from "next-intl/client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddToCartButtonHome({ currentLocale }) {
  const [countryCode, setCountryCode] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [productDataIsLoading, setProductDataIsLoading] = useState(true);

  const [productData, setProductData] = useState({
    currency: "",
    price: "",
    onSale: false,
    salePrice: "",
    salePercentage: false,
    saleValue: "",
  });

  const pathname = usePathname();
  const router = useRouter();

  const t = useTranslations("Index");

  const getIpCountry = async () => {
    const response = await fetch("https://ipapi.co/json/");
    const data = await response.json();
    setCountryCode(data.country_code);
  };

  const dispatch = useDispatch();

  // const { cartQuantity } = useSelector((state) => state.cart);
  const handleAddToCart = () => {
    setIsDisabled(true);
    dispatch(addToCart({ productName: productData.productName }));
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
      `/api/data/json/product/${countryCode}/renal_single`,
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
    setIsDisabled(false);
    setProductDataIsLoading(false);
  };

  useEffect(() => {
    getIpCountry();
  }, []);
  useEffect(() => {
    if (countryCode !== null) getProductData(countryCode);
  }, [countryCode]);

  return (
    <>
      {productDataIsLoading ? (
        <button
          className="block bg-gradient-to-r w-[300px] from-gradientGreen via-gradientPurple to-gradientGreen bg-[length:200%] bg-left hover:bg-right duration-500 ease transition-all text-center text-3xl text-backgroundPrimary rounded-2xl py-3"
          disabled={isDisabled}
        >
          <div className="h-[10px] flex justify-center items-center content-center">
            <span className="loader"></span>
          </div>
        </button>
      ) : (
        <button
          onClick={handleAddToCart}
          className="block bg-gradient-to-r w-[300px] from-gradientGreen via-gradientPurple to-gradientGreen bg-[length:200%] bg-left hover:bg-right duration-500 ease transition-all text-center text-3xl text-backgroundPrimary rounded-2xl py-3"
          disabled={isDisabled}
        >
          {t("buy-btn")}
        </button>
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

export default AddToCartButtonHome;
