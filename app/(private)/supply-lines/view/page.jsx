'use client'

import DetailsPageView from '@/components/details-page-view'
import useSupplyLineDetailsPage from '@/components/supply-lines/hooks/use-supply-line-details-page'
import { Typography } from '@mui/material'

export default function ViewPage() {
  const { rows, handleDelete, isLoading, id } = useSupplyLineDetailsPage()

  return (
    <>
      {!isLoading ? (
        <DetailsPageView
          title={'Línea de suministro'}
          id={id}
          toEditButtonLabel="Editar Línea de suministro"
          rows={rows}
          handleDelete={handleDelete}
        />
      ) : (
        <Typography align="center">Loading...</Typography>
      )}
    </>
  )
}
