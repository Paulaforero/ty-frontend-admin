'use client'

import CreationPageView from '@/components/creation-page-view'
import { useState } from 'react'
import { states } from '@/mock/cities'

export default function CreatePage() {
  const [formValues, setFormValues] = useState({
    name: '',
    state_id: '',
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

  const handleSubmit = e => {
    e.preventDefault()
  }

  return (
    <CreationPageView
      title="Crear ciudad"
      submitLabel="Crear ciudad"
      inputs={inputs}
      values={formValues}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  )
}
