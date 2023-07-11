'use client'

import DataPageView from '@/components/data-page-view'
import { vehicles } from '@/mock/vehicles'

export default function VehiclesPage() {
  const columns = {
        plate: 'Placa',
        model_id: 'Modelo (ID)',
        brand: 'Marca',
        owner_national_id: 'Cédula del cliente',
        serial_no: 'Numero de serial',
        color: 'Color',
  }

  const filters = [
    {
      label: 'Filtar por modelo',
      options: [
        { label: 'uno', value: 1 },
        { label: 'dos', value: 2 },
        { label: 'tres', value: 3 },
        { label: 'cuatro', value: 4 },
        { label: 'cinco', value: 5 },
      ],
    },
    {
        label: 'Filtar por color',
        options: [
          { label: 'uno', value: 1 },
          { label: 'dos', value: 2 },
          { label: 'tres', value: 3 },
          { label: 'cuatro', value: 4 },
          { label: 'cinco', value: 5 },
        ],
      }
  ]

  return (
    <DataPageView
      title="Vehículos"
      createButtonLabel="Agregar vehículo"
      columns={columns}
      rows={vehicles}
      filters={filters}
    />
  )
}
