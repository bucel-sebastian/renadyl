import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useTranslations } from 'next-intl'
import React from 'react'

function LastOrders() {

    const t = useTranslations('Dashboard');



  return (
    <>
        <div className='w-full border-foregroundPrimary10 border-[1px] rounded-xl shadow-xl py-6 px-8 bg-backgroundPrimary'>
            <h3 className='text-2xl font-bold mb-4'>
                {t("admin.orders.last-orders.title")}
            </h3>
            {/* <TableContainer component={Paper}> */}
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                {t("admin.orders.last-orders.table-heads.id")}
                            </TableCell>
                            <TableCell>
                            {t("admin.orders.last-orders.table-heads.status")}
                            </TableCell>
                            <TableCell>
                                {t("admin.orders.last-orders.table-heads.date")}
                            </TableCell>
                            <TableCell align='right'>
                                {t("admin.orders.last-orders.table-heads.value")}
                            </TableCell>
                            
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                #0001
                            </TableCell>
                            <TableCell>
                                Finalizată
                            </TableCell>
                            <TableCell>
                                30/09/2023
                            </TableCell>
                            <TableCell align='right'>
                                300 RON
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                #0001
                            </TableCell>
                            <TableCell>
                                Finalizată
                            </TableCell>
                            <TableCell>
                                30/09/2023
                            </TableCell>
                            <TableCell align='right'>
                                300 RON
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                #0001
                            </TableCell>
                            <TableCell>
                                Finalizată
                            </TableCell>
                            <TableCell>
                                30/09/2023
                            </TableCell>
                            <TableCell align='right'>
                                300 RON
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                #0001
                            </TableCell>
                            <TableCell>
                                Finalizată
                            </TableCell>
                            <TableCell>
                                30/09/2023
                            </TableCell>
                            <TableCell align='right'>
                                300 RON
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                #0001
                            </TableCell>
                            <TableCell>
                                Finalizată
                            </TableCell>
                            <TableCell>
                                30/09/2023
                            </TableCell>
                            <TableCell align='right'>
                                300 RON
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            {/* </TableContainer> */}
        </div>
    </>
  )
}

export default LastOrders