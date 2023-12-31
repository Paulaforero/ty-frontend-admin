'use client'

import DetailsPageView from '@/components/details-page-view'
import { Typography } from '@mui/material'
import useDetailsStaffPage from '@/components/staff/hooks/use-details-staff-page'

export default function ViewPage() {
  const {  rows, EmployeeData, handleDelete, isLoading, nationalId } = useDetailsStaffPage()

  return (
    <>
      {!isLoading ? (
        <DetailsPageView
        title="Empleado"
        id={`#${nationalId}`}
        toEditButtonLabel="Editar empleado"
        rows={rows}
        values={EmployeeData}
        handleDelete={handleDelete}
        />
      ) : (
        <Typography align="center">Loading...</Typography>
      )}
    </>
  )
}