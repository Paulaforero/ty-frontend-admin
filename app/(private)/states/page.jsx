'use client'

import DataPageView from '@/components/data-page-view'
import useStatesDataPage from '@/components/states/hooks/use-states-data-page'

export default function StatesPage() {

  const { columns, states } = useStatesDataPage()

  return (
    <DataPageView
      title="Estados"
      createButtonLabel="Agregar estado"
      columns={columns}
      rows={states}
    />
  )
}