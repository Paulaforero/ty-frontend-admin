import { useState, useCallback, useEffect } from 'react'
import { BACKEND_URLS } from '@/utils/backend-urls'
import useSnackbar from '@/hooks/use-snackbar'

export default function useActivitiesDataPage() {
  const notify = useSnackbar()

  const [activities, setActivities] = useState([])

  const columns = {
    activityNumber : 'ID',
    serviceId : 'Servicio (ID)',
    description : 'Descripción',
    pricePerHour : 'Precio por hora' 
  }

  const addIdAttrsObjectToEachRow = rows =>
    rows.map(row => {
      return {
        ...row,
        idAttrs: { 'activity-number': row.activityNumber, 'service-id': row.serviceId },
      }
    })

  const fetchActivities = useCallback(async () => {
    try {
      const response = await fetch(BACKEND_URLS.activities, {
        method: 'GET',
        cache: 'no-store',
      })

      const responseData = await response.json()
      const fetchedActivities = responseData.data
      const formattedActivities = addIdAttrsObjectToEachRow(fetchedActivities)

      setActivities(formattedActivities)
    } catch (error) {
      notify({
        message: 'Error obteniendo las actividades.',
        severity: 'error',
      })
    }
  }, [notify])

  const handleDelete = async ({
    'activity-number': activityNumber,
    'service-id': serviceId,
  }) => {
    try {
      const response = await fetch(
        `${BACKEND_URLS.activities}?activity-number=${activityNumber}&service-id=${serviceId}`,
        {
          method: 'DELETE',
          cache: 'no-store',
        }
      )

      if (!response.ok) throw new Error()

      notify({
        message: '¡Se ha eliminado la actividad exitosamente!',
        severity: 'success',
      })

      fetchActivities()
    } catch (error) {
      notify({
        message: 'Error al intentar eliminar la actividad.',
        severity: 'error',
      })
    }
  }

  useEffect(() => {
    fetchActivities()
  }, [fetchActivities])

  return { activities, columns, handleDelete }
}

