"use client";
import { useTranslations } from "next-intl";
import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveOrderData } from "@/redux/slices/cartSlice";
import { useRouter } from "next-intl/client";

function CartSummaryBox({ currentLocale }) {
  const router = useRouter();

  const { cart } = useSelector((state) => state.cart);
  const { promocode } = useSelector((state) => state.cart.checkoutData);
  const vatValue = 9;

  const [cartTotal, setCartTotal] = useState(0);
  const [promocodeTotal, setPromocodeTotal] = useState(0);
  const [vatTotal, setVatTotal] = useState(0);
  const [cartProductsTotalWithoutVat, setCartProductsTotalWithoutVat] =
    useState(0);
  const [productsSaleTotal, setProductsSaleTotal] = useState(0);

  const dispatch = useDispatch();
  const t = useTranslations("Cart");
  const calculateCartSummary = () => {
    let cartProductsTotal = 0;
    let cartProductsSaleTotal = 0;
    cart.forEach((item) => {
      if (item.onSale) {
        cartProductsTotal += item.salePrice * item.quantity;
        cartProductsSaleTotal += (item.salePrice - item.price) * item.quantity;
      } else {
        cartProductsTotal += item.price * item.quantity;
      }
    });

    let promocodeProductsSaleTotal = 0;
    if (promocode !== null) {
      promocodeProductsSaleTotal = (cartProductsTotal * promocode.value) / 100;
    }

    let cartTotalVat = (cartProductsTotal * vatValue) / 100;
    let cartProductsTotalWithoutVat = cartProductsTotal - cartTotalVat;

    let cartCalculatedTotal = cartProductsTotal - promocodeProductsSaleTotal;

    setCartTotal(cartCalculatedTotal);
    setPromocodeTotal(promocodeProductsSaleTotal);
    setVatTotal(cartTotalVat);
    setCartProductsTotalWithoutVat(cartProductsTotalWithoutVat);
    setProductsSaleTotal(cartProductsSaleTotal);

    // console.log(
    //   "summary caculator: ",
    //   cartProductsTotal,
    //   cartProductsSaleTotal,
    //   cartTotalVat,
    //   promocodeProductsSaleTotal,
    //   cartProductsTotalWithoutVat
    // );
  };

  const handleNextStep = (e) => {
    e.preventDefault();

    dispatch(
      saveOrderData({
        cartTotal: cartTotal,
        promocodeTotal: promocodeTotal,
        vatTotal: vatTotal,
        cartProductsTotalWithoutVat: cartProductsTotalWithoutVat,
        productsSaleTotal: productsSaleTotal,
      })
    );
    router.push("/checkout", { locale: currentLocale });
  };

  useEffect(() => {
    calculateCartSummary();
  }, [cart, promocode]);

  return (
    <>
      <Suspense fallback={<></>}>
        {cart && cart?.length === 0 ? (
          <></>
        ) : (
          <>
            <table className="w-full">
              <tbody>
                {cart.map((item, index) => (
                  <tr key={index}>
                    <td>
                      {item.productName === "renal_single"
                        ? t("renal-single-short-name")
                        : t("renal-bundle-short-name")}
                    </td>
                    <td align="right">
                      {item.quantity} {t("product-unit")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {productsSaleTotal !== 0 ? (
              <>
                <table className="w-full">
                  <tbody>
                    <tr>
                      <td>{t("total-sale")}</td>
                      <td align="right">
                        {productsSaleTotal} {cart[0]?.currency}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </>
            ) : (
              <></>
            )}
            <div>
              <p className="text-right">
                {t("total-products")}: {cartProductsTotalWithoutVat}{" "}
                {cart[0]?.currency}
              </p>
              <p className="text-right">
                {t("total-vat")} {vatValue}%: {vatTotal} {cart[0]?.currency}
              </p>
              {promocodeTotal !== 0 ? (
                <>
                  <p className="text-right">
                    {t("total-promocode")}: {promocodeTotal} {cart[0]?.currency}
                  </p>
                </>
              ) : (
                <></>
              )}
            </div>
            <h2 className="text-right text-2xl font-bold">
              {t("total-order")}: {cartTotal} {cart[0]?.currency}
            </h2>
            <div>
              <form onSubmit={handleNextStep}>
                <label>
                  <input type="checkbox" required />
                </label>
                <button className="block bg-gradient-to-r w-full from-gradientGreen via-gradientPurple to-gradientGreen bg-[length:200%] bg-left hover:bg-right duration-500 ease transition-all text-center text-3xl text-backgroundPrimary rounded-2xl py-3 mt-4">
                  {t("order-next-button")}
                </button>
              </form>
            </div>
          </>
        )}
      </Suspense>
    </>
  );
}

export default CartSummaryBox;
