'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { BACKEND_URLS } from '@/utils/backend-urls'
import useSnackbar from '@/hooks/use-snackbar'

export default function usePaymentCreationPage() {
  const router = useRouter()
  const notify = useSnackbar()

  const [formValues, setFormValues] = useState({
    invoiceId: '', 
    amountPaid: '',
    paymentDate: '', 
    paymentType: '',
    cardNumber: '',
    cardBank: '',
  })

  const [invoices, setInvoices] = useState([])


  const fetchInvoices = useCallback(async () => {
    try {
      const response = await fetch(BACKEND_URLS.invoices, {
        method: 'GET',
        cache: 'no-store',
      })

      const responseData = await response.json()
      const fetchedInvoices = responseData.data

      setInvoices(fetchedInvoices)
    } catch (error) {
      notify({
        message: 'Error obteniendo los facturas',
        severity: 'error',
      })
    }
  }, [notify])

  const createPayment = async () => {
    try {
      const response = await fetch(BACKEND_URLS.payments, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
        cache: 'no-store',
      })

      if (!response.ok) throw new Error()

      router.push('/payments')

      notify({
        message: '¡Pago creado con éxito!',
        severity: 'success',
      })
    } catch (error) {
      notify({
        message: 'Error al crear los pagos...',
        severity: 'error',
      })
    }
  }

  const inputs = [
    {
      label: 'Fecha del pago (yyyy-mm-dd)',
      type: 'text',
      name: 'paymentDate',
      required: true,
    },
    {
      label: 'Factura (ID)',
      type: 'select',
      options: invoices.map(invoice => ({
        label: invoice.id,
        value: invoice.id,
      })),
      name: 'invoiceId',
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
    const { name, value } = event.target
    let parsedValue = value

    if (name === 'amountPaid') parsedValue = parseFloat(value)
    

    setFormValues({
      ...formValues,
      [name]: parsedValue,
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    createPayment()
  }

  useEffect(() => {
    fetchInvoices()
  }, [fetchInvoices])

  return {
    inputs,
    formValues,
    handleChange,
    handleSubmit,
  }
}
