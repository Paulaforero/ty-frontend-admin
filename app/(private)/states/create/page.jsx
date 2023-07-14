'use client'

import CreationPageView from '@/components/creation-page-view'
import useStateCreationPage from '@/components/states/hooks/use-state-create-page'

export default function CreatePage() {
  const { inputs,
    formValues,
    handleChange,
    } =
    useStateCreationPage()

  return (
    <CreationPageView
      title="Estado"
      submitLabel="Crear estado"
      inputs={inputs}
      values={formValues}
      handleChange={handleChange}
    />
  )
}