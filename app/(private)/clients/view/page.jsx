'use client'

import DetailsPageView from '@/components/details-page-view'
import { Typography } from '@mui/material'
import useClientDetailsPage from '@/components/clients/hooks/use-client-details-page'

export default function ViewPage() {
  const { rows, clientData, handleDelete, isLoading, id } =
    useClientDetailsPage()

  return (
    <>
      {!isLoading ? (
        <DetailsPageView
          title="Cliente"
          id={`${id}`}
          toEditButtonLabel="Editar cliente"
          rows={rows}
          values={clientData}
          handleDelete={handleDelete}
        />
      ) : (
        <Typography align="center">Loading...</Typography>
      )}
    </>
  )
}
