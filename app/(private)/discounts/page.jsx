'use client'

import DataPageView from '@/components/data-page-view'
import useDiscountsDataPage from '@/components/discounts/hooks/use-discounts-data-page'

export default function DiscountsPage() {
  const { discounts, columns, handleDelete } = useDiscountsDataPage()

  return (
    <DataPageView
      title="Descuentos"
      createButtonLabel="Agregar descuento"
      rows={discounts}
      columns={columns}
      handleDelete={handleDelete}
    />
  )
}