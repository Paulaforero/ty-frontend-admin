'use client'

import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { BACKEND_URLS } from '@/utils/backend-urls'
import { useRouter } from 'next/navigation'
import useSnackbar from '@/hooks/use-snackbar'
import {vehicleModels} from '../../../mock/vehicles'
import { clients } from '../../../mock/vehicles'

export default function useVehicleEditionPage() {
  const router = useRouter()
  const notify = useSnackbar()

  const searchParams = useSearchParams()

  const plate = searchParams.get('plate')

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
    setFormValues({...formValues, [event.target.name]: typeof event.target.value === 'string' ? event.target.value.trim() : event.target.value })
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

      setFormValues(fetchedVehicleData)
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

  const editVehicle = async () => {
    try {
      const { plate, ...toEditValues } = formValues
      const response = await fetch(
        `${BACKEND_URLS.vehicles}?plate=${plate}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(toEditValues),
          cache: 'no-store',
        }
      )

      if (!response.ok) throw new Error()

      notify({
        message: '¡Se ha editado el vehículo exitosamente!',
        severity: 'success',
      })

      router.push('/vehicles')
    } catch (error) {
      notify({
        message: 'Error al intentar editar el vehículo.',
        severity: 'error',
      })
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    editVehicle()
  }

  useEffect(() => {
    fetchVehicleData()
  }, [fetchVehicleData])

  return { inputs, formValues, handleChange, handleSubmit, isLoading, plate
  }
}
