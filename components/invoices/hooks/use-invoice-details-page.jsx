'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { BACKEND_URLS } from '@/utils/backend-urls'
import useSnackbar from '@/hooks/use-snackbar'

export default function useInvoiceDetailsPage() {
  const router = useRouter()
  const notify = useSnackbar()

  const searchParams = useSearchParams()

  const id = searchParams.get('id')

  const [invoiceData, setInvoiceData] = useState({
    orderId : '',
    amountDue : '',
    discount :'',
    issueDate :'',
  })

  const [isLoading, setIsLoading] = useState(true)

  const rows = useMemo(
    () => [
      {
        label: 'Número de la orden',
        value: invoiceData.orderId,
      },
      {
        label: 'Monto adeudado',
        value: invoiceData.amountDue,
      },
      {
        label: 'Descuento',
        value: invoiceData.discount
      },
      {
        label: 'Fecha',
        value: invoiceData.issueDate,
      },
    ],
    [invoiceData]
  )

  const handleDelete = async () => {
    try {
      const response = await fetch(`${BACKEND_URLS.invoices}?id=${id}`, {
        method: 'DELETE',
        cache: 'no-store',
      })

      if (!response.ok) throw new Error()

      notify({
        message: '¡La factura se ha eliminado exitósamente!',
        severity: 'success',
      })

      router.push('/invoices')
    } catch (error) {
      notify({
        message: 'Error al intentar eliminar la factura.',
        severity: 'error',
      })
    }
  }

  const fetchInvoiceData = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await fetch(
        `${BACKEND_URLS.invoices}/view?id=${id}`,
        {
          method: 'GET',
          cache: 'no-store',
        }
      )

      const responseData = await response.json()
      const fetchedInvoiceData = responseData.data
      setInvoiceData(fetchedInvoiceData)
    } catch (error) {
      notify({
        message: 'Error obteniendo los datos de la factura.',
        severity: 'error',
      })
    } finally {
      setIsLoading(false)
    }
  }, [notify, id])

  useEffect(() => {
    fetchInvoiceData()
  }, [fetchInvoiceData])

  return {
    rows,
    invoiceData,
    handleDelete,
    isLoading,
    id,
  }
}
