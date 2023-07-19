'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { BACKEND_URLS } from '@/utils/backend-urls'
import useSnackbar from '@/hooks/use-snackbar'

export default function useActivityDetailsPage() {
  const router = useRouter()
  const notify = useSnackbar()

  const searchParams = useSearchParams()

  const serviceId  = searchParams.get('service-id')
  const activityNumber  = searchParams.get('activity-number ')
  const id = activityNumber + '/' + serviceId

  const [activityData, setActivityData] = useState({
    activityNumber: '',
    serviceId: '',
    description: '',
    pricePerHour: '',
  })

  const [isLoading, setIsLoading] = useState(true)

  const rows = useMemo(
    () => [
      {
        label: 'Descripción',
        value: activityData.activityNumber,
      },
      {
        label: 'Precio por hora',
        value: activityData.pricePerHour ,
      },
    ],
    [activityData]
  )



  const handleDelete = async () => {
    try {
      const response = await fetch(`${BACKEND_URLS.activities}?activity-number=${activityNumber}&service-id=${serviceId}`, {
        method: 'DELETE',
        cache: 'no-store',
      })

      if (!response.ok) throw new Error()

      notify({
        message: '¡La actividad se ha eliminado exitósamente!',
        severity: 'success',
      })

      router.push('/activities')
    } catch (error) {
      notify({
        message: 'Error al intentar eliminar la actividad.',
        severity: 'error',
      })
    }
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
      setActivityData(fetchedActivityData)
      
    } catch (error) {
      notify({
        message: 'Error obteniendo los datos de la ciudad.',
        severity: 'error',
      })
    } finally {
      setIsLoading(false)
    }
  }, [notify, activityNumber, serviceId])

  useEffect(() => {
    fetchActivityData()
  }, [fetchActivityData])

  return {
    rows,
    activityData,
    handleDelete,
    isLoading,
    id,
  }
}
