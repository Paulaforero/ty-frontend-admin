'use client'

import EditionPageView from '@/components/edition-page-view'
import { Typography } from '@mui/material'
import useCitiesEditionPage from '@/components/cities/hooks/use-cities-edition-page'

export default function EditPage() {
  const { inputs, formValues, handleChange, handleSubmit, isLoading } = useCitiesEditionPage()

  return (
    <>
      {!isLoading ? (
        <EditionPageView
          title="Editar ciudad"
          submitLabel="Guardar"
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
