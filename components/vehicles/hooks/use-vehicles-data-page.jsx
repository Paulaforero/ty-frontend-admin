import { useState, useCallback, useEffect } from 'react'
import { BACKEND_URLS } from '@/utils/backend-urls'
import useSnackbar from '@/hooks/use-snackbar'

export default function useVehiclesDataPage() {
  const notify = useSnackbar()

  const [vehicles, setVehicles] = useState([])


  const columns = {
    plate: 'Placa',
    modelId: 'Modelo (ID)',
    purchaseDate: 'Fecha compra',
    ownerNationalId: 'Propietario (Cedula)',
    color: 'Color',
  }
  
  const addIdAttrsObjectToEachRow = rows =>
    rows.map(row => {
      return {
        ...row,
        idAttrs: { 'plate': row.plate},
      }
    })

  const fetchVehicles = useCallback(async () => {
    try {
      const response = await fetch(BACKEND_URLS.vehicles, {
        method: 'GET',
        cache: 'no-store',
      })

      const responseData = await response.json()
      const fetchedVehicles = responseData.data
      const formattedVehicles = addIdAttrsObjectToEachRow(fetchedVehicles)

      setVehicles(formattedVehicles)
    } catch (error) {
      notify({
        message: 'Error obteniendo los vehículos.',
        severity: 'error',
      })
    }
  }, [notify])

  const handleDelete = async ({
    'plate': plate
  }) => {
    try {
      const response = await fetch(
        `${BACKEND_URLS.vehicles}?plate=${plate}`,
        {
          method: 'DELETE',
          cache: 'no-store',
        }
      )

      if (!response.ok) throw new Error()

      notify({
        message: '¡Se ha eliminado el vehículo exitosamente!',
        severity: 'success',
      })

      fetchVehicles()
    } catch (error) {
      notify({
        message: 'Error al intentar eliminar el vehículo.',
        severity: 'error',
      })
    }
  }

  useEffect(() => {
    fetchVehicles()
  }, [fetchVehicles])

  return { vehicles, columns, handleDelete }
}

