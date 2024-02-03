"use client";
import LoadingBlock from "@/components/LoadingBlock";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useTranslations } from "next-intl";
import Link from "next-intl/link";
import React, { useState, useEffect } from "react";

function LastOrders() {
  const [dataIsLoading, setDataIsLoading] = useState(true);

  const [data, setData] = useState([]);

  const orderStatus = [
    { name: "Anulată", color: "#e74d3d" },
    { name: "Plasată", color: "#f1c40d" },
    { name: "În procesare", color: "#e77e22" },
    { name: "Pregătită de expediere", color: "#3397dc" },
    { name: "Expediată", color: "#2980b9" },
    { name: "Finalizată", color: "#2ecd70" },
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

  const getOrdersList = async () => {
    const response = await fetch("/api/admin/data/json/orders/last");
    const body = await response.json();
    setData(body.body);
    setDataIsLoading(false);
  };

  useEffect(() => {
    if (dataIsLoading) {
      getOrdersList();
    }
  }, []);

  const formatter = new Intl.DateTimeFormat("ro-RO", datetimeOptions);

  const t = useTranslations("Dashboard");

  return (
    <>
      <div className="w-full border-foregroundPrimary10 border-[1px] rounded-xl shadow-xl py-6 px-8 bg-backgroundPrimary">
        <h3 className="text-2xl font-bold mb-4">
          {t("admin.orders.last-orders.title")}
        </h3>
        {/* <TableContainer component={Paper}> */}

        {dataIsLoading ? (
          <>
            <LoadingBlock />
          </>
        ) : (
          <>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    {t("admin.orders.last-orders.table-heads.id")}
                  </TableCell>
                  <TableCell>
                    {t("admin.orders.last-orders.table-heads.status")}
                  </TableCell>
                  <TableCell>
                    {t("admin.orders.last-orders.table-heads.date")}
                  </TableCell>
                  <TableCell align="right">
                    {t("admin.orders.last-orders.table-heads.value")}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <Link href={`/admin/dashboard/orders/${row.id}`}>
                        {row.id}
                      </Link>
                    </TableCell>
                    <TableCell>
                      {" "}
                      <div
                        className={`w-max mx-auto rounded-xl px-3 py-1 ${`bg-[${
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
        )}
        {/* </TableContainer> */}
      </div>
    </>
  );
}

export default LastOrders;
