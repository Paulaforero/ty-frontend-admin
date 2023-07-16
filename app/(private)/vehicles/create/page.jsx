'use client'

import CreationPageView from '@/components/creation-page-view'
import useVehicleCreationPage from '@/components/vehicles/hooks/use-vehicle-creation-page'

export default function CreatePage() {
  const { inputs, formValues, handleChange, handleSubmit } =
    useVehicleCreationPage()

  return (
    <CreationPageView
      title="Vehículo"
      submitLabel="Crear vehículo"
      inputs={inputs}
      values={formValues}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  )
}