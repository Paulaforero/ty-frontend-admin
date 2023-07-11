'use client'

import DataPageView from '@/components/data-page-view'
import { VehicleModels } from '@/mock/vehicle-models'

export default function VehicleModelsPage() {
  const columns = {
    id: 'ID',
    name: 'Nombre',
    weightInKg: 'Peso (Kg)',
    octaneRating: 'Octanaje',
    seatCount: 'Cantidad asientos',
    engineOilType: 'Tipo aceite de motor',
  } 

  return (
    <DataPageView
      title="Modelos de vehiculos"
      createButtonLabel="Agregar modelo"
      columns={columns}
      rows={VehicleModels}
    />
  )
}
