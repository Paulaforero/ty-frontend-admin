'use client'

import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { BACKEND_URLS } from '@/utils/backend-urls'
import { useRouter } from 'next/navigation'
import useSnackbar from '@/hooks/use-snackbar'

export default function useActivityEditionPage() {
  const router = useRouter()
  const notify = useSnackbar()

  const searchParams = useSearchParams()

  const activityNumber = searchParams.get('activity-number')
  const serviceId = searchParams.get('service-id')
  const id = activityNumber + '/' + serviceId

  const [formValues, setFormValues] = useState({
        activityNumber: '',
        serviceId: '',
        description: '',
        pricePerHour: '',
  })

  const [isLoading, setIsLoading] = useState(true)

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

  const fetchActivityData = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await fetch(
        `${BACKEND_URLS.activities}/view?activity-number=${activityNumber}&service-id=${serviceId}`,
        {
          method: 'GET',
          cache: 'no-store',
        }
      )

      const responseData = await response.json()
      const fetchedActivityData = responseData.data

      setFormValues(fetchedActivityData)
    } catch (error) {
      notify({
        message: 'Error obteniendo los datos de la actividad.',
        severity: 'error',
      })
    } finally {
      setIsLoading(false)
    }
  }, [notify, activityNumber, serviceId])

  useEffect(() => {
    fetchActivityData()
  }, [fetchActivityData])

  const editActivity = async () => {
    try {
      const { activityNumber, ...toEditValues } = formValues
      const response = await fetch(
        `${BACKEND_URLS.activities}/view?activity-number=${activityNumber}&service-id=${serviceId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(toEditValues),
          cache: 'no-store',
        }
      )

      if (!response.ok) throw new Error()

      notify({
        message: '¡Se ha editado la actividad exitosamente!',
        severity: 'success',
      })

      router.push('/activities')
    } catch (error) {
      notify({
        message: 'Error al intentar editar la actividad.',
        severity: 'error',
      })
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    editActivity()
  }

  useEffect(() => {
    fetchActivityData()
  }, [fetchActivityData])

  return { inputs, formValues, handleChange, handleSubmit, isLoading, id,
  }
}
