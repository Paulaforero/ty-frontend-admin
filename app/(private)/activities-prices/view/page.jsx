'use client'

import DetailsPageView from '@/components/details-page-view'
import { Typography } from '@mui/material'
import useActivityPriceDetailsPage from '@/components/activities-prices/hooks/use-activity-price-details-page'

export default function ViewPage() {
  const {  rows, activityPriceData, handleDelete, isLoading, id } = useActivityPriceDetailsPage()

  return (
    <>
      {!isLoading ? (
        <DetailsPageView
        title="Precio de actividad"
        id={`#${id}`}
        toEditButtonLabel="Editar precio de actividad"
        rows={rows}
        values={activityPriceData}
        handleDelete={handleDelete}
        />
      ) : (
        <Typography align="center">Loading...</Typography>
      )}
    </>
  )
}