'use client'

import DataPageView from '@/components/data-page-view'
import useInvoicesDataPage from '@/components/invoices/hooks/use-invoices-data-page'

export default function CitiesPage() {
  const { invoices, columns, handleDelete } = useInvoicesDataPage()

  return (
    <DataPageView
      title="Facturas"
      createButtonLabel="Agregar factura"
      rows={invoices}
      columns={columns}
      handleDelete={handleDelete}
    />
  )
}