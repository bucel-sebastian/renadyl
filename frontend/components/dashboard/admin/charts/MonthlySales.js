"use client";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

import LoadingBlock from "@/components/LoadingBlock";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

function MonthlySales() {
  const [dataIsLoading, setDataIsLoading] = useState(true);
  const [data, setData] = useState([]);

  const t = useTranslations("Dashboard");

  const getLastMonthsSales = async () => {
    const response = await fetch(
      "/api/admin/data/json/orders/lasts-months-sales"
    );
    if (response.ok) {
      const body = await response.json();
      //   setData(body.body);

      const ordersArray = body.body;

      console.log(body.body);
      const sumePeLuni = [];

      ordersArray.forEach((obj) => {
        const month = new Date(obj.date).toLocaleDateString("default", {
          month: "numeric",
          year: "numeric",
        });

        sumePeLuni[month] = sumePeLuni[month] || {
          month: month,
          totalVanzari: 0,
          totalRON: 0,
          totalEUR: 0,
        };
        sumePeLuni[month].totalVanzari += 1;

        if (obj.currency === "RON") {
          sumePeLuni[month].totalRon =
            (sumePeLuni[month].totalRon || 0) + obj.order_total;
        } else {
          sumePeLuni[month].totalEUR =
            (sumePeLuni[month].totalEUR || 0) + obj.order_total;
        }
      });

      setData(sumePeLuni);
      setDataIsLoading(false);
    }
  };

  useEffect(() => {
    getLastMonthsSales();
  }, []);

  useEffect(() => {
    console.log("lasts orders", data);
  }, [data]);
  return (
    <div className="w-full border-foregroundPrimary10 border-[1px] rounded-xl shadow-xl py-6 px-8 bg-backgroundPrimary">
      <h3 className="text-2xl font-bold">
        {t("admin.analytics.monthly-sales.title")}
      </h3>

      {dataIsLoading ? (
        <>
          <LoadingBlock />
        </>
      ) : (
        <>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  {t("admin.analytics.monthly-sales.month")}
                </TableCell>
                <TableCell>
                  {t("admin.analytics.monthly-sales.total-sales")}
                </TableCell>
                <TableCell>
                  {t("admin.analytics.monthly-sales.value-ron")}
                </TableCell>
                <TableCell align="right">
                  {t("admin.analytics.monthly-sales.value-eur")}
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {Object.entries(data).map(([key, value]) => (
                <TableRow key={value.month}>
                  <TableCell>{value.month}</TableCell>
                  <TableCell>{value.totalVanzari}</TableCell>
                  <TableCell>{value.totalRon}</TableCell>
                  <TableCell align="right">{value.totalEUR}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
      {/* <table className="w-full">
        <tr>
          <th className="text-left font-normal text-foregroundSecondary pb-2">
            {t("admin.analytics.monthly-sales.month")}
          </th>
          <th className="text-left font-normal text-foregroundSecondary pb-2">
            {t("admin.analytics.monthly-sales.total-sales")}
          </th>
          <th className="text-right font-normal text-foregroundSecondary pb-2">
            {t("admin.analytics.monthly-sales.value-ron")}
          </th>
          <th className="text-right font-normal text-foregroundSecondary pb-2">
            {t("admin.analytics.monthly-sales.value-eur")}
          </th>
        </tr>
        <tr className="border-b-[1px] border-b-foregroundSecondary20">
          <td className="py-2">09/2023</td>
          <td className="py-2">23</td>
          <td className="text-right py-2">1500</td>
          <td className="text-right py-2">450</td>
        </tr>
        <tr className="border-b-[1px] border-b-foregroundSecondary20">
          <td className="py-2">08/2023</td>
          <td className="py-2">23</td>
          <td className="text-right py-2">1500</td>
          <td className="text-right py-2">450</td>
        </tr>
        <tr className="border-b-[1px] border-b-foregroundSecondary20">
          <td className="py-2">07/2023</td>
          <td className="py-2">23</td>
          <td className="text-right py-2">1500</td>
          <td className="text-right py-2">450</td>
        </tr>
        <tr className="border-b-[1px] border-b-foregroundSecondary20">
          <td className="py-2">06/2023</td>
          <td className="py-2">23</td>
          <td className="text-right py-2">1500</td>
          <td className="text-right py-2">450</td>
        </tr>
        <tr className="border-b-[1px] border-b-foregroundSecondary20">
          <td className="py-2">05/2023</td>
          <td className="py-2">23</td>
          <td className="text-right py-2">1500</td>
          <td className="text-right py-2">450</td>
        </tr>
        <tr className="border-b-[1px] border-b-foregroundSecondary20">
          <td className="py-2">04/2023</td>
          <td className="py-2">23</td>
          <td className="text-right py-2">1500</td>
          <td className="text-right py-2">450</td>
        </tr>
      </table> */}
    </div>
  );
}

export default MonthlySales;
