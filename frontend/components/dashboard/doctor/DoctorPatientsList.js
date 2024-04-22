"use client";
import { useSession } from "next-auth/react";
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
import LoadingBlock from "@/components/LoadingBlock";

import { FaArrowRotateLeft } from "react-icons/fa6";

function DoctorPatientsList() {
  const session = useSession();

  const [dataIsLoading, setDataIsLoading] = useState(true);

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [filters, setFilters] = useState({
    id: "",
    start_date: "",
    end_date: "",
    status: "",
    // currency: "",
    // shipping_awb: "",
  });

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const t = useTranslations("Dashboard.doctor.patients");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getPatientsList = async (doctorId) => {
    const response = await fetch(
      `/api/doctor/data/json/patients/all/${doctorId}`
    );
    if (response.ok) {
      const body = await response.json();
      console.log(body.body);
      setData(body.body);
      setDataIsLoading(false);
    }
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
    filterData();
    setPage(0);
  }, [data, filters]);

  useEffect(() => {
    console.log(filteredData);
  }, [filteredData]);

  useEffect(() => {
    if (session?.data?.user && dataIsLoading) {
      console.log(session?.data?.user?.id);
      getPatientsList(session?.data?.user?.id);
    }
  }, [session]);

  const handleChangeStatusFilter = (key, value) => {
    setFilters((prevData) => ({ ...prevData, status: key }));
  };

  const handleResetFilters = (e) => {
    e.preventDefault();
    setFilters({
      id: "",
      name: "",
    });
  };

  return (
    <>
      {!dataIsLoading ? (
        <>
          <div className="flex flex-row gap-2">
            <div className="flex flex-col mb-2 max-md:w-full">
              <label className="px-1 text-foregroundPrimary70">
                {t("filters.name-label")}
              </label>
              <input
                type="text"
                name="name"
                value={filters.name}
                onChange={handleFilterInputChange}
                className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
              />
            </div>
            <div className="flex flex-col mb-2 max-md:w-full">
              <label className="px-1 text-foregroundPrimary70">
                {t("filters.id-label")}
              </label>
              <input
                type="text"
                name="id"
                value={filters.id}
                onChange={handleFilterInputChange}
                className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
              />
            </div>

            <button onClick={handleResetFilters} className="text-xl">
              <FaArrowRotateLeft />
            </button>
          </div>
        </>
      ) : (
        <> </>
      )}
      <div className="relative block w-full overflow-x-auto max-w-full bg-backgroundPrimary h-full overflow-y-auto ">
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
                    {t("table-heads.index")}
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "var(--background-primary)",
                      color: "var(--foreground-primary)",
                      fontWeight: 600,
                    }}
                  >
                    {t("table-heads.id")}
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "var(--background-primary)",
                      color: "var(--foreground-primary)",
                      fontWeight: 600,
                    }}
                  >
                    {t("table-heads.name")}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      backgroundColor: "var(--background-primary)",
                      color: "var(--foreground-primary)",
                      fontWeight: 600,
                    }}
                  >
                    {t("table-heads.phone")}
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
                ).map((row, index) => (
                  <TableRow key={row.id}>
                    <TableCell
                      sx={{
                        backgroundColor: "var(--background-primary)",
                        color: "var(--foreground-primary)",
                      }}
                    >
                      {" "}
                      {page * 10 + index + 1}
                    </TableCell>
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
                    >
                      {row.f_name} {row.l_name}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        backgroundColor: "var(--background-primary)",
                        color: "var(--foreground-primary)",
                      }}
                    >
                      <Link
                        href={`tel: ${row.phone}`}
                        className="text-gradientPurple"
                      >
                        {row.phone}
                      </Link>
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
          </>
        )}
      </div>
    </>
  );
}

export default DoctorPatientsList;
