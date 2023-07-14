'use client'

import DetailsPageView from '@/components/details-page-view'
import { Typography } from '@mui/material'
import useStateDetailsPage from '@/components/states/hooks/use-state-details-page'

export default function ViewPage() {
  const {  rows, stateData, handleChange, isLoading, id } = useStateDetailsPage()

  return (
    <>
      {!isLoading ? (
        <DetailsPageView
        title="Estado"
        id={`#${id}`}
        toEditButtonLabel="Editar estado"
        rows={rows}
        values={stateData}
        handleChange={handleChange}
        />
      ) : (
        <Typography align="center">Loading...</Typography>
      )}
    </>
  )
}

