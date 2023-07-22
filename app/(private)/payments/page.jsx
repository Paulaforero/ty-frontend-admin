'use client'

import DataPageView from '@/components/data-page-view'
import usePaymentsDataPage from '@/components/payments/hooks/use-payments-data-page'

export default function CitiesPage() {
  const { payments, columns, handleDelete } = usePaymentsDataPage()

  return (
    <DataPageView
      title="Pago"
      createButtonLabel="Agregar pago"
      rows={payments}
      columns={columns}
      handleDelete={handleDelete}
    />
  )
}
