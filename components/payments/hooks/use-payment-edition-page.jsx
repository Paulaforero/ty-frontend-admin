'use client'

import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { BACKEND_URLS } from '@/utils/backend-urls'
import { useRouter } from 'next/navigation'
import useSnackbar from '@/hooks/use-snackbar'

export default function usePaymentEditionPage() {
  const router = useRouter()
  const notify = useSnackbar()

  const searchParams = useSearchParams()

  const paymentNumber = searchParams.get('payment-number')
  const inoviceId = searchParams.get('invoice-id')
   const id = paymentNumber + '/' + inoviceId

  const [formValues, setFormValues] = useState({
    amountPaid: '',
    paymentDate: '', 
    paymentType: '',
    cardNumber: '',
    cardBank: '',
  })

  const [isLoading, setIsLoading] = useState(true)


  const inputs = [
    {
        label: 'Fecha del pago (yyyy-mm-dd)',
        type: 'text',
        name: 'paymentDate',
        required: true,
      },
      {
          type: 'select',
          options: [
            {
              label: 'Bolivares',
              value: 'bolivares',
            },
            {
              label: 'Moneda extranjera',
              value: 'foreign-currency',
            },
            {
              label: 'Transferencia',
              value: 'transfer',
            },
            {
              label: 'Tarjeta de debito',
              value: 'debit-card',
            },
            {
              label: 'Tarjeta de credito',
              value: 'credit-card',
            },
          ],
          name: 'paymentType',
          label: 'Tipo',
          required: true,
        },
        {
          label: 'Monto del pago',
          type: 'number',
          name: 'amountPaid',
          required: true,
          adornment: '$',
          min: 0,
        },
        {
          label: 'Nro. tarjeta de credito',
          type: 'text',
          name: 'cardNumber',
          required: true,
        },
        {
          label: 'Banco tarjeta de credito',
          type: 'text',
          name: 'cardBank',
          required: true,
        },
    
  ]

  const handleChange = event => {
    setFormValues({...formValues, [event.target.name]: typeof event.target.value === 'string' ? event.target.value.trim() : event.target.value })
  }

  const fetchPaymentData = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await fetch(
        `${BACKEND_URLS.payments}/view?payment-number=${paymentNumber}inoviceId=${inoviceId}`,
        {
          method: 'GET',
          cache: 'no-store',
        }
      )

      const responseData = await response.json()
      const fetchedPaymentData = responseData.data

      setFormValues(fetchedPaymentData)
    } catch (error) {
      notify({
        message: 'Error obteniendo los datos del pago.',
        severity: 'error',
      })
    } finally {
      setIsLoading(false)
    }
  }, [notify, paymentNumber, inoviceId])

  const editPayment = async () => {
    try {
      const { PaymentNumber, ...toEditValues } = formValues
      const response = await fetch(
        `${BACKEND_URLS.payments}?payment-number=${paymentNumber}inoviceId=${inoviceId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(toEditValues),
          cache: 'no-store',
        }
      )

      if (!response.ok) throw new Error()

      notify({
        message: '¡Se ha editado el pago exitosamente!',
        severity: 'success',
      })

      router.push('/payments')
    } catch (error) {
      notify({
        message: 'Error al intentar editar el pago.',
        severity: 'error',
      })
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    editPayment()
  }

  useEffect(() => {
    fetchPaymentData()
  }, [fetchPaymentData])

  return { inputs, formValues, handleChange, handleSubmit, isLoading, id,
  }
}
