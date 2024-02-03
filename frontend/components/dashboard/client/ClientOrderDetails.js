"use client";
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

function ClientOrderDetails({ orderId }) {
  const [orderData, setOrderData] = useState(null);
  const [orderHasCancelRequest, setOrderHasCancelRequest] = useState(false);
  const [openCancelRequestModal, setOpenCancelRequestModal] = useState(false);
  const [cancelRequestReason, setCancelRequestReason] = useState("");

  const [newStatus, setNewStatus] = useState(null);

  const t = useTranslations("Dashboard.client.orders.order-page");

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
    { name: t("orders-list.order-status.cancelled"), color: "#e74d3d" },
    { name: t("orders-list.order-status.placed"), color: "#f1c40d" },
    { name: t("orders-list.order-status.processing"), color: "#e77e22" },
    { name: t("orders-list.order-status.ready-to-ship"), color: "#3397dc" },
    { name: t("orders-list.order-status.shipped"), color: "#2980b9" },
    { name: t("orders-list.order-status.finished"), color: "#2ecd70" },
    { name: t("orders-list.order-status.refunded"), color: "#e74d3d" },
  ];

  const statusData = {
    "status-0": t("orders-list.order-status.cancelled"),
    "status-1": t("orders-list.order-status.placed"),
    "status-2": t("orders-list.order-status.processing"),
    "status-3": t("orders-list.order-status.ready-to-ship"),
    "status-4": t("orders-list.order-status.shipped"),
    "status-5": t("orders-list.order-status.finished"),
    "status-6": t("orders-list.order-status.refunded"),
  };

  const formatter = new Intl.DateTimeFormat("ro-RO", datetimeOptions);

  const getOrderData = async () => {
    const response = await fetch(`/api/client/data/json/orders/${orderId}`);
    const body = await response.json();

    console.log(body);

    body.body.billing_details = JSON.parse(body.body.billing_details);
    body.body.cart = JSON.parse(body.body.cart);
    body.body.shipping_details = JSON.parse(body.body.shipping_details);
    if (body.body?.doctor !== null) {
      body.body.doctor = body.body?.doctor;
    }
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

    setOrderData(initialData);
    getIfOrderHasCancelRequest(orderId);
  };

  const getIfOrderHasCancelRequest = async (orderId) => {
    const response = await fetch(
      `/api/client/data/json/orders/check-cancel-request/${orderId}`
    );
    if (response.ok) {
      const body = await response.json();
      setOrderHasCancelRequest(body.response);
    }
  };

  const handleCancelOrder = (e) => {
    e.preventDefault();
    setOpenCancelRequestModal(true);
    document.body.style.overflow = "hidden";
  };

  const handleDenyCancelOrder = (e) => {
    e.preventDefault();
    setOpenCancelRequestModal(false);
    document.body.style.overflow = "";
  };

  const requestCancelOrder = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/client/request-cancel-order`, {
      method: "POST",
      body: JSON.stringify({
        order_id: orderData.id,
        reason: cancelRequestReason,
      }),
    });
    if (response.ok) {
      const body = await response.json();
      if (body.response === true) {
        toast.success(t("request-cancel-order-success"), {
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
        toast.error(t("request-cancel-order-fail"), {
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
      handleDenyCancelOrder(e);
      getOrderData();
      setCancelRequestReason("");
    }
  };

  const handleViewInvoice = async (e, series, number) => {
    e.preventDefault();

    const response = await fetch(
      `/api/client/data/json/view-invoice/${series}/${number}`
    );
    if (response.ok) {
      const body = await response.json();

      console.log(body.body);
      const headers = new Headers(body.body.headers);
      const smartbillResponse = await fetch(body.body.url, {
        headers: headers,
      });
      const data = await smartbillResponse.arrayBuffer();

      const pdfBlob = new Blob([data], { type: "application/pdf" });

      const pdfUrl = URL.createObjectURL(pdfBlob);

      window.open(pdfUrl, "_blank");
    }
  };

  useEffect(() => {
    getOrderData();
  }, []);

  useEffect(() => {
    console.log("order data - ", orderData);
    console.log("order cancel req - ", orderHasCancelRequest);
  }, [orderData, orderHasCancelRequest]);

  return (
    <>
      {orderData !== null ? (
        <>
          <div className="w-full border-foregroundPrimary10 border-[1px] rounded-xl shadow-xl py-6 px-8 bg-backgroundPrimary mb-4 mt-4">
            <div className="flex flex-row justify-between">
              <h2 className="text-xl font-bold">Detalii comandă</h2>
            </div>
            <div>
              <div className="flex flex-row gap-8">
                <div className="w-1/2">
                  <div>
                    <h4 className="font-bold">Data crearii</h4>
                    <p>{formatter.format(new Date(orderData?.date))}</p>
                  </div>

                  <div>
                    <h4 className="font-bold">Status actual</h4>
                    <p>{orderStatus[orderData?.status].name}</p>
                  </div>
                  <div>
                    <div className="flex flex-row gap-2 ">
                      <div className="w-2/3">
                        {/* <SelectInput
                          data={statusData}
                          value={newStatus}
                          name="status-selector"
                          placeholder="Status actual"
                          onChange={handleStatusInputChange}
                          required={true}
                        /> */}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold">Doctor</h4>
                    <p>
                      {orderData?.doctor?.id
                        ? orderData?.doctor?.doctor_name
                        : orderData?.doctor?.client}
                    </p>
                  </div>
                  <br />
                  <div>
                    <h4 className="font-bold">Serviciu de curierat</h4>
                    <p>
                      {orderData?.shipping_details.provider} -{" "}
                      {orderData?.shipping_details.type}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold">AWB</h4>
                    <p>
                      {orderData?.shipping_awb === null ? (
                        <>AWB-ul nu a fost generat</>
                      ) : (
                        <></>
                      )}
                    </p>
                  </div>
                </div>
                <div className="w-1/2">
                  <div>
                    <h4 className="font-bold">Tip plată</h4>
                    <p>{orderData?.payment}</p>
                  </div>
                  <div>
                    <h4 className="font-bold">Status plată</h4>
                    <p>
                      {orderData?.payment_status === null ? (
                        <>În așteptare</>
                      ) : (
                        <>
                          {orderData?.payment_status.status === "confirmed" ? (
                            <>Confirmata</>
                          ) : (
                            <></>
                          )}
                        </>
                      )}
                    </p>
                  </div>
                  <div>
                    {orderData?.invoice?.reverse ? (
                      <>
                        <h4 className="font-bold">Factura</h4>
                        <p>
                          <button
                            onClick={(e) =>
                              handleViewInvoice(
                                e,
                                orderData.invoice.series,
                                orderData.invoice.number
                              )
                            }
                          >
                            {orderData.invoice.series}{" "}
                            {orderData.invoice.number}
                          </button>
                        </p>
                        <h4 className="font-bold">Factura storno</h4>
                        <p>
                          <button
                            onClick={(e) =>
                              handleViewInvoice(
                                e,
                                orderData.invoice.reverse.series,
                                orderData.invoice.reverse.number
                              )
                            }
                          >
                            {orderData.invoice.reverse.series}{" "}
                            {orderData.invoice.reverse.number}
                          </button>
                        </p>
                      </>
                    ) : (
                      <>
                        <h4 className="font-bold">Factura</h4>
                        <p>
                          {orderData?.invoice !== null ? (
                            <>
                              <button
                                onClick={(e) =>
                                  handleViewInvoice(
                                    e,
                                    orderData.invoice.series,
                                    orderData.invoice.number
                                  )
                                }
                              >
                                {orderData.invoice.series}{" "}
                                {orderData.invoice.number}
                              </button>
                            </>
                          ) : (
                            <>Factura nu a fost generată</>
                          )}
                        </p>
                      </>
                    )}
                  </div>
                  <br />
                  <br />
                  <div>
                    {orderData.status.toString() === "0" ? (
                      <></>
                    ) : (
                      <>
                        {orderHasCancelRequest ? (
                          <p className="text-dashboardRed font-bold">
                            Cererea de anulare comanda a fost trimisa!
                          </p>
                        ) : (
                          <>
                            {orderData.status.toString() === "1" ||
                            orderData.status.toString() === "2" ||
                            orderData.status.toString() === "3" ? (
                              <>
                                <button
                                  className="text-backgroundPrimary bg-dashboardRed px-4 py-1 rounded-xl text-lg hover:bg-dashboardRed80 transition-all duration-[0.3s]"
                                  onClick={handleCancelOrder}
                                >
                                  Cere anularea comenzii
                                </button>
                              </>
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
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <div className="w-1/2 border-foregroundPrimary10 border-[1px] rounded-xl shadow-xl py-6 px-8 bg-backgroundPrimary mb-4">
              <h2 className="text-xl font-bold">Livrare</h2>

              <div>
                <p>
                  {orderData.shipping_details.fname}{" "}
                  {orderData.shipping_details.lname}
                </p>
                <p>{orderData.shipping_details.address}</p>
                <p>{orderData.shipping_details.city}</p>
                <p>{orderData.shipping_details.state}</p>
                <p>{orderData.shipping_details.country}</p>
                <p>{orderData.shipping_details.postalCode}</p>
              </div>
            </div>
            <div className="w-1/2 border-foregroundPrimary10 border-[1px] rounded-xl shadow-xl py-6 px-8 bg-backgroundPrimary mb-4">
              <h2 className="text-xl font-bold">Facturare</h2>
              <div>
                {orderData.billing_details.entity === "pf" ? (
                  <>
                    <p>
                      {orderData.billing_details.fname}{" "}
                      {orderData.billing_details.lname}
                    </p>
                    <p>{orderData.billing_details.address}</p>
                    <p>{orderData.billing_details.city}</p>
                    <p>{orderData.billing_details.state}</p>
                    <p>{orderData.billing_details.country}</p>
                    <p>{orderData.billing_details.postalCode}</p>
                  </>
                ) : (
                  <>
                    <p>
                      {orderData.billing_details.companyName}
                      {" - "}
                      {orderData.billing_details.companyCif}
                    </p>
                    <p>{orderData.billing_details.address}</p>
                    <p>{orderData.billing_details.city}</p>
                    <p>{orderData.billing_details.state}</p>
                    <p>{orderData.billing_details.country}</p>
                    <p>{orderData.billing_details.postalCode}</p>
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
                {orderData?.cart ? (
                  <>
                    {orderData.cart.map((row) => (
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
                          {row.lotNumber}
                        </TableCell>
                        <TableCell
                          sx={{
                            backgroundColor: "var(--background-primary)",
                            color: "var(--foreground-primary)",
                          }}
                        >
                          {row.expDate}
                        </TableCell>

                        <TableCell
                          sx={{
                            backgroundColor: "var(--background-primary)",
                            color: "var(--foreground-primary)",
                          }}
                        >
                          {row.price} {orderData.currency}
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
                          {row.price * row.quantity} {orderData.currency}
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                ) : (
                  <></>
                )}
                {orderData?.order_total ? (
                  <>
                    <TableRow>
                      <TableCell colSpan={2} align="left"></TableCell>
                      <TableCell colSpan={2} align="right">
                        <div>Total produse</div>
                        <div>Transport</div>
                        {orderData.promo_total === 0 ? (
                          <></>
                        ) : (
                          <>
                            <div>Reducere cod promotional</div>
                          </>
                        )}
                        <div className="text-xl">Total</div>
                        <div>TVA inclus</div>
                      </TableCell>
                      <TableCell colSpan={2} align="right">
                        <div>
                          {orderData.products_total} {orderData.currency}
                        </div>
                        <div>
                          {orderData.shipping_total} {orderData.currency}
                        </div>
                        {orderData.promo_total === 0 ? (
                          <></>
                        ) : (
                          <>
                            <div>
                              -{orderData.promo_total} {orderData.currency}
                            </div>
                          </>
                        )}
                        <div className="text-xl">
                          {orderData.order_total} {orderData.currency}
                        </div>
                        <div>
                          {orderData.vat_total} {orderData.currency}
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
          {orderData.logs !== null ? (
            <>
              <div className="w-full border-foregroundPrimary10 border-[1px] rounded-xl shadow-xl py-6 px-8 bg-backgroundPrimary mb-4">
                <h2 className="text-xl font-bold">Logs</h2>
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
                          width: "10%",
                        }}
                      >
                        ID
                      </TableCell>
                      <TableCell
                        sx={{
                          backgroundColor: "var(--background-primary)",
                          color: "var(--foreground-primary)",
                          fontWeight: 600,
                          width: "20%",
                        }}
                      >
                        Data
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          backgroundColor: "var(--background-primary)",
                          color: "var(--foreground-primary)",
                          fontWeight: 600,
                          width: "70%",
                        }}
                      >
                        Actiune
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orderData.logs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell
                          sx={{
                            backgroundColor: "var(--background-primary)",
                            color: "var(--foreground-primary)",
                          }}
                        >
                          {log.id}
                        </TableCell>
                        <TableCell
                          sx={{
                            backgroundColor: "var(--background-primary)",
                            color: "var(--foreground-primary)",
                          }}
                        >
                          {log.date}
                        </TableCell>
                        <TableCell
                          sx={{
                            backgroundColor: "var(--background-primary)",
                            color: "var(--foreground-primary)",
                          }}
                        >
                          {log.description}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </>
          ) : (
            <> </>
          )}

          {openCancelRequestModal ? (
            <>
              <div className="w-screen h-screen p-1 flex justify-center content-center items-center fixed top-0 left-0">
                <div className="max-w-[450px] w-full p-4 bg-backgroundPrimary rounded-xl border-[1px] border-foregroundPrimary20 shadow-xl">
                  <h4 className="font-bold text-center text-xl mb-2">
                    Cerere de anulare comandă
                  </h4>
                  <form onSubmit={requestCancelOrder}>
                    <label className="px-1 text-foregroundPrimary70">
                      Motivul pentru care doriti sa anulati comanda
                    </label>
                    <textarea
                      className="bg-backgroundPrimary duration-300 transition-all outline-none border-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1  resize-none h-[100px] w-full rounded-md"
                      required
                      value={cancelRequestReason}
                      onChange={(e) => setCancelRequestReason(e.target.value)}
                    ></textarea>
                    <div className="flex flex-row gap-8 justify-center content-center items-center">
                      <button
                        type="button"
                        onClick={handleDenyCancelOrder}
                        className="px-3 py-1 bg-dashboardRed text-backgroundPrimary rounded-xl border-[1px] border-foregroundPrimary20 hover:bg-dashboardRed80 transition-all duration-[0.3s]"
                      >
                        Anuleaza
                      </button>
                      <button
                        type="submit"
                        className="px-3 py-1 bg-dashboardGreen text-backgroundPrimary rounded-xl border-[1px] border-foregroundPrimary20 hover:bg-dashboardGreen80 transition-all duration-[0.3s]"
                      >
                        Trimite
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </>
          ) : (
            <></>
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
      ) : (
        <></>
      )}
    </>
  );
}

export default ClientOrderDetails;
