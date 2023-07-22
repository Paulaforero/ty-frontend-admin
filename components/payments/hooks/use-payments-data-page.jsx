'use client'
import { useState, useCallback, useEffect } from 'react'
import { BACKEND_URLS } from '@/utils/backend-urls'
import useSnackbar from '@/hooks/use-snackbar'

export default function usePaymentsDataPage() {
  const notify = useSnackbar()

  const [payments, setPayments] = useState([])

  const columns = {
    paymentNumber: 'Pago (ID)',
    invoiceId: 'Factura (ID)', 
    amountPaid: 'Monto',
    paymentDate: 'Fecha', 
    paymentType: 'Tipo',
  }

  const addIdAttrsObjectToEachRow = rows =>
    rows.map(row => {
      return {
        ...row,
        idAttrs: { 'payment-number': row.paymentNumber, 'invoice-id': row.invoiceId },
      }
    })

  const fetchPayments = useCallback(async () => {
    try {
      const response = await fetch(BACKEND_URLS.payments, {
        method: 'GET',
        cache: 'no-store',
      })

      const responseData = await response.json()
      const fetchedPayments = responseData.data
      const formattedPayments = addIdAttrsObjectToEachRow(fetchedPayments)

      setPayments(formattedPayments)
    } catch (error) {
      notify({
        message: 'Error obteniendo los pagos.',
        severity: 'error',
      })
    }
  }, [notify])

  const handleDelete = async ({
    'payment-number': paymentNumber,
    'invoice-id': invoiceId,
  }) => {
    try {
      const response = await fetch(
        `${BACKEND_URLS.Payments}?payment-number=${paymentNumber}&invoice-id=${invoiceId}`,
        {
          method: 'DELETE',
          cache: 'no-store',
        }
      )

      if (!response.ok) throw new Error()

      notify({
        message: '¡Se ha eliminado el pago exitosamente!',
        severity: 'success',
      })

      fetchPayments()
    } catch (error) {
      notify({
        message: 'Error al intentar eliminar el pago.',
        severity: 'error',
      })
    }
  }

  useEffect(() => {
    fetchPayments()
  }, [fetchPayments])

  return { payments, columns, handleDelete }
}

