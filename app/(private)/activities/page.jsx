'use client'

import DataPageView from '@/components/data-page-view'
import useActivitiesDataPage from '@/components/activities/hooks/use-activities-data-page'


export default function ActivitiesPage() {
  const { activities, columns, handleDelete } = useActivitiesDataPage()

  return (
    <DataPageView
      title="Actividades"
      createButtonLabel="Agregar actividad"
      rows={activities}
      columns={columns}
      handleDelete={handleDelete}
    />
  )
}