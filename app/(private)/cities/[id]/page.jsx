'use client'

import DetailsPageView from '@/components/details-page-view'
import { useState } from 'react'
import { useParams } from 'next/navigation'

export default function ViewPage() {
  const { id } = useParams()

  const city = {
    id: 1,
    name: 'New York City',
    state_id: 1,
  }
  const [formValues, setFormValues] = useState(city)

  const rows = [
    {
      label: 'ID:',
      value: city.id,
    },
    {
      label: 'Nombre:',
      value: city.name,
    },
    {
      label: 'Estado:',
      value: city.state_id,
    },
  ]

  const handleChange = event => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value })
  }

  return (
    <DetailsPageView
      title={`Ciudad #${id}`}
      toEditButtonLabel="Editar Ciudad"
      rows={rows}
      values={formValues}
      handleChange={handleChange}
    />
  )
}
