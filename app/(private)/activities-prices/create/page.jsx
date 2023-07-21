'use client'

import CreationPageView from '@/components/creation-page-view'
import useActivityPriceCreationPage from '@/components/activities-prices/use-activity-creation-page'

export default function CreatePage() {
  const { inputs, formValues, handleChange, handleSubmit } =
  useActivityPriceCreationPage()

  return (
    <CreationPageView
      title="Precio de actividad"
      submitLabel="Crear precio de actividad"
      inputs={inputs}
      values={formValues}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  )
}