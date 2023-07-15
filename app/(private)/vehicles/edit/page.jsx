'use client'

import EditionPageView from '@/components/edition-page-view'
import { Typography } from '@mui/material'
import useVehicleEditionPage from '@/components/vehicles/hooks/use-vehicle-edition-page'

export default function EditPage() {
  const { inputs, formValues, handleChange, isLoading, id} = useVehicleEditionPage()

  return (
    <>
      {!isLoading ? (
        <EditionPageView
          title="Vehículo"
          submitLabel="Guardar Vehículo"
          id={`#${id}`}
          inputs={inputs}
          values={formValues}
          handleChange={handleChange}
        />
      ) : (
        <Typography align="center">Loading...</Typography>
      )}
    </>
  )
}