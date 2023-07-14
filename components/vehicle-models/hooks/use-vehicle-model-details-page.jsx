'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import useSnackbar from '@/hooks/use-snackbar'

export default function useVehicleModelDetailsPage() {

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

  const handleChange = event => {
    setVehicleModel({ ...vehicleModelData, [event.target.name]: event.target.value })
  }


  return { rows, vehicleModelData, handleChange, isLoading, id }
}
