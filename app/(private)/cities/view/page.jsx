'use client'

import DetailsPageView from '@/components/details-page-view'
import { Typography } from '@mui/material'
import useCityDetailsPage from '@/components/cities/hooks/use-citiy-details-page'

export default function ViewPage() {
  const { rows, cityData, handleChange, handleSubmit, handleDelete, isLoading } = useCityDetailsPage()

  return (
    <>
      {!isLoading ? (
        <DetailsPageView
          title={`Ciudad #${id}`}
          toEditButtonLabel="Editar Ciudad"
          rows={rows}
          values={cityData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleDelete={handleDelete}
        />
      ) : (
        <Typography align="center">Loading...</Typography>
      )}
    </>
  )
}
