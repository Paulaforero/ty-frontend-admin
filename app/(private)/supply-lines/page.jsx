'use client'

import DataPageView from '@/components/data-page-view'
import { supplyLines } from '@/mock/supply-lines'

export default function SupplyLinesPage() {
  const columns = {
    id: 'ID',
    name: 'Nombre',
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
      title="Lineas de suministro"
      createButtonLabel="Agregar linea de suministro"
      columns={columns}
      rows={supplyLines}
      filters={filters}
    />
  )
}
