'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import useSnackbar from '@/hooks/use-snackbar'

export default function useVehicleDetailsPage() {

  const searchParams = useSearchParams()

  const id = searchParams.get('id')

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

  const handleChange = event => {
    setVehicleModel({ ...vehicleModelData, [event.target.name]: event.target.value })
  }


  return { rows, vehicleData, handleChange, isLoading, id }
}
