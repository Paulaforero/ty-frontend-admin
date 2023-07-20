'use client'

import EditionPageView from '@/components/edition-page-view'
import useSupplyLineEditionPage from '@/components/supply-lines/hooks/use-supply-line-edition-page'
import { Typography } from '@mui/material'

export default function EditPage() {
  const { inputs, formValues, handleChange, handleSubmit, isLoading } =
    useSupplyLineEditionPage()

  return (
    <>
      {!isLoading ? (
        <EditionPageView
          title="Editar linea de suministro"
          submitLabel="Guardar linea de suministro"
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
