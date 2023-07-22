'use client'

import DetailsPageView from '@/components/details-page-view'
import { Typography } from '@mui/material'
import useDiscountDetailsPage from '@/components/discounts/hooks/use-discount-details-page'

export default function ViewPage() {
  const {  rows, discountData, handleDelete, isLoading, id } = useDiscountDetailsPage()

  return (
    <>
      {!isLoading ? (
        <DetailsPageView
        title="Descuentos"
        id={`#${id}`}
        toEditButtonLabel="Editar descuento"
        rows={rows}
        values={discountData}
        handleDelete={handleDelete}
        />
      ) : (
        <Typography align="center">Loading...</Typography>
      )}
    </>
  )
}