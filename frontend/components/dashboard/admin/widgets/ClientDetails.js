"use client";
import LoadingBlock from "@/components/LoadingBlock";
import { notFound } from "next/navigation";
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

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SelectInputClassic from "@/components/SelectInputClassic";

function ClientDetails({ id, locale }) {
  const [dataIsLoading, setDataIsLoading] = useState(true);
  const [clientData, setClientData] = useState({});
  const [clientOrders, setClientOrders] = useState([]);
  const [clientAffiliate, setClientAffiliate] = useState([]);
  const [clientSubscription, setClientSubscription] = useState([]);

  const [changeStatusLoading, setChangeStatusLoading] = useState(false);
  const [changeRoleLoading, setChangeRoleLoading] = useState(false);

  const [newRole, setNewRole] = useState(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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

  const t = useTranslations("Dashboard");

  const roleData = {
    client: t("admin.doctors.doctors-page.change-role-client"),
    doctor: t("admin.doctors.doctors-page.change-role-doctor"),
    distributor: t("admin.doctors.doctors-page.change-role-distributor"),
  };

  const getClientData = async () => {
    const response = await fetch(`/api/admin/data/json/clients/${id}`);

    if (response.ok) {
      const body = await response.json();

      if (body.response) {
        setClientData(body.clientData);
        setClientOrders(body.clientOrders);
        setClientAffiliate(body.clientAffiliate);
        setClientSubscription(body.clientSubscription);
        setNewRole(body.clientData.role);
        setDataIsLoading(false);
      } else {
        notFound();
      }
    } else {
      notFound();
    }
  };

  useEffect(() => {
    if (dataIsLoading) {
      getClientData();
    }
  }, []);

  useEffect(() => {
    console.log(clientData);
    console.log(clientOrders);
    console.log(clientAffiliate);
    console.log(clientSubscription);
  }, [dataIsLoading]);

  const handleRoleInputChange = (key, value) => {};

  const handleChangeRole = async (e) => {
    e.preventDefault();
    changeRoleLoading(true);

    changeRoleLoading(false);
  };

  const handleChangeStatus = async (e, newStatus) => {
    e.preventDefault();
    setChangeStatusLoading(true);

    const response = await fetch(
      `/api/admin/update/client/status/${id}/${newStatus}`
    );

    if (response.ok) {
      const body = await response.json();
      if (body.response === true) {
        setDataIsLoading(true);
        getClientData();
        toast.success(t("admin.clients.client-page.change-status-success"), {
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
        toast.error(t("admin.clients.client-page.change-status-fail"), {
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
      toast.error(t("admin.clients.client-page.change-status-fail"), {
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
    setChangeStatusLoading(false);
  };

  return (
    <>
      {dataIsLoading ? (
        <>
          <LoadingBlock />
        </>
      ) : (
        <>
          <div className="w-full flex flex-row gap-4">
            <div className="w-2/3 relative flex flex-col max-h-full overflow-hidden rounded-xl border-foregroundPrimary10 border-[1px] rounded-xl shadow-xl py-6 px-8 bg-backgroundPrimary">
              <h2 className="text-xl font-bold">
                {t("admin.clients.client-page.client-details-title")}
              </h2>
              <div className="w-full flex flex-row gap-8">
                <div className="w-1/2">
                  <h4 className="font-bold">
                    {t("admin.clients.client-page.status-account")}
                  </h4>
                  <p>
                    <span
                      className={` ${
                        clientData.status === 1
                          ? "text-dashboardGreen"
                          : " text-dashboardRed"
                      } font-bold`}
                    >
                      {clientData.status === 1 ? (
                        <>{t("admin.clients.clients-list.status-active")}</>
                      ) : (
                        <>{t("admin.clients.clients-list.status-inactive")}</>
                      )}
                    </span>
                  </p>

                  <h4 className="font-bold">
                    {t("admin.clients.client-page.name")}
                  </h4>
                  <p>
                    {clientData.l_name} {clientData.f_name}
                  </p>
                  <h4 className="font-bold">
                    {t("admin.clients.client-page.register-date")}
                  </h4>
                  <p>{formatter.format(new Date(clientData?.register_date))}</p>
                  <h4 className="font-bold">
                    {t("admin.clients.client-page.email")}
                  </h4>
                  <p>{clientData.email}</p>
                  <h4 className="font-bold">
                    {t("admin.clients.client-page.phone")}
                  </h4>
                  <p>{clientData?.phone || "-"}</p>
                </div>
                <div className="w-1/2">
                  <div>
                    <h4 className="font-bold">
                      {t("admin.clients.client-page.change-status")}
                    </h4>
                    {clientData.status === 1 ? (
                      <>
                        <button
                          className="px-4 py-2 bg-dashboardBlue text-backgroundPrimary rounded-lg"
                          onClick={(e) => handleChangeStatus(e, 0)}
                          disabled={changeStatusLoading}
                        >
                          {changeStatusLoading
                            ? t("admin.loading")
                            : t(
                                "admin.doctors.doctors-page.change-doctor-status-inactive"
                              )}
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="px-4 py-2 bg-dashboardBlue text-backgroundPrimary rounded-lg"
                          onClick={(e) => handleChangeStatus(e, 1)}
                          disabled={changeStatusLoading}
                        >
                          {changeStatusLoading
                            ? t("admin.loading")
                            : t(
                                "admin.doctors.doctors-page.change-doctor-status-active"
                              )}
                        </button>
                      </>
                    )}
                  </div>
                  <br />
                  <div>
                    <form onSubmit={handleChangeRole}>
                      <h4 className="font-bold">
                        {t("admin.doctors.doctors-page.change-role")}
                      </h4>
                      <div className="flex flex-row gap-2 ">
                        <div className="w-2/3">
                          <SelectInputClassic
                            data={roleData}
                            value={roleData[newRole]}
                            name="role-selector"
                            placeholder={t(
                              "admin.doctors.doctors-page.change-role-ph"
                            )}
                            onChange={handleRoleInputChange}
                            required={true}
                          />
                        </div>
                        <button className="px-4 py-2 bg-gradientPurple text-backgroundPrimary rounded-lg w-1/3">
                          {t(
                            "admin.doctors.doctors-page.change-role-submit-btn"
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-1/3 relative flex flex-col max-h-full overflow-hidden rounded-xl border-foregroundPrimary10 border-[1px] rounded-xl shadow-xl py-6 px-8 bg-backgroundPrimary">
              <h2 className="text-xl font-bold">
                {t("admin.clients.client-page.client-subscription-title")}
              </h2>
              <div>
                {clientSubscription === null ? (
                  <>
                    <p>
                      {t("admin.clients.client-page.subscription-status")} -{" "}
                      <span
                        className={`
                          text-dashboardRed
                       font-bold`}
                      >
                        {t("admin.clients.clients-list.status-inactive")}
                      </span>
                    </p>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
          <div className="relative flex flex-col max-h-full overflow-hidden rounded-xl border-foregroundPrimary10 border-[1px] rounded-xl shadow-xl py-6 px-8 bg-backgroundPrimary">
            <h2 className="text-xl font-bold">
              {t("admin.clients.client-page.client-orders-title")}
            </h2>
            {clientOrders.length !== 0 ? (
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
                      ? clientOrders.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                      : clientOrders
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
                          align="center"
                          sx={{
                            backgroundColor: "var(--background-primary)",
                            color: "var(--foreground-primary)",
                          }}
                        >
                          <div
                            className={`w-max mx-auto rounded-xl px-3 py-1 ${`bg-[${
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
                        colSpan={9}
                        count={clientOrders.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActions}
                        labelDisplayedRows={({ from, to, count }) =>
                          `${from}-${to} ${t(
                            "admin.tables.of-label"
                          )} ${count} ${t("admin.tables.elements-label")}`
                        }
                      />
                    </TableRow>
                  </TableFooter>
                </Table>
              </>
            ) : (
              <></>
            )}
          </div>
        </>
      )}
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

export default ClientDetails;
