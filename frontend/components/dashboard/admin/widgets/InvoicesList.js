'use client'
import { Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TableFooter } from '@mui/material';
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions';
import { useTranslations } from 'next-intl'
import React, { useState } from 'react'

function InvoicesList() {
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
    <div className='relative block w-full shadow-xl bg-backgroundPrimary h-full overflow-y-auto '>
      {/* <table className='w-full  overflow-x-hidden  relative overflow-y-auto'>
            <tr className='w-full '>
                <th className='text-left font-normal text-foregroundSecondary pb-2'>
                    {t("admin.invoices.invoices-list.table-heads.order-id")}
                </th>
                <th className='text-left font-normal text-foregroundSecondary pb-2'>
                    {t("admin.invoices.invoices-list.table-heads.invoice-number")}
                </th>
                <th className='text-left font-normal text-foregroundSecondary pb-2'>
                    {t("admin.invoices.invoices-list.table-heads.client")}
                </th>
                <th className='text-left font-normal text-foregroundSecondary pb-2'>
                    {t("admin.invoices.invoices-list.table-heads.value")}
                </th>
                <th className='text-left font-normal text-foregroundSecondary pb-2'>
                    {t("admin.invoices.invoices-list.table-heads.currency")}
                </th>
                <th className='text-left font-normal text-foregroundSecondary pb-2'>
                    {t("admin.invoices.invoices-list.table-heads.status")}
                </th>
                <th className='text-left font-normal text-foregroundSecondary pb-2'>
                    {t("admin.invoices.invoices-list.table-heads.date")}
                </th>
                
        
                <th className='text-right font-normal text-foregroundSecondary pb-2'>
                    {t("admin.invoices.invoices-list.table-heads.actions")}
                </th>
            </tr>
            <tr className='border-b-[1px] border-b-foregroundSecondary20'>
                <td className='py-2'>
                    #0005
                </td>
                <td className='py-2'>
                    RC 0005
                </td>
                <td className='py-2'>
                    Popescu Andrei 
                </td>
                <td className='py-2'>
                    1500
                </td>
                <td className='py-2'>
                    Ron
                </td>
                <td className='py-2'>
                    Achitată
                </td>
                <td className='py-2'>
                    15/09/2023
                </td>
                
                <td className='text-right py-2'>

                </td>
            </tr>
            <tr className='border-b-[1px] border-b-foregroundSecondary20'>
                <td className='py-2'>
                    #0005
                </td>
                <td className='py-2'>
                    RC 0005
                </td>
                <td className='py-2'>
                    Popescu Andrei 
                </td>
                <td className='py-2'>
                    1500
                </td>
                <td className='py-2'>
                    Ron
                </td>
                <td className='py-2'>
                    Achitată
                </td>
                <td className='py-2'>
                    15/09/2023
                </td>
                
                <td className='text-right py-2'>

                </td>
            </tr>
            <tr className='border-b-[1px] border-b-foregroundSecondary20'>
                <td className='py-2'>
                    #0005
                </td>
                <td className='py-2'>
                    RC 0005
                </td>
                <td className='py-2'>
                    Popescu Andrei 
                </td>
                <td className='py-2'>
                    1500
                </td>
                <td className='py-2'>
                    Ron
                </td>
                <td className='py-2'>
                    Achitată
                </td>
                <td className='py-2'>
                    15/09/2023
                </td>
                
                <td className='text-right py-2'>

                </td>
            </tr>
            <tr className='border-b-[1px] border-b-foregroundSecondary20'>
                <td className='py-2'>
                    #0005
                </td>
                <td className='py-2'>
                    RC 0005
                </td>
                <td className='py-2'>
                    Popescu Andrei 
                </td>
                <td className='py-2'>
                    1500
                </td>
                <td className='py-2'>
                    Ron
                </td>
                <td className='py-2'>
                    Achitată
                </td>
                <td className='py-2'>
                    15/09/2023
                </td>
                
                <td className='text-right py-2'>

                </td>
            </tr>
            <tr className='border-b-[1px] border-b-foregroundSecondary20'>
                <td className='py-2'>
                    #0005
                </td>
                <td className='py-2'>
                    RC 0005
                </td>
                <td className='py-2'>
                    Popescu Andrei 
                </td>
                <td className='py-2'>
                    1500
                </td>
                <td className='py-2'>
                    Ron
                </td>
                <td className='py-2'>
                    Achitată
                </td>
                <td className='py-2'>
                    15/09/2023
                </td>
                
                <td className='text-right py-2'>

                </td>
            </tr>
           
           
        </table> */}
        <Table stickyHeader sx={{
            backgroundColor: "var(--background-primary)",
            color: "var(--foreground-primary)"
        }}>
            <TableHead>
                <TableRow>
                    <TableCell sx={{
                        backgroundColor: "var(--background-primary)",
                        color: "var(--foreground-primary)",
                        fontWeight: 600
                    }}>
                        {t("admin.invoices.invoices-list.order-id")}
                    </TableCell>
                    <TableCell sx={{
                        backgroundColor: "var(--background-primary)",
                        color: "var(--foreground-primary)",
                        fontWeight: 600
                    }}>
                        {t("admin.invoices.invoices-list.invoice-id")}
                    </TableCell>
                    <TableCell sx={{
                        backgroundColor: "var(--background-primary)",
                        color: "var(--foreground-primary)",
                        fontWeight: 600
                    }}>
                        {t("admin.invoices.invoices-list.client")}
                    </TableCell>
                    <TableCell sx={{
                        backgroundColor: "var(--background-primary)",
                        color: "var(--foreground-primary)",
                        fontWeight: 600
                    }}>
                        {t("admin.invoices.invoices-list.value")}
                    </TableCell>
                    <TableCell sx={{
                        backgroundColor: "var(--background-primary)",
                        color: "var(--foreground-primary)",
                        fontWeight: 600
                    }}>
                        {t("admin.invoices.invoices-list.currency")}
                    </TableCell>
                    <TableCell sx={{
                        backgroundColor: "var(--background-primary)",
                        color: "var(--foreground-primary)",
                        fontWeight: 600
                    }}>
                        {t("admin.invoices.invoices-list.status")}
                    </TableCell>
                    <TableCell sx={{
                        backgroundColor: "var(--background-primary)",
                        color: "var(--foreground-primary)",
                        fontWeight: 600
                    }}>
                        {t("admin.invoices.invoices-list.date")}
                    </TableCell>
                    <TableCell align='right' sx={{
                        backgroundColor: "var(--background-primary)",
                        color: "var(--foreground-primary)",
                        fontWeight: 600
                    }}>
                        {t("admin.invoices.invoices-list.actions")}
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {
                (rowsPerPage > 0 
                  ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : data
                ).map((row)=>(
                    <TableRow>

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

export default InvoicesList