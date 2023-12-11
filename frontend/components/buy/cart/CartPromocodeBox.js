"use client";
import { useTranslations } from "next-intl";
import React, { Suspense, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaXmark } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { removePromocode, setPromocode } from "@/redux/slices/cartSlice";

function CartPromocodeBox() {
  const { promocode } = useSelector((state) => state.cart.checkoutData);

  const [promocodeValue, setPromocodeValue] = useState(null);
  const [promocodeInput, setPromocodeInput] = useState("");

  const dispatch = useDispatch();

  const t = useTranslations("Cart");

  const checkPromocode = async (code) => {
    const formData = new Object();

    formData["code"] = code;
    const response = await fetch("/api/check-promocode", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      const responseJson = await response.json();
      const body = await responseJson.body;
      setPromocodeValue(body.value);
    } else {
      dispatch(removePromocode());
    }
  };

  const handleSubmitPromocode = async (e) => {
    e.preventDefault();

    const formData = new Object();

    formData["code"] = promocodeInput;

    const response = await fetch("/api/check-promocode", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      const responseJson = await response.json();
      const body = await responseJson.body;

      if (body !== null) {
        e.target.reset();
        setPromocodeInput("");
        dispatch(setPromocode(body.code));
        setPromocodeValue(body.value);
        toast.success(t("promocode-success"), {
          position: "bottom-right",
          autoClose: 2500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        toast.error(t("promocode-fail"), {
          position: "bottom-right",
          autoClose: 2500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } else {
      toast.error(t("promocode-fail"), {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const handlePromocodeInput = (e) => {
    setPromocodeInput(e.target.value);
  };

  const handleRemovePromocode = (e) => {
    e.preventDefault();
    dispatch(removePromocode());
  };

  useEffect(() => {
    console.log(promocode);
    if (promocode !== null && promocodeValue === null) {
      checkPromocode(promocode);
    }
  }, [promocode]);

  return (
    <>
      <Suspense fallback={""}>
        {promocode === null ? (
          <>
            <form onSubmit={handleSubmitPromocode}>
              <div className="w-full flex flex-col ">
                <input
                  placeholder={t("promocode-input-ph")}
                  type="text"
                  name="promocode"
                  value={promocodeInput}
                  onChange={handlePromocodeInput}
                  required
                  className="duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                />
              </div>
              <button className="block bg-gradient-to-r w-full from-gradientGreen via-gradientPurple to-gradientGreen bg-[length:200%] bg-left hover:bg-right duration-500 ease transition-all text-center text-2xl text-backgroundPrimary rounded-2xl py-2 mt-2">
                {t("promocode-button")}
              </button>
            </form>
          </>
        ) : (
          <>
            <table className="w-full">
              <tbody>
                <tr>
                  <td>
                    {promocode} - {promocodeValue}%
                  </td>
                  <td align="right">
                    <button onClick={handleRemovePromocode}>
                      <FaXmark />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
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

export default CartPromocodeBox;
