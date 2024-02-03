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

function ClientOrdersList() {
  const session = useSession();

  const [dataIsLoading, setDataIsLoading] = useState(true);

  const [data, setData] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getClientOrderList = async (clientId) => {
    const response = await fetch(
      `/api/client/data/json/orders/all/${clientId}`
    );
    if (response.ok) {
      const body = await response.json();
      console.log(body);
      for (let i = 0; i < body.body.length; i++) {
        body.body[i].shipping_details = JSON.parse(
          body.body[i].shipping_details
        );
        body.body[i].billing_details = JSON.parse(body.body[i].billing_details);
        //   body.body[i].cart = JSON.parse(body.body[i].cart);
      }
      console.log(body.body);
      setData(body.body);
      setDataIsLoading(false);
    }
  };

  useEffect(() => {
    if (session?.data?.user && dataIsLoading) {
      console.log(session?.data?.user?.id);
      getClientOrderList(session?.data?.user?.id);
    }
  }, [session]);
  return (
    <div className="relative block w-full overflow-x-auto max-w-full bg-backgroundPrimary h-full overflow-y-auto ">
      {dataIsLoading ? (
        <></>
      ) : (
        <>
          <Table
            stickyHeader
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
                  {t("orders-list.table-heads.id")}
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "var(--background-primary)",
                    color: "var(--foreground-primary)",
                    fontWeight: 600,
                  }}
                >
                  {t("orders-list.table-heads.date")}
                </TableCell>

                <TableCell
                  align="center"
                  sx={{
                    backgroundColor: "var(--background-primary)",
                    color: "var(--foreground-primary)",
                    fontWeight: 600,
                  }}
                >
                  {t("orders-list.table-heads.status")}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    backgroundColor: "var(--background-primary)",
                    color: "var(--foreground-primary)",
                    fontWeight: 600,
                  }}
                >
                  {t("orders-list.table-heads.payment-type")}
                </TableCell>

                <TableCell
                  align="center"
                  sx={{
                    backgroundColor: "var(--background-primary)",
                    color: "var(--foreground-primary)",
                    fontWeight: 600,
                  }}
                >
                  {t("orders-list.table-heads.value")}
                </TableCell>

                <TableCell
                  align="center"
                  sx={{
                    backgroundColor: "var(--background-primary)",
                    color: "var(--foreground-primary)",
                    fontWeight: 600,
                  }}
                >
                  {t("orders-list.table-heads.transport")}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    backgroundColor: "var(--background-primary)",
                    color: "var(--foreground-primary)",
                    fontWeight: 600,
                  }}
                >
                  {t("orders-list.table-heads.actions")}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? data.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : data
              ).map((row) => (
                <TableRow key={row.id}>
                  <TableCell
                    sx={{
                      backgroundColor: "var(--background-primary)",
                      color: "var(--foreground-primary)",
                    }}
                  >
                    <Link href={`/dashboard/client/orders/${row.id}`}>
                      {row.id}
                    </Link>
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "var(--background-primary)",
                      color: "var(--foreground-primary)",
                    }}
                  >
                    {formatter.format(new Date(row.date))}
                  </TableCell>

                  <TableCell
                    align="center"
                    sx={{
                      backgroundColor: "var(--background-primary)",
                      color: "var(--foreground-primary)",
                    }}
                  >
                    <div
                      className={`w-max mx-auto rounded-xl ${`bg-[${
                        orderStatus[row.status].color
                      }]`}`}
                    >
                      {orderStatus[row.status].name}
                    </div>
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      backgroundColor: "var(--background-primary)",
                      color: "var(--foreground-primary)",
                    }}
                  >
                    {row.payment}
                  </TableCell>

                  <TableCell
                    align="center"
                    sx={{
                      backgroundColor: "var(--background-primary)",
                      color: "var(--foreground-primary)",
                    }}
                  >
                    {row.order_total} {row.currency}
                  </TableCell>

                  <TableCell
                    sx={{
                      backgroundColor: "var(--background-primary)",
                      color: "var(--foreground-primary)",
                    }}
                  >
                    {row.shipping_awb}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      backgroundColor: "var(--background-primary)",
                      color: "var(--foreground-primary)",
                    }}
                  >
                    <Link
                      href={`/dashboard/client/orders/${row.id}`}
                      className="text-gradientPurple"
                    >
                      Detalii
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  labelRowsPerPage={t("tables.rows-per-page-label")}
                  rowsPerPageOptions={[
                    10,
                    25,
                    50,
                    100,
                    { label: t("tables.all-label"), value: -1 },
                  ]}
                  colSpan={10}
                  count={data.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                  labelDisplayedRows={({ from, to, count }) =>
                    `${from}-${to} ${t("tables.of-label")} ${count} ${t(
                      "tables.elements-label"
                    )}`
                  }
                />
              </TableRow>
            </TableFooter>
          </Table>
        </>
      )}
    </div>
  );
}

export default ClientOrdersList;
