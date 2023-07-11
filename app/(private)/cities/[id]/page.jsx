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

  const editCity = async () => {
    try {
      const response = await fetch(BACKEND_URLS.cities, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
        cache: 'no-store',
      })

      router.push('/cities')
    } catch (error) {
      alert('ERROR')
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    editCity()
  }

  return (
    <DetailsPageView
      title={`Ciudad #${id}`}
      toEditButtonLabel="Editar Ciudad"
      rows={rows}
      values={formValues}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  )
}
