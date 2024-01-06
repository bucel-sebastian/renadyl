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
  const t = useTranslations("Dashboard");

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
    const body = await response.json();
    for (let i = 0; i < body.body.length; i++) {
      body.body[i].shipping_details = JSON.parse(body.body[i].shipping_details);
      body.body[i].client_details = JSON.parse(body.body[i].client_details);
      body.body[i].billing_details = JSON.parse(body.body[i].billing_details);
      //   body.body[i].cart = JSON.parse(body.body[i].cart);
    }
    console.log(body.body);
    setData(body.body);
    setDataIsLoading(false);
  };

  useEffect(() => {
    if (session?.data?.user && dataIsLoading) {
      console.log(session?.data?.user?.id);
      getClientOrderList(session?.data?.user?.id);
    }
  }, [session]);
  return (
    <div className="relative block w-full shadow-xl bg-backgroundPrimary h-full overflow-y-auto ">
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
                  {t("admin.orders.orders-list.table-heads.id")}
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "var(--background-primary)",
                    color: "var(--foreground-primary)",
                    fontWeight: 600,
                  }}
                >
                  {t("admin.orders.orders-list.table-heads.date")}
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "var(--background-primary)",
                    color: "var(--foreground-primary)",
                    fontWeight: 600,
                  }}
                >
                  {t("admin.orders.orders-list.table-heads.client")}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    backgroundColor: "var(--background-primary)",
                    color: "var(--foreground-primary)",
                    fontWeight: 600,
                  }}
                >
                  {t("admin.orders.orders-list.table-heads.status")}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    backgroundColor: "var(--background-primary)",
                    color: "var(--foreground-primary)",
                    fontWeight: 600,
                  }}
                >
                  {t("admin.orders.orders-list.table-heads.payment-type")}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    backgroundColor: "var(--background-primary)",
                    color: "var(--foreground-primary)",
                    fontWeight: 600,
                  }}
                >
                  {t("admin.orders.orders-list.table-heads.payment-status")}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    backgroundColor: "var(--background-primary)",
                    color: "var(--foreground-primary)",
                    fontWeight: 600,
                  }}
                >
                  {t("admin.orders.orders-list.table-heads.value")}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    backgroundColor: "var(--background-primary)",
                    color: "var(--foreground-primary)",
                    fontWeight: 600,
                  }}
                >
                  {t("admin.orders.orders-list.table-heads.currency")}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    backgroundColor: "var(--background-primary)",
                    color: "var(--foreground-primary)",
                    fontWeight: 600,
                  }}
                >
                  {t("admin.orders.orders-list.table-heads.transport")}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    backgroundColor: "var(--background-primary)",
                    color: "var(--foreground-primary)",
                    fontWeight: 600,
                  }}
                >
                  {t("admin.orders.orders-list.table-heads.actions")}
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
                    <Link href={`/admin/dashboard/orders/${row.id}`}>
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
                    sx={{
                      backgroundColor: "var(--background-primary)",
                      color: "var(--foreground-primary)",
                    }}
                  >
                    {row.client_details.isLoggedIn === true ? (
                      <></>
                    ) : (
                      <>
                        {row.shipping_details.fname}{" "}
                        {row.shipping_details.lname}
                      </>
                    )}
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
                    {row.payment_status === null ? <>În așteptare</> : <></>}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      backgroundColor: "var(--background-primary)",
                      color: "var(--foreground-primary)",
                    }}
                  >
                    {row.order_total}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      backgroundColor: "var(--background-primary)",
                      color: "var(--foreground-primary)",
                    }}
                  >
                    {row.currency}
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
                      href={`/admin/dashboard/orders/${row.id}`}
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
                  labelRowsPerPage={t("admin.tables.rows-per-page-label")}
                  rowsPerPageOptions={[
                    10,
                    25,
                    50,
                    100,
                    { label: t("admin.tables.all-label"), value: -1 },
                  ]}
                  colSpan={10}
                  count={data.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                  labelDisplayedRows={({ from, to, count }) =>
                    `${from}-${to} ${t("admin.tables.of-label")} ${count} ${t(
                      "admin.tables.elements-label"
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
