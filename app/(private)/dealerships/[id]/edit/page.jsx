'use client'

import EditionPageView from '@/components/edition-page-view'
import { useState } from 'react'
import { useParams } from 'next/navigation'

export default function EditPage() {
  const { id } = useParams()

  const dealership = {
    rif: 'J-123456789',
    name: 'Concesionaria A',
    city_id: 1,
    manager_id: 'M-987654321',
  }
  const [formValues, setFormValues] = useState(dealership)

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
    <EditionPageView
      title={`Concesionario #${id}`}
      submitLabel="Guardar"
      inputs={inputs}
      values={formValues}
      handleChange={handleChange}
    />
  )
}
