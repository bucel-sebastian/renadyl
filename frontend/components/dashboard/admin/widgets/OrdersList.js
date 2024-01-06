"use client";
import SelectInput from "@/components/SelectInput";
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

function OrdersList() {
  const [dataIsLoading, setDataIsLoading] = useState(true);

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

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

  const getOrdersList = async () => {
    const response = await fetch("/api/admin/data/json/orders");
    const body = await response.json();
    for (let i = 0; i < body.body.length; i++) {
      body.body[i].shipping_details = JSON.parse(body.body[i].shipping_details);
      body.body[i].client_details = JSON.parse(body.body[i].client_details);
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

  return (
    <div className="relative block w-full shadow-xl bg-backgroundPrimary h-full overflow-y-auto ">
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
        <></>
      ) : (
        <>
          <div>
            <input type="text" name="id" onChange={handleFilterInputChange} />
            <div>
              <input type="date" />
              <input type="date" />
            </div>
            {/* <SelectInput /> */}
            {/* <SelectInput /> */}
            {/* <SelectInput /> */}
            {/* <SelectInput /> */}
            <input type="text" name="awb" onChange={handleFilterInputChange} />
          </div>
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
                    {row.client_details.isLoggedIn === true ? (
                      <></>
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
                      className={`w-max mx-auto rounded-xl ${`bg-[${
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
                      Detalii
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

export default OrdersList;
