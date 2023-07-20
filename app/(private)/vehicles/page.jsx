'use client'

import DataPageView from '@/components/data-page-view'
import useVehiclesDataPage from '@/components/vehicles/hooks/use-vehicles-data-page'

export default function VehiclesPage() {

  const { vehicles, columns, handleDelete } = useVehiclesDataPage()

  return (
    <DataPageView
      title="Vehículos"
      createButtonLabel="Agregar vehículo"
      rows={vehicles}
      columns={columns}
      handleDelete={handleDelete}
    />
  )
}