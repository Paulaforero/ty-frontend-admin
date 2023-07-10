'use client'

import DetailsPageView from '@/components/details-page-view'
import { useState } from 'react'
import { useParams } from 'next/navigation'

export default function ViewPage() {
  const { id } = useParams()

  const supplyLine = { id: 8, name: 'Supply Line 8' }
  const [formValues, setFormValues] = useState(supplyLine)

  const rows = [
    {
      label: 'ID:',
      value: supplyLine.id,
    },
    {
      label: 'Nombre:',
      value: supplyLine.name,
    },
  ]

  const handleChange = event => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value })
  }

  return (
    <DetailsPageView
      title={`Linea de suministro #${id}`}
      toEditButtonLabel="Editar linea de suministro"
      rows={rows}
      values={formValues}
      handleChange={handleChange}
    />
  )
}
