'use client'

import DetailsPageView from '@/components/details-page-view'
import { Typography } from '@mui/material'
import useActivityDetailsPage from '@/components/activities/hooks/use-details-activities-page'

export default function ViewPage() {
  const {  rows, activityData, handleDelete, isLoading, id, } = useActivityDetailsPage()

  return (
    <>
      {!isLoading ? (
        <DetailsPageView
        title="Actividad"
        id={`#${id}`}
        toEditButtonLabel="Editar actividad"
        rows={rows}
        values={activityData}
        handleDelete={handleDelete}
        />
      ) : (
        <Typography align="center">Loading...</Typography>
      )}
    </>
  )
}