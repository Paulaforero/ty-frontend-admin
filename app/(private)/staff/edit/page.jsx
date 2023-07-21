'use client'

import EditionPageView from '@/components/edition-page-view'
import { Typography } from '@mui/material'
import useEmployeeEditionPage from '@/components/staff/use-edition-staff-page'

export default function EditPage() {
  const { inputs, formValues, handleChange, handleSubmit, isLoading, nationalId } = useEmployeeEditionPage()

  return (
    <>
      {!isLoading ? (
        <EditionPageView
          title="Empleado"
          submitLabel="Guardar empleado"
          id={`#${nationalId}`}
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

