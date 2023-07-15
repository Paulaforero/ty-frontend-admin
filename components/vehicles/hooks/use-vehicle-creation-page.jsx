'use client'

import { useState } from 'react'
import useSnackbar from '@/hooks/use-snackbar'
import { clients } from '@/mock/vehicles' 

export default function useVehicleCreationPage() {
  

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


  return {
    inputs,
    formValues,
    handleChange,
  }
}

