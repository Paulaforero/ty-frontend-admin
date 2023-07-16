'use client'

import EditionPageView from '@/components/edition-page-view'
import { Typography } from '@mui/material'
import useVehicleEditionPage from '@/components/vehicles/hooks/use-vehicle-edition-page'

export default function EditPage() {
  const { inputs, formValues, handleChange, handleSubmit, isLoading, plate } = useVehicleEditionPage()

  return (
    <>
      {!isLoading ? (
        <EditionPageView
          title="Vehículo"
          submitLabel="Guardar Vehículo"
          id={`#${plate}`}
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
