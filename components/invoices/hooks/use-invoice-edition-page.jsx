'use client'

import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { BACKEND_URLS } from '@/utils/backend-urls'
import { useRouter } from 'next/navigation'
import useSnackbar from '@/hooks/use-snackbar'

export default function useInvoicesEditionPage() {
  const router = useRouter()
  const notify = useSnackbar()

  const searchParams = useSearchParams()

  const id = searchParams.get('id')

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

  const [isLoading, setIsLoading] = useState(true)

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

      setFormValues(fetchedInvoiceData)
    } catch (error) {
      notify({
        message: 'Error obteniendo los datos de la factura.',
        severity: 'error',
      })
    } finally {
      setIsLoading(false)
    }
  }, [notify, id])


  const editInvoice = async () => {
    try {
      const { id, ...toEditValues } = formValues
      const response = await fetch(
        `${BACKEND_URLS.invoices}?id=${id}`,
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
        message: '¡Se ha editado la facturaexitosamente!',
        severity: 'success',
      })

      router.push('/invoices')
    } catch (error) {
      notify({
        message: 'Error al intentar editar la factura.',
        severity: 'error',
      })
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    editInvoice()
  }

  useEffect(() => {
    fetchInvoiceData(),
    fetchOrders()
  }, [fetchInvoiceData, fetchOrders])

  return { inputs, formValues, handleChange, handleSubmit, isLoading, id,
  }
}
