'use client'

import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import useSnackbar from '@/hooks/use-snackbar'

export default function useVehicleEditionPage() {

  const searchParams = useSearchParams()

  const id = searchParams.get('id')

  const [formValues, setFormValues] = useState({
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

  const inputs = [
    {
        label: 'Placa',
        type: 'text',
        name: 'plate',
        required: true,
      },
      {
        label: 'Marca',
        type: 'text',
        name: 'brand',
        required: true,
      },
      {
          type: 'select',
          options: vehicleModels.map(vehicleModels => ({
            label: vehicleModels.name,
            value: vehicleModels.id,
          })),
        name: 'modelId',
        label: 'Id del modelo',
        required: true,
      },
      {
          type: 'text',
          name: 'serialNo',
          label: 'Número de serial',
          required: true,
        },
        {
          type: 'text',
          name: 'engineSerialNo',
          label: 'Número de serial del motor',
          required: true,
        },
        {
          type: 'text',
          name: 'color',
          label: 'Color',
          required: true,
        },
        {
            type: 'text',
            name: 'purchaseDate',
            label: 'Fecha de compra (dd/mm/yyyy)',
            required: true,
        },
        {
            type: 'text',
            name: 'additionalInfo',
            label: 'Información adicional',
        },
        {
            type: 'text',
            name: 'maintenanceSummary',
            label: 'Resumen de mantenimientos',
        },
        {
            type: 'select',
            options: clients.map(clients => ({
              label: clients.fullName,
              value: clients.nationalId,
            })),
          name: 'ownerNationalId',
          label: 'Cédula del propietario',
          required: true,
        },
  ]

  const handleChange = event => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value })
  }


  return { inputs, formValues, handleChange, isLoading, id }
}
