"use client";
import SelectInput from "@/components/SelectInput";
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
  const [productsDetailsModified, setProductsDetailsModified] = useState(false);

  const [newStatus, setNewStatus] = useState(1);

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
    { name: "Anulată", color: "#e74d3d" },
    { name: "Plasată", color: "#f1c40d" },
    { name: "În procesare", color: "#e77e22" },
    { name: "Pregătită de expediere", color: "#3397dc" },
    { name: "Expediată", color: "#2980b9" },
    { name: "Finalizată", color: "#2ecd70" },
  ];

  const statusData = {
    "status-0": "Anulată",
    "status-1": "Plasată",
    "status-2": "În procesare",
    "status-3": "Pregătită de expediere",
    "status-4": "Expediată",
    "status-5": "Finalizată",
    "status-6": "Stornată",
  };

  const formatter = new Intl.DateTimeFormat("ro-RO", datetimeOptions);

  const getOrderData = async () => {
    const response = await fetch(`/api/admin/data/json/orders/${orderId}`);
    const body = await response.json();

    body.body.billing_details = JSON.parse(body.body.billing_details);
    body.body.cart = JSON.parse(body.body.cart);
    body.body.shipping_details = JSON.parse(body.body.shipping_details);
    body.body.client_details = JSON.parse(body.body.client_details);
    if (body.body.payment_status !== null) {
      body.body.payment_status = JSON.parse(body.body.payment_status);
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

  const viewInvoice = async () => {
    const backendResponse = await fetch(
      `/api/admin/view-invoice/${updatedOrderData.invoice.series}/${updatedOrderData.invoice.number}`
    );

    const backendBody = await backendResponse.json();

    const response = await fetch(
      `https://ws.smartbill.ro/SBORO/api/invoice/pdf?cif=${backendBody.body.businessCif}&seriesname=${backendBody.body.series}&number=${backendBody.body.number}`,
      {
        headers: {
          Accept: "application/octet-stream",
          Authorization: backendBody.body.auth,
        },
      }
    );
    const body = await response.blob();
    const url = window.URL.createObjectURL(new Blob([body]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `${backendBody.body.series} ${backendBody.body.number}.pdf`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleViewInvoice = (e) => {
    e.preventDefault();
    viewInvoice();
  };

  const viewReverseInvoice = async () => {
    const backendResponse = await fetch(
      `/api/admin/view-invoice/${updatedOrderData.invoice.reverse.series}/${updatedOrderData.invoice.reverse.number}`
    );

    const backendBody = await backendResponse.json();

    const response = await fetch(
      `https://ws.smartbill.ro/SBORO/api/invoice/pdf?cif=${backendBody.body.businessCif}&seriesname=${backendBody.body.series}&number=${backendBody.body.number}`,
      {
        headers: {
          Accept: "application/octet-stream",
          Authorization: backendBody.body.auth,
        },
      }
    );
    const body = await response.blob();
    const url = window.URL.createObjectURL(new Blob([body]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `${backendBody.body.series} ${backendBody.body.number}.pdf`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleViewReverseInvoice = (e) => {
    e.preventDefault();
    viewReverseInvoice();
  };
  const reverseInvoice = async () => {
    const response = await fetch(
      `/api/admin/reverse-invoice/${initialOrderData.id}`
    );
    if (response.ok) {
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
  }, []);

  useEffect(() => {
    console.log("Order data - ", initialOrderData);
  }, [initialOrderData]);

  useEffect(() => {
    if (updatedOrderData !== null) verifyIfProductDetailsAreModified();
  }, [updatedOrderData]);

  return (
    <>
      {updatedOrderData !== null ? (
        <>
          <div className="w-full border-foregroundPrimary10 border-[1px] rounded-xl shadow-xl py-6 px-8 bg-backgroundPrimary mb-4">
            <div className="flex flex-row justify-between">
              <h2 className="text-xl font-bold">Detalii comandă</h2>
              <div className="flex flex-row gap-2">
                <button
                  onClick={handleGenerateAWB}
                  className="px-4 py-2 bg-dashboardBlue text-backgroundPrimary rounded-lg"
                >
                  Genreaza AWB
                </button>
                {updatedOrderData.invoice === null ? <></> : <></>}
              </div>
            </div>

            <div>
              <div className="flex flex-row gap-8">
                <div className="w-1/2">
                  <div>
                    <h4 className="font-bold">Data crearii</h4>
                    <p>{formatter.format(new Date(updatedOrderData?.date))}</p>
                  </div>

                  <div>
                    <h4 className="font-bold">Status actual</h4>
                    <p>{orderStatus[updatedOrderData?.status].name}</p>
                  </div>
                  <div>
                    <form onSubmit={handleStatusFormSubmit}>
                      <div className="flex flex-row gap-2 ">
                        <div className="w-2/3">
                          <SelectInput
                            data={statusData}
                            value={newStatus}
                            name="status-selector"
                            placeholder="Status actual"
                            onChange={handleStatusInputChange}
                            required={true}
                          />
                        </div>
                        <button className="px-4 py-2 bg-dashboardBlue text-backgroundPrimary rounded-lg w-1/3">
                          Schimba Status
                        </button>
                      </div>
                    </form>
                  </div>
                  <br />
                  <div>
                    <h4 className="font-bold">Client</h4>
                    <p>
                      {updatedOrderData?.client_details.isLoggedIn ? (
                        <>
                          <Link>
                            {updatedOrderData.client_details.fname}{" "}
                            {updatedOrderData.client_details.lname}
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
                    <h4 className="font-bold">Doctor</h4>
                    <p>{updatedOrderData?.doctor}</p>
                  </div>
                </div>
                <div className="w-1/2">
                  <div>
                    <h4 className="font-bold">Tip plată</h4>
                    <p>{updatedOrderData?.payment}</p>
                  </div>
                  <div>
                    <h4 className="font-bold">Status plată</h4>
                    <p>
                      {updatedOrderData?.payment_status === null ? (
                        <>În așteptare</>
                      ) : (
                        <>
                          {updatedOrderData?.payment_status.status ===
                          "confirmed" ? (
                            <>Confirmata</>
                          ) : (
                            <></>
                          )}
                        </>
                      )}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold">Factura</h4>
                    <p>
                      {updatedOrderData?.invoice !== null ? (
                        <>
                          <button onClick={handleViewInvoice}>
                            {updatedOrderData.invoice.series}{" "}
                            {updatedOrderData.invoice.number}
                          </button>
                          <br />
                          {updatedOrderData.invoice?.reverse ? (
                            <>
                              <button onClick={handleViewReverseInvoice}>
                                Stornare -{" "}
                                {updatedOrderData.invoice.reverse.series}{" "}
                                {updatedOrderData.invoice.reverse.number}
                              </button>
                            </>
                          ) : (
                            <>
                              <button onClick={handleReverseInvoice}>
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
                  <br />
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
                        <>AWB-ul nu a fost generat</>
                      ) : (
                        <></>
                      )}
                    </p>
                  </div>
                </div>
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
        <></>
      )}
    </>
  );
}

export default OrderDetails;
