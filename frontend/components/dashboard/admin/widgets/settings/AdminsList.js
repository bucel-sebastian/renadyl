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
import React, { useEffect, useState } from "react";

function AdminsList({ dataIsLoading, data }) {
  const [filteredData, setFilteredData] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [filters, setFilters] = useState({});

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const t = useTranslations("Dashboard");

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
    filterData();
    setPage(0);
  }, [data, filters]);

  return (
    <>
      <h2 className="text-xl font-bold">
        {t("admin.settings.admins-list.admins-list-title")}
      </h2>
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
                  {t("admin.settings.admins-list.table-heads.id")}
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "var(--background-primary)",
                    color: "var(--foreground-primary)",
                    fontWeight: 600,
                  }}
                >
                  {t("admin.settings.admins-list.table-heads.name")}
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "var(--background-primary)",
                    color: "var(--foreground-primary)",
                    fontWeight: 600,
                  }}
                >
                  {t("admin.settings.admins-list.table-heads.status")}
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "var(--background-primary)",
                    color: "var(--foreground-primary)",
                    fontWeight: 600,
                  }}
                >
                  {t("admin.settings.admins-list.table-heads.email")}
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "var(--background-primary)",
                    color: "var(--foreground-primary)",
                    fontWeight: 600,
                  }}
                >
                  {t("admin.settings.admins-list.table-heads.phone")}
                </TableCell>

                <TableCell
                  align="right"
                  sx={{
                    backgroundColor: "var(--background-primary)",
                    color: "var(--foreground-primary)",
                    fontWeight: 600,
                  }}
                >
                  {t("admin.settings.admins-list.table-heads.actions")}
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
                    <Link href={`/admin/dashboard/settings/admin/${row.id}`}>
                      {row.id}
                    </Link>
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "var(--background-primary)",
                      color: "var(--foreground-primary)",
                    }}
                  >
                    <Link href={`/admin/dashboard/settings/admin/${row.id}`}>
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
                        <>{t("admin.settings.admins-list.status-active")}</>
                      ) : (
                        <>{t("admin.settings.admins-list.status-inactive")}</>
                      )}
                    </span>
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "var(--background-primary)",
                      color: "var(--foreground-primary)",
                    }}
                  >
                    {row.email}
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "var(--background-primary)",
                      color: "var(--foreground-primary)",
                    }}
                  >
                    {row.phone}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      backgroundColor: "var(--background-primary)",
                      color: "var(--foreground-primary)",
                    }}
                  >
                    <Link
                      href={`/admin/dashboard/settings/admin/${row.id}`}
                      className="text-gradientPurple"
                    >
                      {t("admin.settings.admins-list.details-btn")}
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
    </>
  );
}

export default AdminsList;
