'use client'

import EditionPageView from '@/components/edition-page-view'
import { useState } from 'react'

export default function EditPage() {
  const supplyLines = { id: 8, name: 'Supply Line 8' }
  const [formValues, setFormValues] = useState(supplyLines)

  const inputs = [
    {
      label: 'Nombre:',
      type: 'text',
      name: 'name',
      placeholder: 'Ingrese el nombre',
      required: true,
    },
  ]

  const handleChange = event => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value })
  }

  return (
    <EditionPageView
      title="Editar linea de suministro"
      submitLabel="Guardar linea de suministro"
      inputs={inputs}
      values={formValues}
      handleChange={handleChange}
    />
  )
}
