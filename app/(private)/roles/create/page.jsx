'use client'

import CreationPageView from '@/components/creation-page-view'
import useRoleCreationPage from '@/components/roles/use-role-creation-page'

export default function CreatePage() {
  const { inputs, formValues, handleChange, handleSubmit } =
  useRoleCreationPage()

  return (
    <CreationPageView
      title="Cargo"
      submitLabel="Crear cargo"
      inputs={inputs}
      values={formValues}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  )
}
