'use client'

import DataPageView from '@/components/data-page-view'
import { useState, useCallback, useEffect } from 'react'
import { BACKEND_URLS } from '@/utils/backend-urls'
import useCitiesDataPage from '@/components/cities/hooks/use-cities-data-page'

export default function CitiesPage() {
  const { cities, columns, filters, handleDelete } = useCitiesDataPage()

  return (
    <DataPageView
      title="Ciudades"
      createButtonLabel="Agregar ciudad"
      rows={cities}
      columns={columns}
      filters={filters}
      handleDelete={handleDelete}
    />
  )
}
