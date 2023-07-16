import { useState, useCallback, useEffect } from 'react'
import { BACKEND_URLS } from '@/utils/backend-urls'
import useSnackbar from '@/hooks/use-snackbar'

export default function useCitiesDataPage() {
  const notify = useSnackbar()

  const [cities, setCities] = useState([])

  const columns = {
    cityNumber: 'ID',
    name: 'Nombre',
    stateId: 'Estado (ID)',
  }

  const addIdAttrsObjectToEachRow = rows =>
    rows.map(row => {
      return {
        ...row,
        idAttrs: { 'city-number': row.cityNumber, 'state-id': row.stateId },
      }
    })

  const fetchCities = useCallback(async () => {
    try {
      const response = await fetch(BACKEND_URLS.cities, {
        method: 'GET',
        cache: 'no-store',
      })

      const responseData = await response.json()
      const fetchedCities = responseData.data
      const formattedCities = addIdAttrsObjectToEachRow(fetchedCities)

      setCities(formattedCities)
    } catch (error) {
      notify({
        message: 'Error obteniendo las ciudades.',
        severity: 'error',
      })
    }
  }, [notify])

  const handleDelete = async ({
    'city-number': cityNumber,
    'state-id': stateId,
  }) => {
    try {
      const response = await fetch(
        `${BACKEND_URLS.cities}?city-number=${cityNumber}&state-id=${stateId}`,
        {
          method: 'DELETE',
          cache: 'no-store',
        }
      )

      if (!response.ok) throw new Error()

      notify({
        message: '¡Se ha eliminado la ciudad exitosamente!',
        severity: 'success',
      })

      fetchCities()
    } catch (error) {
      notify({
        message: 'Error al intentar eliminar la ciudad.',
        severity: 'error',
      })
    }
  }

  useEffect(() => {
    fetchCities()
  }, [fetchCities])

  return { cities, columns, handleDelete }
}
