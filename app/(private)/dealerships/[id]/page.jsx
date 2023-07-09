'use client'

import DetailsPageView from '@/components/details-page-view'
import { useState } from 'react'
import { useParams } from 'next/navigation'

export default function ViewPage() {
  const { id } = useParams()

  const dealership = {
    rif: 'J-123456789',
    name: 'Concesionaria A',
    city_id: 1,
    manager_id: 'M-987654321',
  }
  const [formValues, setFormValues] = useState(dealership)

  const rows = [
    {
      label: 'Rif:',
      value: dealership.rif,
    },
    {
      label: 'Nombre:',
      value: dealership.name,
    },
    {
      label: 'Ciudad:',
      value: dealership.city_id,
    },
    {
      label: 'Manager:',
      value: dealership.manager_id,
    },
  ]

  const handleChange = event => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value })
  }

  return (
    <DetailsPageView
      title={`Concesionario #${id}`}
      toEditButtonLabel="Editar Concesionario"
      rows={rows}
      values={formValues}
      handleChange={handleChange}
    />
  )
}
