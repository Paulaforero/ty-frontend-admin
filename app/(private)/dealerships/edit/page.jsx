'use client'

import EditionPageView from '@/components/edition-page-view'
import useDealershipEditionPage from '@/components/dealerships/hooks/use-dealership-edition-page'

export default function EditPage() {
  const { inputs, formValues, handleChange, handleSubmit, id } =
    useDealershipEditionPage()

  return (
    <EditionPageView
      title={`Concesionario`}
      id={id}
      submitLabel="Guardar"
      inputs={inputs}
      values={formValues}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
    />
  )
}
