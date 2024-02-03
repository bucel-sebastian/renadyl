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
      <div className="w-full border-foregroundPrimary10 border-[1px] rounded-xl shadow-xl py-6 px-8 bg-backgroundPrimary">
        <h3 className="text-2xl font-bold mb-4">{t("last-orders.title")}</h3>
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
                      <div
                        className={`w-max mx-auto rounded-xl ${`bg-[${
                          orderStatus[row.status].color
                        }]`}`}
                      >
                        {orderStatus[row.status].name}
                      </div>
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
    </>
  );
}

export default ClientLastOrders;
