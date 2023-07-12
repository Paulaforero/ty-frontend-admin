'use client'

import CreationPageView from '@/components/creation-page-view'
import useSupplyLineCreationPage from '@/components/supply-lines/hooks/use-supply-line-creation-page'

export default function CreatePage() {
  const { inputs, formValues, handleChange, handleSubmit } =
    useSupplyLineCreationPage()

  return (
    <CreationPageView
      title="Crear linea de suministro"
      submitLabel="Crear linea de suministro"
      inputs={inputs}
      values={formValues}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  )
}
