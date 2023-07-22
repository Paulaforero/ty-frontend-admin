'use client'

import DataPageView from '@/components/data-page-view'
import useDealershipsDataPage from '@/components/dealerships/hooks/use-dealerships-data-page'

export default function DealershipsPage() {
  const { dealerships, columns, handleDelete } = useDealershipsDataPage()

  return (
    <DataPageView
      title="Concesionarios"
      createButtonLabel="Agregar concesionario"
      columns={columns}
      rows={dealerships}
      handleDelete={handleDelete}
    />
  )
}
