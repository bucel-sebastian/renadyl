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
import CancelRequestPreview from "./CancelRequestPreview";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CancelRequestsList() {
  const [dataIsLoading, setDataIsLoading] = useState(true);

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [filters, setFilters] = useState({});

  const [previewRequest, setPreviewRequest] = useState(null);

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

  const getCancelRequests = async () => {
    const response = await fetch("/api/admin/data/json/orders/cancel-requests");
    if (response.ok) {
      const body = await response.json();

      console.log(body.body);

      setData(body.body);
      setDataIsLoading(false);
    }
  };

  useEffect(() => {
    getCancelRequests();
  }, []);

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

  const handleOpenPreview = (e, id) => {
    e.preventDefault();

    let selectedForPreview = null;

    for (let i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        selectedForPreview = data[i];
      }
    }

    setPreviewRequest(selectedForPreview);
  };

  const handleClosePreview = () => {
    setPreviewRequest(null);
  };

  const handleAcceptRequest = async (e, id) => {
    e.preventDefault();
    if (confirm(t("admin.cancel-requests.requests-list.confirm-accept"))) {
      const response = await fetch(`/api/admin/accept-cancel-request/${id}`);

      if (response.ok) {
        const body = await response.json();

        if (body.response === true) {
          handleClosePreview();
          getCancelRequests();
          setDataIsLoading(true);
          toast.success(
            t("admin.cancel-requests.requests-list.change-status-success"),
            {
              position: "bottom-right",
              autoClose: 2500,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "colored",
            }
          );
        } else {
          toast.error(
            t("admin.cancel-requests.requests-list.change-status-fail"),
            {
              position: "bottom-right",
              autoClose: 2500,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "colored",
            }
          );
        }
      } else {
        toast.error(
          t("admin.cancel-requests.requests-list.change-status-fail"),
          {
            position: "bottom-right",
            autoClose: 2500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
          }
        );
      }
    }
  };

  const handleDenyRequest = async (e, id) => {
    e.preventDefault();
    if (confirm(t("admin.cancel-requests.requests-list.confirm-deny"))) {
      const response = await fetch(`/api/admin/deny-cancel-request/${id}`);

      if (response.ok) {
        const body = await response.json();

        if (body.response === true) {
          handleClosePreview();
          getCancelRequests();
          setDataIsLoading(true);
          toast.success(
            t("admin.cancel-requests.requests-list.change-status-success"),
            {
              position: "bottom-right",
              autoClose: 2500,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "colored",
            }
          );
        } else {
          toast.error(
            t("admin.cancel-requests.requests-list.change-status-fail"),
            {
              position: "bottom-right",
              autoClose: 2500,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "colored",
            }
          );
        }
      } else {
        toast.error(
          t("admin.cancel-requests.requests-list.change-status-fail"),
          {
            position: "bottom-right",
            autoClose: 2500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
          }
        );
      }
    }
  };

  return (
    <>
      <div>
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
                    {t("admin.cancel-requests.requests-list.date")}
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "var(--background-primary)",
                      color: "var(--foreground-primary)",
                      fontWeight: 600,
                    }}
                  >
                    {t("admin.cancel-requests.requests-list.order-id")}
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "var(--background-primary)",
                      color: "var(--foreground-primary)",
                      fontWeight: 600,
                    }}
                  >
                    {t("admin.cancel-requests.requests-list.status")}
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "var(--background-primary)",
                      color: "var(--foreground-primary)",
                      fontWeight: 600,
                    }}
                  >
                    {t("admin.cancel-requests.requests-list.reason")}
                  </TableCell>

                  <TableCell
                    align="right"
                    sx={{
                      backgroundColor: "var(--background-primary)",
                      color: "var(--foreground-primary)",
                      fontWeight: 600,
                    }}
                  >
                    {t("admin.cancel-requests.requests-list.actions")}
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
                      {formatter.format(new Date(row.id))}
                    </TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: "var(--background-primary)",
                        color: "var(--foreground-primary)",
                      }}
                    >
                      <Link href={`/admin/dashboard/orders/${row.order_id}`}>
                        {row.order_id}
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
                          parseInt(row.status) === 2
                            ? "text-dashboardGreen"
                            : parseInt(row.status) === 0
                            ? " text-dashboardRed"
                            : ""
                        } font-bold`}
                      >
                        {parseInt(row.status) === 1 ? (
                          <>
                            {t(
                              "admin.cancel-requests.requests-list.status-waiting"
                            )}
                          </>
                        ) : (
                          <>
                            {parseInt(row.status) === 0 ? (
                              <>
                                {t(
                                  "admin.cancel-requests.requests-list.status-denied"
                                )}
                              </>
                            ) : (
                              <>
                                {t(
                                  "admin.cancel-requests.requests-list.status-accepted"
                                )}
                              </>
                            )}
                          </>
                        )}
                      </span>
                    </TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: "var(--background-primary)",
                        color: "var(--foreground-primary)",
                        maxWidth: "400px",
                        whiteSpace: "nowrap", // Afișează textul pe un singur rând
                        overflow: "hidden", // Ascunde textul care depășește limita
                        textOverflow: "ellipsis",
                      }}
                    >
                      {row.reason}
                    </TableCell>

                    <TableCell
                      sx={{
                        backgroundColor: "var(--background-primary)",
                        color: "var(--foreground-primary)",
                      }}
                      align="right"
                    >
                      <button
                        className="text-gradientPurple text-right mb-2"
                        onClick={(e) => handleOpenPreview(e, row.id)}
                      >
                        {t("admin.clients.clients-list.details-btn")}
                      </button>
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
      {previewRequest !== null ? (
        <>
          <CancelRequestPreview
            closePreview={handleClosePreview}
            previewRequest={previewRequest}
            acceptRequest={handleAcceptRequest}
            denyRequest={handleDenyRequest}
          />
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default CancelRequestsList;
