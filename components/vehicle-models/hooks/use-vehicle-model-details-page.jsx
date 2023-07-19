'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { BACKEND_URLS } from '@/utils/backend-urls'
import useSnackbar from '@/hooks/use-snackbar'

export default function useVehicleModelDetailsPage() {
  const router = useRouter()
  const notify = useSnackbar()

  const searchParams = useSearchParams()

  const id = searchParams.get('id')


  const [vehicleModelData, setVehicleModelData] = useState({
    id: '',
    name: '',
    seatCount: '',
    weightInKg: '',
    octaneRating: '',
    gearboxOilType: '',
    engineOilType: '',
    engineCoolantType: '',
  })
  const [isLoading, setIsLoading] = useState(false)

  const rows = useMemo(
    () => [
      {
        label: 'ID',
        value: vehicleModelData.id,
      },
      {
        label: 'Nombre',
        value: vehicleModelData.name,
      },
      {
        label: 'Cantidad de asientos',
        value: vehicleModelData.seatCount,
      },
      {
        label: 'Peso en Kg',
        value: vehicleModelData.weightInKg,
      },
      {
        label: 'Octanaje',
        value: vehicleModelData.octaneRating,
      },
      {
        label: 'Tipo de aceite de caja',
        value: vehicleModelData.gearboxOilType ,
      },
      {
        label: 'Tipo de aceite de motor',
        value: vehicleModelData.engineOilType  ,
      },
      {
        label: 'Tipo de refrigerante',
        value: vehicleModelData.engineCoolantType ,
      },
    ],
    [vehicleModelData]
  )

  const handleDelete = async () => {
    try {
      const response = await fetch(`${BACKEND_URLS.vehicleModels}?id=${id}`, {
        method: 'DELETE',
        cache: 'no-store',
      })

      if (!response.ok) throw new Error()

      notify({
        message: '¡El modelo de vehículo se ha eliminado exitósamente!',
        severity: 'success',
      })

      router.push('/vehicle-models')
    } catch (error) {
      notify({
        message: 'Error al intentar eliminar el modelo de vehículo.',
        severity: 'error',
      })
    }
  }

  const fetchVehicleModelData = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await fetch(
        `${BACKEND_URLS.vehicleModels}/view?id=${id}`,
        {
          method: 'GET',
          cache: 'no-store',
        }
      )

      const responseData = await response.json()
      const fetchedVehicleModelData = responseData.data
      setVehicleModelData(fetchedVehicleModelData)
    } catch (error) {
      notify({
        message: 'Error obteniendo los datos del modelo del vehículo.',
        severity: 'error',
      })
    } finally {
      setIsLoading(false)
    }
  }, [notify, id])

  useEffect(() => {
    fetchVehicleModelData()
  }, [fetchVehicleModelData])

  return {
    rows,
    vehicleModelData,
    handleDelete,
    isLoading,
    id
  }
}
