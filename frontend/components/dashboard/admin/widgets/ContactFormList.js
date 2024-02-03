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
import LinkWithRef from "next-intl/link";
import Link from "next-intl/link";
import React, { useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContactFormPreview from "./ContactFormPreview";
import LoadingBlock from "@/components/LoadingBlock";

function ContactFormList() {
  const [dataIsLoading, setDataIsLoading] = useState(true);

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [filters, setFilters] = useState({});

  const [previewSubmission, setPreviewSubmission] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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

  const t = useTranslations("Dashboard");

  const getContactFormList = async () => {
    const response = await fetch("/api/admin/data/json/contact");
    if (response.ok) {
      const body = await response.json();

      console.log(body.body);

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
      getContactFormList();
    }
  }, []);

  useEffect(() => {
    filterData();
    setPage(0);
  }, [data, filters]);

  const handleMarkAsRead = async (e, id) => {
    e.preventDefault();
    const response = await fetch(`/api/admin/mark-contact-form-read/${id}`);
    if (response.ok) {
      const body = await response.json();
      if (body.response) {
        setData([]);
        getContactFormList();
        toast.success(t("admin.contact.contact-list.change-status-success"), {
          position: "bottom-right",
          autoClose: 2500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        toast.error(t("admin.contact.contact-list.change-status-fail"), {
          position: "bottom-right",
          autoClose: 2500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } else {
      toast.error(t("admin.contact.contact-list.change-status-fail"), {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };
  const handleMarkAsUnread = async (e, id) => {
    e.preventDefault();
    const response = await fetch(`/api/admin/mark-contact-form-unread/${id}`);
    if (response.ok) {
      const body = await response.json();
      if (body.response) {
        setData([]);
        getContactFormList();
        toast.success(t("admin.contact.contact-list.change-status-success"), {
          position: "bottom-right",
          autoClose: 2500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        toast.error(t("admin.contact.contact-list.change-status-fail"), {
          position: "bottom-right",
          autoClose: 2500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } else {
      toast.error(t("admin.contact.contact-list.change-status-fail"), {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const handleOpenPreview = (e, id) => {
    e.preventDefault();

    let selectedForPreview = null;

    for (let i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        selectedForPreview = data[i];
      }
    }

    setPreviewSubmission(selectedForPreview);
  };

  const handleClosePreview = () => {
    setPreviewSubmission(null);
  };

  useEffect(() => {
    if (previewSubmission !== null && data.length !== 0) {
      const selectedId = previewSubmission.id;

      let selectedForPreview = null;

      for (let i = 0; i < data.length; i++) {
        if (data[i].id === selectedId) {
          selectedForPreview = data[i];
        }
      }

      setPreviewSubmission(selectedForPreview);
    }
  }, [data]);

  return (
    <>
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
                  {t("admin.contact.contact-list.table-heads.status")}
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "var(--background-primary)",
                    color: "var(--foreground-primary)",
                    fontWeight: 600,
                  }}
                >
                  {t("admin.contact.contact-list.table-heads.date")}
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "var(--background-primary)",
                    color: "var(--foreground-primary)",
                    fontWeight: 600,
                  }}
                >
                  {t("admin.contact.contact-list.table-heads.name")}
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "var(--background-primary)",
                    color: "var(--foreground-primary)",
                    fontWeight: 600,
                  }}
                >
                  {t("admin.contact.contact-list.table-heads.email")}
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "var(--background-primary)",
                    color: "var(--foreground-primary)",
                    fontWeight: 600,
                  }}
                >
                  {t("admin.contact.contact-list.table-heads.phone")}
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "var(--background-primary)",
                    color: "var(--foreground-primary)",
                    fontWeight: 600,
                  }}
                >
                  {t("admin.contact.contact-list.table-heads.message")}
                </TableCell>

                <TableCell
                  align="right"
                  sx={{
                    backgroundColor: "var(--background-primary)",
                    color: "var(--foreground-primary)",
                    fontWeight: 600,
                  }}
                >
                  {t("admin.contact.contact-list.table-heads.actions")}
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
                    <span
                      className={` ${
                        row.status === 1
                          ? "text-dashboardGreen"
                          : " text-dashboardRed"
                      } font-bold`}
                    >
                      {row.status === 1 ? (
                        <>{t("admin.contact.contact-list.status-read")}</>
                      ) : (
                        <>{t("admin.contact.contact-list.status-unread")}</>
                      )}
                    </span>
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
                    {row.fname} {row.lname}
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "var(--background-primary)",
                      color: "var(--foreground-primary)",
                    }}
                  >
                    <Link href={`mailto: ${row.email}`}>{row.email}</Link>
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "var(--background-primary)",
                      color: "var(--foreground-primary)",
                    }}
                  >
                    <Link href={`tel: ${row.phone}`}>{row.phone}</Link>
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
                    {row.message}
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
                      {t("admin.contact.contact-list.preview-btn")}
                    </button>
                    <br />
                    {row.status === 0 ? (
                      <>
                        <button
                          className="text-gradientPurple text-right"
                          onClick={(e) => handleMarkAsRead(e, row.id)}
                        >
                          {t("admin.contact.contact-list.mark-read-btn")}
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="text-gradientPurple text-right"
                          onClick={(e) => handleMarkAsUnread(e, row.id)}
                        >
                          {t("admin.contact.contact-list.mark-unread-btn")}
                        </button>
                      </>
                    )}
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
          {previewSubmission !== null ? (
            <>
              <ContactFormPreview
                closePreview={handleClosePreview}
                previewSubmission={previewSubmission}
                markAsRead={handleMarkAsRead}
                markAsUnread={handleMarkAsUnread}
              />
            </>
          ) : (
            <> </>
          )}
        </>
      )}
    </>
  );
}

export default ContactFormList;
