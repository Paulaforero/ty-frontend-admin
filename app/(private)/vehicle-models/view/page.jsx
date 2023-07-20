'use client'

import DetailsPageView from '@/components/details-page-view'
import { Typography } from '@mui/material'
import useVehicleModelDetailsPage from '@/components/vehicle-models/hooks/use-vehicle-model-details-page'
export default function ViewPage() {
  const {  rows, vehicleModelData, handleDelete, isLoading, id } = useVehicleModelDetailsPage()

  return (
    <>
      {!isLoading ? (
        <DetailsPageView
        title="Modelo de vehículo"
        id={`#${id}`}
        toEditButtonLabel="Editar modelo de vehículo"
        rows={rows}
        values={vehicleModelData}
        handleDelete={handleDelete}
        />
      ) : (
        <Typography align="center">Loading...</Typography>
      )}
    </>
  )
}