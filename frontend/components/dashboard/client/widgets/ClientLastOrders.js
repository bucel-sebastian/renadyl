"use client";

import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableFooter,
} from "@mui/material";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import Link from "next-intl/link";
import { useTranslations } from "next-intl";

function ClientLastOrders() {
  const session = useSession();

  const [dataIsLoading, setDataIsLoading] = useState(true);

  const [data, setData] = useState([]);

  const t = useTranslations("Dashboard.client.orders");

  const orderStatus = [
    { name: t("orders-list.order-status.cancelled"), color: "#e74d3d" },
    { name: t("orders-list.order-status.placed"), color: "#f1c40d" },
    { name: t("orders-list.order-status.processing"), color: "#e77e22" },
    { name: t("orders-list.order-status.ready-to-ship"), color: "#3397dc" },
    { name: t("orders-list.order-status.shipped"), color: "#2980b9" },
    { name: t("orders-list.order-status.finished"), color: "#2ecd70" },
  ];

  const datetimeOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  const formatter = new Intl.DateTimeFormat("ro-RO", datetimeOptions);

  const getClientLastOrders = async (clientId) => {
    const response = await fetch(
      `/api/client/data/json/orders/last/${clientId}`
    );
    if (response.ok) {
      const body = await response.json();
      console.log(body);
      for (let i = 0; i < body.body.length; i++) {}
      setData(body.body);
      setDataIsLoading(false);
    }
  };

  useEffect(() => {
    if (session?.data?.user && dataIsLoading) {
      getClientLastOrders(session?.data?.user?.id);
    }
  }, [session]);

  return (
    <>
      <div className="w-full border-foregroundPrimary10 border-[1px] rounded-xl shadow-xl py-6 px-8 bg-backgroundPrimary ">
        <h3 className="text-2xl font-bold mb-4">{t("last-orders.title")}</h3>
        <div className="w-full overflow-y-auto">
          {data.length !== 0 ? (
            <>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>{t("orders-list.table-heads.id")}</TableCell>
                    <TableCell>{t("orders-list.table-heads.status")}</TableCell>
                    <TableCell>{t("orders-list.table-heads.date")}</TableCell>
                    <TableCell align="right">
                      {t("orders-list.table-heads.value")}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>
                        {parseInt(row.status) === 0 ? (
                          <>
                            <div
                              className={`w-max  rounded-xl px-3 py-[2px] text-foregroundSecondary bg-[#e74d3d]`}
                            >
                              {t("orders-list.order-status.cancelled")}
                            </div>
                          </>
                        ) : (
                          <>
                            {parseInt(row.status) === 1 ? (
                              <>
                                <div
                                  className={`w-max  rounded-xl px-3 py-[2px] text-foregroundSecondary bg-[#f1c40d]`}
                                >
                                  {t("orders-list.order-status.placed")}
                                </div>
                              </>
                            ) : (
                              <>
                                {parseInt(row.status) === 2 ? (
                                  <>
                                    <div
                                      className={`w-max  rounded-xl px-3 py-[2px] text-foregroundSecondary bg-[#e77e22]`}
                                    >
                                      {t("orders-list.order-status.processing")}
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    {parseInt(row.status) === 3 ? (
                                      <>
                                        <div
                                          className={`w-max  rounded-xl px-3 py-[2px] text-foregroundSecondary bg-[#3397dc]`}
                                        >
                                          {t(
                                            "orders-list.order-status.ready-to-ship"
                                          )}
                                        </div>
                                      </>
                                    ) : (
                                      <>
                                        {parseInt(row.status) === 4 ? (
                                          <>
                                            <div
                                              className={`w-max  rounded-xl px-3 py-[2px] text-foregroundSecondary bg-[#2980b9]`}
                                            >
                                              {t(
                                                "orders-list.order-status.shipped"
                                              )}
                                            </div>
                                          </>
                                        ) : (
                                          <>
                                            {parseInt(row.status) === 5 ? (
                                              <>
                                                <div
                                                  className={`w-max  rounded-xl px-3 py-[2px] text-foregroundSecondary bg-[#2ecd70]`}
                                                >
                                                  {t(
                                                    "orders-list.order-status.finished"
                                                  )}
                                                </div>
                                              </>
                                            ) : (
                                              <>
                                                {parseInt(row.status) === 6 ? (
                                                  <>
                                                    <div
                                                      className={`w-max  rounded-xl px-3 py-[2px] text-foregroundSecondary bg-[#e74d3d]`}
                                                    >
                                                      {t(
                                                        "orders-list.order-status.refunded"
                                                      )}
                                                    </div>
                                                  </>
                                                ) : (
                                                  <></>
                                                )}
                                              </>
                                            )}
                                          </>
                                        )}
                                      </>
                                    )}
                                  </>
                                )}
                              </>
                            )}
                          </>
                        )}
                      </TableCell>
                      <TableCell>
                        {formatter.format(new Date(row.date))}
                      </TableCell>
                      <TableCell align="right">
                        {row.order_total} {row.currency}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          ) : (
            <>
              <p>{t("last-orders.no-orders")}</p>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default ClientLastOrders;
