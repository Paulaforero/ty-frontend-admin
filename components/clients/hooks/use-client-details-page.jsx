'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { BACKEND_URLS } from '@/utils/backend-urls'
import useSnackbar from '@/hooks/use-snackbar'

export default function useClientDetailsPage() {
  const router = useRouter()
  const notify = useSnackbar()

  const searchParams = useSearchParams()

  const nationalId = searchParams.get('national-id')

  const id = nationalId

  const [clientData, setClientData] = useState({
    nationalId: '',
    fullName: '',
    mainPhoneNo: '',
    secondaryPhoneNo: '',
    email: '',
  })

  const [isLoading, setIsLoading] = useState(false)

  const rows = useMemo(
    () => [
      {
        label: 'Cédula',
        value: clientData.nationalId,
      },
      {
        label: 'Nombre',
        value: clientData.fullName,
      },
      {
        label: 'Nro. Telefónico',
        value: clientData.mainPhoneNo,
      },
      {
        label: 'Nro. Telefónico secundario',
        value: clientData.secondaryPhoneNo,
      },
      {
        label: 'Correo electrónico',
        value: clientData.email,
      },
    ],
    [clientData]
  )

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${BACKEND_URLS.clients}?national-id=${nationalId}`,
        {
          method: 'DELETE',
          cache: 'no-store',
        }
      )

      if (!response.ok) throw new Error()

      notify({
        message: '¡El cliente se ha eliminado exitósamente!',
        severity: 'success',
      })

      router.push('/clients')
    } catch (error) {
      notify({
        message: 'Error al intentar eliminar el cliente.',
        severity: 'error',
      })
    }
  }

  const fetchClientData = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await fetch(
        `${BACKEND_URLS.clients}/view?national-id=${nationalId}`,
        {
          method: 'GET',
          cache: 'no-store',
        }
      )

      const responseData = await response.json()
      const fetchedClientData = responseData.data
      setClientData(fetchedClientData)
    } catch (error) {
      notify({
        message: 'Error obteniendo los datos del cliente.',
        severity: 'error',
      })
    } finally {
      setIsLoading(false)
    }
  }, [notify, nationalId])

  useEffect(() => {
    fetchClientData()
  }, [fetchClientData])

  return {
    rows,
    clientData,
    handleDelete,
    isLoading,
    id,
  }
}
