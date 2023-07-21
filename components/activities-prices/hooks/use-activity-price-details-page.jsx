'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { BACKEND_URLS } from '@/utils/backend-urls'
import useSnackbar from '@/hooks/use-snackbar'

export default function useActivityPriceDetailsPage() {
  const router = useRouter()
  const notify = useSnackbar()

  const searchParams = useSearchParams()

  const activityNumber = searchParams.get('activity-number')
  const serviceId = searchParams.get('service-id')
  const dealershipRif = searchParams.get('dealership-rif')
  const id = activityNumber + '/' + serviceId + '/' + dealershipRif

  const [activityPriceData, setActivityPriceData] = useState({
    activityNumber: '',
    serviceId: '',
    dealershipRif: '',
    pricePerHour: '',
  })

  const [isLoading, setIsLoading] = useState(true)

  const rows = useMemo(
    () => [
      {
        label: 'Numero de la actividad',
        value: activityPriceData.activityNumber,
      },
      {
        label: 'Servicio (ID)',
        value: activityPriceData.serviceId,
      },
      {
        label: 'Concesionario',
        value: activityPriceData.dealershipRif,
      },
      {
        label: 'Precio por hora',
        value: activityPriceData.pricePerHour,
      },
    ],
    [activityPriceData]
  )

  const handleDelete = async () => {
    try {
      const response = await fetch(`${BACKEND_URLS.activities}?activity-number=${activityNumber}&service-id=${serviceId}&dealership-rif=${dealershipRif}`, {
        method: 'DELETE',
        cache: 'no-store',
      })

      if (!response.ok) throw new Error()

      notify({
        message: '¡El precio de la actividad se ha eliminado exitósamente!',
        severity: 'success',
      })

      router.push('/activities-prices')
    } catch (error) {
      notify({
        message: 'Error al intentar eliminar el precio de la actividad',
        severity: 'error',
      })
    }
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
      setActivityPriceData(fetchedActivityPriceData)

    } catch (error) {
      notify({
        message: 'Error obteniendo los datos del precio de la actividad',
        severity: 'error',
      })
    } finally {
      setIsLoading(false)
    }
  }, [notify, activityNumber, serviceId, dealershipRif ])

  useEffect(() => {
    fetchActivityPriceData()
  }, [fetchActivityPriceData])

  return {
    rows,
    activityPriceData,
    handleDelete,
    isLoading,
    id
  }
}
