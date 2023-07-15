'use client'

import DataPageView from '@/components/data-page-view'
import useVehiclesDataPage from '@/components/vehicles/hooks/use-vehicle-data-page'

export default function VehiclePage() {

  const { columns, vehicles } = useVehiclesDataPage()

  return (
    <DataPageView
      title="Vehículos"
      createButtonLabel="Agregar vehículo"
      rows={vehicles}
      columns={columns}
    />
  )
}