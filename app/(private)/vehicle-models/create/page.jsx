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
      type: 'text',
      name: 'name',
      placeholder: 'Nombre',
      required: true,
    },
    {
      type: 'number',
      name: 'seatCount',
      placeholder: 'Cantidad de asientos',
      min: 2,
      max: 8,
      required: true,
    },
    {
      type: 'number',
      name: 'weightInKg',
      placeholder: 'Peso',
      min: 100,
      required: true,
      adornment: 'Kg',
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
      placeholder: 'Octanaje',
      required: true,
    },
    {
      type: 'text',
      name: 'gearboxOilType',
      placeholder: 'Tipo aceite de caja',
      required: true,
    },
    {
      type: 'text',
      name: 'engineOilType',
      placeholder: 'Tipo aceite de motor',
      required: true,
    },
    {
      type: 'text',
      name: 'engineCoolantType',
      placeholder: 'Tipo refrigerante',
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
      title="Modelo de vehículo"
      submitLabel="Crear modelo de vehículo"
      inputs={inputs}
      values={formValues}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  )
}
