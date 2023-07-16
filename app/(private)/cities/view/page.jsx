'use client'

import DetailsPageView from '@/components/details-page-view'
import { Typography } from '@mui/material'
import useCityDetailsPage from '@/components/cities/hooks/use-citiy-details-page'

export default function ViewPage() {
  const { rows, cityData, handleDelete, isLoading, id } =
    useCityDetailsPage()

  return (
    <>
      {!isLoading ? (
        <DetailsPageView
          title='Ciudad'
          toEditButtonLabel="Editar Ciudad"
          rows={rows}
          id={id}
          values={cityData}
          handleDelete={handleDelete}
        />
      ) : (
        <Typography align="center">Loading...</Typography>
      )}
    </>
  )
}
