import { useState, useCallback, useEffect } from 'react'
import { BACKEND_URLS } from '@/utils/backend-urls'
import useSnackbar from '@/hooks/use-snackbar'

export default function useVehicleModelsDataPage() {
  const notify = useSnackbar()

  const [vehicleModels, setVehicleModels] = useState([])


  const columns = {
    id: 'ID',
    name: 'Nombre',
    weightInKg: 'Peso (Kg)',
    octaneRating: 'Octanaje',
    seatCount: 'Cantidad asientos',
    engineOilType: 'Tipo aceite de motor',
  }

  const addIdAttrsObjectToEachRow = rows =>
    rows.map(row => {
      return {
        ...row,
        idAttrs: { 'id': row.id},
      }
    })

  const fetchVehicleModels = useCallback(async () => {
    try {
      const response = await fetch(BACKEND_URLS.vehicleModels, {
        method: 'GET',
        cache: 'no-store',
      })

      const responseData = await response.json()
      const fetchedVehicleModels = responseData.data
      const formattedVehicleModels = addIdAttrsObjectToEachRow(fetchedVehicleModels)

      setVehicleModels(formattedVehicleModels)
    } catch (error) {
      notify({
        message: 'Error obteniendo los modelos de vehículos.',
        severity: 'error',
      })
    }
  }, [notify])

  const handleDelete = async ({
    'id': id,
  }) => {
    try {
      const response = await fetch(
        `${BACKEND_URLS.vehicleModels}?id=${id}`,
        {
          method: 'DELETE',
          cache: 'no-store',
        }
      )

      if (!response.ok) throw new Error()

      notify({
        message: '¡Se ha eliminado el modelo de vehículo exitosamente!',
        severity: 'success',
      })

      fetchVehicleModels()
    } catch (error) {
      notify({
        message: 'Error al intentar eliminar el modelo de vehículo.',
        severity: 'error',
      })
    }
  }

  useEffect(() => {
    fetchVehicleModels()
  }, [fetchVehicleModels])

  return { vehicleModels, columns, handleDelete }
}


