'use client'

import DetailsPageView from '@/components/details-page-view'
import { Typography } from '@mui/material'
import useCityDetailsPage from '@/components/cities/hooks/use-citiy-details-page'

export default function ViewPage() {
  const { rows, cityData, handleDelete, isLoading, name, cityNumber } =
    useCityDetailsPage()

  return (
    <>
      {!isLoading ? (
        <DetailsPageView
          title={name}
          toEditButtonLabel="Editar Ciudad"
          rows={rows}
          id={cityNumber}
          values={cityData}
          handleDelete={handleDelete}
        />
      ) : (
        <Typography align="center">Loading...</Typography>
      )}
    </>
  )
}
