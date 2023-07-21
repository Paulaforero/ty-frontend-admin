'use client'

import DetailsPageView from '@/components/details-page-view'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import useDealershipDetailsPage from '@/components/dealerships/hooks/use-dealership-details-page'

export default function ViewPage() {
  const { rows, dealershipData, handleDelete, id, handleChange } = useDealershipDetailsPage()

  return (
    <DetailsPageView
      title={`Concesionario`}
      id={id}
      toEditButtonLabel="Editar Concesionario"
      rows={rows}
      values={dealershipData}
      handleChange={handleChange}
      handleDelete={handleDelete}
    />
  )
}
