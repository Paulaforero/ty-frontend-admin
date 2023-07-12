'use client'

import DetailsPageView from '@/components/details-page-view'
import { useState } from 'react'
import { useParams } from 'next/navigation'

export default function ViewPage() {
  const { id } = useParams()

  const vehiclesModels = {
    id: 1,
    name: 'Toyota Camry',
    seatCount: 5,
    weightInKg: 1600,
    octaneRating: 91,
    gearboxOilType: 'Automatic',
    engineOilType: '5W-30',
    engineCoolantType: 'Ethylene glycol',
  }
  const [formValues, setFormValues] = useState(vehiclesModels)

  const rows = [
    {
      label: 'Nombre:',
      value: vehiclesModels.name,
    },
    {
      label: 'Cantidad de asientos:',
      value: vehiclesModels.seatCount,
    },
    {
      label: 'Peso en kg:',
      value: vehiclesModels.weightInKg,
    },
    {
      label: 'Octanaje:',
      value: vehiclesModels.octaneRating,
    },
    {
      label: 'Tipo de aceite de la caja:',
      value: vehiclesModels.gearboxOilType,
    },
    {
      label: 'Tipo de aceite del motor:',
      value: vehiclesModels.engineOilType,
    },
    {
      label: 'Tipo de refrigerante:',
      value: vehiclesModels.engineCoolantType,
    },
  ]

  const handleChange = event => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value })
  }

  return (
    <DetailsPageView
      title='Modelo de vehículo'
      id={`#${id}`}
      toEditButtonLabel="Editar modelo de vehículo"
      rows={rows}
      values={formValues}
      handleChange={handleChange}
    />
  )
}
