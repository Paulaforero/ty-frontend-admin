'use client'

import CreationPageView from '@/components/creation-page-view'
import { Alert, Snackbar } from '@mui/material'
import useCityCreationPage from '@/components/cities/hooks/use-city-creation-page'

export default function CreatePage() {
  const { inputs, formValues, handleChange, handleSubmit } =
    useCityCreationPage()

  return (
    <CreationPageView
      title="Crear ciudad"
      submitLabel="Crear"
      inputs={inputs}
      values={formValues}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  )
}
