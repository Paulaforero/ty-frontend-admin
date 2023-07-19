'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { BACKEND_URLS } from '@/utils/backend-urls'
import useSnackbar from '@/hooks/use-snackbar'

export default function useVehicleCreationPage() {
  const router = useRouter()
  const notify = useSnackbar()
  

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

  const [clients, setClients] = useState([])
  const [vehicleModels, setVehicleModels] = useState([])


  const fetchClients = useCallback(async () => {
    try {
      const response = await fetch(BACKEND_URLS.clients, {
        method: 'GET',
        cache: 'no-store',
      })

      const responseData = await response.json()
      const fetchedClients = responseData.data

      setClients(fetchedClients)
    } catch (error) {
      notify({
        message: 'Error obteniendo los clientes',
        severity: 'error',
      })
    }
  }, [notify])

  const fetchVehicleModels = useCallback(async () => {
    try {
      const response = await fetch(BACKEND_URLS.vehicleModels, {
        method: 'GET',
        cache: 'no-store',
      })

      const responseData = await response.json()
      const fetchedVehicleModels = responseData.data

      setVehicleModels(fetchedVehicleModels)
    } catch (error) {
      notify({
        message: 'Error obteniendo los modelos de vehículos',
        severity: 'error',
      })
    }
  }, [notify])

  const createVehicle = async () => {
    try {
      const response = await fetch(BACKEND_URLS.vehicles, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
        cache: 'no-store',
      })

      if (!response.ok) throw new Error()

      router.push('/vehicles')

      notify({
        message: '¡Vehículo creado con éxito!',
        severity: 'success',
      })
    } catch (error) {
      notify({
        message: 'Error al crear el vehículo...',
        severity: 'error',
      })
    }
  }

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
            label: 'Fecha de compra (yyyy-mm-dd)',
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
    const { name, value } = event.target
    let parsedValue

    if (name === 'seatCount') parsedValue = parseInt(value)
    if (name === 'weightInKg') parsedValue = parseFloat(value)

    setFormValues({
      ...formValues,
      [name]: parsedValue,
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    createVehicle()
  }

  useEffect(() => {
    fetchClients()
    fetchVehicleModels()
  }, [])

  return {
    inputs,
    formValues,
    handleChange,
    handleSubmit,
  }
}
