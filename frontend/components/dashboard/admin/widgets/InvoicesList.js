"use client";
import LoadingBlock from "@/components/LoadingBlock";
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
import { useTranslations } from "next-intl";
import Link from "next-intl/link";
import React, { useState, useEffect } from "react";

function InvoicesList() {
  const [dataIsLoading, setDataIsLoading] = useState(true);

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [clientsData, setClientsData] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [filters, setFilters] = useState({
    id: "",
    start_date: "",
    end_date: "",
    status: "",
    payment_type: "",
    payment_status: "",
    currency: "",
    shipping_awb: "",
  });

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

  const t = useTranslations("Dashboard");

  const getClientsList = async () => {
    const response = await fetch("/api/admin/data/json/clients");
    if (response.ok) {
      const body = await response.json();
      const clientsNames = new Object();

      for (let i = 0; i < body.body.length; i++) {
        if (!clientsNames[body.body[i].id]) {
          clientsNames[body.body[i].id] = {
            id: body.body[i].id,
            name: `${body.body[i].l_name} ${body.body[i].f_name}`,
          };
        }
      }

      setClientsData(clientsNames);
    }
  };

  const getInvoicessList = async () => {
    const response = await fetch("/api/admin/data/json/invoices");
    if (response.ok) {
      const body = await response.json();

      for (let i = 0; i < body.body.length; i++) {
        body.body[i].invoice = JSON.parse(body.body[i].invoice);
        body.body[i].shipping_details = JSON.parse(
          body.body[i].shipping_details
        );
      }
      console.log("FACTURI", body.body);
      setData(body.body);
      setDataIsLoading(false);
    }
  };

  const handleViewInvoice = async (e, series, number) => {
    e.preventDefault();

    const response = await fetch(
      `/api/admin/data/json/invoices/${series}/${number}`
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

  const filterData = () => {
    setFilteredData(
      data.filter((obj) => {
        // {
        //     id: "",
        //     start_date: "",
        //     end_date: "",
        //     status: "",
        //     payment_type: "",
        //     payment_status: "",
        //     currency: "",
        //     shipping_awb: "",
        //   }

        return true;
      })
    );
  };

  useEffect(() => {
    if (dataIsLoading) {
      getClientsList();

      getInvoicessList();
    }
  }, []);

  useEffect(() => {
    filterData();
    setPage(0);
  }, [data, filters]);

  return (
    <div className="relative block w-full  bg-backgroundPrimary h-full overflow-y-auto ">
      {dataIsLoading ? (
        <>
          <LoadingBlock />
        </>
      ) : (
        <>
          <Table
            stickyHeader
            sx={{
              backgroundColor: "var(--background-primary)",
              color: "var(--foreground-primary)",
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    backgroundColor: "var(--background-primary)",
                    color: "var(--foreground-primary)",
                    fontWeight: 600,
                  }}
                >
                  {t("admin.invoices.invoices-list.table-heads.invoice-id")}
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "var(--background-primary)",
                    color: "var(--foreground-primary)",
                    fontWeight: 600,
                  }}
                >
                  {t("admin.invoices.invoices-list.table-heads.order-id")}
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "var(--background-primary)",
                    color: "var(--foreground-primary)",
                    fontWeight: 600,
                  }}
                >
                  {t("admin.invoices.invoices-list.table-heads.client")}
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "var(--background-primary)",
                    color: "var(--foreground-primary)",
                    fontWeight: 600,
                  }}
                >
                  {t("admin.invoices.invoices-list.table-heads.value")}
                </TableCell>

                <TableCell
                  sx={{
                    backgroundColor: "var(--background-primary)",
                    color: "var(--foreground-primary)",
                    fontWeight: 600,
                  }}
                >
                  {t("admin.invoices.invoices-list.table-heads.date")}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    backgroundColor: "var(--background-primary)",
                    color: "var(--foreground-primary)",
                    fontWeight: 600,
                  }}
                >
                  {t("admin.invoices.invoices-list.table-heads.actions")}
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
                <TableRow>
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
                    {row.invoice.reverse ? (
                      <>
                        <button
                          onClick={(e) =>
                            handleViewInvoice(
                              e,
                              row.invoice.series,
                              row.invoice.number
                            )
                          }
                        >
                          {row.invoice.series} {row.invoice.number}
                        </button>
                        <br />
                        Storno -{" "}
                        <button
                          onClick={(e) =>
                            handleViewInvoice(
                              e,
                              row.invoice.reverse.series,
                              row.invoice.reverse.number
                            )
                          }
                        >
                          {" "}
                          {row.invoice.reverse.series}{" "}
                          {row.invoice.reverse.number}
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={(e) =>
                            handleViewInvoice(
                              e,
                              row.invoice.series,
                              row.invoice.number
                            )
                          }
                        >
                          {row.invoice.series} {row.invoice.number}
                        </button>
                      </>
                    )}
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "var(--background-primary)",
                      color: "var(--foreground-primary)",
                    }}
                  >
                    {row.client_id !== null ? (
                      <>
                        <Link
                          href={`/admin/dashboard/clients/${row.client_id}`}
                        >
                          {clientsData[row.client_id]?.name}
                        </Link>
                      </>
                    ) : (
                      <>
                        {row.shipping_details.fname}{" "}
                        {row.shipping_details.lname}
                      </>
                    )}
                  </TableCell>
                  <TableCell
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
                    {formatter.format(new Date(row.date))}
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
                      {t("admin.orders.orders-list.details-btn")}
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
                  count={filteredData.length}
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

export default InvoicesList;
