import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { BACKEND_URLS } from '@/utils/backend-urls'
import useSnackbar from '@/hooks/use-snackbar'

export default function useVehicleCreationPage() {
  const router = useRouter()
  const notify = useSnackbar()

  const [formValues, setFormValues] = useState({
    name: '',
    seatCount: '',
    weightInKg: '',
    octaneRating: '',
    gearboxOilType: '',
    engineOilType: '',
    engineCoolantType: '',
  })

  const createVehicle = async () => {
    try {
      const response = await fetch(BACKEND_URLS.vehicleModels, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
        cache: 'no-store',
      })

      if (!response.ok) throw new Error()

      router.push('/vehicle-models')

      notify({
        message: '¡Modelo de Vehículo creado con éxito!',
        severity: 'success',
      })
    } catch (error) {
      notify({
        message: 'Error al crear el modelo de vehículo...',
        severity: 'error',
      })
    }
  }
  
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


  return {
    inputs,
    formValues,
    handleChange,
    handleSubmit,
  }
}

