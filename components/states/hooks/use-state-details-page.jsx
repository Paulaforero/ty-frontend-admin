'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import useSnackbar from '@/hooks/use-snackbar'

export default function useStateDetailsPage() {

  const searchParams = useSearchParams()

  const id = searchParams.get('id')

  const [stateData, setStateData] = useState({
    id,
    name: '',
  })
  const [isLoading, setIsLoading] = useState(false)

  const rows = useMemo(
    () => [
      {
        label: 'Nombre',
        value: stateData.name,
      },
    ],
    [stateData]
  )

  const handleChange = event => {
    setVehicleModel({ ...stateData, [event.target.name]: event.target.value })
  }


  return { rows, stateData, handleChange, isLoading, id }
}
