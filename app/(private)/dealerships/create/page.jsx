'use client'

import CreationPageView from '@/components/creation-page-view'
import { useState } from 'react'

export default function CreatePage() {
  const [formValues, setFormValues] = useState({
    rif: '',
    name: '',
    city_id: '',
    manager_id: '',
  })

  const inputs = [
    {
      label: 'Rif:',
      type: 'text',
      name: 'rif',
      placeholder: 'Inserte el rif',
    },
    {
      label: 'Nombre:',
      type: 'text',
      name: 'name',
      placeholder: 'Inserte el nombre',
    },
    {
      label: 'Ciudad:',
      type: 'select',
      options: [
        {
          label: 'Caracas',
          value: 1,
        },
        {
          label: 'Puto Ordaz',
          value: 2,
        },
      ],
      name: 'city_id',
      placeholder: 'Seleccione la ciudad',
    },
    {
      label: 'Manager:',
      type: 'text',
      name: 'manager_id',
      placeholder: 'Inserte el ID del manager',
    },
  ]

  const handleChange = event => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value })
  }

  return (
    <CreationPageView
      title="Crear concesionario"
      submitLabel="Crear Concesionario"
      inputs={inputs}
      values={formValues}
      handleChange={handleChange}
    />
  )
}
