'use client'

import DataPageView from '@/components/data-page-view'
import useCitiesDataPage from '@/components/supply-lines/hooks/use-supply-lines-data-page'

export default function SupplyLinesPage() {
  const {supplyLines, columns, handleDelete} = useCitiesDataPage()

  return (
    <DataPageView
      title="Lineas de suministro"
      createButtonLabel="Agregar linea de suministro"
      columns={columns}
      rows={supplyLines}
      handleDelete={handleDelete}
    />
  )
}
