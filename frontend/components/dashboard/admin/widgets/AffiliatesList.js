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
import { useTranslations } from "next-intl";
import React, { useState } from "react";

function AffiliatesList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const t = useTranslations("Dashboard");

  const data = [];

  return (
    <div className="relative block w-full  bg-backgroundPrimary h-full overflow-y-auto ">
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
              {t("admin.affiliates.affiliates-list.id")}
            </TableCell>
            <TableCell
              sx={{
                backgroundColor: "var(--background-primary)",
                color: "var(--foreground-primary)",
                fontWeight: 600,
              }}
            >
              {t("admin.affiliates.affiliates-list.fname")}
            </TableCell>
            <TableCell
              sx={{
                backgroundColor: "var(--background-primary)",
                color: "var(--foreground-primary)",
                fontWeight: 600,
              }}
            >
              {t("admin.affiliates.affiliates-list.lname")}
            </TableCell>
            <TableCell
              align="right"
              sx={{
                backgroundColor: "var(--background-primary)",
                color: "var(--foreground-primary)",
                fontWeight: 600,
              }}
            >
              {t("admin.affiliates.affiliates-list.actions")}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : data
          ).map((row) => (
            <TableRow>
              <TableCell
                sx={{
                  backgroundColor: "var(--background-primary)",
                  color: "var(--foreground-primary)",
                }}
              >
                {row.id}
              </TableCell>

              <TableCell
                sx={{
                  backgroundColor: "var(--background-primary)",
                  color: "var(--foreground-primary)",
                }}
              ></TableCell>
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
    </div>
  );
}

export default AffiliatesList;
