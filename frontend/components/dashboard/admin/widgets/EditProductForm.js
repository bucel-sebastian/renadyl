"use client";
import LoadingBlock from "@/components/LoadingBlock";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditProductForm() {
  const [renalSingleData, setRenalSingleData] = useState({});
  const [updatedRenalSingleData, setUpdatedRenalSingleData] = useState({});
  const [renalSingleFinalPrice, setRenalSingleFinalPrice] = useState({
    int: 0,
    nat: 0,
  });
  const [renalBundleData, setRenalBundleData] = useState({});
  const [updatedRenalBundleData, setUpdatedRenalBundleData] = useState({});
  const [renalBundleFinalPrice, setRenalBundleFinalPrice] = useState({
    int: 0,
    nat: 0,
  });

  const [isProductDataLoading, setIsProductDataLoading] = useState(true);

  const t = useTranslations("Dashboard");

  const calculateFinalPrice = () => {
    if (updatedRenalSingleData?.on_sale?.nat) {
      if (updatedRenalSingleData?.sale_percentage?.nat) {
        setRenalSingleFinalPrice((prevData) => ({
          ...prevData,
          ["nat"]:
            updatedRenalSingleData?.price?.nat -
            (updatedRenalSingleData?.price?.nat *
              updatedRenalSingleData?.sale_value.nat) /
              100,
        }));
      } else {
        setRenalSingleFinalPrice((prevData) => ({
          ...prevData,
          ["nat"]:
            updatedRenalSingleData?.price?.nat -
            updatedRenalSingleData?.sale_value.nat,
        }));
      }
    } else {
      setRenalSingleFinalPrice((prevData) => ({
        ...prevData,
        ["nat"]: updatedRenalSingleData?.price?.nat,
      }));
    }
    if (updatedRenalSingleData?.on_sale?.int) {
      if (updatedRenalSingleData?.sale_percentage?.int) {
        setRenalSingleFinalPrice((prevData) => ({
          ...prevData,
          ["int"]:
            updatedRenalSingleData?.price?.int -
            (updatedRenalSingleData?.price?.int *
              updatedRenalSingleData?.sale_value.int) /
              100,
        }));
      } else {
        setRenalSingleFinalPrice((prevData) => ({
          ...prevData,
          ["int"]:
            updatedRenalSingleData?.price?.int -
            updatedRenalSingleData?.sale_value.int,
        }));
      }
    } else {
      setRenalSingleFinalPrice((prevData) => ({
        ...prevData,
        ["int"]: updatedRenalSingleData?.price?.int,
      }));
    }

    if (updatedRenalBundleData?.on_sale?.nat) {
      if (updatedRenalBundleData?.sale_percentage?.nat) {
        setRenalBundleFinalPrice((prevData) => ({
          ...prevData,
          ["nat"]:
            updatedRenalBundleData?.price?.nat -
            (updatedRenalBundleData?.price?.nat *
              updatedRenalBundleData?.sale_value.nat) /
              100,
        }));
      } else {
        setRenalBundleFinalPrice((prevData) => ({
          ...prevData,
          ["nat"]:
            updatedRenalBundleData?.price?.nat -
            updatedRenalBundleData?.sale_value.nat,
        }));
      }
    } else {
      setRenalBundleFinalPrice((prevData) => ({
        ...prevData,
        ["nat"]: updatedRenalBundleData?.price?.nat,
      }));
    }
    if (updatedRenalBundleData?.on_sale?.int) {
      if (updatedRenalBundleData?.sale_percentage?.int) {
        setRenalBundleFinalPrice((prevData) => ({
          ...prevData,
          ["int"]:
            updatedRenalBundleData?.price?.int -
            (updatedRenalBundleData?.price?.int *
              updatedRenalBundleData?.sale_value.int) /
              100,
        }));
      } else {
        setRenalBundleFinalPrice((prevData) => ({
          ...prevData,
          ["int"]:
            updatedRenalBundleData?.price?.int -
            updatedRenalBundleData?.sale_value.int,
        }));
      }
    } else {
      setRenalBundleFinalPrice((prevData) => ({
        ...prevData,
        ["int"]: updatedRenalBundleData?.price?.int,
      }));
    }
  };

  const getProductData = async (productName) => {
    console.log("Prod name - ", productName);
    const response = await fetch(
      `/api/admin/data/json/product/${productName}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data.body;
  };

  useEffect(() => {
    async function fetchData() {
      const renalSingleFetch = await getProductData("renal_single");
      const renalBundleFetch = await getProductData("renal_bundle");

      setRenalSingleData(renalSingleFetch);
      setUpdatedRenalSingleData(renalSingleFetch);
      setRenalBundleData(renalBundleFetch);
      setUpdatedRenalBundleData(renalBundleFetch);

      setIsProductDataLoading(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    calculateFinalPrice();
  }, [updatedRenalSingleData, updatedRenalBundleData]);

  const changeRenalSingleData = (e) => {
    const { name, value } = e.target;

    const [parentKey, childKey] = name.split(".");

    setUpdatedRenalSingleData((prevData) => ({
      ...prevData,
      [parentKey]: {
        ...prevData[parentKey],
        [childKey]: value,
      },
    }));
  };
  const changeRenalBundleData = (e) => {
    const { name, value } = e.target;

    const [parentKey, childKey] = name.split(".");

    setUpdatedRenalBundleData((prevData) => ({
      ...prevData,
      [parentKey]: {
        ...prevData[parentKey],
        [childKey]: value,
      },
    }));
  };

  const handleToggleSingleNatOffer = (e) => {
    e.preventDefault();
    setUpdatedRenalSingleData((prevData) => ({
      ...prevData,
      ["on_sale"]: {
        ...prevData["on_sale"],
        ["nat"]: !updatedRenalSingleData.on_sale.nat,
      },
    }));
  };
  const handleToggleSingleNatPercentage = (e) => {
    e.preventDefault();
    setUpdatedRenalSingleData((prevData) => ({
      ...prevData,
      ["sale_percentage"]: {
        ...prevData["sale_percentage"],
        ["nat"]: !updatedRenalSingleData.sale_percentage.nat,
      },
    }));
  };

  const handleToggleSingleIntOffer = (e) => {
    e.preventDefault();
    setUpdatedRenalSingleData((prevData) => ({
      ...prevData,
      ["on_sale"]: {
        ...prevData["on_sale"],
        ["int"]: !updatedRenalSingleData.on_sale.int,
      },
    }));
  };
  const handleToggleSingleIntPercentage = (e) => {
    e.preventDefault();
    setUpdatedRenalSingleData((prevData) => ({
      ...prevData,
      ["sale_percentage"]: {
        ...prevData["sale_percentage"],
        ["int"]: !updatedRenalSingleData.sale_percentage.int,
      },
    }));
  };

  const handleToggleBundleNatOffer = (e) => {
    e.preventDefault();
    setUpdatedRenalBundleData((prevData) => ({
      ...prevData,
      ["on_sale"]: {
        ...prevData["on_sale"],
        ["nat"]: !updatedRenalBundleData.on_sale.nat,
      },
    }));
  };
  const handleToggleBundleNatPercentage = (e) => {
    e.preventDefault();
    setUpdatedRenalBundleData((prevData) => ({
      ...prevData,
      ["sale_percentage"]: {
        ...prevData["sale_percentage"],
        ["nat"]: !updatedRenalBundleData.sale_percentage.nat,
      },
    }));
  };

  const handleToggleBundleIntOffer = (e) => {
    e.preventDefault();
    setUpdatedRenalBundleData((prevData) => ({
      ...prevData,
      ["on_sale"]: {
        ...prevData["on_sale"],
        ["int"]: !updatedRenalBundleData.on_sale.int,
      },
    }));
  };
  const handleToggleBundleIntPercentage = (e) => {
    e.preventDefault();
    setUpdatedRenalBundleData((prevData) => ({
      ...prevData,
      ["sale_percentage"]: {
        ...prevData["sale_percentage"],
        ["int"]: !updatedRenalBundleData.sale_percentage.int,
      },
    }));
  };

  const resetRenalSingleData = (e) => {
    e.preventDefault();

    setUpdatedRenalSingleData((prevData) => ({
      ...prevData,
      ...renalSingleData,
    }));
  };

  const handleSaveRenalSingleData = async (e) => {
    e.preventDefault();

    if (renalSingleFinalPrice.int > 0 && renalSingleFinalPrice.nat > 0) {
      const response = await fetch("/api/admin/update/product/renal-single", {
        method: "POST",
        body: JSON.stringify(updatedRenalSingleData),
      });
      if (response.ok) {
        const body = await response.json();

        if (body.response === true) {
          setRenalSingleData(body.body);
          setUpdatedRenalSingleData(body.body);
          toast.success(t("admin.product.edit-form.edit-product-success"), {
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
          toast.error(t("admin.product.edit-form.edit-product-fail"), {
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

        console.log("response - ", body);
      } else {
        toast.error(t("admin.product.edit-form.edit-product-fail"), {
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
      toast.error(t("admin.product.edit-form.edit-product-under-zero-fail"), {
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

  const resetRenalBundleData = (e) => {
    e.preventDefault();

    setUpdatedRenalBundleData((prevData) => ({
      ...prevData,
      ...renalBundleData,
    }));
  };

  const handleSaveRenalBundleData = async (e) => {
    e.preventDefault();

    if (renalBundleFinalPrice.int > 0 && renalBundleFinalPrice.nat > 0) {
      const response = await fetch("/api/admin/update/product/renal-bundle", {
        method: "POST",
        body: JSON.stringify(updatedRenalBundleData),
      });
      if (response.ok) {
        const body = await response.json();

        if (body.response === true) {
          setRenalBundleData(body.body);
          setUpdatedRenalBundleData(body.body);
          toast.success(t("admin.product.edit-form.edit-product-success"), {
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
          toast.error(t("admin.product.edit-form.edit-product-fail"), {
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

        console.log("response - ", body);
      } else {
        toast.error(t("admin.product.edit-form.edit-product-fail"), {
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
      toast.error(t("admin.product.edit-form.edit-product-under-zero-fail"), {
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

  return (
    <>
      {isProductDataLoading ? (
        <>
          <LoadingBlock />
        </>
      ) : (
        <>
          <div className="flex flex-row gap-4">
            <div className="w-1/2 relative max-h-full overflow-hidden rounded-xl border-foregroundPrimary10 border-[1px] rounded-xl shadow-xl py-6 px-8 bg-backgroundPrimary">
              <form onSubmit={handleSaveRenalSingleData}>
                <h3 className="text-xl mb-4 font-bold">
                  {t("admin.product.edit-form.renal-single.title")}
                </h3>
                <div className="w-full flex flex-row gap-10 relative justify-center">
                  <div className="w-1/2 flex flex-col gap-2">
                    <div className="w-full flex flex-col ">
                      <label className="px-1 text-foregroundPrimary70">
                        {t(
                          "admin.product.edit-form.renal-single.base-price-label"
                        )}{" "}
                        (RON)
                      </label>
                      <input
                        type="number"
                        name="price.nat"
                        value={updatedRenalSingleData.price.nat}
                        onChange={changeRenalSingleData}
                        className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                      />
                    </div>

                    <div className="flex flex-row gap-2 items-center content-center">
                      <input
                        type="checkbox"
                        checked={updatedRenalSingleData.on_sale.nat}
                        readOnly
                        hidden
                      />
                      <button
                        type="button"
                        className={`relative w-[44px] h-max shadow-md rounded-full border-[1px] border-foregroundSecondary40 p-[1px] ${
                          updatedRenalSingleData.on_sale.nat
                            ? "bg-dashboardBlue40"
                            : ""
                        } transition-all duration-300`}
                        onClick={handleToggleSingleNatOffer}
                      >
                        <div
                          className={`relative w-[20px] h-[20px] shadow-md rounded-full border-[1px] border-foregroundSecondary40 bg-backgroundPrimary ${
                            updatedRenalSingleData.on_sale.nat
                              ? "translate-x-full"
                              : "translate-x-0"
                          } duration-300 transition-all`}
                        ></div>
                      </button>
                      <label>
                        {t("admin.product.edit-form.renal-single.offer-toggle")}
                      </label>
                    </div>

                    <div className="flex flex-row gap-2 items-center content-center">
                      <input
                        type="checkbox"
                        checked={updatedRenalSingleData.sale_percentage.nat}
                        readOnly
                        hidden
                      />
                      <button
                        type="button"
                        className={`relative w-[44px] h-max shadow-md rounded-full border-[1px] border-foregroundSecondary40 p-[1px] ${
                          updatedRenalSingleData.sale_percentage.nat
                            ? "bg-dashboardBlue40"
                            : ""
                        } transition-all duration-300`}
                        onClick={handleToggleSingleNatPercentage}
                        disabled={!updatedRenalSingleData.on_sale.nat}
                      >
                        <div
                          className={`relative w-[20px] h-[20px] shadow-md rounded-full border-[1px] border-foregroundSecondary40 bg-backgroundPrimary transform ${
                            updatedRenalSingleData.sale_percentage.nat
                              ? "translate-x-full"
                              : "translate-x-0"
                          } duration-300 transition-all`}
                        ></div>
                      </button>
                      <label>
                        {t(
                          "admin.product.edit-form.renal-single.percentage-label"
                        )}
                      </label>
                    </div>

                    {updatedRenalSingleData.on_sale.nat ? (
                      <>
                        <div className={`w-full flex flex-col`}>
                          <label className="px-1 text-foregroundPrimary70">
                            {t(
                              "admin.product.edit-form.renal-single.offer-label"
                            )}{" "}
                            (
                            {updatedRenalSingleData.sale_percentage.nat
                              ? "%"
                              : "RON"}
                            )
                          </label>
                          <input
                            placeholder={t(
                              "admin.product.edit-form.renal-single.offer-label"
                            )}
                            type="number"
                            name="sale_value.nat"
                            value={updatedRenalSingleData.sale_value.nat}
                            onChange={changeRenalSingleData}
                            className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                            required={updatedRenalSingleData.on_sale.nat}
                            disabled={!updatedRenalSingleData.on_sale.nat}
                          />
                        </div>
                      </>
                    ) : (
                      <></>
                    )}

                    <div>
                      <h3
                        className={`font-bold text-xl ${
                          renalSingleFinalPrice.nat > 0
                            ? ""
                            : "text-dashboardRed"
                        }`}
                      >
                        {t("admin.product.edit-form.final-price")}{" "}
                        {renalSingleFinalPrice.nat} RON
                      </h3>
                    </div>
                  </div>

                  <div className="absolute inset-y-0 mx-auto border-[1px] border-foregroundPrimary10"></div>

                  <div className="w-1/2 flex flex-col gap-2">
                    <div className="w-full flex flex-col ">
                      <label className="px-1 text-foregroundPrimary70">
                        {t(
                          "admin.product.edit-form.renal-single.base-price-label"
                        )}{" "}
                        (EURO)
                      </label>
                      <input
                        type="number"
                        name="price.int"
                        value={updatedRenalSingleData.price.int}
                        onChange={changeRenalSingleData}
                        className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                      />
                    </div>

                    <div className="flex flex-row gap-2 items-center content-center">
                      <input
                        type="checkbox"
                        checked={updatedRenalSingleData.on_sale.int}
                        readOnly
                        hidden
                      />
                      <button
                        type="button"
                        className={`relative w-[44px] h-max shadow-md rounded-full border-[1px] border-foregroundSecondary40 p-[1px] ${
                          updatedRenalSingleData.on_sale.int
                            ? "bg-dashboardBlue40"
                            : ""
                        } transition-all duration-300`}
                        onClick={handleToggleSingleIntOffer}
                      >
                        <div
                          className={`relative w-[20px] h-[20px] shadow-md rounded-full border-[1px] border-foregroundSecondary40 bg-backgroundPrimary ${
                            updatedRenalSingleData.on_sale.int
                              ? "translate-x-full"
                              : "translate-x-0"
                          } duration-300 transition-all`}
                        ></div>
                      </button>
                      <label>
                        {t("admin.product.edit-form.renal-single.offer-toggle")}
                      </label>
                    </div>

                    <div className="flex flex-row gap-2 items-center content-center">
                      <input
                        type="checkbox"
                        checked={updatedRenalSingleData.sale_percentage.int}
                        readOnly
                        hidden
                      />
                      <button
                        type="button"
                        className={`relative w-[44px] h-max shadow-md rounded-full border-[1px] border-foregroundSecondary40 p-[1px] ${
                          updatedRenalSingleData.sale_percentage.int
                            ? "bg-dashboardBlue40"
                            : ""
                        } transition-all duration-300`}
                        onClick={handleToggleSingleIntPercentage}
                        disabled={!updatedRenalSingleData.on_sale.int}
                      >
                        <div
                          className={`relative w-[20px] h-[20px] shadow-md rounded-full border-[1px] border-foregroundSecondary40 bg-backgroundPrimary transform ${
                            updatedRenalSingleData.sale_percentage.int
                              ? "translate-x-full"
                              : "translate-x-0"
                          } duration-300 transition-all`}
                        ></div>
                      </button>
                      <label>
                        {t(
                          "admin.product.edit-form.renal-single.percentage-label"
                        )}
                      </label>
                    </div>

                    {updatedRenalSingleData.on_sale.int ? (
                      <>
                        <div className={`w-full flex flex-col`}>
                          <label className="px-1 text-foregroundPrimary70">
                            {t(
                              "admin.product.edit-form.renal-single.offer-label"
                            )}{" "}
                            (
                            {updatedRenalSingleData.sale_percentage.int
                              ? "%"
                              : "EURO"}
                            )
                          </label>
                          <input
                            placeholder={t(
                              "admin.product.edit-form.renal-single.offer-label"
                            )}
                            type="number"
                            name="sale_value.int"
                            value={updatedRenalSingleData.sale_value.int}
                            onChange={changeRenalSingleData}
                            className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                            required={updatedRenalSingleData.on_sale.int}
                            disabled={!updatedRenalSingleData.on_sale.int}
                          />
                        </div>
                      </>
                    ) : (
                      <></>
                    )}

                    <div>
                      <h3
                        className={`font-bold text-xl ${
                          renalSingleFinalPrice.int > 0
                            ? ""
                            : "text-dashboardRed"
                        }`}
                      >
                        {t("admin.product.edit-form.final-price")}{" "}
                        {renalSingleFinalPrice.int} EURO
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="w-full flex flex-row gap-8 justify-center content-center items-center mt-2">
                  <button
                    type="button"
                    onClick={resetRenalSingleData}
                    className="block  bg-dashboardRed hover:bg-dashboardRed80 w-max  duration-300 ease transition-all text-center text-xl text-backgroundPrimary rounded-2xl py-2 px-8"
                  >
                    {t("admin.product.edit-form.leave-btn")}
                  </button>
                  <button
                    type="submit"
                    className="block  bg-gradient-to-r w-max from-gradientGreen via-gradientPurple to-gradientGreen bg-[length:200%] bg-left hover:bg-right duration-500 ease transition-all text-center text-xl text-backgroundPrimary rounded-2xl py-2 px-8"
                  >
                    {t("admin.product.edit-form.save-btn")}
                  </button>
                </div>
              </form>
            </div>
            <div className="w-1/2 relative max-h-full overflow-hidden rounded-xl border-foregroundPrimary10 border-[1px] rounded-xl shadow-xl py-6 px-8 bg-backgroundPrimary">
              <form onSubmit={handleSaveRenalBundleData}>
                <h3 className="text-xl mb-4 font-bold">
                  {t("admin.product.edit-form.renal-bundle.title")}
                </h3>
                <div className="w-full flex flex-row gap-10 relative justify-center">
                  <div className="w-1/2 flex flex-col gap-2">
                    <div className="w-full flex flex-col ">
                      <label className="px-1 text-foregroundPrimary70">
                        {t(
                          "admin.product.edit-form.renal-bundle.base-price-label"
                        )}{" "}
                        (RON)
                      </label>
                      <input
                        type="number"
                        name="price.nat"
                        value={updatedRenalBundleData.price.nat}
                        onChange={changeRenalBundleData}
                        className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                      />
                    </div>

                    <div className="flex flex-row gap-2 items-center content-center">
                      <input
                        type="checkbox"
                        checked={updatedRenalBundleData.on_sale.nat}
                        readOnly
                        hidden
                      />
                      <button
                        type="button"
                        className={`relative w-[44px] h-max shadow-md rounded-full border-[1px] border-foregroundSecondary40 p-[1px] ${
                          updatedRenalBundleData.on_sale.nat
                            ? "bg-dashboardBlue40"
                            : ""
                        } transition-all duration-300`}
                        onClick={handleToggleBundleNatOffer}
                      >
                        <div
                          className={`relative w-[20px] h-[20px] shadow-md rounded-full border-[1px] border-foregroundSecondary40 bg-backgroundPrimary ${
                            updatedRenalBundleData.on_sale.nat
                              ? "translate-x-full"
                              : "translate-x-0"
                          } duration-300 transition-all`}
                        ></div>
                      </button>
                      <label>
                        {t("admin.product.edit-form.renal-bundle.offer-toggle")}
                      </label>
                    </div>

                    <div className="flex flex-row gap-2 items-center content-center">
                      <input
                        type="checkbox"
                        checked={updatedRenalBundleData.sale_percentage.nat}
                        readOnly
                        hidden
                      />
                      <button
                        type="button"
                        className={`relative w-[44px] h-max shadow-md rounded-full border-[1px] border-foregroundSecondary40 p-[1px] ${
                          updatedRenalBundleData.sale_percentage.nat
                            ? "bg-dashboardBlue40"
                            : ""
                        } transition-all duration-300`}
                        onClick={handleToggleBundleNatPercentage}
                        disabled={!updatedRenalBundleData.on_sale.nat}
                      >
                        <div
                          className={`relative w-[20px] h-[20px] shadow-md rounded-full border-[1px] border-foregroundSecondary40 bg-backgroundPrimary transform ${
                            updatedRenalBundleData.sale_percentage.nat
                              ? "translate-x-full"
                              : "translate-x-0"
                          } duration-300 transition-all`}
                        ></div>
                      </button>
                      <label>
                        {t(
                          "admin.product.edit-form.renal-bundle.percentage-label"
                        )}
                      </label>
                    </div>

                    {updatedRenalBundleData.on_sale.nat ? (
                      <>
                        <div className={`w-full flex flex-col`}>
                          <label className="px-1 text-foregroundPrimary70">
                            {t(
                              "admin.product.edit-form.renal-bundle.offer-label"
                            )}{" "}
                            (
                            {updatedRenalBundleData.sale_percentage.nat
                              ? "%"
                              : "RON"}
                            )
                          </label>
                          <input
                            placeholder={t(
                              "admin.product.edit-form.renal-bundle.offer-label"
                            )}
                            type="number"
                            name="sale_value.nat"
                            value={updatedRenalBundleData.sale_value.nat}
                            onChange={changeRenalBundleData}
                            className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                            required={updatedRenalBundleData.on_sale.nat}
                            disabled={!updatedRenalBundleData.on_sale.nat}
                          />
                        </div>
                      </>
                    ) : (
                      <></>
                    )}

                    <div>
                      <h3
                        className={`font-bold text-xl ${
                          renalBundleFinalPrice.nat > 0
                            ? ""
                            : "text-dashboardRed"
                        }`}
                      >
                        {t("admin.product.edit-form.final-price")}{" "}
                        {renalBundleFinalPrice.nat} RON
                      </h3>
                    </div>
                  </div>

                  <div className="absolute inset-y-0 mx-auto border-[1px] border-foregroundPrimary10"></div>

                  <div className="w-1/2 flex flex-col gap-2">
                    <div className="w-full flex flex-col ">
                      <label className="px-1 text-foregroundPrimary70">
                        {t(
                          "admin.product.edit-form.renal-bundle.base-price-label"
                        )}{" "}
                        (EURO)
                      </label>
                      <input
                        type="number"
                        name="price.int"
                        value={updatedRenalBundleData.price.int}
                        onChange={changeRenalBundleData}
                        className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                      />
                    </div>

                    <div className="flex flex-row gap-2 items-center content-center">
                      <input
                        type="checkbox"
                        checked={updatedRenalBundleData.on_sale.int}
                        readOnly
                        hidden
                      />
                      <button
                        type="button"
                        className={`relative w-[44px] h-max shadow-md rounded-full border-[1px] border-foregroundSecondary40 p-[1px] ${
                          updatedRenalBundleData.on_sale.int
                            ? "bg-dashboardBlue40"
                            : ""
                        } transition-all duration-300`}
                        onClick={handleToggleBundleIntOffer}
                      >
                        <div
                          className={`relative w-[20px] h-[20px] shadow-md rounded-full border-[1px] border-foregroundSecondary40 bg-backgroundPrimary ${
                            updatedRenalBundleData.on_sale.int
                              ? "translate-x-full"
                              : "translate-x-0"
                          } duration-300 transition-all`}
                        ></div>
                      </button>
                      <label>
                        {t("admin.product.edit-form.renal-bundle.offer-toggle")}
                      </label>
                    </div>

                    <div className="flex flex-row gap-2 items-center content-center">
                      <input
                        type="checkbox"
                        checked={updatedRenalBundleData.sale_percentage.int}
                        readOnly
                        hidden
                      />
                      <button
                        type="button"
                        className={`relative w-[44px] h-max shadow-md rounded-full border-[1px] border-foregroundSecondary40 p-[1px] ${
                          updatedRenalBundleData.sale_percentage.int
                            ? "bg-dashboardBlue40"
                            : ""
                        } transition-all duration-300`}
                        onClick={handleToggleBundleIntPercentage}
                        disabled={!updatedRenalBundleData.on_sale.int}
                      >
                        <div
                          className={`relative w-[20px] h-[20px] shadow-md rounded-full border-[1px] border-foregroundSecondary40 bg-backgroundPrimary transform ${
                            updatedRenalBundleData.sale_percentage.int
                              ? "translate-x-full"
                              : "translate-x-0"
                          } duration-300 transition-all`}
                        ></div>
                      </button>
                      <label>
                        {t(
                          "admin.product.edit-form.renal-bundle.percentage-label"
                        )}
                      </label>
                    </div>

                    {updatedRenalBundleData.on_sale.int ? (
                      <>
                        <div className={`w-full flex flex-col`}>
                          <label className="px-1 text-foregroundPrimary70">
                            {t(
                              "admin.product.edit-form.renal-bundle.offer-label"
                            )}{" "}
                            (
                            {updatedRenalBundleData.sale_percentage.int
                              ? "%"
                              : "EURO"}
                            )
                          </label>
                          <input
                            placeholder={t(
                              "admin.product.edit-form.renal-bundle.offer-label"
                            )}
                            type="number"
                            name="sale_value.int"
                            value={updatedRenalBundleData.sale_value.int}
                            onChange={changeRenalBundleData}
                            className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                            required={updatedRenalBundleData.on_sale.int}
                            disabled={!updatedRenalBundleData.on_sale.int}
                          />
                        </div>
                      </>
                    ) : (
                      <></>
                    )}

                    <div>
                      <h3
                        className={`font-bold text-xl ${
                          renalBundleFinalPrice.int > 0
                            ? ""
                            : "text-dashboardRed"
                        }`}
                      >
                        {t("admin.product.edit-form.final-price")}{" "}
                        {renalBundleFinalPrice.int} EURO
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="w-full flex flex-row gap-8 justify-center content-center items-center mt-2">
                  <button
                    type="button"
                    onClick={resetRenalBundleData}
                    className="block  bg-dashboardRed hover:bg-dashboardRed80 w-max  duration-300 ease transition-all text-center text-xl text-backgroundPrimary rounded-2xl py-2 px-8"
                  >
                    {t("admin.product.edit-form.leave-btn")}
                  </button>
                  <button
                    type="submit"
                    className="block  bg-gradient-to-r w-max from-gradientGreen via-gradientPurple to-gradientGreen bg-[length:200%] bg-left hover:bg-right duration-500 ease transition-all text-center text-xl text-backgroundPrimary rounded-2xl py-2 px-8"
                  >
                    {t("admin.product.edit-form.save-btn")}
                  </button>
                </div>
              </form>
            </div>
          </div>
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
      )}
    </>
  );
}

export default EditProductForm;
