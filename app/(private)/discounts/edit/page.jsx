'use client'

import EditionPageView from '@/components/edition-page-view'
import { Typography } from '@mui/material'
import useDiscountEditionPage from '@/components/discounts/hooks/use-discount-edition-page'

export default function EditPage() {
  const { inputs, formValues, handleChange, handleSubmit, isLoading, id } = useDiscountEditionPage()

  return (
    <>
      {!isLoading ? (
        <EditionPageView
          title="Descuento"
          submitLabel="Guardar descuento"
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