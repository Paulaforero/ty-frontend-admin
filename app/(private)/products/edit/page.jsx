'use client'

import EditionPageView from '@/components/edition-page-view'
import { Typography } from '@mui/material'
import useProductsEditionPage from '@/components/products/hooks/use-edition-products-page'

export default function EditPage() {
  const { inputs, formValues, handleChange, handleSubmit, isLoading, id } = useProductsEditionPage()

  return (
    <>
      {!isLoading ? (
        <EditionPageView
          title="Producto"
          submitLabel="Guardar producto"
          id={`#${id}`}
          inputs={inputs}
          values={formValues}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      ) : (
        <Typography align="center">Loading...</Typography>
      )}
    </>
  )
}