"use client";
import LoadingBlock from "@/components/LoadingBlock";
import SelectInput from "@/components/SelectInput";
import SelectInputClassic from "@/components/SelectInputClassic";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useTranslations } from "next-intl";
import Link from "next-intl/link";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function OrderDetails({ orderId }) {
  const [initialOrderData, setInitialOrderData] = useState(null);
  const [updatedOrderData, setUpdatedOrderData] = useState(null);
  const [clientData, setClientData] = useState(null);
  const [productsDetailsModified, setProductsDetailsModified] = useState(false);

  const [doctorsData, setDoctorsData] = useState({});

  const [newStatus, setNewStatus] = useState(1);
  const [newDoctor, setNewDoctor] = useState("");

  const [generateAWBisLoading, setGenerateAWBisLoading] = useState(false);
  const [generateInvoiceIsLoading, setGenerateInvoiceIsLoading] =
    useState(false);

  const t = useTranslations("Dashboard.admin.orders.order-page");

  const datetimeOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  const orderStatus = [
    {
      name: t("order-status.cancelled"),
      color: "#e74d3d",
    },
    {
      name: t("order-status.placed"),
      color: "#f1c40d",
    },
    {
      name: t("order-status.processing"),
      color: "#e77e22",
    },
    {
      name: t("order-status.ready-to-ship"),
      color: "#3397dc",
    },
    {
      name: t("order-status.shipped"),
      color: "#2980b9",
    },
    {
      name: t("order-status.finished"),
      color: "#2ecd70",
    },
    {
      name: t("order-status.refunded"),
      color: "#e74d3d",
    },
  ];

  const statusData = {
    "status-0": t("order-status.cancelled"),
    "status-1": t("order-status.placed"),
    "status-2": t("order-status.processing"),
    "status-3": t("order-status.ready-to-ship"),
    "status-4": t("order-status.shipped"),
    "status-5": t("order-status.finished"),
    "status-6": t("order-status.refunded"),
  };

  const formatter = new Intl.DateTimeFormat("ro-RO", datetimeOptions);

  const getOrderData = async () => {
    const response = await fetch(`/api/admin/data/json/orders/${orderId}`);
    const body = await response.json();
    console.log(body);

    body.body.billing_details = JSON.parse(body.body.billing_details);
    body.body.cart = JSON.parse(body.body.cart);
    body.body.shipping_details = JSON.parse(body.body.shipping_details);
    if (body.body.payment_status !== null) {
      body.body.payment_status = JSON.parse(body.body.payment_status);
    }
    if (body.body.shipping_awb !== null) {
      body.body.shipping_awb = JSON.parse(body.body.shipping_awb);
    }
    if (body.body.invoice !== null) {
      body.body.invoice = JSON.parse(body.body.invoice);
    }
    if (body.body.logs !== null) {
      body.body.logs = JSON.parse(body.body.logs);
    }

    setNewStatus(statusData["status-" + parseInt(body.body.status)]);

    const initialData = JSON.parse(JSON.stringify(body.body));
    const updatedData = JSON.parse(JSON.stringify(body.body));

    setInitialOrderData(initialData);
    setUpdatedOrderData(updatedData);
    setClientData(body.client_data);
  };

  const getDoctorsList = async () => {
    const response = await fetch(`/api/admin/data/json/doctors`);
    if (response.ok) {
      const body = await response.json();

      const data = new Object();
      for (let i = 0; i < body.body.length; i++) {
        data[
          body.body[i].id
        ] = `Dr. ${body.body[i].f_name} ${body.body[i].l_name}`;
      }
      // console.log("DOctors", data);
      setDoctorsData(data);
    }
  };

  const verifyIfProductDetailsAreModified = () => {
    for (let i = 0; i < initialOrderData.cart.length; i++) {
      if (
        initialOrderData.cart[i].lotNumber !==
          updatedOrderData.cart[i].lotNumber ||
        initialOrderData.cart[i].expDate !== updatedOrderData.cart[i].expDate
      ) {
        setProductsDetailsModified(true);
        return;
      }
    }
    setProductsDetailsModified(false);
  };

  const checkIfLotExists = async (id) => {
    const response = await fetch(`/api/admin/check-lot-number/${id}`);
    if (response.ok) {
      const body = await response.json();

      if (body.body !== null) {
        const dateObj = new Date(body?.body[0]?.exp_date);

        return `${dateObj.getFullYear()}-${
          dateObj.getMonth() + 1
        }-${dateObj.getDate()}`;
      }
    }
    return null;
  };

  const modifyProductData = async (e) => {
    const { name, value } = e.target;
    const nameArray = name.split("-");

    const newUpdatedData = { ...updatedOrderData };
    for (let i = 0; i < newUpdatedData.cart.length; i++) {
      if (newUpdatedData.cart[i].productName === nameArray[1]) {
        newUpdatedData.cart[i][nameArray[0]] = value;
        if (nameArray[0] === "lotNumber") {
          const checkLot = await checkIfLotExists(value);
          if (checkLot !== null) {
            newUpdatedData.cart[i].expDate = checkLot;
          }
        }
      }
    }

    setUpdatedOrderData(newUpdatedData);
  };

  const saveProductDetails = async () => {
    const requestBody = updatedOrderData.cart;
    const response = await fetch(
      `/api/admin/update-order-products-details/${updatedOrderData.id}`,
      {
        method: "POST",
        body: JSON.stringify(requestBody),
      }
    );

    if (response.ok) {
      getOrderData();
      toast.success("Datele au fost salvate cu succes!", {
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

  const handleSaveProductDetails = (e) => {
    e.preventDefault();
    saveProductDetails();
  };

  const generateAWB = async () => {
    const response = await fetch(
      `/api/admin/generate-awb/${updatedOrderData.id}`
    );
    if (response.ok) {
      getOrderData();
      toast.success("AWB-ul a fost generat cu succes!", {
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
      toast.error(t("A aparut o problema"), {
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
    console.log(await response.json());
    setGenerateAWBisLoading(false);
  };

  const handleGenerateAWB = (e) => {
    e.preventDefault();

    setGenerateAWBisLoading(true);
    generateAWB();
  };

  const generateInvoice = async () => {
    console.log("invoice");
    const response = await fetch(
      `/api/admin/generate-invoice/${updatedOrderData.id}`
    );
    if (response.ok) {
      const body = await response.json();
      if (body.status === 200) {
        getOrderData();
        toast.success("Factura a fost generata cu succes!", {
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
        toast.error(t("change-details-fail"), {
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
    }
    setGenerateInvoiceIsLoading(false);
  };

  const handleGenerateInvoice = (e) => {
    e.preventDefault();
    let mustConfirm = false;

    for (let i = 0; i < initialOrderData.cart.length; i++) {
      if (
        initialOrderData.cart[i].lotNumber === "" ||
        initialOrderData.cart[i].expDate === ""
      ) {
        mustConfirm = true;
      }
    }

    if (mustConfirm === true) {
      if (
        window.confirm(
          "Sigur doresti sa generezi factura fara numar de lot sau data de expirare?"
        )
      ) {
        setGenerateInvoiceIsLoading(true);
        generateInvoice();
      } else {
        return;
      }
    } else {
      setGenerateInvoiceIsLoading(true);
      generateInvoice();
    }
  };

  const handleDoctorInputChange = (key, value) => {
    setNewDoctor(key);
  };

  const handleSetDoctor = async (e) => {
    e.preventDefault();

    const reqData = new Object();
    reqData.id = newDoctor;
    reqData.doctor_name = doctorsData[newDoctor];
    reqData.client = initialOrderData.doctor.client;

    const response = await fetch(`/api/admin/update-order-doctor/${orderId}`, {
      method: "POST",
      body: JSON.stringify(reqData),
    });
    if (response.ok) {
      const body = await response.json();
      if (body.response) {
        getOrderData();
        toast.success("Doctorul a fost setat cu succes!", {
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
      }
    } else {
    }
  };

  const handleStatusInputChange = (key, value) => {
    setNewStatus(statusData[key]);
  };

  const changeOrderStatus = async () => {
    const keyOfNewStatus = Object.keys(statusData).find(
      (key) => statusData[key] === newStatus
    );
    const keyOfNewStatusArray = keyOfNewStatus.split("-");

    const requestBody = {
      actualStaus: initialOrderData.status,
      newStatus: keyOfNewStatusArray[1],
    };

    const response = await fetch(
      `/api/admin/update-order-status/${initialOrderData.id}`,
      {
        method: "POST",
        body: JSON.stringify(requestBody),
      }
    );
    if (response.ok) {
      getOrderData();
      toast.success("Statusul a fost modificat cu succes!", {
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

  const handleStatusFormSubmit = (e) => {
    e.preventDefault();
    changeOrderStatus();
  };

  const handleViewInvoice = async (e, series, number) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `/api/admin/data/json/invoices/${series}/${number}`
      );
      if (response.ok) {
        const body = await response.json();

        const headers = new Headers(body.body.headers);
        const smartbillResponse = await fetch(body.body.url, {
          headers: headers,
        });
        const data = await smartbillResponse.arrayBuffer();

        const pdfBlob = new Blob([data], { type: "application/pdf" });

        const pdfUrl = URL.createObjectURL(pdfBlob);

        window.open(pdfUrl, "_blank");
      }
    } catch (error) {
      toast.error(t("change-details-fail"), {
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

  const reverseInvoice = async () => {
    if (
      new Date(initialOrderData.invoice.date).getUTCFullYear() <
        new Date().getUTCFullYear() ||
      (new Date(initialOrderData.invoice.date).getUTCFullYear() ===
        new Date().getUTCFullYear() &&
        new Date(initialOrderData.invoice.date).getUTCMonth() <
          new Date().getUTCMonth()) ||
      (new Date(initialOrderData.invoice.date).getUTCFullYear() ===
        new Date().getUTCFullYear() &&
        new Date(initialOrderData.invoice.date).getUTCMonth() ===
          new Date().getUTCMonth() &&
        new Date(initialOrderData.invoice.date).getUTCDate() <
          new Date().getUTCDate())
    ) {
      if (
        window.confirm(
          "Sigur doresti sa generezi factura fara numar de lot sau data de expirare?"
        )
      ) {
        const response = await fetch(
          `/api/admin/reverse-invoice/${initialOrderData.id}`
        );
        if (response.ok) {
          const body = await response.json();

          if (body.status === 200) {
            getOrderData();
            toast.success("Factura a fost stornata cu succes!", {
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
            toast.error(t("invoice-reverse-fail"), {
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
          toast.error(t("invoice-reverse-fail"), {
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
      }
    } else {
      toast.error(t("invoice-reverse-day-fail"), {
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
  const deleteInvoice = async () => {
    const response = await fetch(
      `/api/admin/delete-invoice/${initialOrderData.id}`
    );
  };
  const cancelInvoice = async () => {
    const response = await fetch(
      `/api/admin/cancel-invoice/${initialOrderData.id}`
    );
  };

  const handleReverseInvoice = (e) => {
    e.preventDefault();
    reverseInvoice();
  };
  const handleDeleteInvoice = (e) => {
    e.preventDefault();
    deleteInvoice();
  };
  const handleCancelInvoice = (e) => {
    e.preventDefault();
    cancelInvoice();
  };

  useEffect(() => {
    getOrderData();
    getDoctorsList();
  }, []);

  useEffect(() => {
    console.log("Order data - ", initialOrderData);
  }, [initialOrderData]);

  useEffect(() => {
    if (updatedOrderData !== null) verifyIfProductDetailsAreModified();
  }, [updatedOrderData]);

  const downloadSamedayAwb = async (e) => {
    e.preventDefault();
    const tokenResponse = await fetch("/api/admin/view-awb/sameday");
    if (tokenResponse.ok) {
      const tokenBody = await tokenResponse.json();
      const token = tokenBody.token;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SAMEDAY_API_DOWNLOAD_AWB_URL}/${updatedOrderData.shipping_awb.awbNumber}`,
        {
          method: "GET",
          headers: {
            "X-AUTH-TOKEN": token,
          },
        }
      );
      if (response.ok) {
        const responseBlob = response.blob();
        const url = window.URL.createObjectURL(new Blob([responseBlob]));

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          `awb_${updatedOrderData.shipping_awb.awbNumber}.pdf`
        );

        link.style.display = "none";

        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(url);
        document.body.removeChild(link);
      }
    }
  };

  return (
    <>
      {updatedOrderData !== null ? (
        <>
          <div className="w-full border-foregroundPrimary10 border-[1px] rounded-xl shadow-xl py-6 px-8 bg-backgroundPrimary mb-4">
            <div className="flex flex-row justify-between">
              <h2 className="text-xl font-bold">Detalii comandă</h2>
              <div className="flex flex-row gap-2">
                {updatedOrderData.invoice === null ? <></> : <></>}
              </div>
            </div>

            <div>
              <div className="flex flex-row gap-12">
                <div className="w-1/2">
                  <div>
                    <h4 className="font-bold">Data crearii</h4>
                    <p>{formatter.format(new Date(updatedOrderData?.date))}</p>
                  </div>
                  <div>
                    <h4 className="font-bold">Client</h4>
                    <p>
                      {updatedOrderData?.client_id ? (
                        <>
                          <Link
                            href={`/admin/dashboard/clients/${updatedOrderData?.client_id}`}
                          >
                            {clientData?.fname} {clientData?.lname}
                          </Link>
                        </>
                      ) : (
                        <>
                          {updatedOrderData.shipping_details.fname}{" "}
                          {updatedOrderData.shipping_details.lname}
                        </>
                      )}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold">Status actual</h4>
                    <p>{orderStatus[updatedOrderData?.status].name}</p>
                  </div>
                  <div>
                    <h4 className="font-bold">Doctor</h4>
                    {updatedOrderData?.doctor?.id !== null ? (
                      <>
                        <Link
                          href={`/admin/dashboard/medics/${updatedOrderData?.doctor?.id}`}
                        >
                          <p>{updatedOrderData?.doctor?.doctor_name}</p>
                        </Link>
                      </>
                    ) : (
                      <>
                        <p>{updatedOrderData?.doctor?.client}</p>
                      </>
                    )}
                  </div>
                </div>
                <div className="w-1/2">
                  <form onSubmit={handleStatusFormSubmit}>
                    <h4 className="font-bold">Schimbă statusul</h4>
                    <div className="flex flex-row gap-2 ">
                      <div className="w-2/3">
                        <SelectInputClassic
                          data={statusData}
                          value={newStatus}
                          name="status-selector"
                          placeholder="Status actual"
                          onChange={handleStatusInputChange}
                          required={true}
                        />
                      </div>
                      <button className="px-4 py-2 bg-gradientPurple text-backgroundPrimary rounded-lg w-1/3">
                        Schimba Status
                      </button>
                    </div>
                  </form>

                  <br />

                  <form onSubmit={handleSetDoctor}>
                    <h4 className="font-bold">Schimbă doctorul</h4>
                    <div className="flex flex-row gap-2 ">
                      <div className="w-2/3">
                        <SelectInput
                          data={doctorsData}
                          value={newDoctor}
                          name="doctor-selector"
                          placeholder="Doctor"
                          onChange={handleDoctorInputChange}
                          required={true}
                        />
                      </div>
                      <button className="px-4 py-2 bg-gradientPurple text-backgroundPrimary rounded-lg w-1/3">
                        Setează doctorul
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-row gap-4">
            <div className="w-1/3 border-foregroundPrimary10 border-[1px] rounded-xl shadow-xl py-6 px-8 bg-backgroundPrimary mb-4">
              <h2 className="text-xl font-bold">Plată</h2>
              <div>
                <h4 className="font-bold">Tip plată</h4>
                <p>{updatedOrderData?.payment}</p>
              </div>
              <div>
                <h4 className="font-bold">Status plată</h4>
                <div>
                  {updatedOrderData?.payment === "card" ? (
                    <>
                      {updatedOrderData?.payment_status === null ? (
                        <p>În așteptare</p>
                      ) : (
                        <>
                          {updatedOrderData?.payment_status.status ===
                          "confirmed" ? (
                            <p>Confirmata</p>
                          ) : (
                            <></>
                          )}
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      {updatedOrderData?.payment_status === null ? (
                        <>
                          <p>În așteptare</p>
                          <button className="px-4 py-2 bg-dashboardBlue text-backgroundPrimary rounded-lg">
                            Incasează
                          </button>
                        </>
                      ) : (
                        <>
                          {updatedOrderData?.payment_status.status ===
                          "confirmed" ? (
                            <p>Confirmata</p>
                          ) : (
                            <></>
                          )}
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="w-1/3 border-foregroundPrimary10 border-[1px] rounded-xl shadow-xl py-6 px-8 bg-backgroundPrimary mb-4">
              <div>
                <h2 className="text-xl font-bold">Factură</h2>
                <p>
                  {updatedOrderData?.invoice !== null ? (
                    <>
                      <button
                        onClick={(e) =>
                          handleViewInvoice(
                            e,
                            updatedOrderData.invoice.series,
                            updatedOrderData.invoice.number
                          )
                        }
                      >
                        {updatedOrderData.invoice.series}{" "}
                        {updatedOrderData.invoice.number}
                      </button>
                      <br />
                      {updatedOrderData.invoice?.reverse ? (
                        <>
                          <button
                            onClick={(e) =>
                              handleViewInvoice(
                                e,
                                updatedOrderData.invoice.reverse.series,
                                updatedOrderData.invoice.reverse.number
                              )
                            }
                            className="px-4 py-2 bg-dashboardBlue text-backgroundPrimary rounded-lg"
                          >
                            Stornare - {updatedOrderData.invoice.reverse.series}{" "}
                            {updatedOrderData.invoice.reverse.number}
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={handleReverseInvoice}
                            className="px-4 py-2 bg-dashboardBlue text-backgroundPrimary rounded-lg"
                          >
                            Storneaza
                          </button>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <button
                        className="px-4 py-2 bg-dashboardBlue text-backgroundPrimary rounded-lg"
                        onClick={handleGenerateInvoice}
                      >
                        Genereaza factura
                      </button>
                    </>
                  )}
                </p>
              </div>
            </div>
            <div className="w-1/3 border-foregroundPrimary10 border-[1px] rounded-xl shadow-xl py-6 px-8 bg-backgroundPrimary mb-4">
              <h2 className="text-xl font-bold">Livrare</h2>
              <div>
                <h4 className="font-bold">Serviciu de curierat</h4>
                <p>
                  {updatedOrderData?.shipping_details.provider} -{" "}
                  {updatedOrderData?.shipping_details.type}
                </p>
              </div>
              <div>
                <h4 className="font-bold">AWB</h4>
                <p>
                  {updatedOrderData?.shipping_awb === null ? (
                    <>
                      <button
                        onClick={handleGenerateAWB}
                        className="px-4 py-2 bg-dashboardBlue text-backgroundPrimary rounded-lg"
                      >
                        Genreaza AWB
                      </button>
                    </>
                  ) : (
                    <>
                      {updatedOrderData?.shipping_details?.provider ===
                      "Sameday" ? (
                        <>
                          <Link
                            href={`https://sameday.ro/#awb=${updatedOrderData?.shipping_awb?.awbNumber}`}
                          >
                            {updatedOrderData?.shipping_awb?.awbNumber}
                          </Link>
                          <br />
                          <button onClick={downloadSamedayAwb}>
                            Descarca AWB
                          </button>
                        </>
                      ) : (
                        <></>
                      )}
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-row gap-4">
            <div className="w-1/2 border-foregroundPrimary10 border-[1px] rounded-xl shadow-xl py-6 px-8 bg-backgroundPrimary mb-4">
              <h2 className="text-xl font-bold">Livrare</h2>

              <div>
                <p>
                  {updatedOrderData.shipping_details.fname}{" "}
                  {updatedOrderData.shipping_details.lname}
                </p>
                <p>{updatedOrderData.shipping_details.address}</p>
                <p>{updatedOrderData.shipping_details.city}</p>
                <p>{updatedOrderData.shipping_details.state}</p>
                <p>{updatedOrderData.shipping_details.country}</p>
                <p>{updatedOrderData.shipping_details.postalCode}</p>
              </div>
            </div>
            <div className="w-1/2 border-foregroundPrimary10 border-[1px] rounded-xl shadow-xl py-6 px-8 bg-backgroundPrimary mb-4">
              <h2 className="text-xl font-bold">Facturare</h2>
              <div>
                {updatedOrderData.billing_details.entity === "pf" ? (
                  <>
                    <p>
                      {updatedOrderData.billing_details.fname}{" "}
                      {updatedOrderData.billing_details.lname}
                    </p>
                    <p>{updatedOrderData.billing_details.address}</p>
                    <p>{updatedOrderData.billing_details.city}</p>
                    <p>{updatedOrderData.billing_details.state}</p>
                    <p>{updatedOrderData.billing_details.country}</p>
                    <p>{updatedOrderData.billing_details.postalCode}</p>
                  </>
                ) : (
                  <>
                    <p>
                      {updatedOrderData.billing_details.companyName}
                      {" - "}
                      {updatedOrderData.billing_details.companyCif}
                    </p>
                    <p>{updatedOrderData.billing_details.address}</p>
                    <p>{updatedOrderData.billing_details.city}</p>
                    <p>{updatedOrderData.billing_details.state}</p>
                    <p>{updatedOrderData.billing_details.country}</p>
                    <p>{updatedOrderData.billing_details.postalCode}</p>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="w-full border-foregroundPrimary10 border-[1px] rounded-xl shadow-xl py-6 px-8 bg-backgroundPrimary mb-4">
            <h2 className="text-xl font-bold">Cos de cumparaturi</h2>
            <Table
              sx={{
                backgroundColor: "var(--background-primary)",
                color: "var(--foreground-primary)",
              }}
            >
              <TableHead
                sx={{
                  backgroundColor: "var(--background-primary)",
                  color: "var(--foreground-primary)",
                }}
              >
                <TableRow
                  sx={{
                    backgroundColor: "var(--background-primary)",
                    color: "var(--foreground-primary)",
                  }}
                >
                  <TableCell
                    sx={{
                      backgroundColor: "var(--background-primary)",
                      color: "var(--foreground-primary)",
                      fontWeight: 600,
                    }}
                  >
                    Produs
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "var(--background-primary)",
                      color: "var(--foreground-primary)",
                      fontWeight: 600,
                    }}
                  >
                    Lot
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "var(--background-primary)",
                      color: "var(--foreground-primary)",
                      fontWeight: 600,
                    }}
                  >
                    Data expirării
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "var(--background-primary)",
                      color: "var(--foreground-primary)",
                      fontWeight: 600,
                    }}
                  >
                    Pret unitar
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "var(--background-primary)",
                      color: "var(--foreground-primary)",
                      fontWeight: 600,
                    }}
                  >
                    Cantitate
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      backgroundColor: "var(--background-primary)",
                      color: "var(--foreground-primary)",
                      fontWeight: 600,
                    }}
                  >
                    Total
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {updatedOrderData?.cart ? (
                  <>
                    {updatedOrderData.cart.map((row) => (
                      <TableRow key={row.productName}>
                        <TableCell
                          sx={{
                            backgroundColor: "var(--background-primary)",
                            color: "var(--foreground-primary)",
                          }}
                        >
                          {row.productName === "renal_single"
                            ? t("renal-single-short-name")
                            : t("renal-bundle-short-name")}
                        </TableCell>
                        <TableCell
                          sx={{
                            backgroundColor: "var(--background-primary)",
                            color: "var(--foreground-primary)",
                          }}
                        >
                          <input
                            type="text"
                            name={`lotNumber-${row.productName}`}
                            value={row.lotNumber}
                            onChange={modifyProductData}
                            className="w-full bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                            readOnly={initialOrderData.invoice !== null}
                          />
                        </TableCell>
                        <TableCell
                          sx={{
                            backgroundColor: "var(--background-primary)",
                            color: "var(--foreground-primary)",
                          }}
                        >
                          <input
                            type="date"
                            name={`expDate-${row.productName}`}
                            value={row.expDate}
                            onChange={modifyProductData}
                            className="w-full bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                            readOnly={initialOrderData.invoice !== null}
                          />
                        </TableCell>

                        <TableCell
                          sx={{
                            backgroundColor: "var(--background-primary)",
                            color: "var(--foreground-primary)",
                          }}
                        >
                          {row.price} {updatedOrderData.currency}
                        </TableCell>
                        <TableCell
                          sx={{
                            backgroundColor: "var(--background-primary)",
                            color: "var(--foreground-primary)",
                          }}
                        >
                          x{row.quantity}
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{
                            backgroundColor: "var(--background-primary)",
                            color: "var(--foreground-primary)",
                          }}
                        >
                          {row.price * row.quantity} {updatedOrderData.currency}
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                ) : (
                  <></>
                )}
                {updatedOrderData?.order_total ? (
                  <>
                    <TableRow>
                      <TableCell colSpan={2} align="left">
                        {productsDetailsModified ? (
                          <>
                            <form onSubmit={handleSaveProductDetails}>
                              <button className="px-4 py-2 bg-dashboardBlue text-backgroundPrimary rounded-lg">
                                Salvează
                              </button>
                            </form>
                          </>
                        ) : (
                          <></>
                        )}
                      </TableCell>
                      <TableCell colSpan={2} align="right">
                        <div>Total produse</div>
                        <div>Transport estimat</div>
                        <div>Reducere cod promotional</div>
                        <div className="text-xl">Total</div>
                      </TableCell>
                      <TableCell colSpan={2} align="right">
                        <div>
                          {updatedOrderData.products_total}{" "}
                          {updatedOrderData.currency}
                        </div>
                        <div>
                          {updatedOrderData.shipping_total}{" "}
                          {updatedOrderData.currency}
                        </div>
                        <div>
                          -{updatedOrderData.promo_total}{" "}
                          {updatedOrderData.currency}
                        </div>
                        <div className="text-xl">
                          {updatedOrderData.order_total}{" "}
                          {updatedOrderData.currency}
                        </div>
                      </TableCell>
                    </TableRow>
                  </>
                ) : (
                  <></>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="w-full border-foregroundPrimary10 border-[1px] rounded-xl shadow-xl py-6 px-8 bg-backgroundPrimary">
            <h2 className="text-xl font-bold">Logs</h2>
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
      ) : (
        <>
          <LoadingBlock />
        </>
      )}
    </>
  );
}

export default OrderDetails;

const json = {
  number: "0090",
  series: "RND",
  message: "",
  url: "",
  date: "2024-02-01T15:17:57.993Z",
  reverse: {
    number: "0091",
    series: "RND",
    message: "",
    url: "",
    date: "2024-02-01T15:30:28.909Z",
  },
};
