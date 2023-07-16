'use client'

import DataPageView from '@/components/data-page-view'
import useVehicleModelsDataPage from '@/components/vehicle-models/hooks/use-vehicle-models-data-page'

export default function VehicleModelsPage() {

  const { vehicleModels, columns, handleDelete } = useVehicleModelsDataPage()

  return (
    <DataPageView
      title="Modelos de vehículos"
      createButtonLabel="Agregar modelo de vehículo"
      rows={vehicleModels}
      columns={columns}
      handleDelete={handleDelete}
    />
  )
}