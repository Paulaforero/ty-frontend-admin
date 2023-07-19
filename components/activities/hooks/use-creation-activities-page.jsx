'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { BACKEND_URLS } from '@/utils/backend-urls'
import useSnackbar from '@/hooks/use-snackbar'

export default function useActivitiesCreationPage() {
  const router = useRouter()
  const notify = useSnackbar()

  const [formValues, setFormValues] = useState({
    serviceId: '',
    description: '',
    pricePerHour: '',
  })
  const [services, setServices] = useState([])
  
  const fetchServices = useCallback(async () => {
    try {
      const response = await fetch(BACKEND_URLS.services, {
        method: 'GET',
        cache: 'no-store',
      })

      const responseData = await response.json()
      const fetchedServices = responseData.data

      setServices(fetchedServices)
    } catch (error) {
      notify({
        message: 'Error obteniendo los servicios',
        severity: 'error',
      })
    }
  }, [notify])

  const createActivities = async () => {
    try {
      const response = await fetch(BACKEND_URLS.activities, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
        cache: 'no-store',
      })

      if (!response.ok) throw new Error()

      router.push('/activities')

      notify({
        message: '¡Actividad creada con éxito!',
        severity: 'success',
      })
    } catch (error) {
      notify({
        message: 'Error al crear la actividad...',
        severity: 'error',
      })
    }
  }

  const inputs = [
    {
      label: 'Descripción',
      type: 'text',
      name: 'description ',
      required: true,
    },
    {
      label: 'Servicio (ID)',
      type: 'select',
      options: services.map(services => ({
        label: services.name,
        value: services.id,
      })),
      name: 'serviceId ',
      required: true,
    },
    {
        label: 'Precio por hora',
        type: 'number',
        name: 'pricePerHour ',
        adornment: '$',
        required: true,
        min: 0,
      },
  ]

  const handleChange = event => {
    const { name, value } = event.target
    let parsedValue = value

    if (name === 'pricePerHour') parsedValue = parseFloat(value)

    setFormValues({
      ...formValues,
      [name]: parsedValue,
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    createActivities()
  }

  useEffect(() => {
    fetchServices()
  }, [fetchServices])

  return {
    inputs,
    formValues,
    handleChange,
    handleSubmit,
  }
}