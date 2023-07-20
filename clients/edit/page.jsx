'use client'

import EditionPageView from '@/components/edition-page-view'
import { Typography } from '@mui/material'
import useClientEditionPage from '@/components/clients/hooks/use-client-edition-page'

export default function EditPage() {
  const { inputs, formValues, handleChange, handleSubmit, isLoading, id } =
    useClientEditionPage()

  return (
    <>
      {!isLoading ? (
        <EditionPageView
          title="Editar cliente"
          submitLabel="Guardar"
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
