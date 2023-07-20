'use client'

import useClientCreationPage from '@/components/clients/hooks/use-client-creation-page'
import CreationPageView from '@/components/creation-page-view'

export default function CreatePage() {
  const { inputs, formValues, handleChange, handleSubmit } =
    useClientCreationPage()

  return (
    <CreationPageView
      title="Cliente"
      submitLabel="Crear cliente"
      inputs={inputs}
      values={formValues}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  )
}
