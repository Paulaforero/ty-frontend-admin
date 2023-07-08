'use client'

import CreationPageView from '@/components/creation-page-view'
import { useState } from 'react'

export default function CreatePage() {
  const [formValues, setFormValues] = useState({
    name: '',
    seat_count: '',
    weight_in_kg: '',
    octane_rating: '',
    gearbox_oil_type: '',
    engine_oil_type: '',
    engine_coolant_type: '',
  })

  const inputs = [
    {
      label: 'Nombre:',
      type: 'text',
      name: 'name',
      placeholder: 'Inserte el nombre',
    },
    {
      label: 'Cantidad de asientos:',
      type: 'text',
      name: 'seat_count',
      placeholder: 'Inserte la cantidad de asientos',
    },
    {
      label: 'Peso en Kg:',
      type: 'text',
      name: 'weigh_in_kg',
      placeholder: 'Inserte el peso en kg',
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
      },
    {
        label: 'Tipo de aceite de la caja:',
        type: 'text',
        name: 'gearbox_oil_type',
        placeholder: 'Ingrese el tipo de aceite de la caja',
      },
      {
        label: 'Tipo de aceite del motor:',
        type: 'text',
        name: 'engine_oil_type',
        placeholder: 'Ingrese el tipo de aceite del motor',
      },
      {
        label: 'Tipo de refrigerante:',
        type: 'text',
        name: 'engine_coolant_type',
        placeholder: 'Ingrese el tipo de refrigerante',
      },
  ]

  const handleChange = event => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value })
  }

  return (
    <CreationPageView
      title="Crear modelo de vehículo"
      submitLabel="Crear modelo de vehículo"
      inputs={inputs}
      values={formValues}
      handleChange={handleChange}
    />
  )
}
