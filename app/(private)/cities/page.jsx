'use client'

import DataPageView from '@/components/data-page-view'
import useCitiesDataPage from '@/components/cities/hooks/use-cities-data-page'

export default function CitiesPage() {
  const { cities, columns, handleDelete } = useCitiesDataPage()

  return (
    <DataPageView
      title="Ciudades"
      createButtonLabel="Agregar ciudad"
      rows={cities}
      columns={columns}
      handleDelete={handleDelete}
    />
  )
}
