'use client'

import { useState, useCallback, useEffect } from 'react'
import { BACKEND_URLS } from '@/utils/backend-urls'
import useSnackbar from '@/hooks/use-snackbar'

export default function useActivitiesPricesDataPage() {
  const notify = useSnackbar()

  const [activitiesPrices, setActivitiesPrices] = useState([])

  const columns = {
    activityNumber: 'ID',
    serviceId: 'Servicio (ID)',
    dealershipRif: 'Concesionario (RIF)',
  }

  const addIdAttrsObjectToEachRow = rows =>
    rows.map(row => {
      return {
        ...row,
        idAttrs: { 'activity-number': row.activityNumber, 'service-id': row.serviceId, 'dealership-rif': row.dealershipRif},
      }
    })

  const fetchActivitiesPrices = useCallback(async () => {
    try {
      const response = await fetch(BACKEND_URLS.activitiesPrices, {
        method: 'GET',
        cache: 'no-store',
      })

      const responseData = await response.json()
      const fetchedActivitiesPrices = responseData.data
      const formattedActivitiesPrices = addIdAttrsObjectToEachRow(fetchedActivitiesPrices)

      setActivitiesPrices(formattedActivitiesPrices)
    } catch (error) {
      notify({
        message: 'Error obteniendo el precio de las actividades',
        severity: 'error',
      })
    }
  }, [notify])

  const handleDelete = async ({
    'activity-number': activityNumber,
    'service-id': serviceId,
    'dealership-rif': dealershipRif
  }) => {
    try {
      const response = await fetch(
        `${BACKEND_URLS.activitiesPrices}?activity-number=${activityNumber}&service-id=${serviceId}&dealership-rif=${dealershipRif}`,
        {
          method: 'DELETE',
          cache: 'no-store',
        }
      )

      if (!response.ok) throw new Error()

      notify({
        message: '¡Se ha eliminado el precio de la actividad correctamente!',
        severity: 'success',
      })

      ()
    } catch (error) {
      notify({
        message: 'Error al eliminar el precio de la actividad',
        severity: 'error',
      })
    }
  }

  useEffect(() => {
    fetchActivitiesPrices()
  }, [fetchActivitiesPrices])

  return { activitiesPrices, columns, handleDelete }
}

