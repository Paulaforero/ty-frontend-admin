'use client'

import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { BACKEND_URLS } from '@/utils/backend-urls'
import { useRouter } from 'next/navigation'
import useSnackbar from '@/hooks/use-snackbar'

export default function useVehicleModelEditionPage() {
  const router = useRouter()
  const notify = useSnackbar()

  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  

  const [formValues, setFormValues] = useState({
    id: '',
    name: '',
    seatCount: '',
    octaneRating: '',
    gearboxOilType: '',
    engineOilType: '',
    engineCoolantType:'',
  })

  const [isLoading, setIsLoading] = useState(false)

  const inputs = [
    {
      label: 'Nombre',
      type: 'text',
      name: 'name',
      required: true,
    },
    {
        type: 'number',
        name: 'seatCount',
        label: 'Cantidad de asientos',
        min: 2,
        max: 8,
        required: true,
      },
    {
        type: 'select',
        options: [
        {
          label: '95',
          value: 95,
        },
        {
          label: '91',
          value: 91,
        },
      ],
      name: 'octaneRating',
      label: 'Octanaje',
      required: true,
    },
    {
        type: 'text',
        name: 'gearboxOilType',
        label: 'Tipo de aceite de caja',
        required: true,
      },
      {
        type: 'text',
        name: 'engineOilType',
        label: 'Tipo de aceite de motor',
        required: true,
      },
      {
        type: 'text',
        name: 'engineCoolantType',
        label: 'Tipo de refrigerante',
        required: true,
      },
  ]
  const handleChange = event => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value })
  }

  const fetchVehicleModelData = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await fetch(
        `${BACKEND_URLS.cities}/view?id=${id}`,
        {
          method: 'GET',
          cache: 'no-store',
        }
      )

      const responseData = await response.json()
      const fetchedVehicleModelData = responseData.data

      setFormValues(fetchedVehicleModelData)
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

  const editVehicleModel = async () => {
    try {
      const { id, ...toEditValues } = formValues
      const response = await fetch(
        `${BACKEND_URLS.vehicleModels}?id=${id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(toEditValues),
          cache: 'no-store',
        }
      )

      const responseData = await response.json()
      console.log(responseData)

      if (!response.ok) throw new Error()

      notify({
        message: '¡Se ha editado el modelo de vehículo exitosamente!',
        severity: 'success',
      })

      router.push('/vehicle-models')
    } catch (error) {
      notify({
        message: 'Error al intentar editar el modelo de vehículo.',
        severity: 'error',
      })
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    editVehicleModel()
  }

  useEffect(() => {
    fetchVehicleModelData()
  }, [fetchVehicleModelData])

  return { inputs, formValues, handleChange, handleSubmit, isLoading, id: vehicleModelData.id,
  }
}
