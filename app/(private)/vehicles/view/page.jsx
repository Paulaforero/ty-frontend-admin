'use client'

import DetailsPageView from '@/components/details-page-view'
import { Typography } from '@mui/material'
import useVehicleDetailsPage from '@/components/vehicles/hooks/use-vehicle-details-page'

export default function ViewPage() {
  const {  rows, vehicleData, handleChange, isLoading, id } = useVehicleDetailsPage()

  return (
    <>
      {!isLoading ? (
        <DetailsPageView
        title="Vehículo"
        id={`#${id}`}
        toEditButtonLabel="Editar vehículo"
        rows={rows}
        values={vehicleData}
        handleChange={handleChange}
        />
      ) : (
        <Typography align="center">Loading...</Typography>
      )}
    </>
  )
}