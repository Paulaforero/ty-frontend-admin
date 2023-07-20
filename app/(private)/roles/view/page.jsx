'use client'

import DetailsPageView from '@/components/details-page-view'
import { Typography } from '@mui/material'
import useRoleDetailsPage from '@/components/roles/use-role-details-page'
export default function ViewPage() {
  const {  rows, roleData, handleDelete, isLoading, id } = useRoleDetailsPage()

  return (
    <>
      {!isLoading ? (
        <DetailsPageView
        title="Cargo"
        id={`#${id}`}
        toEditButtonLabel="Editar cargo"
        rows={rows}
        values={roleData}
        handleDelete={handleDelete}
        />
      ) : (
        <Typography align="center">Loading...</Typography>
      )}
    </>
  )
}