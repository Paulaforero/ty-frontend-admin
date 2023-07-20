'use client'

import DetailsPageView from '@/components/details-page-view'
import { Typography } from '@mui/material'
import useProductDetailsPage from '@/components/products/hooks/use-details-products-page'

export default function ViewPage() {
  const {  rows, productData, handleDelete, isLoading, id } = useProductDetailsPage()

  return (
    <>
      {!isLoading ? (
        <DetailsPageView
        title="Producto"
        id={`#${id}`}
        toEditButtonLabel="Editar producto"
        rows={rows}
        values={productData}
        handleDelete={handleDelete}
        />
      ) : (
        <Typography align="center">Loading...</Typography>
      )}
    </>
  )
}