'use client'

import CreationPageView from '@/components/creation-page-view'
import { useState } from 'react'

export default function CreatePage() {
  const [formValues, setFormValues] = useState({
    id: '',
    name: '',
    seatCount: '',
    weightInKg: '',
    octaneRating: '',
    gearboxOilType: '',
    engineOilType: '',
    engineCoolantType: '',
  })

  const inputs = [
    {
      label: 'Nombre:',
      type: 'text',
      name: 'name',
      placeholder: 'Ingrese el nombre',
      required: true,
    },
    {
      label: 'Cantidad de asientos:',
      type: 'number',
      name: 'seatCount',
      placeholder: 'Ingrese la cantidad de asientos',
      min: 2,
      max: 8,
      required: true,
    },
    {
      label: 'Peso en Kg:',
      type: 'number',
      name: 'weightInKg',
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
      name: 'octaneRating',
      placeholder: 'Seleccione el octanaje',
      required: true,
    },
    {
      label: 'Tipo de aceite de la caja:',
      type: 'text',
      name: 'gearboxOilType',
      placeholder: 'Ingrese el tipo de aceite de la caja',
      required: true,
    },
    {
      label: 'Tipo de aceite del motor:',
      type: 'text',
      name: 'engineOilType',
      placeholder: 'Ingrese el tipo de aceite del motor',
      required: true,
    },
    {
      label: 'Tipo de refrigerante:',
      type: 'text',
      name: 'engineCoolantType',
      placeholder: 'Ingrese el tipo de refrigerante',
      required: true,
    },
  ]

  const handleChange = event => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
  }

  return (
    <CreationPageView
      title="Crear modelo de vehículo"
      submitLabel="Crear"
      inputs={inputs}
      values={formValues}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  )
}
