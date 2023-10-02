'use client'
import { Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TableFooter } from '@mui/material';
import { useTranslations } from 'next-intl'
import React, { useState } from 'react'

function StocksForm() {
    const [page,setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
  
    const handleChangePage = (event, newPage)=>{
        setPage(newPage);
    }
  
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }
  
    const t = useTranslations("Dashboard");
  
    const data = [];
  return (
    <>
        <form>
            <div>

            </div>
        </form>
        <Table stickyHeader sx={{
            backgroundColor: "var(--background-primary)",
            color: "var(--foreground-primary)"
        }}>
            <TableHead sx={{
                backgroundColor: "var(--background-primary)",
                color: "var(--foreground-primary)"
            }}>
                <TableRow sx={{
                    backgroundColor: "var(--background-primary)",
                    color: "var(--foreground-primary)"
                }}>
                    <TableCell sx={{
                        backgroundColor: "var(--background-primary)",
                        color: "var(--foreground-primary)",
                        fontWeight: 600
                    }}>
                        {t("admin.product.stocks-list.date")}
                    </TableCell>
                    <TableCell sx={{
                        backgroundColor: "var(--background-primary)",
                        color: "var(--foreground-primary)",
                        fontWeight: 600
                    }}>
                        {t("admin.product.stocks-list.quantity")}
                    </TableCell>
                    <TableCell sx={{
                        backgroundColor: "var(--background-primary)",
                        color: "var(--foreground-primary)",
                        fontWeight: 600
                    }}>
                        {t("admin.product.stocks-list.buy-price")}
                    </TableCell>
                    <TableCell align='right' sx={{
                        backgroundColor: "var(--background-primary)",
                        color: "var(--foreground-primary)",
                        fontWeight: 600
                    }}>
                        {t("admin.product.stocks-list.actions")}
                    </TableCell>
                </TableRow>
            </TableHead>

        </Table>
    </>
  )
}

export default StocksForm