import { useState, useCallback, useEffect } from 'react'
import useSnackbar from '@/hooks/use-snackbar'
import { vehicleModels } from '../../../mock/vehicle-models'

export default function useVehicleModelsDataPage() {
  const notify = useSnackbar()


  const columns = {
    id: 'ID',
    name: 'Nombre',
    weightInKg: 'Peso (Kg)',
    octaneRating: 'Octanaje',
    seatCount: 'Cantidad asientos',
    engineOilType: 'Tipo aceite de motor',
  }

  return { columns, vehicleModels}
}
