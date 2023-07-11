'use client'

import DetailsPageView from '@/components/details-page-view'
import { useState } from 'react'
import { useParams } from 'next/navigation'

export default function ViewPage() {
  const { id } = useParams()

  const vehiclesModels = {
    id: 1,
    name: 'Toyota Camry',
    seat_count: 5,
    weight_in_kg: 1600,
    octane_rating: 91,
    gearbox_oil_type: 'Automatic',
    engine_oil_type: '5W-30',
    engine_coolant_type: 'Ethylene glycol',
  }
  const [formValues, setFormValues] = useState(vehiclesModels)

  const rows = [
    {
      label: 'ID:',
      value: vehiclesModels.id,
    },
    {
      label: 'Nombre:',
      value: vehiclesModels.name,
    },
    {
      label: 'Cantidad de asientos:',
      value: vehiclesModels.seat_count,
    },
    {
      label: 'Peso en kg:',
      value: vehiclesModels.weight_in_kg,
    },
    {
      label: 'Octanaje:',
      value: vehiclesModels.octane_rating,
    },
    {
      label: 'Tipo de aceite de la caja:',
      value: vehiclesModels.gearbox_oil_type,
    },
    {
      label: 'Tipo de aceite del motor:',
      value: vehiclesModels.engine_oil_type,
    },
    {
      label: 'Tipo de refrigerante:',
      value: vehiclesModels.engine_coolant_type,
    },
  ]

  const handleChange = event => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value })
  }

  return (
    <DetailsPageView
      title={`Concesionario #${id}`}
      toEditButtonLabel="Editar Concesionario"
      rows={rows}
      values={formValues}
      handleChange={handleChange}
    />
  )
}
