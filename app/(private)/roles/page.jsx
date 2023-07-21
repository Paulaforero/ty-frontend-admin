'use client'

import DataPageView from '@/components/data-page-view'
import useRolesDataPage from '@/components/roles/hooks/use-roles-data-page'
export default function RolesPage() {
  const { roles, columns, handleDelete } = useRolesDataPage()

  return (
    <DataPageView
      title="Cargos"
      createButtonLabel="Agregar cargo"
      rows={roles}
      columns={columns}
      handleDelete={handleDelete}
    />
  )
}