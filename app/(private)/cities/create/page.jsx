'use client'

import CreationPageView from '@/components/creation-page-view'
import { Alert, Snackbar } from '@mui/material'
import useCityCreationPage from '@/components/cities/hooks/use-city-creation-page'

export default function CreatePage() {
  const {
    inputs,
    formValues,
    handleChange,
    handleSubmit,
    snackbarData,
    handleSnackbarClose,
  } = useCityCreationPage()

  return (
    <>
      <CreationPageView
        title="Crear ciudad"
        submitLabel="Crear"
        inputs={inputs}
        values={formValues}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <Snackbar
        open={snackbarData.isOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      >
        <Alert
          variant="filled"
          severity={snackbarData.severity}
          onClose={handleSnackbarClose}
          className="w-full"
        >
          {snackbarData.message}
        </Alert>
      </Snackbar>
    </>
  )
}
