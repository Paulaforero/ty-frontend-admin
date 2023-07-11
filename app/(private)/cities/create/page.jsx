'use client'

import CreationPageView from '@/components/creation-page-view'
import { useState } from 'react'
import { states } from '@/mock/cities'
import { Alert, Snackbar } from '@mui/material'
import { useRouter } from 'next/navigation'
import { BACKEND_URLS } from '@/utils/backend-urls'

export default function CreatePage() {
  const router = useRouter()

  const [snackbarData, setSnackbarData] = useState({
    isOpen: false,
    severity: '',
    message: '',
  })

  const [formValues, setFormValues] = useState({
    name: '',
    stateId: '',
  })

  const createCity = async () => {
    try {
      const response = await fetch(BACKEND_URLS.cities, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
        cache: 'no-store',
      })

      if (!response.ok) throw new Error()

      router.push('/cities')

      setSnackbarData({
        isOpen: true,
        severity: 'success',
        message: '!Ciudad creada con éxito!',
      })
    } catch (error) {
      setSnackbarData({
        isOpen: true,
        severity: 'error',
        message: 'Error al crear la ciudad...',
      })
    }
  }

  const inputs = [
    {
      label: 'Nombre:',
      type: 'text',
      name: 'name',
      placeholder: 'Ingrese el nombre',
      required: true,
    },
    {
      label: 'Estado:',
      type: 'select',
      options: states.map(state => ({
        label: state.name,
        value: state.id,
      })),
      name: 'stateId',
      placeholder: 'Seleccione el estado',
      required: true,
    },
  ]

  const handleChange = event => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    createCity()
  }

  const handleSnackbarClose = () => {
    setSnackbarData({ ...snackbarData, isOpen: false })
  }

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
