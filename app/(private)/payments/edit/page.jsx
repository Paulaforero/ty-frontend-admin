'use client'

import EditionPageView from '@/components/edition-page-view'
import { Typography } from '@mui/material'
import usePaymentEditionPage from '@/components/payments/hooks/use-payment-edition-page'

export default function EditPage() {
  const { inputs, formValues, handleChange, handleSubmit, isLoading, id } = usePaymentEditionPage()

  return (
    <>
      {!isLoading ? (
        <EditionPageView
          title="Pago"
          submitLabel="Guardar pago"
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
