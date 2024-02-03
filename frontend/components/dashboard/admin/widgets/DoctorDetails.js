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

function DoctorDetails({ id, locale }) {
  const [dataIsLoading, setDataIsLoading] = useState(true);
  const [doctorData, setDoctorData] = useState({});
  const [doctorDetails, setDoctorDetails] = useState({});
  const [doctorOrders, setDoctorOrders] = useState([]);
  const [doctorAffiliate, setDoctorAffiliate] = useState([]);
  const [newRole, setNewRole] = useState(null);
  const [newPromocodeValue, setNewPromocodeValue] = useState(0);

  const [changeStatusLoading, setChangeStatusLoading] = useState(false);
  const [changeRoleLoading, setChangeRoleLoading] = useState(false);
  const [changePromocodeValueLoading, setChangePromocodeValueLoading] =
    useState(false);

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

  const getDoctorData = async () => {
    const response = await fetch(`/api/admin/data/json/doctors/${id}`);
    if (response.ok) {
      const body = await response.json();

      if (body.response === true) {
        setDoctorData(body.doctorData);
        setDoctorOrders(body.doctorOrders);
        setDoctorDetails(body.accountDetails);
        setDoctorAffiliate(body.doctorPromocode);

        setNewPromocodeValue(body?.doctorPromocode?.value || null);
        setNewRole(body.doctorData.role);

        setDataIsLoading(false);
      }
      console.log(body);
    } else {
      notFound();
    }
  };

  useEffect(() => {
    getDoctorData();
  }, []);

  const handleChangeDoctorStatus = async (e, newStatus) => {
    e.preventDefault();
    setChangeStatusLoading(true);

    const response = await fetch(
      `/api/admin/update/doctor/status/${id}/${newStatus}`
    );

    if (response.ok) {
      const body = await response.json();
      if (body.response === true) {
        setDataIsLoading(true);
        getDoctorData();
        toast.success(
          t("admin.doctors.doctors-page.change-doctor-status-success"),
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
        toast.error(t("admin.doctors.doctors-page.change-doctor-status-fail"), {
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
      toast.error(t("admin.doctors.doctors-page.change-doctor-status-fail"), {
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

  const handleRoleInputChange = (key, value) => {};

  const handleChangeRole = async (e) => {
    e.preventDefault();
    changeRoleLoading(true);

    changeRoleLoading(false);
  };

  const modifyPromocodeValue = (e) => {
    const { value } = e.target;
    console.log(value);
    if (parseInt(value) > 10) {
      setNewPromocodeValue(10);
    } else {
      setNewPromocodeValue(value);
    }
  };

  const handleChangePromocodeValue = async (e) => {
    e.preventDefault();
    changePromocodeValueLoading(true);

    changePromocodeValueLoading(false);
  };

  return (
    <>
      {dataIsLoading ? (
        <>
          <LoadingBlock />
        </>
      ) : (
        <>
          <div className="relative flex flex-col max-h-full overflow-hidden rounded-xl border-foregroundPrimary10 border-[1px] rounded-xl shadow-xl py-6 px-8 bg-backgroundPrimary">
            <h2 className="text-xl font-bold">
              {t("admin.doctors.doctors-page.doctors-details-title")}
            </h2>
            <div className="w-full flex flex-row gap-10">
              <div className="w-1/3">
                <h4 className="font-bold">
                  {t("admin.doctors.doctors-page.status-account")}
                </h4>
                <p>
                  <span
                    className={` ${
                      doctorData.status === 1
                        ? "text-dashboardGreen"
                        : " text-dashboardRed"
                    } font-bold`}
                  >
                    {doctorData.status === 1 ? (
                      <>{t("admin.doctors.doctors-list.status-active")}</>
                    ) : (
                      <>{t("admin.doctors.doctors-list.status-inactive")}</>
                    )}
                  </span>
                </p>
                <h4 className="font-bold">
                  {t("admin.doctors.doctors-page.status-doctor")}
                </h4>
                <p>
                  <span
                    className={` ${
                      doctorDetails.doctor_status === 1
                        ? "text-dashboardGreen"
                        : " text-dashboardRed"
                    } font-bold`}
                  >
                    {doctorDetails.doctor_status === 1 ? (
                      <>{t("admin.doctors.doctors-list.status-active")}</>
                    ) : (
                      <>{t("admin.doctors.doctors-list.status-inactive")}</>
                    )}
                  </span>
                </p>

                <h4 className="font-bold">
                  {t("admin.doctors.doctors-page.name")}
                </h4>
                <p>
                  Dr. {doctorData.l_name} {doctorData.f_name}
                </p>
                <h4 className="font-bold">
                  {t("admin.doctors.doctors-page.specialization")}
                </h4>
                <p>{doctorDetails.specialization || "-"}</p>
                <h4 className="font-bold">
                  {t("admin.doctors.doctors-page.email")}
                </h4>
                <p>{doctorData.email}</p>
                <h4 className="font-bold">
                  {t("admin.doctors.doctors-page.phone")}
                </h4>
                <p>{doctorData?.phone || "-"}</p>
              </div>
              <div className="w-1/3">
                <h4 className="font-bold">
                  {t("admin.doctors.doctors-page.promocode")}
                </h4>
                <p>
                  {doctorAffiliate?.code ? (
                    <>
                      {doctorAffiliate?.code} - {doctorAffiliate.value}%
                    </>
                  ) : (
                    "-"
                  )}
                </p>
                <h4 className="font-bold">
                  {t("admin.doctors.doctors-page.url_profile")}
                </h4>
                <p>
                  <Link
                    href={doctorDetails.url_profile || "#"}
                    locale={locale}
                    target="_blank"
                  >
                    {doctorDetails.url_profile || "-"}
                  </Link>
                </p>

                <h4 className="font-bold">
                  {t("admin.doctors.doctors-page.location")}
                </h4>
                <p>
                  {t("admin.doctors.doctors-page.state")}{" "}
                  {doctorDetails.state || "-"}
                  {", "}
                  {t("admin.doctors.doctors-page.city")}{" "}
                  {doctorDetails.city || "-"}{" "}
                </p>
                <h4 className="font-bold">
                  {t("admin.doctors.doctors-page.work-unit")}
                </h4>
                <p>{doctorDetails.work_unit || "-"}</p>
                <h4 className="font-bold">
                  {t("admin.doctors.doctors-page.attached-documents")}
                </h4>
                <p>
                  {doctorDetails.attached_documents.length === 0
                    ? "-"
                    : doctorDetails.attached_documents.map((document) => (
                        <Link href={document.url}>{document.name}</Link>
                      ))}
                </p>
              </div>
              <div className="w-1/3">
                <div>
                  <h4 className="font-bold">
                    {t("admin.doctors.doctors-page.change-doctor-status")}
                  </h4>
                  {doctorDetails.doctor_status === 1 ? (
                    <>
                      <button
                        className="px-4 py-2 bg-dashboardBlue text-backgroundPrimary rounded-lg"
                        onClick={(e) => handleChangeDoctorStatus(e, 0)}
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
                        onClick={(e) => handleChangeDoctorStatus(e, 1)}
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
                        {t("admin.doctors.doctors-page.change-role-submit-btn")}
                      </button>
                    </div>
                  </form>
                </div>
                <br />
                <div>
                  {newPromocodeValue === null ? (
                    <> </>
                  ) : (
                    <>
                      <form onSubmit={handleChangePromocodeValue}>
                        <h4 className="font-bold">
                          {t(
                            "admin.doctors.doctors-page.change-promocode-value"
                          )}
                        </h4>
                        <div className="flex flex-row gap-2 ">
                          <div className="w-2/3">
                            <input
                              type="number"
                              max={10}
                              name="promocode-value"
                              value={newPromocodeValue}
                              onChange={modifyPromocodeValue}
                              className="w-full bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                            />
                          </div>
                          <button className="px-4 py-2 bg-gradientPurple text-backgroundPrimary rounded-lg w-1/3">
                            {t(
                              "admin.doctors.doctors-page.change-promocode-value-submit-btn"
                            )}
                          </button>
                        </div>
                      </form>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="relative flex flex-col max-h-full overflow-hidden rounded-xl border-foregroundPrimary10 border-[1px] rounded-xl shadow-xl py-6 px-8 bg-backgroundPrimary">
            <h2 className="text-xl font-bold">
              {t("admin.doctors.doctors-page.doctors-orders-title")}
            </h2>
            {doctorOrders.length !== 0 ? (
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
                      ? doctorOrders.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                      : doctorOrders
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
                        count={doctorOrders.length}
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

export default DoctorDetails;
