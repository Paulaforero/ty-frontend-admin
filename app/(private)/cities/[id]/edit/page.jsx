'use client'

import EditionPageView from '@/components/edition-page-view'
import { useState } from 'react'
import { states } from '@/mock/cities'

export default function EditPage() {
  const city = {
    id: 1,
    name: 'New York City',
    state_id: 1,
  }
  const [formValues, setFormValues] = useState(city)

  const inputs = [
    {
      label: 'Nombre:',
      type: 'text',
      name: 'name',
      placeholder: 'Ingrese el nombre',
      required: true,
    },
    {
      label: 'Estado:',
      type: 'select',
      options: states.map(state => ({
        label: state.name,
        value: state.id,
      })),
      name: 'state_id',
      placeholder: 'Seleccione el estado',
      required: true,
    },
  ]

  const handleChange = event => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value })
  }

  return (
    <EditionPageView
      title="Editar ciudad"
      submitLabel="Editar ciudad"
      inputs={inputs}
      values={formValues}
      handleChange={handleChange}
    />
  )
}
