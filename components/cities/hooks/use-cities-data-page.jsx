import { useState, useCallback, useEffect } from 'react'
import { BACKEND_URLS } from '@/utils/backend-urls'

export default function useCitiesDataPage() {
  const [cities, setCities] = useState([])

  const columns = {
    id: 'ID',
    name: 'Nombre',
    stateId: 'Estado (ID)',
  }

  const filters = [
    {
      label: 'Filtar por estado',
      options: [
        { label: 'uno', value: 1 },
        { label: 'dos', value: 2 },
        { label: 'tres', value: 3 },
        { label: 'cuatro', value: 4 },
        { label: 'cinco', value: 5 },
      ],
    },
  ]

  const addIdAttrsObject = rows =>
    rows.map(row => {
      return { ...row, idAttrs: { id: row.id } }
    })

  const fetchCities = useCallback(async () => {
    try {
      const response = await fetch(BACKEND_URLS.cities, {
        method: 'GET',
        cache: 'no-store',
      })

      const fetchedCities = await response.json()
      const formattedCities = addIdAttrsObject(fetchedCities)

      setCities(formattedCities)
    } catch (error) {
      alert('ERROR')
    }
  }, [])

  const handleDelete = async id => {
    try {
      const response = await fetch(`${BACKEND_URLS.cities}/${id}`, {
        method: 'DELETE',
        cache: 'no-store',
      })

      if (!response.ok) throw new Error()

      fetchCities()
    } catch (error) {
      alert('ERROR')
    }
  }

  useEffect(() => {
    fetchCities()
  }, [fetchCities])

  return { cities, columns, filters, handleDelete }
}
