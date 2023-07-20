'use client'

import CreationPageView from '@/components/creation-page-view'
import useDealershipCreationPage from '@/components/dealerships/use-dealership-creation-page'

export default function CreatePage() {
  const { inputs, formValues, handleChange, handleSubmit } =
    useDealershipCreationPage()

  return (
    <CreationPageView
      title="Crear concesionario"
      submitLabel="Crear Concesionario"
      inputs={inputs}
      values={formValues}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  )
}
