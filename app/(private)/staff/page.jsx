'use client'

import DataPageView from '@/components/data-page-view'
import useStaffDataPage from '@/components/cities/hooks/use-cities-data-page'

export default function CitiesPage() {
  const { staff, columns, handleDelete } = useStaffDataPage()

  return (
    <DataPageView
      title="Empleados"
      createButtonLabel="Agregar empleado"
      rows={staff}
      columns={columns}
      handleDelete={handleDelete}
    />
  )
}