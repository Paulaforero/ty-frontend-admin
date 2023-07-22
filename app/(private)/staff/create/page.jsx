'use client'

import CreationPageView from '@/components/creation-page-view'
import useCreationStaffPage from '@/components/staff/hooks/use-creation-staff-page'

export default function CreatePage() {
  const { inputs, formValues, handleChange, handleSubmit } =
    useCreationStaffPage()

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
