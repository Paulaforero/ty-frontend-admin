'use client'

import CreationPageView from '@/components/creation-page-view'
import useEmployeeCreationPage from '@/components/vehicle-models/hooks/use-vehicle-model-creation-page'

export default function CreatePage() {
  const { inputs, formValues, handleChange, handleSubmit } =
  useEmployeeCreationPage()

  return (
    <CreationPageView
      title="Empleado"
      submitLabel="Crear empleado"
      inputs={inputs}
      values={formValues}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  )
}
