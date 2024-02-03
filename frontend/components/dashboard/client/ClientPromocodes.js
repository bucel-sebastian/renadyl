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

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Link from "next-intl/link";
import { useTranslations } from "next-intl";

function ClientPromocodes({ data }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const t = useTranslations("Dashboard.client.affiliates");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <>
      <h2 className="text-xl font-bold ">{t("affiliate-promocode-title")}</h2>
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
              {t("promocodes-table-code")}
            </TableCell>
            <TableCell
              sx={{
                backgroundColor: "var(--background-primary)",
                color: "var(--foreground-primary)",
                fontWeight: 600,
              }}
            >
              {t("promocodes-table-value")}
            </TableCell>
            <TableCell
              align="right"
              sx={{
                backgroundColor: "var(--background-primary)",
                color: "var(--foreground-primary)",
                fontWeight: 600,
              }}
            >
              {t("promocodes-table-use-remainings")}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : data
          ).map((row) => (
            <TableRow key={row.code}>
              <TableCell
                sx={{
                  backgroundColor: "var(--background-primary)",
                  color: "var(--foreground-primary)",
                }}
              >
                <div className="flex flex-row max-w-[450px]">
                  <input
                    readOnly
                    value={row.code}
                    className="w-3/4 text-center  outline-none  bg-foregroundSecondary10 py-2  rounded-l-lg"
                  />

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(row.code);
                      toast.success(t("promocode-copy-success"), {
                        position: "bottom-right",
                        autoClose: 2500,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                      });
                    }}
                    className="bg-gradientPurple text-backgroundPrimary px-4 rounded-r-lg w-1/4"
                  >
                    {t("promocode-copy-btn")}
                  </button>
                </div>
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "var(--background-primary)",
                  color: "var(--foreground-primary)",
                }}
              >
                {row.value}%
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  backgroundColor: "var(--background-primary)",
                  color: "var(--foreground-primary)",
                }}
              >
                {row.times_of_use - row.times_used}
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
  );
}

export default ClientPromocodes;
