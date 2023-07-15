import { useState, useCallback, useEffect } from 'react'
import useSnackbar from '@/hooks/use-snackbar'
import { vehicles } from '@/mock/vehicles'

export default function useVehiclesDataPage() {
  const notify = useSnackbar()


  const columns = {
    plate: 'Placa',
    modelId: 'Modelo (ID)',
    purchaseDate: 'Fecha compra',
    ownerNationalId: 'Propietario (Cedula)',
    color: 'Color',
  }

  return { columns, vehicles}
}