'use client'

import DataPageView from '@/components/data-page-view'
import { VehicleModels } from '@/mock/vehicle-models'

export default function VehicleModelsPage() {
  const columns = {
    id: 'ID',
    name: 'Nombre',
    weight_in_kg: 'Peso (Kg)',
    octane_rating: 'Octanaje',
    seat_count: 'Cantidad asientos',
    engine_oil_type: 'Tipo aceite de motor',
  }

  const filters = [
    {
      label: 'Filtar por octanaje',
      options: [
        { label: 'uno', value: 1 },
        { label: 'dos', value: 2 },
        { label: 'tres', value: 3 },
        { label: 'cuatro', value: 4 },
        { label: 'cinco', value: 5 },
      ],
    },
    {
      label: 'Filtrar por cantidad de asientos',
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
      rows={VehicleModels}
      filters={filters}
    />
  )
}
