'use client'

import useClientsDataPage from '@/components/clients/hooks/use-clients-data-page'
import DataPageView from '@/components/data-page-view'

export default function DealershipsPage() {
  const { clients, columns, handleDelete } = useClientsDataPage()

  return (
    <DataPageView
      title="Clientes"
      createButtonLabel="Agregar clientes"
      columns={columns}
      rows={clients}
      handleDelete={handleDelete}
    />
  )
}
