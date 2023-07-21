'use client'

import EditionPageView from '@/components/edition-page-view'
import { Typography } from '@mui/material'
import useActivityPriceEditionPage from '@/components/activities-prices/hooks/use-activity-price-edition-page'

export default function EditPage() {
  const { inputs, formValues, handleChange, handleSubmit, isLoading, id } = useActivityPriceEditionPage()

  return (
    <>
      {!isLoading ? (
        <EditionPageView
          title="Precio de actividad"
          submitLabel="Guardar precio de actividad"
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
