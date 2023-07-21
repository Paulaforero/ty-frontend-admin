'use client'

import DataPageView from '@/components/data-page-view'
import useActivitiesPricesDataPage from '@/components/activities-prices/hooks/use-activities-prices-data-page'
export default function ActivitiesPricesPage() {
  const { activitiesPrices, columns, handleDelete } = useActivitiesPricesDataPage()

  return (
    <DataPageView
      title="Precio de actividades"
      createButtonLabel="Agregar precio de actividad"
      rows={activitiesPrices}
      columns={columns}
      handleDelete={handleDelete}
    />
  )
}