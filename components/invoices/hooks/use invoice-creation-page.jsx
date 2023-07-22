'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { BACKEND_URLS } from '@/utils/backend-urls'
import useSnackbar from '@/hooks/use-snackbar'

export default function useInvoiceCreationPage() {
  const router = useRouter()
  const notify = useSnackbar()

  const [formValues, setFormValues] = useState({
    orderId : '',
    amountDue : '',
    discount :'',
    issueDate :'',
  })

  const [orders, setOrders] = useState([])

  const fetchOrders = useCallback(async () => {
    try {
      const response = await fetch(BACKEND_URLS.orders, {
        method: 'GET',
        cache: 'no-store',
      })

      const responseData = await response.json()
      const fetchedOrders = responseData.data

      setOrders(fetchedOrders)
    } catch (error) {
      notify({
        message: 'Error obteniendo las ordenes',
        severity: 'error',
      })
    }
  }, [notify])

  const createInvoice = async () => {
    try {
      const response = await fetch(BACKEND_URLS.invoices, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
        cache: 'no-store',
      })

      if (!response.ok) throw new Error()

      router.push('/invoices')

      notify({
        message: '¡Factura creada con éxito!',
        severity: 'success',
      })
    } catch (error) {
      notify({
        message: 'Error al crear la factura...',
        severity: 'error',
      })
    }
  }

  const inputs = [
    {
      label: 'Fecha (yyyy-mm-dd)',
      type: 'text',
      name: 'issueDate',
      required: true,
    },
    {
      label: 'Orden',
      type: 'select',
      options: orders.map(order => ({
        label: order.id,
        value: order.id,
      })),
      name: 'oderId',
      required: true,
    },
    {
        label: 'Monto adeudado',
        type: 'number',
        name: 'amountDue',
        required: true,
        min: 0,
        adornment: '$'
      },
      {
        label: 'Descuento',
        type: 'number',
        name: 'discount',
        required: true,
        min: 0,
        adornment: '$'
      },
  ]

  const handleChange = event => {
    const { name, value } = event.target
    let parsedValue

    if (name === 'amountDue' || name === 'discount') parsedValue = parseFloat(value)
    

    setFormValues({
      ...formValues,
      [name]: parsedValue,
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    createInvoice()
  }

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])
  return {
    inputs,
    formValues,
    handleChange,
    handleSubmit,
  }
}