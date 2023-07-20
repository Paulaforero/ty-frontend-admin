'use client'

import EditionPageView from '@/components/edition-page-view'
import { Typography } from '@mui/material'
import useVehicleModelEditionPage from '@/components/vehicle-models/hooks/use-vehicle-model-edition-page'

export default function EditPage() {
  const { inputs, formValues, handleChange, handleSubmit, isLoading, id } = useVehicleModelEditionPage()

  return (
    <>
      {!isLoading ? (
        <EditionPageView
          title="Modelo de vehículo"
          submitLabel="Guardar modelo de vehículo"
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
