'use client'

import CreationPageView from '@/components/creation-page-view'
import useActivitiesCreationPage from '@/components/activities/hooks/use-creation-activities-page'

export default function CreatePage() {
  const { inputs, formValues, handleChange, handleSubmit } =
   useActivitiesCreationPage()

  return (
    <CreationPageView
      title="Actividad"
      submitLabel="Crear actividad"
      inputs={inputs}
      values={formValues}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  )
}
