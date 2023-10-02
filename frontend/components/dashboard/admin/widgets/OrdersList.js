'use client'
import { Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TableFooter } from '@mui/material';
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions';
import { useTranslations } from 'next-intl'
import React, { useState } from 'react'

function OrdersList() {


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



    const data = [
        {
            id: "#0001",
            date: "15/09/2023",
            client: "Andrei Popescu",
            status: "In procesare",
            quantity: "5",
            value: "2000",
            currency: "RON",
            transport: "AWB1231231"
        },
        {
            id: "#0002",
            date: "15/09/2023",
            client: "Andrei Popescu",
            status: "In procesare",
            quantity: "5",
            value: "2000",
            currency: "RON",
            transport: "AWB1231231"
        },
        {
            id: "#0003",
            date: "16/09/2023",
            client: "Andrei Popescu",
            status: "In procesare",
            quantity: "5",
            value: "2000",
            currency: "RON",
            transport: "AWB1231231"
        },
        {
            id: "#0004",
            date: "21/09/2023",
            client: "Andrei Popescu",
            status: "In procesare",
            quantity: "5",
            value: "2000",
            currency: "RON",
            transport: "AWB1231231"
        },
        {
            id: "#0004",
            date: "21/09/2023",
            client: "Andrei Popescu",
            status: "In procesare",
            quantity: "5",
            value: "2000",
            currency: "RON",
            transport: "AWB1231231"
        },
        {
            id: "#0004",
            date: "21/09/2023",
            client: "Andrei Popescu",
            status: "In procesare",
            quantity: "5",
            value: "2000",
            currency: "RON",
            transport: "AWB1231231"
        },
        {
            id: "#0004",
            date: "21/09/2023",
            client: "Andrei Popescu",
            status: "In procesare",
            quantity: "5",
            value: "2000",
            currency: "RON",
            transport: "AWB1231231"
        },
        {
            id: "#0004",
            date: "21/09/2023",
            client: "Andrei Popescu",
            status: "In procesare",
            quantity: "5",
            value: "2000",
            currency: "RON",
            transport: "AWB1231231"
        },
        {
            id: "#0004",
            date: "21/09/2023",
            client: "Andrei Popescu",
            status: "In procesare",
            quantity: "5",
            value: "2000",
            currency: "RON",
            transport: "AWB1231231"
        },
        {
            id: "#0004",
            date: "21/09/2023",
            client: "Andrei Popescu",
            status: "In procesare",
            quantity: "5",
            value: "2000",
            currency: "RON",
            transport: "AWB1231231"
        },
        {
            id: "#0004",
            date: "21/09/2023",
            client: "Andrei Popescu",
            status: "In procesare",
            quantity: "5",
            value: "2000",
            currency: "RON",
            transport: "AWB1231231"
        },
        {
            id: "#0004",
            date: "21/09/2023",
            client: "Andrei Popescu",
            status: "In procesare",
            quantity: "5",
            value: "2000",
            currency: "RON",
            transport: "AWB1231231"
        },
        {
            id: "#0004",
            date: "21/09/2023",
            client: "Andrei Popescu",
            status: "In procesare",
            quantity: "5",
            value: "2000",
            currency: "RON",
            transport: "AWB1231231"
        },
        {
            id: "#0004",
            date: "21/09/2023",
            client: "Andrei Popescu",
            status: "In procesare",
            quantity: "5",
            value: "2000",
            currency: "RON",
            transport: "AWB1231231"
        },
        {
            id: "#0004",
            date: "21/09/2023",
            client: "Andrei Popescu",
            status: "In procesare",
            quantity: "5",
            value: "2000",
            currency: "RON",
            transport: "AWB1231231"
        },
        {
            id: "#0004",
            date: "21/09/2023",
            client: "Andrei Popescu",
            status: "In procesare",
            quantity: "5",
            value: "2000",
            currency: "RON",
            transport: "AWB1231231"
        },
        {
            id: "#0004",
            date: "21/09/2023",
            client: "Andrei Popescu",
            status: "In procesare",
            quantity: "5",
            value: "2000",
            currency: "RON",
            transport: "AWB1231231"
        },
        {
            id: "#0004",
            date: "21/09/2023",
            client: "Andrei Popescu",
            status: "In procesare",
            quantity: "5",
            value: "2000",
            currency: "RON",
            transport: "AWB1231231"
        },
        {
            id: "#5",
            date: "21/09/2023",
            client: "Andrei Popescu",
            status: "In procesare",
            quantity: "5",
            value: "2000",
            currency: "RON",
            transport: "AWB1231231"
        },
    ]

  return (
    <div className='relative block w-full shadow-xl bg-backgroundPrimary h-full overflow-y-auto '>
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
                        {t("admin.orders.orders-list.table-heads.id")}
                    </TableCell>
                    <TableCell  sx={{
            backgroundColor: "var(--background-primary)",
            color: "var(--foreground-primary)",
            fontWeight: 600
        }}>
                        {t("admin.orders.orders-list.table-heads.date")}
                    </TableCell>
                    <TableCell sx={{
            backgroundColor: "var(--background-primary)",
            color: "var(--foreground-primary)",
            fontWeight: 600
        }}>
                        {t("admin.orders.orders-list.table-heads.client")}
                    </TableCell>
                    <TableCell sx={{
            backgroundColor: "var(--background-primary)",
            color: "var(--foreground-primary)",
            fontWeight: 600
        }}>
                        {t("admin.orders.orders-list.table-heads.status")}
                    </TableCell>
                    <TableCell sx={{
            backgroundColor: "var(--background-primary)",
            color: "var(--foreground-primary)",
            fontWeight: 600
        }}>
                        {t("admin.orders.orders-list.table-heads.quantity")}
                    </TableCell>
                    <TableCell sx={{
            backgroundColor: "var(--background-primary)",
            color: "var(--foreground-primary)",
            fontWeight: 600
        }}>
                        {t("admin.orders.orders-list.table-heads.value")}
                    </TableCell>
                    <TableCell sx={{
            backgroundColor: "var(--background-primary)",
            color: "var(--foreground-primary)",
            fontWeight: 600
        }}>
                        {t("admin.orders.orders-list.table-heads.currency")}
                    </TableCell>
                    <TableCell sx={{
            backgroundColor: "var(--background-primary)",
            color: "var(--foreground-primary)",
            fontWeight: 600
        }}>
                        {t("admin.orders.orders-list.table-heads.transport")}
                    </TableCell>
                    <TableCell align='right' sx={{
            backgroundColor: "var(--background-primary)",
            color: "var(--foreground-primary)",
            fontWeight: 600
        }}>
                        {t("admin.orders.orders-list.table-heads.actions")}
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>

                {(rowsPerPage > 0
                    ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) 
                    : data
                ).map((row)=>(
                    <TableRow>
                        <TableCell sx={{
                            backgroundColor: "var(--background-primary)",
                            color: "var(--foreground-primary)"
                        }}>
                            {row.id}
                        </TableCell>
                        <TableCell sx={{
                            backgroundColor: "var(--background-primary)",
                            color: "var(--foreground-primary)"
                        }}>
                            {row.date}
                        </TableCell>
                        <TableCell sx={{
                            backgroundColor: "var(--background-primary)",
                            color: "var(--foreground-primary)"
                        }}>
                            {row.client}
                        </TableCell>
                        <TableCell sx={{
                            backgroundColor: "var(--background-primary)",
                            color: "var(--foreground-primary)"
                        }}>
                            {row.status}
                        </TableCell>
                        <TableCell sx={{
                            backgroundColor: "var(--background-primary)",
                            color: "var(--foreground-primary)"
                        }}>
                            {row.quantity}
                        </TableCell>
                        <TableCell sx={{
                            backgroundColor: "var(--background-primary)",
                            color: "var(--foreground-primary)"
                        }}>
                            {row.value}
                        </TableCell>
                        <TableCell sx={{
                            backgroundColor: "var(--background-primary)",
                            color: "var(--foreground-primary)"
                        }}>
                            {row.currency}
                        </TableCell>
                        <TableCell sx={{
                            backgroundColor: "var(--background-primary)",
                            color: "var(--foreground-primary)"
                        }}>
                            {row.transport}
                        </TableCell>
                        <TableCell align='right' sx={{
                            backgroundColor: "var(--background-primary)",
                            color: "var(--foreground-primary)"
                        }}>
                        </TableCell>
                    </TableRow>
                ))
                }
                
            </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            labelRowsPerPage={t("admin.tables.rows-per-page-label")}
                            rowsPerPageOptions={[10,25,50,100, {label: t("admin.tables.all-label"), value: -1}]}
                            colSpan={9}
                            count={data.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                            labelDisplayedRows={({from, to, count})=> `${from}-${to} ${t("admin.tables.of-label")} ${count} ${t("admin.tables.elements-label")}`}
                            
                        />
                    </TableRow>
                </TableFooter>
        </Table>


    </div>
  )
}

export default OrdersList