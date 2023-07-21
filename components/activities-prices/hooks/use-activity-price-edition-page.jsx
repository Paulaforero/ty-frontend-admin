'use client'

import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { BACKEND_URLS } from '@/utils/backend-urls'
import { useRouter } from 'next/navigation'
import useSnackbar from '@/hooks/use-snackbar'

export default function useActivityPriceEditionPage() {
  const router = useRouter()
  const notify = useSnackbar()

  const searchParams = useSearchParams()

  const activityNumber = searchParams.get('activity-number')
  const serviceId = searchParams.get('service-id')
  const dealershipRif = searchParams.get('dealership-rif')
  const id = activityNumber + '/' + serviceId + '/' + dealershipRif

  const [formValues, setFormValues] = useState({
    pricePerHour: '',
  })

  const [isLoading, setIsLoading] = useState(true)

  const inputs = [
    {
        label: 'Precio de la actividad',
        type: 'number',
        min: 0,
        adornment: '$',
        name: 'pricePerHour',
        required: true,
      },
  ]

  const handleChange = event => {
    const { name, value } = event.target
    let parsedValue

    if (name === 'pricePerHour') parsedValue = parseFloat(value)

    setFormValues({
      ...formValues,
      [name]: parsedValue,
    })
  }

  const fetchActivityPriceData = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await fetch(
        `${BACKEND_URLS.cities}/view?activity-number=${activityNumber}&service-id=${serviceId}&dealership-rif=${dealershipRif}`,
        {
          method: 'GET',
          cache: 'no-store',
        }
      )

      const responseData = await response.json()
      const fetchedActivityPriceData = responseData.data

      setFormValues(fetchedActivityPriceData)
    } catch (error) {
      notify({
        message: 'Error obteniendo el costo de la actividad',
        severity: 'error',
      })
    } finally {
      setIsLoading(false)
    }
  }, [notify, activityNumber, serviceId, dealershipRif ])

  const editActivityPrice = async () => {
    try {
      const { activityNumber, ...toEditValues } = formValues
      const response = await fetch(
        `${BACKEND_URLS.activities}?activity-number=${activityNumber}&service-id=${serviceId}&dealership-rif=${dealershipRif}`,
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
        message: '¡Se ha editado el precio de la actividad!',
        severity: 'success',
      })

      router.push('/activities-prices')
    } catch (error) {
      notify({
        message: 'Error al intentar el precio de la actividad',
        severity: 'error',
      })
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    editActivityPrice()
  }

  useEffect(() => {
    fetchActivityPriceData()
  }, [fetchActivityPriceData])

  return { inputs, formValues, handleChange, handleSubmit, isLoading, id,
  }
}
