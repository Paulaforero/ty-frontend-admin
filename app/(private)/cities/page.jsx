'use client'

import DataPageView from '@/components/data-page-view'
import { cities } from '@/mock/cities'

export default function CitiesPage() {
  const columns = {
    id: 'ID',
    name: 'Nombre',
    state_id: 'Estado (ID)',
  }

  const filters = [
    {
      label: 'Filtar por estado',
      options: [
        { label: 'uno', value: 1 },
        { label: 'dos', value: 2 },
        { label: 'tres', value: 3 },
        { label: 'cuatro', value: 4 },
        { label: 'cinco', value: 5 },
      ],
    },
  ]

  return (
    <DataPageView
      title="Modelos de vehiculos"
      createButtonLabel="Agregar modelo"
      columns={columns}
      rows={cities}
      filters={filters}
    />
  )
}
