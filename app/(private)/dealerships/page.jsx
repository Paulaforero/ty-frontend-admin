'use client'

import DataPageView from '@/components/data-page/data-page-view'
import { dealerships } from '@/mock/dealerships'

export default function DealershipsPage() {
  const columns = {
    rif: 'Rif',
    name: 'Nombre',
    city_id: 'Ciudad (ID)',
    manager_id: 'Manager (ID)',
  }

  const filters = [
    {
      label: 'Filtar por ciudad',
      options: [
        { label: 'uno', value: 1 },
        { label: 'dos', value: 2 },
        { label: 'tres', value: 3 },
        { label: 'cuatro', value: 4 },
        { label: 'cinco', value: 5 },
      ],
    },
    {
      label: 'Filtrar por manager',
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
      title="Concesionarios"
      createButtonLabel="Agregar concesionario"
      columns={columns}
      rows={dealerships}
      filters={filters}
    />
  )
}
