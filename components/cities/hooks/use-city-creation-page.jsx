'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { BACKEND_URLS } from '@/utils/backend-urls'
import useSnackbar from '@/hooks/use-snackbar'

export default function useCityCreationPage() {
  const router = useRouter()
  const notify = useSnackbar()

  const [formValues, setFormValues] = useState({
    name: '',
    stateId: '',
  })
  const [statesList, setStatesList] = useState([])

  const fetchStatesList = useCallback(async () => {
    try {
      const response = await fetch(`${BACKEND_URLS.states}`, {
        method: 'GET',
        cache: 'no-store',
      })

      const responseData = await response.json()
      const fetchedStatesList = responseData.data

      setStatesList(fetchedStatesList)
    } catch (error) {
      notify({
        message: 'Error obteniendo la lista de estados.',
        severity: 'error',
      })
    }
  }, [notify])

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

      notify({
        message: '!Ciudad creada con éxito!',
        severity: 'success',
      })
    } catch (error) {
      notify({
        message: 'Error al crear la ciudad...',
        severity: 'error',
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
      options: statesList.map(state => ({
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

  useEffect(() => {
    ;(async () => {
      await fetchStatesList()
    })()
  }, [fetchStatesList])

  return {
    inputs,
    formValues,
    handleChange,
    handleSubmit,
  }
}
