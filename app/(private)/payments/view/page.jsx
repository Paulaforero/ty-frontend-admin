'use client'

import DetailsPageView from '@/components/details-page-view'
import { Typography } from '@mui/material'
import usePaymentDetailsPage from '@/components/payments/hooks/use-payment-details-page'
export default function ViewPage() {
  const {  rows, paymentData, handleDelete, isLoading, id } = usePaymentDetailsPage()

  return (
    <>
      {!isLoading ? (
        <DetailsPageView
        title="Pago"
        id={`#${id}`}
        toEditButtonLabel="Editar pago"
        rows={rows}
        values={paymentData}
        handleDelete={handleDelete}
        />
      ) : (
        <Typography align="center">Loading...</Typography>
      )}
    </>
  )
}