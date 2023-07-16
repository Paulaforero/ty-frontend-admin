'use client'

import DetailsPageView from '@/components/details-page-view'
import { Typography } from '@mui/material'
import useVehicleDetailsPage from '@/components/vehicles/hooks/use-vehicle-details-page'

export default function ViewPage() {
  const {  rows, vehicleData, handleDelete, isLoading, plate } = useVehicleDetailsPage()

  return (
    <>
      {!isLoading ? (
        <DetailsPageView
        title="Vehículo"
        id={`#${plate}`}
        toEditButtonLabel="Editar vehículo"
        rows={rows}
        values={vehicleData}
        handleDelete={handleDelete}
        />
      ) : (
        <Typography align="center">Loading...</Typography>
      )}
    </>
  )
}