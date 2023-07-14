'use client'

import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import useSnackbar from '@/hooks/use-snackbar'

export default function useVehicleModelEditionPage() {

  const searchParams = useSearchParams()

  const id = searchParams.get('id')

  const [formValues, setFormValues] = useState({
    id,
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


  return { inputs, formValues, handleChange, isLoading, id }
}
