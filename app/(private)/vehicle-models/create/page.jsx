'use client'

import CreationPageView from '@/components/creation-page-view'
import useVehicleModelCreationPage from '@/components/vehicle-models/hooks/use-vehicle-model-creation-page'

export default function CreatePage() {
  const { inputs,
    formValues,
    handleChange,
    } =
    useVehicleModelCreationPage()

  return (
    <CreationPageView
      title="Modelo de vehículo"
      submitLabel="Crear modelo de vehículo"
      inputs={inputs}
      values={formValues}
      handleChange={handleChange}
    />
  )
}
