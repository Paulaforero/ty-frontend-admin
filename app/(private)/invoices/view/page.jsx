'use client'

import DetailsPageView from '@/components/details-page-view'
import { Typography } from '@mui/material'
import useInvoiceDetailsPage from '@/components/invoices/hooks/use-invoice-details-page'
export default function ViewPage() {
  const {  rows, invoiceData, handleDelete, isLoading, id } = useInvoiceDetailsPage()

  return (
    <>
      {!isLoading ? (
        <DetailsPageView
        title="Factura"
        id={`#${id}`}
        toEditButtonLabel="Editar factura"
        rows={rows}
        values={invoiceData}
        handleDelete={handleDelete}
        />
      ) : (
        <Typography align="center">Loading...</Typography>
      )}
    </>
  )
}