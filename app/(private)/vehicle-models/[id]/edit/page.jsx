'use client'

import EditionPageView from '@/components/edition-page-view'
import { useState } from 'react'

export default function EditPage() {
  const vehicleModels = {
    id: 1,
    name: 'Toyota Camry',
    seat_count: 5,
    weight_in_kg: 1600,
    octane_rating: 91,
    gearbox_oil_type: 'Automatic',
    engine_oil_type: '5W-30',
    engine_coolant_type: 'Ethylene glycol',
  }
  const [formValues, setFormValues] = useState(vehicleModels)

  const inputs = [
    {
      label: 'Nombre:',
      type: 'text',
      name: 'name',
      placeholder: 'Ingrese el nombre',
    },
    {
      label: 'Cantidad de asientos:',
      type: 'number',
      name: 'seat_count',
      placeholder: 'Ingrese la cantidad de asientos',
      min: 2,
      max: 8,
    },
    {
      label: 'Peso en Kg:',
      type: 'number',
      name: 'weight_in_kg',
      placeholder: 'Ingrese el peso',
      min: 100,
      required: true,
      adornment: 'Kg',
    },
    {
      label: 'Octanaje:',
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
      name: 'octane_rating',
      placeholder: 'Seleccione el octanaje',
      required: true,
    },
    {
      label: 'Tipo de aceite de la caja:',
      type: 'text',
      name: 'gearbox_oil_type',
      placeholder: 'Ingrese el tipo de aceite de la caja',
      required: true,
    },
    {
      label: 'Tipo de aceite del motor:',
      type: 'text',
      name: 'engine_oil_type',
      placeholder: 'Ingrese el tipo de aceite del motor',
      required: true,
    },
    {
      label: 'Tipo de refrigerante:',
      type: 'text',
      name: 'engine_coolant_type',
      placeholder: 'Ingrese el tipo de refrigerante',
      required: true,
    },
  ]

  const handleChange = event => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value })
  }

  return (
    <EditionPageView
      title="Editar modelo de vehículo"
      submitLabel="Guardar"
      inputs={inputs}
      values={formValues}
      handleChange={handleChange}
    />
  )
}
