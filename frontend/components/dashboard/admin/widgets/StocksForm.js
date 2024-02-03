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
import React, { useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function StocksForm() {
  const [dataIsLoading, setDataIsLoading] = useState(true);

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [newInputData, setNewInputData] = useState({
    quantity: "",
    buy_price: "",
    shipping_price: "",
  });

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

  const changeNewInputData = (e) => {
    const { name, value } = e.target;

    setNewInputData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddNewProductInput = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/admin/create/new/product-input", {
      method: "POST",
      body: JSON.stringify(newInputData),
    });
    if (response.ok) {
      const body = await response.json();

      if (body.response === true) {
        setDataIsLoading(true);
        getProductInputsData();
        toast.success(t("admin.product.new-input.add-success"), {
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
        toast.error(t("admin.product.new-input.add-fail"), {
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
      toast.error(t("admin.product.new-input.add-fail"), {
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

  const getProductInputsData = async () => {
    const response = await fetch("/api/admin/data/json/product/inputs/");
    if (response.ok) {
      const body = await response.json();

      setData(body.body);
      setDataIsLoading(false);
    }
  };

  useEffect(() => {
    if (dataIsLoading) {
      getProductInputsData();
    }
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <>
      <h3 className="text-2xl font-bold mb-4">
        {t("admin.product.inputs-title")}
      </h3>
      <form onSubmit={handleAddNewProductInput}>
        <div className="w-full flex flex-row gap-8">
          <div className="w-1/2 flex flex-col gap-4">
            <div className="w-full flex flex-col ">
              <label className="px-1 text-foregroundPrimary70">
                {t("admin.product.new-input.quantity-label")}
              </label>
              <input
                type="number"
                name="quantity"
                value={newInputData.quantity}
                placeholder={t("admin.product.new-input.quantity-ph")}
                onChange={changeNewInputData}
                className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
              />
            </div>
            <div className="w-full flex flex-col ">
              <label className="px-1 text-foregroundPrimary70">
                {t("admin.product.new-input.buy-price-label")} (RON)
              </label>
              <input
                type="number"
                name="buy_price"
                value={newInputData.buy_price}
                placeholder={t("admin.product.new-input.buy-price-ph")}
                onChange={changeNewInputData}
                className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
              />
            </div>
          </div>
          <div className="w-1/2 flex flex-col gap-4">
            <div className="w-full flex flex-col ">
              <label className="px-1 text-foregroundPrimary70">
                {t("admin.product.new-input.shipping-price-label")} (RON)
              </label>
              <input
                type="number"
                name="shipping_price"
                value={newInputData.shipping_price}
                placeholder={t("admin.product.new-input.shipping-price-ph")}
                onChange={changeNewInputData}
                className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
              />
            </div>
            <button
              type="submit"
              // onClick={handleFormSubmit}
              className="block  bg-gradient-to-r w-full from-gradientGreen via-gradientPurple to-gradientGreen bg-[length:200%] bg-left hover:bg-right duration-500 ease transition-all text-center text-2xl text-backgroundPrimary rounded-2xl py-3"
            >
              {t("admin.product.new-input.submit-btn")}
            </button>
          </div>
        </div>
      </form>
      <br /> <br />
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
                  {t("admin.product.stocks-list.date")}
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "var(--background-primary)",
                    color: "var(--foreground-primary)",
                    fontWeight: 600,
                  }}
                >
                  {t("admin.product.stocks-list.quantity")}
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "var(--background-primary)",
                    color: "var(--foreground-primary)",
                    fontWeight: 600,
                  }}
                >
                  {t("admin.product.stocks-list.buy-price")}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    backgroundColor: "var(--background-primary)",
                    color: "var(--foreground-primary)",
                    fontWeight: 600,
                  }}
                >
                  {t("admin.product.stocks-list.shipping-price")}
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {(rowsPerPage > 0
                ? data.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : data
              ).map((row) => (
                <TableRow>
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
                    {row.quantity}
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "var(--background-primary)",
                      color: "var(--foreground-primary)",
                    }}
                  >
                    {row.buy_price} RON
                  </TableCell>

                  <TableCell
                    align="right"
                    sx={{
                      backgroundColor: "var(--background-primary)",
                      color: "var(--foreground-primary)",
                    }}
                  >
                    {row.shipping_price} RON
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

export default StocksForm;
