'use client'

import EditionPageView from '@/components/edition-page-view'
import { Typography } from '@mui/material'
import useActivityEditionPage from '@/components/activities/hooks/use-edition-activities-page'

export default function EditPage() {
  const { inputs, formValues, handleChange, handleSubmit, isLoading, id } = useActivityEditionPage()

  return (
    <>
      {!isLoading ? (
        <EditionPageView
          title="Actividad"
          submitLabel="Guardar actividad"
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