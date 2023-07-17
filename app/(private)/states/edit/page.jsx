'use client'

import EditionPageView from '@/components/edition-page-view'
import { Typography } from '@mui/material'
import useStateEditionPage from '@/components/states/hooks/use-state-edition-page'

export default function EditPage() {
  const { inputs, formValues, handleChange, handleSubmit, isLoading, id } =
    useStateEditionPage()

  return (
    <>
      {!isLoading ? (
        <EditionPageView
          title="Estado"
          submitLabel="Guardar estado"
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
