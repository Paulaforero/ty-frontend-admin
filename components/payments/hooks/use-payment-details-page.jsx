'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { BACKEND_URLS } from '@/utils/backend-urls'
import useSnackbar from '@/hooks/use-snackbar'

export default function usePaymentDetailsPage() {
  const router = useRouter()
  const notify = useSnackbar()

  const searchParams = useSearchParams()

  const paymentNumber = searchParams.get('payment-number')
  const inoviceId = searchParams.get('invoice-id')
   const id = paymentNumber + '/' + inoviceId

  const [paymentData, setPaymentData] = useState({
    amountDue : '',
    discount :'',
    issueDate :'',
    paymentType: '',
    cardNumber: '',
    cardBank: '',
  })

  const [isLoading, setIsLoading] = useState(true)

  const rows = useMemo(
    () => [
      {
        label: 'Monto',
        value: paymentData.amountDue,
      },
      {
        label: 'Descuento',
        value: paymentData.discount,
      },
      {
        label: 'Tipo',
        value: paymentData.paymentType,
      },
      {
        label: 'Fecha',
        value: paymentData.issueDate,
      },
      {
        label: 'Nro. tarjeta de credito',
        value: paymentData.cardNumber,
      },
      {
        label: 'Banco tarjeta de credito',
        value: paymentData.cardBank,
      },
    ],
    [paymentData]
  )

  const handleDelete = async () => {
    try {
      const response = await fetch(`${BACKEND_URLS.payments}?payment-number=${paymentNumber}&invoice-id=${invoiceId}`, {
        method: 'DELETE',
        cache: 'no-store',
      })

      if (!response.ok) throw new Error()

      notify({
        message: '¡El pago se ha eliminado exitósamente!',
        severity: 'success',
      })

      router.push('/payments')
    } catch (error) {
      notify({
        message: 'Error al intentar eliminar el pago.',
        severity: 'error',
      })
    }
  }

  const fetchPaymentData = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await fetch(
        `${BACKEND_URLS.payments}/view?payment-number=${paymentNumber}&invoice-id=${invoiceId}`,
        {
          method: 'GET',
          cache: 'no-store',
        }
      )

      const responseData = await response.json()
      const fetchedPaymentData = responseData.data
      setPaymentData(fetchedPaymentData)
    } catch (error) {
      notify({
        message: 'Error obteniendo los datos del pago.',
        severity: 'error',
      })
    } finally {
      setIsLoading(false)
    }
  }, [notify, paymentNumber])

  useEffect(() => {
    fetchPaymentData()
  }, [fetchPaymentData])

  return {
    rows,
    paymentData,
    handleDelete,
    isLoading,
    id
  }
}
