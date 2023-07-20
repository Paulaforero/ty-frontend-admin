'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { BACKEND_URLS } from '@/utils/backend-urls'
import useSnackbar from '@/hooks/use-snackbar'

export default function useVehicleDetailsPage() {
  const router = useRouter()
  const notify = useSnackbar()

  const searchParams = useSearchParams()

  const plate = searchParams.get('plate')


  const [vehicleData, setVehicleData] = useState({
    plate: '',
    brand: '',
    modelId: '',
    serialNo: '',
    engineSerialNo: '',
    color: '',
    purchaseDate: '',
    additionalInfo: '',
    maintenanceSummary: '',
    ownerNationalId: '',
  })
  const [isLoading, setIsLoading] = useState(false)

  const rows = useMemo(
    () => [
      {
        label: 'Marca',
        value: vehicleData.brand,
      },
      {
        label: 'Modelo (ID)',
        value: vehicleData.modelId,
      },
      {
        label: 'Número de serial',
        value: vehicleData.serialNo,
      },
      {
        label: 'Número de serial del motor',
        value: vehicleData.engineSerialNo,
      },
      {
        label: 'Color',
        value: vehicleData.color ,
      },
      {
        label: 'Fecha de compra',
        value: vehicleData.purchaseDate  ,
      },
      {
        label: 'Información adicional',
        value: vehicleData.additionalInfo ,
      },
      {
        label: 'Resumen de mantenimientos',
        value: vehicleData.maintenanceSummary ,
      },
      {
        label: 'Cédula del propietario',
        value: vehicleData.ownerNationalId ,
      },
    ],
    [vehicleData]
  )

  const handleDelete = async () => {
    try {
      const response = await fetch(`${BACKEND_URLS.vehicles}?plate=${plate}`, {
        method: 'DELETE',
        cache: 'no-store',
      })

      if (!response.ok) throw new Error()

      notify({
        message: '¡El vehículo se ha eliminado exitósamente!',
        severity: 'success',
      })

      router.push('/vehicles')
    } catch (error) {
      notify({
        message: 'Error al intentar eliminar el vehículo.',
        severity: 'error',
      })
    }
  }

  const fetchVehicleData = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await fetch(
        `${BACKEND_URLS.vehicles}/view?plate=${plate}`,
        {
          method: 'GET',
          cache: 'no-store',
        }
      )

      const responseData = await response.json()
      const fetchedVehicleData = responseData.data
      setVehicleData(fetchedVehicleData)
    } catch (error) {
      notify({
        message: 'Error obteniendo los datos del vehículo.',
        severity: 'error',
      })
    } finally {
      setIsLoading(false)
    }
  }, [notify, plate])

  useEffect(() => {
    fetchVehicleData()
  }, [fetchVehicleData])

  return {
    rows,
    vehicleData,
    handleDelete,
    isLoading,
    plate: vehicleData.plate,
  }
}
