"use client";
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
import React, { useEffect, useState } from "react";
import LoadingBlock from "@/components/LoadingBlock";

function ClientsList() {
  const [dataIsLoading, setDataIsLoading] = useState(true);

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [filters, setFilters] = useState({});

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

      console.log("Clients ", body.body);
      setData(body.body);
      setDataIsLoading(false);
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
                  {t("admin.clients.clients-list.id")}
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "var(--background-primary)",
                    color: "var(--foreground-primary)",
                    fontWeight: 600,
                  }}
                >
                  {t("admin.clients.clients-list.lname")}
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "var(--background-primary)",
                    color: "var(--foreground-primary)",
                    fontWeight: 600,
                  }}
                >
                  {t("admin.clients.clients-list.status")}
                </TableCell>

                <TableCell
                  sx={{
                    backgroundColor: "var(--background-primary)",
                    color: "var(--foreground-primary)",
                    fontWeight: 600,
                  }}
                >
                  {t("admin.clients.clients-list.orders")}
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "var(--background-primary)",
                    color: "var(--foreground-primary)",
                    fontWeight: 600,
                  }}
                >
                  {t("admin.clients.clients-list.register-date")}
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "var(--background-primary)",
                    color: "var(--foreground-primary)",
                    fontWeight: 600,
                  }}
                >
                  {t("admin.clients.clients-list.last-login-date")}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    backgroundColor: "var(--background-primary)",
                    color: "var(--foreground-primary)",
                    fontWeight: 600,
                  }}
                >
                  {t("admin.clients.clients-list.actions")}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? filteredData.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : filteredData
              ).map((row) => (
                <TableRow key={row.id}>
                  <TableCell
                    sx={{
                      backgroundColor: "var(--background-primary)",
                      color: "var(--foreground-primary)",
                    }}
                  >
                    <Link href={`/admin/dashboard/clients/${row.id}`}>
                      {row.id}
                    </Link>
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "var(--background-primary)",
                      color: "var(--foreground-primary)",
                    }}
                  >
                    <Link href={`/admin/dashboard/clients/${row.id}`}>
                      {row.f_name} {row.l_name}
                    </Link>
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "var(--background-primary)",
                      color: "var(--foreground-primary)",
                    }}
                  >
                    <span
                      className={` ${
                        row.status === 1
                          ? "text-dashboardGreen"
                          : " text-dashboardRed"
                      } font-bold`}
                    >
                      {row.status === 1 ? (
                        <>{t("admin.doctors.doctors-list.status-active")}</>
                      ) : (
                        <>{t("admin.doctors.doctors-list.status-inactive")}</>
                      )}
                    </span>
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "var(--background-primary)",
                      color: "var(--foreground-primary)",
                    }}
                  >
                    {row.orders}
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "var(--background-primary)",
                      color: "var(--foreground-primary)",
                    }}
                  >
                    {formatter.format(new Date(row.register_date))}
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "var(--background-primary)",
                      color: "var(--foreground-primary)",
                    }}
                  >
                    {row.last_login !== null
                      ? formatter.format(new Date(row.last_login))
                      : "-"}
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "var(--background-primary)",
                      color: "var(--foreground-primary)",
                    }}
                    align="right"
                  >
                    <Link
                      href={`/admin/dashboard/clients/${row.id}`}
                      className="text-gradientPurple"
                    >
                      {t("admin.clients.clients-list.details-btn")}
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
                  colSpan={9}
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

export default ClientsList;
