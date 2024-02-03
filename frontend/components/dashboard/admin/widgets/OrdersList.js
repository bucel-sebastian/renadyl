"use client";
import LoadingBlock from "@/components/LoadingBlock";
import SelectInput from "@/components/SelectInput";
import SelectInputClassic from "@/components/SelectInputClassic";
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

import { FaArrowRotateLeft } from "react-icons/fa6";

function OrdersList() {
  const [dataIsLoading, setDataIsLoading] = useState(true);

  const [data, setData] = useState([]);

  const [clientsData, setClientsData] = useState([]);

  const [filteredData, setFilteredData] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [filters, setFilters] = useState({
    id: "",
    start_date: "",
    end_date: "",
    status: "",
    // currency: "",
    // shipping_awb: "",
  });

  const orderStatus = [
    { name: "Anulată", color: "#e74d3d" },
    { name: "Plasată", color: "#f1c40d" },
    { name: "În procesare", color: "#e77e22" },
    { name: "Pregătită de expediere", color: "#3397dc" },
    { name: "Expediată", color: "#2980b9" },
    { name: "Finalizată", color: "#2ecd70" },
  ];

  const orderStatusData = {
    0: "Anulată",
    1: "Plasată",
    2: "În procesare",
    3: "Pregătită de expediere",
    4: "Expediată",
    5: "Finalizată",
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

  const getOrdersList = async () => {
    const response = await fetch("/api/admin/data/json/orders");
    const body = await response.json();
    for (let i = 0; i < body.body.length; i++) {
      body.body[i].shipping_details = JSON.parse(body.body[i].shipping_details);
      // body.body[i].client_details = JSON.parse(body.body[i].client_details);
      body.body[i].billing_details = JSON.parse(body.body[i].billing_details);
      //   body.body[i].cart = JSON.parse(body.body[i].cart);
    }
    console.log(body.body);
    setData(body.body);
    setDataIsLoading(false);
  };

  const handleFilterInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const filterData = () => {
    setFilteredData(
      data.filter((order) => {
        if (
          filters.id &&
          !order.id.toLowerCase().includes(filters.id.toLocaleLowerCase())
        )
          return false;

        if (
          filters.status &&
          parseInt(order.status) !== parseInt(filters.status)
        )
          return false;

        const startDate = filters["start_date"];
        const endDate =
          filters["end_date"] !== "" || filters["end_date"] !== null
            ? filters["end_date"]
            : filters["start_date"];

        if (startDate && endDate) {
          const orderDate = new Date(order.date);
          const start = new Date(startDate);
          const end = new Date(endDate);
          if (orderDate < start || orderDate > end) return false;
        }

        return true;
      })
    );
  };

  useEffect(() => {
    console.log(clientsData);
  }, [clientsData]);

  useEffect(() => {
    if (dataIsLoading) {
      getClientsList();
      getOrdersList();
    }
  }, []);

  useEffect(() => {
    filterData();
    setPage(0);
  }, [data, filters]);

  useEffect(() => {
    console.log(filteredData);
  }, [filteredData]);

  const handleChangeStatusFilter = (key, value) => {
    setFilters((prevData) => ({ ...prevData, status: key }));
  };

  const handleResetFilters = (e) => {
    e.preventDefault();
    setFilters({
      id: "",
      start_date: "",
      end_date: "",
      status: null,
      currency: "",
    });
  };

  return (
    <>
      {!dataIsLoading ? (
        <>
          <div className="flex flex-row gap-2">
            <div className="flex flex-col mb-2 max-md:w-full">
              <label className="px-1 text-foregroundPrimary70">
                {t("admin.orders.orders-list.filters.order-id-label")}
              </label>
              <input
                type="text"
                name="id"
                value={filters.id}
                onChange={handleFilterInputChange}
                className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
              />
            </div>
            <div className="flex flex-col mb-2 max-md:w-full">
              <label className="px-1 text-foregroundPrimary70">
                {t("admin.orders.orders-list.filters.dates-label")}
              </label>

              <div className="w-full flex flex-row gap-2">
                <input
                  type="date"
                  name="start_date"
                  value={filters.start_date}
                  onChange={handleFilterInputChange}
                  className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary pt-1 pb-[2px] px-1 w-1/2 "
                />
                <input
                  type="date"
                  name="end_date"
                  value={filters.end_date}
                  onChange={handleFilterInputChange}
                  className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary pt-1 pb-[2px] px-1  w-1/2"
                />
              </div>
            </div>
            {/* <SelectInput /> */}
            {/* <SelectInput /> */}
            {/* <SelectInput /> */}
            <div>
              <label className="px-1 text-foregroundPrimary70">
                {t("admin.orders.orders-list.filters.status-label")}
              </label>

              <SelectInputClassic
                data={orderStatusData}
                value={orderStatusData[filters.status] || ""}
                name="role-selector"
                placeholder={t("admin.orders.orders-list.filters.status-ph")}
                onChange={handleChangeStatusFilter}
              />
            </div>
            {/* <div>
              <label className="px-1 text-foregroundPrimary70">
                {t("admin.orders.orders-list.filters.status-label")}
              </label>

              <SelectInputClassic
                data={orderStatusData}
                value={orderStatusData[filters.status] || ""}
                name="role-selector"
                placeholder={t("admin.orders.orders-list.filters.status-ph")}
                onChange={handleChangeStatusFilter}
              />
            </div> */}
            {/* <div className="flex flex-col mb-2 max-md:w-full">
              <label className="px-1 text-foregroundPrimary70">
                {t("admin.orders.orders-list.filters.awb-label")}
              </label>
              <input
                type="text"
                name="shipping_awb"
                value={filters.shipping_awb}
                onChange={handleFilterInputChange}
                className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
              />
            </div> */}
            <button onClick={handleResetFilters} className="text-xl">
              <FaArrowRotateLeft />
            </button>
          </div>
        </>
      ) : (
        <></>
      )}
      <div className="relative block w-full bg-backgroundPrimary h-full overflow-y-auto ">
        {/* <table className='w-full h-screen relative overflow-y-auto'>
            <tr className='w-full '>
                <th className='text-left font-normal text-foregroundSecondary pb-2'>
                    {t("admin.orders.orders-list.table-heads.id")}
                </th>
                <th className='text-left font-normal text-foregroundSecondary pb-2'>
                    {t("admin.orders.orders-list.table-heads.date")}
                </th>
                <th className='text-left font-normal text-foregroundSecondary pb-2'>
                    {t("admin.orders.orders-list.table-heads.client")}
                </th>
                <th className='text-left font-normal text-foregroundSecondary pb-2'>
                    {t("admin.orders.orders-list.table-heads.status")}
                </th>
                <th className='text-left font-normal text-foregroundSecondary pb-2'>
                    {t("admin.orders.orders-list.table-heads.quantity")}
                </th>
                <th className='text-left font-normal text-foregroundSecondary pb-2'>
                    {t("admin.orders.orders-list.table-heads.value")}
                </th>
                <th className='text-left font-normal text-foregroundSecondary pb-2'>
                    {t("admin.orders.orders-list.table-heads.currency")}
                </th>
                <th className='text-left font-normal text-foregroundSecondary pb-2'>
                    {t("admin.orders.orders-list.table-heads.transport")}
                </th>
        
                <th className='text-right font-normal text-foregroundSecondary pb-2'>
                    {t("admin.orders.orders-list.table-heads.actions")}
                </th>
            </tr>
            <tr className='border-b-[1px] border-b-foregroundSecondary20'>
                <td className='py-2'>
                    #0005
                </td>
                <td className='py-2'>
                    30/09/2023
                </td>
                <td className='py-2'>
                    Popescu Andrei 
                </td>
                <td className='py-2'>
                    În procesare
                </td>
                <td className='py-2'>
                    5
                </td>
                <td className='py-2'>
                    1500
                </td>
                <td className='py-2'>
                    RON
                </td>
                <td className='py-2'>
                    -
                </td>
                <td className='text-right py-2'>

                </td>
            </tr>
            <tr className='border-b-[1px] border-b-foregroundSecondary20'>
                <td className='py-2'>
                    #0005
                </td>
                <td className='py-2'>
                    30/09/2023
                </td>
                <td className='py-2'>
                    Popescu Andrei 
                </td>
                <td className='py-2'>
                    În procesare
                </td>
                <td className='py-2'>
                    5
                </td>
                <td className='py-2'>
                    1500
                </td>
                <td className='py-2'>
                    RON
                </td>
                <td className='py-2'>
                    -
                </td>
                <td className='text-right py-2'>

                </td>
            </tr>
            <tr className='border-b-[1px] border-b-foregroundSecondary20'>
                <td className='py-2'>
                    #0005
                </td>
                <td className='py-2'>
                    30/09/2023
                </td>
                <td className='py-2'>
                    Popescu Andrei 
                </td>
                <td className='py-2'>
                    În procesare
                </td>
                <td className='py-2'>
                    5
                </td>
                <td className='py-2'>
                    1500
                </td>
                <td className='py-2'>
                    RON
                </td>
                <td className='py-2'>
                    -
                </td>
                <td className='text-right py-2'>

                </td>
            </tr>
            <tr className='border-b-[1px] border-b-foregroundSecondary20'>
                <td className='py-2'>
                    #0005
                </td>
                <td className='py-2'>
                    30/09/2023
                </td>
                <td className='py-2'>
                    Popescu Andrei 
                </td>
                <td className='py-2'>
                    În procesare
                </td>
                <td className='py-2'>
                    5
                </td>
                <td className='py-2'>
                    1500
                </td>
                <td className='py-2'>
                    RON
                </td>
                <td className='py-2'>
                    -
                </td>
                <td className='text-right py-2'>

                </td>
            </tr>
            <tr className='border-b-[1px] border-b-foregroundSecondary20'>
                <td className='py-2'>
                    #0005
                </td>
                <td className='py-2'>
                    30/09/2023
                </td>
                <td className='py-2'>
                    Popescu Andrei 
                </td>
                <td className='py-2'>
                    În procesare
                </td>
                <td className='py-2'>
                    5
                </td>
                <td className='py-2'>
                    1500
                </td>
                <td className='py-2'>
                    RON
                </td>
                <td className='py-2'>
                    -
                </td>
                <td className='text-right py-2'>

                </td>
            </tr>
            <tr className='border-b-[1px] border-b-foregroundSecondary20'>
                <td className='py-2'>
                    #0005
                </td>
                <td className='py-2'>
                    30/09/2023
                </td>
                <td className='py-2'>
                    Popescu Andrei 
                </td>
                <td className='py-2'>
                    În procesare
                </td>
                <td className='py-2'>
                    5
                </td>
                <td className='py-2'>
                    1500
                </td>
                <td className='py-2'>
                    RON
                </td>
                <td className='py-2'>
                    -
                </td>
                <td className='text-right py-2'>

                </td>
            </tr>
            <tr className='border-b-[1px] border-b-foregroundSecondary20'>
                <td className='py-2'>
                    #0005
                </td>
                <td className='py-2'>
                    30/09/2023
                </td>
                <td className='py-2'>
                    Popescu Andrei 
                </td>
                <td className='py-2'>
                    În procesare
                </td>
                <td className='py-2'>
                    5
                </td>
                <td className='py-2'>
                    1500
                </td>
                <td className='py-2'>
                    RON
                </td>
                <td className='py-2'>
                    -
                </td>
                <td className='text-right py-2'>

                </td>
            </tr>
        </table> */}
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
    </>
  );
}

export default OrdersList;
